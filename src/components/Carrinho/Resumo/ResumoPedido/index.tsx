import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Tag, Lock } from 'lucide-react-native';

import BtnPrincipal from '../../../BtnPrincipal';
import { maskCEP, validateCEP } from '../../../../hooks/masks';
import colors from '../../../../theme/colors';
import styles from './styles';
import type { ResumoPedidoVariant } from '../../../../types/checkout';

/** Resultado de uma tentativa de calcular frete ou aplicar cupom. */
interface ResultadoValidacao {
  sucesso: boolean;
  mensagem?: string;
}

interface ResumoPedidoProps {
  variant: ResumoPedidoVariant;
  subtotal?: number;
  desconto?: number;
  total?: number;
  onCalcularFrete?: (cep: string) => ResultadoValidacao | void;
  freteValor?: number | null;
  onAplicarCupom?: (codigo: string) => ResultadoValidacao | void;
  cupomAviso?: string | null;
  onOcultarCupomAviso?: () => void;
  ctaLabel?: string;
  onCtaClick?: () => void;
  ctaDisabled?: boolean;
}

const formatarPreco = (valor: number) => `R$ ${valor.toFixed(2).replace('.', ',')}`;

export default function ResumoPedido({
  variant,
  subtotal = 0,
  desconto = 0,
  total = 0,
  onCalcularFrete,
  freteValor,
  onAplicarCupom,
  cupomAviso,
  onOcultarCupomAviso,
  ctaLabel,
  onCtaClick,
  ctaDisabled,
}: ResumoPedidoProps) {
  const [cepInput, setCepInput] = useState('');
  const [cupomInput, setCupomInput] = useState('');

  // BUG CORRIGIDO: nem CEP inválido nem cupom inválido davam qualquer
  // feedback visual — o "Usar"/"Aplicar" simplesmente não fazia nada
  // visível. Agora cada campo tem seu próprio erro local, mostrado como
  // borda vermelha + mensagem abaixo, e some assim que o usuário volta
  // a digitar (evita ficar mostrando um erro desatualizado).
  const [cepErro, setCepErro] = useState<string | null>(null);
  const [cupomErro, setCupomErro] = useState<string | null>(null);

  const cepValido = validateCEP(cepInput);
  const cepTocado = cepInput.length > 0;

  useEffect(() => {
    if (!cupomAviso || !onOcultarCupomAviso) return;

    const timeout = setTimeout(onOcultarCupomAviso, 6000);
    return () => clearTimeout(timeout);
  }, [cupomAviso, onOcultarCupomAviso]);

  function handleCepChange(texto: string) {
    setCepInput(maskCEP(texto));
    if (cepErro) setCepErro(null);
  }

  function handleUsarCep() {
    if (!cepValido) {
      setCepErro('Informe um CEP válido com 8 dígitos.');
      return;
    }

    const resultado = onCalcularFrete?.(cepInput);
    if (resultado && !resultado.sucesso) {
      setCepErro(resultado.mensagem ?? 'Não foi possível calcular o frete para esse CEP.');
      return;
    }

    setCepErro(null);
  }

  function handleCupomChange(texto: string) {
    setCupomInput(texto.toUpperCase());
    if (cupomErro) setCupomErro(null);
  }

  function handleAplicarCupom() {
    const resultado = onAplicarCupom?.(cupomInput);
    if (resultado && !resultado.sucesso) {
      setCupomErro(resultado.mensagem ?? 'Cupom inválido.');
      return;
    }

    setCupomErro(null);
  }

  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>Resumo do Pedido</Text>

      {variant === 'vazio' && (
        <Text style={styles.textoVazio}>
          Aqui você vai encontrar os valores da sua compra assim que adicionar produtos.
        </Text>
      )}

      {variant === 'carrinho' && (
        <View style={styles.corpo}>
          <View style={styles.linha}>
            <Text style={styles.linhaLabel}>Subtotal</Text>
            <Text style={styles.linhaValor}>{formatarPreco(subtotal)}</Text>
          </View>

          <View style={styles.freteBloco}>
            <View style={styles.linha}>
              <Text style={styles.linhaLabel}>
                Frete <Text style={styles.required}>*</Text>
              </Text>

              {freteValor != null && (
                <Text style={freteValor === 0 ? styles.freteGratis : styles.freteValor}>
                  {freteValor === 0 ? 'Grátis' : formatarPreco(freteValor)}
                </Text>
              )}
            </View>

            <View
              style={[
                styles.inputContainer,
                cepErro && styles.inputContainerErro,
                !cepErro && cepTocado && !cepValido && styles.inputContainerAlerta,
              ]}
            >
              <TextInput
                style={styles.inputSemBorda}
                value={cepInput}
                placeholder="Informe um CEP"
                placeholderTextColor={colors.textMuted2}
                keyboardType="numeric"
                onChangeText={handleCepChange}
                accessibilityLabel="CEP"
               
              />

              <TouchableOpacity
                style={[styles.btnInterno, !cepValido && styles.btnInternoDesabilitado]}
                onPress={handleUsarCep}
                disabled={!cepValido}
              >
                <Text style={styles.btnInternoTexto}>Usar</Text>
              </TouchableOpacity>
            </View>

            {cepErro && <Text style={styles.erroTexto}>{cepErro}</Text>}
          </View>

          <View style={styles.cupomBloco}>
            <View style={[styles.inputComIcone, cupomErro && styles.inputContainerErro]}>
              <Tag size={18} color={cupomErro ? colors.error : colors.textMuted2} />

              <TextInput
                style={styles.inputSemBorda}
                value={cupomInput}
                placeholder="Inserir código de cupom"
                placeholderTextColor={colors.textMuted2}
                autoCapitalize="characters"
                onChangeText={handleCupomChange}
                accessibilityLabel="Código do cupom"
            
              />

              <TouchableOpacity
                style={[styles.btnInterno, !cupomInput.trim() && styles.btnInternoDesabilitado]}
                onPress={handleAplicarCupom}
                disabled={!cupomInput.trim()}
              >
                <Text style={styles.btnInternoTexto}>Aplicar</Text>
              </TouchableOpacity>
            </View>

            {cupomErro && <Text style={styles.erroTexto}>{cupomErro}</Text>}
            {!cupomErro && cupomAviso && (
              <Text style={styles.cupomAplicadoTexto}>Cupom {cupomAviso} aplicado</Text>
            )}

            {desconto > 0 && (
              <View style={styles.linha}>
                <Text style={styles.linhaLabel}>Desconto</Text>
                <Text style={styles.desconto}>-{formatarPreco(desconto)}</Text>
              </View>
            )}
          </View>

          <View style={styles.linhaTotal}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValor}>{formatarPreco(total)}</Text>
          </View>

          {/* BUG CORRIGIDO: o CTA ficava desabilitado (opacidade + sem
              toque) quando faltava calcular o frete, mas nada explicava
              o motivo — parecia só "travado". */}
          {ctaDisabled && freteValor == null && (
            <Text style={styles.ctaAvisoTexto}>
              Informe um CEP e toque em "Usar" para calcular o frete antes de continuar.
            </Text>
          )}

          <View style={ctaDisabled ? styles.ctaDesabilitado : undefined} pointerEvents={ctaDisabled ? 'none' : 'auto'}>
            <BtnPrincipal title={ctaLabel ?? 'Continuar para Pagamento'} onPress={() => onCtaClick?.()} />
          </View>
        </View>
      )}

      {variant === 'carrinho' && (
        <View style={styles.seguroRodape}>
          <Lock size={14} color={colors.textMuted2} />
          <Text style={styles.seguroTexto}>Pagamento 100% seguro</Text>
        </View>
      )}
    </View>
  );
}
