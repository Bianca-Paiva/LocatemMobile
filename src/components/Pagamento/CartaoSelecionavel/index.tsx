import { useState } from 'react';

import { View, Text, TouchableOpacity, Image } from 'react-native';

import type { Cartao } from '../../../types/cartao.types';
import colors from '../../../theme/colors';
import styles from './styles';

import type { ImageSourcePropType } from 'react-native';

const visaBandeira = require('../../../../assets/images/Cartoesbandeiras/visa.png');
const mastercardBandeira = require('../../../../assets/images/Cartoesbandeiras/master.png');
const eloBandeira = require('../../../../assets/images/Cartoesbandeiras/elo.png');
const amexBandeira = require('../../../../assets/images/Cartoesbandeiras/amex.png');
const dinersBandeira = require('../../../../assets/images/Cartoesbandeiras/diners.png');
const discoverBandeira = require('../../../../assets/images/Cartoesbandeiras/discover.png');

const imagensBandeira: Record<string, ImageSourcePropType> = {
  visa: visaBandeira,
  mastercard: mastercardBandeira,
  master: mastercardBandeira,
  elo: eloBandeira,
  amex: amexBandeira,
  'american express': amexBandeira,
  diners: dinersBandeira,
  'diners club': dinersBandeira,
  discover: discoverBandeira,
};

function imagemDaBandeira(bandeira: string) {
  const nome = bandeira.trim().toLowerCase();

  return Object.entries(imagensBandeira).find(([nomeBandeira]) =>
    nome.includes(nomeBandeira),
  )?.[1];
}

function siglaBandeira(bandeira: string) {
  const nome = bandeira.trim().toLowerCase();

  if (nome.includes('mastercard') || nome.includes('master')) return 'MC';
  if (nome.includes('american express') || nome.includes('amex')) return 'AMEX';
  if (nome.includes('diners')) return 'DINERS';
  if (nome.includes('discover')) return 'DISCOVER';
  if (nome.includes('visa')) return 'VISA';
  if (nome.includes('elo')) return 'ELO';

  return 'CARTÃO';
}

interface CartaoSelecionavelProps {
  cartao: Cartao;
  selecionado: boolean;
  onSelecionar: (id: number) => void;
}

export function CartaoSelecionavel({ cartao, selecionado, onSelecionar }: CartaoSelecionavelProps) {
  const [bandeiraComErro, setBandeiraComErro] = useState<string | null>(null);
  const bandeiraImagem = imagemDaBandeira(cartao.bandeira);
  const deveMostrarImagem = bandeiraImagem && bandeiraComErro !== cartao.bandeira;

  return (
    <TouchableOpacity
      style={[styles.cartao, selecionado && styles.cartaoAtivo]}
      onPress={() => onSelecionar(cartao.id)}
      accessibilityRole="radio"
      accessibilityState={{ checked: selecionado }}
    >
      <View style={styles.cartaoIcone}>
        {deveMostrarImagem ? (
          <Image
            source={bandeiraImagem}
            style={styles.bandeiraImagem}
            resizeMode="contain"
            accessibilityLabel={`Bandeira ${cartao.bandeira}`}
            onError={() => setBandeiraComErro(cartao.bandeira)}
          />
        ) : (
          <Text style={styles.cartaoIconeTexto}>{siglaBandeira(cartao.bandeira)}</Text>
        )}
      </View>

      <View style={styles.cartaoInfo}>
        <Text style={styles.cartaoTitulo}>
          {cartao.bandeira} - Final {cartao.final}
        </Text>
        <Text style={styles.cartaoTitular}>{cartao.titular}</Text>
      </View>

      <View style={[styles.radioExterno, selecionado && styles.radioExternoAtivo]}>
        {selecionado && <View style={styles.radioInterno} />}
      </View>
    </TouchableOpacity>
  );
}
