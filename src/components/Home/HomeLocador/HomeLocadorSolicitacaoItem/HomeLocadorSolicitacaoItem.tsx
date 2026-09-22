import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Calendar, ChevronRight } from 'lucide-react-native';

import colors from '../../../../theme/colors';
import EtiquetaStatus from '../../../Reservas/MinhasReservas/EtiquetaStatus/EtiquetaStatus';
import type { SolicitacaoRecenteLocador } from '../../../../pages/home/HomeLocador/HomeLocador.types';

import { styles } from './styles';

interface HomeLocadorSolicitacaoItemProps {
  solicitacao: SolicitacaoRecenteLocador;
  onVerDetalhes: () => void;
  /** Último item da lista: some a borda inferior (substitui o `:last-child` do CSS da Web). */
  ultimo?: boolean;
}

/** Linha de uma solicitação recente na seção "Solicitações Recentes" da Home do Locador. */
export default function HomeLocadorSolicitacaoItem({
  solicitacao,
  onVerDetalhes,
  ultimo = false,
}: HomeLocadorSolicitacaoItemProps) {
  return (
    <View style={[styles.item, ultimo && styles.itemUltimo]}>
      {/* Linha 1: foto e informações */}
      <View style={styles.linhaPrincipal}>
        <Image source={solicitacao.imagem} style={styles.imagem} />

        <View style={styles.info}>
          <Text style={styles.produto} numberOfLines={1}>
            {solicitacao.produto}
          </Text>

          {/* `locatario` é opcional no Mobile (ver LocacaoHistoricoData). */}
          {solicitacao.locatario ? (
            <Text style={styles.locatario} numberOfLines={1}>
              Solicitado por {solicitacao.locatario}
            </Text>
          ) : null}
        </View>
      </View>

      {/* Linha 2: badge de status e botão (quebra de linha em telas estreitas) */}
      <View style={styles.linhaAcoes}>
        <EtiquetaStatus status={solicitacao.status} />

        <TouchableOpacity
          style={styles.botaoVerDetalhes}
          onPress={onVerDetalhes}
          activeOpacity={0.7}
        >
          <Text style={styles.botaoVerDetalhesTexto}>Ver detalhes</Text>
          <ChevronRight size={16} strokeWidth={2} color={colors.textDark} />
        </TouchableOpacity>
      </View>

      {/* Linha 3: período */}
      <View style={styles.linhaPeriodo}>
        <Calendar size={14} strokeWidth={2} color={colors.textMuted} />
        <Text style={styles.periodo}>{solicitacao.periodo}</Text>
      </View>
    </View>
  );
}
