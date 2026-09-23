import React from 'react';

import {
  View,
  Text,
  Pressable,
  Modal,
  ScrollView,
} from 'react-native';

import {
  AlertTriangle,
  BadgePercent,
  BellRing,
  CheckCircle2,
  CreditCard,
  Eye,
  Info,
  MessageSquare,
  RefreshCw,
  Star,
  Tag,
  Truck,
  X,
  XCircle,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';

import { STATUS_CONFIG } from '../../../Locacoes/MinhasLocacoes/EtiquetaStatus/statusConfig';
import type {
  NotificationCategory,
  NotificationData,
} from '../../../../pages/Conta/Notificacoes/Notificacoes.types';
import { styles, ICON_BG_BY_TYPE } from './styles';

interface NotificationDetailsModalProps {
  notification: NotificationData | null; // null = modal fechado
  onClose: () => void;
  onRenovar?: (id: string) => void;
  /** Leva o usuário até 'Detalhes da Locacao' com a locacao já selecionada
   * (usado para "Ver locacao", "Efetuar pagamento", "Tentar pagamento novamente" etc). */
  onVerLocacao?: (locacaoId: string) => void;
  /** Leva o usuário até o fluxo de avaliação da locacao finalizada. */
  onAvaliar?: (locacaoId: string) => void;
  /** Leva o usuário até a busca de ferramentas (notificações de promoção). */
  onVerOfertas?: () => void;
}

// Ícone/cor genéricos por `type`, usados apenas quando a notificação não está atrelada
// a uma locacao (ex: promoção, nova mensagem, pagamento recusado). Notificações de
// locacoes usam o mesmo ícone/cor de STATUS_CONFIG (EtiquetaStatus).
const ICON_BY_TYPE: Record<NotificationData['type'], LucideIcon> = {
  success: CheckCircle2,
  warning: AlertTriangle,
  delivery: Truck,
  error: XCircle,
  info: Info,
  promotion: BadgePercent,
  message: MessageSquare,
  reminder: BellRing,
};

interface DetailRow {
  label: string;
  value: string;
}

// Monta as linhas exibidas no modal de acordo com a categoria da notificação
function getDetailRows(notification: NotificationData): DetailRow[] {
  const { categoria, details } = notification;

  switch (categoria) {
    case 'locacao-confirmada':
      return [
        { label: 'Equipamento', value: details.equipamento ?? '-' },
        { label: 'Status', value: details.status ?? '-' },
        { label: 'Confirmado em', value: details.dataConfirmacao ?? '-' },
        { label: 'Período da locacao', value: details.periodoLocacao ?? '-' },
        { label: 'Valor', value: details.valor ?? '-' },
        { label: 'Forma de pagamento', value: details.formaPagamento ?? '-' },
      ];

    case 'devolucao-pendente':
      return [
        { label: 'Equipamento', value: details.equipamento ?? '-' },
        { label: 'Status', value: details.status ?? '-' },
        { label: 'Data limite', value: details.dataLimite ?? '-' },
      ];

    case 'entrega-andamento':
      return [
        { label: 'Equipamento', value: details.equipamento ?? '-' },
        { label: 'Status da entrega', value: details.statusEntrega ?? '-' },
        { label: 'Previsão de chegada', value: details.previsaoChegada ?? '-' },
      ];

    case 'ferramenta-devolvida':
      return [
        { label: 'Equipamento', value: details.equipamento ?? '-' },
        { label: 'Status', value: details.status ?? '-' },
        { label: 'Devolvido em', value: details.dataDevolucao ?? '-' },
      ];

    case 'pagamento-pendente':
      return [
        { label: 'Equipamento', value: details.equipamento ?? '-' },
        { label: 'Status do pagamento', value: details.statusPagamento ?? '-' },
        { label: 'Valor', value: details.valor ?? '-' },
      ];

    case 'locacao-cancelada':
      return [
        { label: 'Equipamento', value: details.equipamento ?? '-' },
        { label: 'Motivo', value: details.motivoCancelamento ?? '-' },
        { label: 'Cancelado em', value: details.dataCancelamento ?? '-' },
        { label: 'Valor reembolsado', value: details.valorReembolso ?? '-' },
      ];

    case 'devolucao-atrasada':
      return [
        { label: 'Equipamento', value: details.equipamento ?? '-' },
        { label: 'Data limite', value: details.dataLimite ?? '-' },
        { label: 'Dias em atraso', value: details.diasAtraso ?? '-' },
        { label: 'Multa', value: details.multa ?? '-' },
      ];

    case 'entrega-concluida':
      return [
        { label: 'Equipamento', value: details.equipamento ?? '-' },
        { label: 'Entregue em', value: details.dataEntrega ?? '-' },
        { label: 'Recebido por', value: details.recebidoPor ?? '-' },
      ];

    case 'pagamento-confirmado':
      return [
        { label: 'Valor', value: details.valor ?? '-' },
        { label: 'Forma de pagamento', value: details.formaPagamento ?? '-' },
        { label: 'Confirmado em', value: details.dataConfirmacao ?? '-' },
      ];

    case 'pagamento-recusado':
      return [
        { label: 'Valor', value: details.valor ?? '-' },
        { label: 'Forma de pagamento', value: details.formaPagamento ?? '-' },
        { label: 'Motivo da recusa', value: details.motivoRecusa ?? '-' },
      ];

    case 'promocao-disponivel':
      return [
        { label: 'Categoria', value: details.categoriaEquipamento ?? '-' },
        { label: 'Cupom', value: details.cupom ?? '-' },
        { label: 'Desconto', value: details.desconto ?? '-' },
        { label: 'Válido até', value: details.validade ?? '-' },
      ];

    case 'avaliacao-pendente':
      return [
        { label: 'Equipamento', value: details.equipamento ?? '-' },
        { label: 'Devolvido em', value: details.dataDevolucao ?? '-' },
        { label: 'Nota sugerida', value: details.notaSugerida ?? '-' },
      ];

    case 'nova-mensagem':
      return [
        { label: 'De', value: details.remetente ?? '-' },
        { label: 'Assunto', value: details.assunto ?? '-' },
        { label: 'Mensagem', value: details.mensagem ?? '-' },
      ];

    default:
      return [];
  }
}

type AlvoAcao = 'locacao' | 'avaliacao' | 'ofertas';

interface AcaoConfig {
  label: string;
  Icon: LucideIcon;
  alvo: AlvoAcao;
}

// Define o botão de ação principal do modal de acordo com a categoria da notificação,
// levando o usuário para o próximo passo natural daquele fluxo (pagamento, avaliação,
// detalhes da locacao, etc).
function getAcaoConfig(categoria: NotificationCategory): AcaoConfig | null {
  switch (categoria) {
    case 'locacao-confirmada':
    case 'entrega-andamento':
    case 'entrega-concluida':
    case 'devolucao-pendente':
    case 'devolucao-atrasada':
    case 'ferramenta-devolvida':
    case 'pagamento-confirmado':
      return { label: 'Ver locacao', Icon: Eye, alvo: 'locacao' };

    case 'locacao-cancelada':
      return { label: 'Ver detalhes', Icon: Eye, alvo: 'locacao' };

    case 'pagamento-pendente':
      return { label: 'Efetuar pagamento', Icon: CreditCard, alvo: 'locacao' };

    case 'pagamento-recusado':
      return { label: 'Tentar pagamento novamente', Icon: CreditCard, alvo: 'locacao' };

    case 'avaliacao-pendente':
      return { label: 'Avaliar locacao', Icon: Star, alvo: 'avaliacao' };

    case 'promocao-disponivel':
      return { label: 'Ver ofertas', Icon: Tag, alvo: 'ofertas' };

    case 'nova-mensagem':
    default:
      return null;
  }
}

export default function NotificationDetailsModal({
  notification,
  onClose,
  onRenovar,
  onVerLocacao,
  onAvaliar,
  onVerOfertas,
}: NotificationDetailsModalProps) {
  if (!notification) return null; // nada selecionado, modal não renderiza

  const { id, type, categoria, title, description, showRenovar, statusLocacao, locacaoId } =
    notification;

  // Quando a notificação está atrelada a uma locacao, usa o mesmo ícone/cor de
  // STATUS_CONFIG (o mesmo exibido em 'Minhas Locacoes'); caso contrário, cai no
  // ícone genérico baseado em `type`.
  const configStatus = statusLocacao ? STATUS_CONFIG[statusLocacao] : null;
  const Icon = configStatus ? configStatus.icon : ICON_BY_TYPE[type];
  const iconBg = configStatus ? configStatus.fundo : ICON_BG_BY_TYPE[type].fundo;
  const iconColor = configStatus ? configStatus.cor : ICON_BG_BY_TYPE[type].cor;

  const rows = getDetailRows(notification);

  // Botão "Renovar" continua exclusivo das categorias de devolução
  const showRenovarButton =
    (categoria === 'devolucao-pendente' || categoria === 'devolucao-atrasada') && showRenovar;

  // Botão de ação contextual (avaliação, pagamento, ver locacao, ofertas...) de acordo
  // com a categoria da notificação. Só é exibido quando há para onde navegar.
  const acaoConfig = getAcaoConfig(categoria);
  const showAcaoButton = !!acaoConfig && (acaoConfig.alvo === 'ofertas' || !!locacaoId);

  const handleRenovar = () => {
    onRenovar?.(id);
    onClose();
  };

  const handleAcao = () => {
    if (!acaoConfig) return;

    if (acaoConfig.alvo === 'locacao' && locacaoId) {
      onVerLocacao?.(locacaoId);
    } else if (acaoConfig.alvo === 'avaliacao' && locacaoId) {
      onAvaliar?.(locacaoId);
    } else if (acaoConfig.alvo === 'ofertas') {
      onVerOfertas?.();
    }

    onClose();
  };

  return (
    <Modal visible transparent animationType="fade" onRequestClose={onClose} statusBarTranslucent>
      {/* Toque no overlay fecha o modal */}
      <Pressable style={styles.overlay} onPress={onClose}>
        {/* Pressable interno sem onPress: só evita que o toque "vaze" e feche o modal */}
        <Pressable style={styles.modal} onPress={(event) => event.stopPropagation()}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <View style={[styles.iconWrapper, { backgroundColor: iconBg }]}>
                <Icon size={20} strokeWidth={2.25} color={iconColor} />
              </View>

              <View style={styles.headerText}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
              </View>

              <Pressable style={styles.closeButton} onPress={onClose} accessibilityLabel="Fechar">
                <X size={18} color="#9A9A9A" />
              </Pressable>
            </View>

            <View style={styles.details}>
              {rows.map((row) => (
                <View style={styles.row} key={row.label}>
                  <Text style={styles.label}>{row.label}</Text>
                  <Text style={styles.value}>{row.value}</Text>
                </View>
              ))}
            </View>

            {showRenovarButton || showAcaoButton ? (
              <View style={styles.footer}>
                {showRenovarButton ? (
                  <Pressable style={styles.actionButton} onPress={handleRenovar}>
                    <RefreshCw size={14} color="#1A1A1A" />
                    <Text style={styles.actionButtonText}>Renovar locacao</Text>
                  </Pressable>
                ) : null}

                {showAcaoButton && acaoConfig ? (
                  <Pressable style={styles.actionButton} onPress={handleAcao}>
                    <acaoConfig.Icon size={14} color="#1A1A1A" />
                    <Text style={styles.actionButtonText}>{acaoConfig.label}</Text>
                  </Pressable>
                ) : null}
              </View>
            ) : null}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
