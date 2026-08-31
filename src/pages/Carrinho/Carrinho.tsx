import { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Check } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../../components/Header';
import CabecalhoPagina from '../../components/CabecalhoPagina/CabecalhoPagina';
import CarrinhoVazio from '../../components/Carrinho/CarrinhoVazio';
import LojaGroup from '../../components/Carrinho/LojaGroup';
import ResumoPedido from '../../components/Carrinho/Resumo/ResumoPedido';

import { useCarrinhoStore } from '../../hooks/useCarrinhoStore';
import type { ItemCarrinho as ItemCarrinhoContexto } from '../../context/CarrinhoContext';
import type { CarrinhoItemData, LojaGroupData } from '../../types/checkout';

import { styles } from './styles';

/* ============================================================
   HELPERS
============================================================ */

// Preço do produto vem como string ("599,98") vinda do cadastro — mesma
// conversão usada em useSolicitarReserva.ts.
function precoDiariaDoProduto(price: string): number {
  const preco = Number(String(price).replace(',', '.'));
  return Number.isFinite(preco) ? preco : 0;
}

// Agrupa os itens do carrinho (contexto global, populado via "Adicionar ao
// carrinho" na tela do produto) por locador, no formato que
// LojaGroup/ItemCarrinho já sabem exibir.
function agruparPorLoja(itens: ItemCarrinhoContexto[]): LojaGroupData[] {
  const grupos = new Map<string, LojaGroupData>();

  itens.forEach((item) => {
    const nomeLoja = item.produto.locador;

    const itemData: CarrinhoItemData = {
      id: item.id,
      image: item.produto.images[0],
      title: item.produto.title,
      dias: item.dias,
      precoUnitario: precoDiariaDoProduto(item.produto.price),
      quantidade: item.quantidade,
      selecionado: item.selecionado,
      estoqueDisponivel: item.produto.estoqueDisponivel,
    };

    const grupoExistente = grupos.get(nomeLoja);
    if (grupoExistente) {
      grupoExistente.itens.push(itemData);
    } else {
      grupos.set(nomeLoja, {
        id: nomeLoja,
        nomeLoja: `Produto de ${nomeLoja}`,
        verificado: true,
        itens: [itemData],
      });
    }
  });

  return Array.from(grupos.values());
}

/* ============================================================
   COMPONENT
============================================================ */

interface CarrinhoProps {
  navigate: (route: string) => void;
}

export default function Carrinho({ navigate }: CarrinhoProps) {
  const {
    itens,
    removerItem,
    atualizarQuantidade,
    atualizarDias,
    alternarSelecao,
    selecionarTodos,
    selecionarItens,
  } = useCarrinhoStore();

  const lojas = useMemo(() => agruparPorLoja(itens), [itens]);

  const [freteValor, setFreteValor] = useState<number | null>(null);
  const [cupomAplicado, setCupomAplicado] = useState<string | null>(null);
  const [cupomAviso, setCupomAviso] = useState<string | null>(null);
  const [percentualDesconto, setPercentualDesconto] = useState(0);

  const carrinhoVazio = itens.length === 0;
  const todosSelecionados = itens.length > 0 && itens.every((item) => item.selecionado);
  const nenhumSelecionado = itens.length === 0 || itens.every((item) => !item.selecionado);

  /*
   * O preço unitário é considerado o valor de uma unidade por dia.
   * Fórmula: preço unitário × quantidade × dias.
   * Apenas os itens selecionados (checkbox) entram no subtotal.
   */
  const subtotal = useMemo(
    () =>
      lojas.reduce(
        (totalDasLojas, loja) =>
          totalDasLojas +
          loja.itens.reduce(
            (totalDosItens, item) =>
              totalDosItens + (item.selecionado ? item.precoUnitario * item.quantidade * item.dias : 0),
            0,
          ),
        0,
      ),
    [lojas],
  );

  const desconto = useMemo(() => subtotal * percentualDesconto, [subtotal, percentualDesconto]);

  const freteComCupom = cupomAplicado === 'FRETEGRATIS' ? 0 : freteValor;

  const total = useMemo(
    () => subtotal - desconto + (freteComCupom ?? 0),
    [subtotal, desconto, freteComCupom],
  );

  function handleCalcularFrete(cep: string) {
    const cepNormalizado = cep.replace(/\D/g, '');
    if (cepNormalizado.length !== 8) return;

    // Frete temporário fixo. Depois este trecho deve chamar a API de frete.
    setFreteValor(10);
  }

  function handleAplicarCupom(codigo: string) {
    const codigoNormalizado = codigo.trim().toUpperCase();

    if (codigoNormalizado === 'LOCATEM10') {
      setCupomAplicado(codigoNormalizado);
      setCupomAviso(codigoNormalizado);
      setPercentualDesconto(0.1);
      return;
    }

    if (codigoNormalizado === 'FRETEGRATIS') {
      setCupomAplicado(codigoNormalizado);
      setCupomAviso(codigoNormalizado);
      setPercentualDesconto(0);
      return;
    }

    setCupomAplicado(null);
    setCupomAviso(null);
    setPercentualDesconto(0);
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <Header />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <CabecalhoPagina titulo="Carrinho" />

        {carrinhoVazio ? (
          <CarrinhoVazio onConferirProdutos={() => navigate('busca')} />
        ) : (
          <>
            <TouchableOpacity
              style={styles.selecionarTodosCard}
              onPress={() => selecionarTodos(!todosSelecionados)}
            >
              <View style={[styles.checkbox, todosSelecionados && styles.checkboxMarcado]}>
                {todosSelecionados && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
              </View>

              <Text style={styles.selecionarTodosTexto}>Selecionar todos</Text>
            </TouchableOpacity>

            <View style={styles.lojas}>
              {lojas.map((loja) => (
                <LojaGroup
                  key={loja.id}
                  loja={loja}
                  onQuantidadeChange={atualizarQuantidade}
                  onDiasChange={atualizarDias}
                  onRemoveItem={removerItem}
                  onSelecionarItem={alternarSelecao}
                  onSelecionarLoja={selecionarItens}
                />
              ))}
            </View>
          </>
        )}

        <ResumoPedido
          variant={carrinhoVazio ? 'vazio' : 'carrinho'}
          subtotal={subtotal}
          desconto={desconto}
          total={total}
          freteValor={freteComCupom}
          onCalcularFrete={handleCalcularFrete}
          onAplicarCupom={handleAplicarCupom}
          cupomAviso={cupomAviso}
          onOcultarCupomAviso={() => setCupomAviso(null)}
          ctaLabel="Continuar para Pagamento"
          onCtaClick={() => navigate('pagamentoPix')}
          ctaDisabled={carrinhoVazio || nenhumSelecionado}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
