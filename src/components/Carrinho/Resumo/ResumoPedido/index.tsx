import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Tag, Lock } from 'lucide-react-native';

import BtnPrincipal from '../../../BtnPrincipal';
import { maskCEP, validateCEP } from '../../../../hooks/masks';
import colors from '../../../../theme/colors';
import styles from './styles';
import type { ResumoPedidoVariant } from '../../../../types/checkout';

interface ResumoPedidoProps {
  variant: ResumoPedidoVariant;
  subtotal?: number;
  desconto?: number;
  total?: number;
  onCalcularFrete?: (cep: string) => void;
  freteValor?: number | null;
  onAplicarCupom?: (codigo: string) => void;
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
  const cepValido = validateCEP(cepInput);

  useEffect(() => {
    if (!cupomAviso || !onOcultarCupomAviso) return;

    const timeout = setTimeout(onOcultarCupomAviso, 6000);
    return () => clearTimeout(timeout);
  }, [cupomAviso, onOcultarCupomAviso]);

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

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputSemBorda}
                value={cepInput}
                placeholder="Informe um CEP"
                placeholderTextColor={colors.textMuted2}
                keyboardType="numeric"
                onChangeText={(texto) => setCepInput(maskCEP(texto))}
                accessibilityLabel="CEP"
              />

              <TouchableOpacity
                style={[styles.btnInterno, !cepValido && styles.btnInternoDesabilitado]}
                onPress={() => onCalcularFrete?.(cepInput)}
                disabled={!cepValido}
              >
                <Text style={styles.btnInternoTexto}>Usar</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.cupomBloco}>
            <View style={styles.inputComIcone}>
              <Tag size={18} color={colors.textMuted2} />

              <TextInput
                style={styles.inputSemBorda}
                value={cupomInput}
                placeholder="Inserir código de cupom"
                placeholderTextColor={colors.textMuted2}
                autoCapitalize="characters"
                onChangeText={(texto) => setCupomInput(texto.toUpperCase())}
                accessibilityLabel="Código do cupom"
              />

              <TouchableOpacity style={styles.btnInterno} onPress={() => onAplicarCupom?.(cupomInput)}>
                <Text style={styles.btnInternoTexto}>Aplicar</Text>
              </TouchableOpacity>
            </View>

            {cupomAviso && <Text style={styles.cupomAplicadoTexto}>Cupom {cupomAviso} aplicado</Text>}

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
