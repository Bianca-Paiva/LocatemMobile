import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';

import { styles } from './styles';
import TempoDropdown from '../TempoDropown';
import SeletorQuantidade from '../SeletorQuantidade';

// Converte o valor do dropdown de tempo em número de diárias.
// Ex.: "3 dias" → 3 | "1 dia" → 1 | "Selecione" → null.
function extrairDiarias(tempo: string): number | null {
  const match = tempo.match(/\d+/);
  return match ? Number(match[0]) : null;
}

interface ProdutoInfoProps {
  title: string;
  price: string | number;
  rating: number;
  reviewCount: number;
  imageVerificado?: ImageSourcePropType;
  imageNota: ImageSourcePropType;
  marca: string;
  estoqueDisponivel: number;
  opcoesTensao?: string[];
  onAlugar?: () => void;
  onReservar?: () => void;
  onAddCarrinho?: () => void;
  onTempoDropdownOpen?: (isOpen: boolean) => void;

  // Envia as seleções atuais para a tela pai.
  onSelecaoChange?: (selecao: {
    quantidade: number;
    diarias: number | null;
    tensao: string | null;
  }) => void;
}

export function ProdutoInfo({
  title,
  price,
  rating,
  reviewCount,
  imageNota,
  marca,
  estoqueDisponivel,
  opcoesTensao = [],
  onAlugar,
  onAddCarrinho,
  onTempoDropdownOpen,
  onSelecaoChange,
}: ProdutoInfoProps) {
  // Define a primeira tensão automaticamente quando existir apenas uma opção.
  const [tensaoSelecionada, setTensaoSelecionada] = useState<string | null>(
    opcoesTensao[0] ?? null
  );

  // Controla o período selecionado no dropdown.
  const [tempo, setTempo] = useState('Selecione');

  // Controla a quantidade de produtos selecionada.
  const [quantidade, setQuantidade] = useState(1);

  // Diminui a quantidade sem permitir valores menores que 1.
  const decrement = () => setQuantidade(prev => Math.max(1, prev - 1));

  // Aumenta a quantidade sem ultrapassar o estoque disponível.
  const increment = () =>
    setQuantidade(prev => Math.min(estoqueDisponivel, prev + 1));

  // Envia as seleções atuais para a tela do produto sempre que alguma delas mudar.
  useEffect(() => {
    onSelecaoChange?.({
      quantidade,
      diarias: extrairDiarias(tempo),
      tensao: tensaoSelecionada,
    });

    // Evita que o ESLint exija onSelecaoChange como dependência.
    // A função deve ser chamada apenas quando as seleções forem alteradas.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantidade, tempo, tensaoSelecionada]);

  // Formata valores numéricos para o padrão de preço brasileiro.
  // Ex.: 15.00 → "15,00".
  const precoFormatado =
    typeof price === 'number' ? price.toFixed(2).replace('.', ',') : price;

  return (
    <View style={styles.produtoInfoWrapper}>
      {/* Nome do produto. */}
      <Text style={styles.titulo}>{title}</Text>

      {/* Avaliação, quantidade de avaliações e marca. */}
      <View style={styles.ratingRow}>
        <Image source={imageNota} style={styles.starIcon} />

        <Text style={styles.ratingValor}>
          {Number(rating || 0).toFixed(1)}
        </Text>

        <Text style={styles.ratingCount}>
          ({reviewCount} avaliações)
        </Text>

        <Text style={styles.brandTag}>{marca}</Text>
      </View>

      {/* Exibe o preço diário do produto. */}
      <View style={styles.precoBox}>
        <Text style={styles.precoPrefix}>R$</Text>
        <Text style={styles.precoValor}>{precoFormatado}</Text>
        <Text style={styles.precoDia}>/dia</Text>
      </View>

      {/* Exibe as opções de tensão disponíveis para o produto. */}
      {opcoesTensao && opcoesTensao.length > 0 && (
        <View style={styles.opcaoGrupo}>
          <Text style={styles.opcaoLabel}>Tensão</Text>

          <View style={styles.botoesOpcao}>
            {opcoesTensao.map(t => (
              <TouchableOpacity
                key={t}
                style={[
                  styles.btnOpcao,
                  tensaoSelecionada === t && styles.btnOpcaoAtivo,
                ]}
                onPress={() => setTensaoSelecionada(t)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.btnOpcaoText,
                    tensaoSelecionada === t && styles.btnOpcaoTextAtivo,
                  ]}
                >
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Controles de período e quantidade da locação. */}
      <View style={styles.seletoresRow}>
        <View style={[styles.opcaoGrupo, styles.seletorFlex]}>
          <Text style={styles.opcaoLabel}>Tempo</Text>

          <TempoDropdown
            value={tempo}
            onChange={setTempo}
            onOpenChange={onTempoDropdownOpen}
          />
        </View>

        <View style={[styles.opcaoGrupo, styles.seletorFlex]}>
          <SeletorQuantidade
            quantidade={quantidade}
            estoqueDisponivel={estoqueDisponivel}
            onDecrementar={decrement}
            onIncrementar={increment}
          />
        </View>
      </View>

      {/* Ações disponíveis para o produto. */}
      <View style={styles.ctasContainer}>
        {/* Inicia diretamente o fluxo de locação. */}
        <TouchableOpacity
          style={styles.btnLocar}
          onPress={onAlugar}
          activeOpacity={0.8}
        >
          <Text style={styles.btnLocarText}>Locar</Text>
        </TouchableOpacity>

        <View style={styles.linhaSecundaria}>
          {/* Adiciona o produto ao carrinho. */}
          <TouchableOpacity
            style={styles.btnCarrinho}
            onPress={onAddCarrinho}
            activeOpacity={0.8}
          >
            <Text style={styles.btnCarrinhoText}>
              Adicionar ao carrinho
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}