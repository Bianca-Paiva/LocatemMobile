import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';

import { styles } from './styles';
import TempoDropdown from '../TempoDropown'; // Corrigi o typo do import (Dropown -> Dropdown)
import SeletorQuantidade from '../SeletorQuantidade';

interface ProdutoInfoProps {
  title: string;
  price: string | number; 
  rating: number;
  reviewCount: number;
  imageVerificado?: ImageSourcePropType; 
  imageNota: ImageSourcePropType; 
  brand: string;
  estoqueDisponivel: number;
  opcoesTensao?: string[]; 
  onAlugar?: () => void;
  onReservar?: () => void;
  onAddCarrinho?: () => void;
  onTempoDropdownOpen?: (isOpen: boolean) => void;
}

export function ProdutoInfo({
  title,
  price,
  rating,
  reviewCount,
  imageNota,
  brand,
  estoqueDisponivel,
  opcoesTensao = [], 
  onAlugar,
  onAddCarrinho,
  onTempoDropdownOpen
}: ProdutoInfoProps) {
  const [tensaoSelecionada, setTensaoSelecionada] = useState<string | null>(null);
  const [tempo, setTempo] = useState('Selecione');
  const [quantidade, setQuantidade] = useState(1);

  const decrement = () => setQuantidade(prev => Math.max(1, prev - 1));
  const increment = () => setQuantidade(prev => Math.min(estoqueDisponivel, prev + 1));

  // 🚀 LÓGICA DE UI: Formata o preço automaticamente (15.00 vira "15,00")
  const precoFormatado = typeof price === 'number' ? price.toFixed(2).replace('.', ',') : price;

  return (
    <View style={styles.produtoInfoWrapper}>
      <Text style={styles.titulo}>{title}</Text>

      <View style={styles.ratingRow}>
        <Image source={imageNota} style={styles.starIcon} />
        <Text style={styles.ratingValor}>{Number(rating || 0).toFixed(1)}</Text>
        <Text style={styles.ratingCount}>({reviewCount} avaliações)</Text>
        <Text style={styles.brandTag}>{brand}</Text>
      </View>

      <View style={styles.precoBox}>
        <Text style={styles.precoPrefix}>R$</Text>
        <Text style={styles.precoValor}>{precoFormatado}</Text>
        <Text style={styles.precoDia}>/dia</Text>
      </View>

      {/*  Seção Tensão */}
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

      {/* Seletores*/}
      <View style={styles.seletoresRow}>
        <View style={[styles.opcaoGrupo, styles.seletorFlex]}>
          <Text style={styles.opcaoLabel}>
            Tempo
          </Text>
          <TempoDropdown value={tempo} onChange={setTempo}
          onOpenChange={onTempoDropdownOpen} />
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

      {/* Botoes */}
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