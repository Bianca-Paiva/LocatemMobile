import React from 'react';

import {
  View,
  Text,
  Image,
  Pressable,
} from 'react-native';

import {
  Calendar,
  ChevronDown,
  ChevronRight,
  FileText,
  Package,
  User,
} from 'lucide-react-native';

import type {
  LocacaoHistoricoData,
  StatusHistorico,
} from '../../../../../pages/Locacoes/HistoricoLocacoes/HistoricoLocacoes.types';

import EtiquetaStatus from '../../../../Locacoes/MinhasLocacoes/EtiquetaStatus/EtiquetaStatus';
import { STATUS_CONFIG } from '../../../../Locacoes/MinhasLocacoes/EtiquetaStatus/statusConfig';

import { styles } from '../../../../../pages/Locacoes/HistoricoLocacoes/styles';

interface LocacaoHistoricoCardProps {
  locacao: LocacaoHistoricoData;
  expandido: boolean;
  onToggle: (id: string) => void;
  /** Abre a tela de detalhes da locação. Opcional enquanto a tela do locador não existe. */
  onVerDetalhes?: (id: string) => void;
}

// Mensagem breve exibida em "Motivo do status" quando a locação não trouxe um
// motivo de cancelamento próprio
const MOTIVO_PADRAO: Record<StatusHistorico, string> = {
  finalizada: 'Locação concluída com sucesso.',
  recusada: 'Você recusou esta solicitação de locação.',
  cancelada: 'Esta locação foi cancelada.',
};

// Motivo exibido: prioriza o motivo de cancelamento específico da locação, depois
// a mensagem de status já registrada nela e, por fim, um texto padrão breve para o status.
function obterMotivoStatus(locacao: LocacaoHistoricoData): string {
  if (locacao.status === 'cancelada' && locacao.motivoCancelamento) {
    return locacao.motivoCancelamento;
  }

  return (
    locacao.mensagemStatus ||
    MOTIVO_PADRAO[locacao.status as StatusHistorico] ||
    ''
  );
}

export default function LocacaoHistoricoCard({
  locacao,
  expandido,
  onToggle,
  onVerDetalhes,
}: LocacaoHistoricoCardProps) {
  const {
    id,
    produto,
    imagem,
    periodo,
    locatario,
    status,
    valor,
    quantidade,
  } = locacao;

  const config = STATUS_CONFIG[status];
  const IconeMotivo = config.icon;

  // Recusada e cancelada não geram cobrança: exibimos "—" em vez de "R$ 0,00"
  // para não sugerir que houve algum valor efetivamente cobrado.
  const exibeValor = status === 'finalizada';

  return (
    <View
      style={[
        styles.card,
        expandido && styles.cardExpandido,
      ]}
    >
      <Pressable
        onPress={() => onToggle(id)}
        accessibilityRole="button"
        accessibilityState={{ expanded: expandido }}
        style={styles.cabecalho}
      >
        <View style={styles.linhaTopo}>
          <View style={styles.miniatura}>
            <Image
              source={imagem}
              style={styles.miniaturaImagem}
              resizeMode="contain"
            />
          </View>

          <View style={styles.topoTextos}>
            <Text
              style={styles.nomeFerramenta}
              numberOfLines={2}
            >
              {produto}
            </Text>

            {locatario ? (
              <View style={styles.locatarioInfo}>
                <User
                  size={14}
                  color="#6B7280"
                  strokeWidth={2}
                />

                <Text
                  style={styles.locatarioNome}
                  numberOfLines={1}
                >
                  {locatario}
                </Text>
              </View>
            ) : null}
          </View>

          <ChevronDown
            size={18}
            color="#6B7280"
            strokeWidth={2}
            style={{
              transform: [
                {
                  rotate: expandido ? '180deg' : '0deg',
                },
              ],
            }}
          />
        </View>

        <View style={styles.linhaStatus}>
          <EtiquetaStatus status={status} />

          <Text
            style={[
              styles.valor,
              exibeValor
                ? styles.valorPositivo
                : styles.valorNeutro,
            ]}
          >
            {exibeValor ? `+ ${valor}` : '—'}
          </Text>
        </View>
      </Pressable>

      {expandido && (
        <View style={styles.detalhes}>
          <View style={styles.grade}>
            <View style={styles.itemDetalhe}>
              <Calendar
                size={18}
                color="#6B7280"
                strokeWidth={2}
              />

              <View style={styles.textoDetalhe}>
                <Text style={styles.rotulo}>
                  PERÍODO
                </Text>

                <Text style={styles.valorDetalhe}>
                  {periodo}
                </Text>
              </View>
            </View>

            <View style={styles.itemDetalhe}>
              <Package
                size={18}
                color="#6B7280"
                strokeWidth={2}
              />

              <View style={styles.textoDetalhe}>
                <Text style={styles.rotulo}>
                  QUANTIDADE
                </Text>

                <Text style={styles.valorDetalhe}>
                  {quantidade}{' '}
                  {quantidade === 1
                    ? 'unidade'
                    : 'unidades'}
                </Text>
              </View>
            </View>

            <View style={styles.itemDetalhe}>
              {/* Círculo do ícone de "Motivo do status": reaproveita as mesmas
                  cores do STATUS_CONFIG já usadas pela EtiquetaStatus. */}
              <View
                style={[
                  styles.circuloMotivo,
                  {
                    backgroundColor: config.fundo,
                    borderColor: config.borda,
                  },
                ]}
              >
                <IconeMotivo
                  size={14}
                  color={config.cor}
                  strokeWidth={2}
                />
              </View>

              <View style={styles.textoDetalhe}>
                <Text style={styles.rotulo}>
                  MOTIVO DO STATUS
                </Text>

                <Text style={styles.valorDetalhe}>
                  {obterMotivoStatus(locacao)}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.rodapeDetalhes}>
            <View style={styles.linkVerDetalhes}>
              <FileText
                size={18}
                color="#6B7280"
                strokeWidth={2}
              />

              <View style={styles.textoDetalhe}>
                <Text style={styles.linkTitulo}>
                  Ver detalhes da locação
                </Text>

                <Text style={styles.linkDescricao}>
                  Confira todas as informações, mensagens e
                  comprovantes.
                </Text>
              </View>
            </View>

            <Pressable
              onPress={() => onVerDetalhes?.(id)}
              accessibilityRole="button"
              style={({ pressed }) => [
                styles.botaoVerDetalhes,
                pressed && styles.botaoVerDetalhesPressionado,
              ]}
            >
              <Text style={styles.botaoVerDetalhesTexto}>
                Ver detalhes
              </Text>

              <ChevronRight
                size={16}
                color="#0A0A0A"
                strokeWidth={2.5}
              />
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}
