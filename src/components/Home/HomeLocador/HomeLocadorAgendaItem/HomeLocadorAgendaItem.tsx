import { View, Text, Image } from 'react-native';
import { Clock, Truck, Undo2 } from 'lucide-react-native';

import colors from '../../../../theme/colors';
import { formatarDiaMes } from '../../../../utils/Formatacao/formatoDataBr';
import type { AgendaSemanaLocadorItem } from '../../../../pages/home/HomeLocador/HomeLocador.types';

import { styles } from './styles';

interface HomeLocadorAgendaItemProps {
  evento: AgendaSemanaLocadorItem;
  /** Último item da lista: some a borda inferior (substitui o `:last-child` do CSS da Web). */
  ultimo?: boolean;
}

/**
 * Textos e ícone de cada movimento logístico. Como a entrega é feita por uma
 * transportadora terceirizada, evitamos "Retirada"/"Devolução" (ambíguos quanto
 * a quem está com a ferramenta no momento) e deixamos o sentido do trajeto
 * explícito: LOCADOR -> transportadora -> LOCATÁRIO, e depois o caminho inverso.
 *
 * As cores vêm da paleta dos badges de status (sem token no colors.ts).
 */
const CONFIG_MOVIMENTO = {
  coletaParaEntrega: {
    label: 'Coleta para entrega',
    complemento: 'Transportadora indo buscar com você',
    icon: Truck,
    cor: '#137333',
    fundo: '#E6F4EA',
  },
  retornoAoLocador: {
    label: 'Retorno ao locador',
    complemento: 'Transportadora trazendo de volta',
    icon: Undo2,
    cor: '#BA1A1A',
    fundo: '#FFDAD6',
  },
} as const;

/** Linha compacta de um evento logístico na seção "Agenda da Semana" da Home do Locador. */
export default function HomeLocadorAgendaItem({
  evento,
  ultimo = false,
}: HomeLocadorAgendaItemProps) {
  const config = CONFIG_MOVIMENTO[evento.tipoMovimento];
  const Icone = config.icon;

  const [dia, mes] = formatarDiaMes(evento.data).split(' ');

  return (
    <View style={[styles.item, ultimo && styles.itemUltimo]}>
      {/* Layout "estreito" da Web: data, imagem, info e hora na primeira linha */}
      <View style={styles.linhaPrincipal}>
        <View style={styles.data}>
          <Text style={styles.dia}>{dia}</Text>
          <Text style={styles.mes}>{mes}</Text>
        </View>

        <Image source={evento.imagem} style={styles.imagem} resizeMode="contain" />

        <View style={styles.info}>
          <Text style={styles.ferramenta} numberOfLines={1}>
            {evento.ferramenta}
          </Text>

          {/* `locatario` é opcional no Mobile (ver LocacaoHistoricoData). */}
          {evento.locatario ? (
            <Text style={styles.locatario} numberOfLines={1}>
              {evento.locatario}
            </Text>
          ) : null}
        </View>

        <View style={styles.hora}>
          <Clock size={13} strokeWidth={2} color={colors.textMuted} />
          <Text style={styles.horaTexto}>{evento.hora}</Text>
        </View>
      </View>

      {/* Segunda linha: pílula do movimento, alinhada com a coluna de info */}
      <View style={[styles.movimento, { backgroundColor: config.fundo }]}>
        <Icone size={13} strokeWidth={2} color={config.cor} />

        <View>
          <Text style={[styles.movimentoTexto, { color: config.cor }]}>
            {config.label}
          </Text>
          <Text style={[styles.movimentoComplemento, { color: config.cor }]}>
            {config.complemento}
          </Text>
        </View>
      </View>
    </View>
  );
}
