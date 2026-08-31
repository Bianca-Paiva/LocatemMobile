import React from 'react';

import {
  View,
  Text,
  Pressable,
} from 'react-native';

import {
  AlertTriangle,
  BadgePercent,
  BellRing,
  CheckCircle2,
  Clock,
  FileText,
  Info,
  MessageSquare,
  RefreshCw,
  Truck,
  XCircle,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';

import { STATUS_CONFIG } from '../../MinhasReservas/EtiquetaStatus/statusConfig';
import type { NotificationData } from '../../../pages/Notificacoes/Notificacoes.types';
import { styles, ICON_BG_BY_TYPE } from './styles';

interface NotificationCardProps {
  notification: NotificationData;
  onRenovar?: (id: string) => void;
  onVerDetalhes?: (id: string) => void;
}

// Mapeia o "type" (estilo visual) ao ícone correspondente. Usado como fallback quando a
// notificação não possui `statusReserva` (ex: promoção, mensagem, pagamento recusado).
// Todos os ícones desta tela usam a biblioteca lucide-react-native, incluindo os mesmos
// ícones usados em EtiquetaStatus (STATUS_CONFIG) para as notificações de reservas.
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

export default function NotificationCard({
  notification,
  onRenovar,
  onVerDetalhes,
}: NotificationCardProps) {
  const { id, type, title, description, timestamp, extraInfo, showRenovar, statusReserva } =
    notification;

  // Quando a notificação está atrelada a uma reserva, usa o mesmo ícone/cor de
  // `STATUS_CONFIG` (o mesmo exibido em 'Minhas Reservas'); caso contrário, cai no
  // ícone genérico baseado em `type`.
  const configStatus = statusReserva ? STATUS_CONFIG[statusReserva] : null;
  const Icon = configStatus ? configStatus.icon : ICON_BY_TYPE[type];
  const iconBg = configStatus ? configStatus.fundo : ICON_BG_BY_TYPE[type].fundo;
  const iconColor = configStatus ? configStatus.cor : ICON_BG_BY_TYPE[type].cor;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.iconWrapper, { backgroundColor: iconBg }]}>
          <Icon size={18} strokeWidth={2.25} color={iconColor} />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>

          {/* Linha extra usada apenas pelo card de entrega */}
          {extraInfo ? (
            <View style={styles.extraInfo}>
              <View style={styles.dot} />
              <Text style={styles.extraInfoText}>{extraInfo}</Text>
            </View>
          ) : null}
        </View>
      </View>

      <View style={styles.footer}>
        {/* timestamp vazio (ex: notificação de entrega) não renderiza o relógio */}
        {timestamp ? (
          <View style={styles.timestamp}>
            <Clock size={14} color="#9A9A9A" />
            <Text style={styles.timestampText}>{timestamp}</Text>
          </View>
        ) : (
          <View />
        )}

        <View style={styles.actions}>
          {showRenovar ? (
            <Pressable style={styles.renovarButton} onPress={() => onRenovar?.(id)}>
              <RefreshCw size={14} color="#1A1A1A" />
              <Text style={styles.renovarButtonText}>Renovar</Text>
            </Pressable>
          ) : null}

          <Pressable style={styles.detailsButton} onPress={() => onVerDetalhes?.(id)}>
            <FileText size={14} color="#333333" />
            <Text style={styles.detailsButtonText}>Ver detalhes</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
