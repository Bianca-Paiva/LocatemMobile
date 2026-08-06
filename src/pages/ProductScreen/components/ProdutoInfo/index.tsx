import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';

// Importação do StyleSheet isolado
import { styles } from './styles';

//importacao dos componentes filhos
import TempoDropdown from '../TempoDropown';
import SeletorQuantidade from '../SeletorQuantidade';

interface ProdutoInfoProps {
  title: string;
  price: string; // Se preferir passar direto formatado, senão seria number
  rating: number;
  reviewCount: number;
  imageVerificado?: string;
  imageNota: ImageSourcePropType; // Ajustado para aceitar require() nativamente!
  brand: string;
  estoqueDisponivel: number;
  onAlugar?: () => void;
  onReservar?: () => void;
  onAddCarrinho?: () => void;
}

const TENSAO_OPTIONS = ['127V', '220V', 'Bivolt'];

export function ProdutoInfo({
  title,
  price,
  rating,
  reviewCount,
  imageNota,
  brand,
  estoqueDisponivel,
  onAlugar,
  // onReservar, // Comentado conforme original
  onAddCarrinho,
}: ProdutoInfoProps) {
  const [tensaoSelecionada, setTensaoSelecionada] = useState<string | null>(null);
  const [tempo, setTempo] = useState('Selecione');
  const [quantidade, setQuantidade] = useState(1);

  // Regras de negócio mantidas 100% intactas
  const decrement = () => setQuantidade(prev => Math.max(1, prev - 1));
  const increment = () => setQuantidade(prev => Math.min(estoqueDisponivel, prev + 1));

  return (
    <View style={styles.produtoInfoWrapper}>
      <Text style={styles.titulo}>{title}</Text>

      <View style={styles.ratingRow}>
        <Image source={imageNota} style={styles.starIcon} />
        <Text style={styles.ratingValor}>{rating.toFixed(1)}</Text>
        <Text style={styles.ratingCount}>({reviewCount} avaliações)</Text>
        <Text style={styles.brandTag}>{brand}</Text>
      </View>

      <View style={styles.precoBox}>
        <Text style={styles.precoPrefix}>R$</Text>
        <Text style={styles.precoValor}>{price}</Text>
        <Text style={styles.precoDia}>/dia</Text>
      </View>

      {/* Seção Tensão */}
      <View style={styles.opcaoGrupo}>
        <Text style={styles.opcaoLabel}>Tensão</Text>
        <View style={styles.botoesOpcao}>
          {TENSAO_OPTIONS.map(t => (
            <TouchableOpacity
              key={t}
              style={[
                styles.btnOpcao,
                tensaoSelecionada === t && styles.btnOpcaoAtivo,
              ]}
              onPress={() => setTensaoSelecionada(t)}
              activeOpacity={0.7} // Feedback visual nativo ao tocar
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

      {/* Container 50/50 - Flexbox Nativo */}
      <View style={styles.seletoresRow}>
        {/* Tempo */}
        <View style={[styles.opcaoGrupo, styles.seletorFlex]}>
          <Text style={styles.opcaoLabel}>Tempo</Text>
          <TempoDropdown value={tempo} onChange={setTempo} />
        </View>

        {/* Quantidade */}
        <View style={[styles.opcaoGrupo, styles.seletorFlex]}>
          <SeletorQuantidade
            quantidade={quantidade}
            estoqueDisponivel={estoqueDisponivel}
            onDecrementar={decrement}
            onIncrementar={increment}
          />
        </View>
      </View>

      {/* CTAs (Call to Actions) */}
      <View style={styles.ctasContainer}>
        <TouchableOpacity style={styles.btnLocar} onPress={onAlugar} activeOpacity={0.8}>
          <Text style={styles.btnLocarText}>Locar</Text>
        </TouchableOpacity>
        
        <View style={styles.linhaSecundaria}>
          <TouchableOpacity style={styles.btnCarrinho} onPress={onAddCarrinho} activeOpacity={0.8}>
            <Text style={styles.btnCarrinhoText}>Adicionar ao carrinho</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}