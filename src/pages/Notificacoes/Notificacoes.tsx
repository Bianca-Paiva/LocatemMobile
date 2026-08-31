import React, { useState } from 'react';

import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BellOff, Trash2 } from 'lucide-react-native';

import Header from '../../components/Header';
import CabecalhoPagina from '../../components/CabecalhoPagina/CabecalhoPagina';
import NotificationCard from '../../components/Notificacoes/NotificationCard/NotificationCard';
import FilterDropdown from '../../components/Notificacoes/FilterDropdownNotificacao/FilterDropdown';
import Pagination from '../../components/Notificacoes/Pagination/Pagination';
import NotificationDetailsModal from '../../components/Notificacoes/NotificationModal/NotificationDetailsModal';

import { useNotifications } from '../../hooks/useNotifications';
import { useReservaStore } from '../../hooks/Reservas/useReservaStore';

import type { NotificationData } from './Notificacoes.types';
import { styles } from './styles';

interface NotificacoesProps {
  navigate: (route: string) => void;
}

export default function Notificacoes({ navigate }: NotificacoesProps) {
  const {
    notifications,
    pageItems,
    filter,
    setFilter,
    currentPage,
    totalPages,
    goToPage,
    goToPrevPage,
    goToNextPage,
    clearAll,
    renovar,
  } = useNotifications();

  // Fonte das reservas reais (mesma usada em 'Minhas Reservas' e 'Detalhes da Reserva')
  const { reservas, setReservaSelecionada } = useReservaStore();

  // Notificação atualmente aberta no modal; null = modal fechado
  const [selectedNotification, setSelectedNotification] = useState<NotificationData | null>(null);

  const handleVerDetalhes = (id: string) => {
    const notification = pageItems.find((item) => item.id === id) ?? null;
    setSelectedNotification(notification);
  };

  const handleCloseModal = () => setSelectedNotification(null);

  // Seleciona a reserva vinculada (mesmo padrão usado em MinhasReservas ao abrir uma
  // reserva) e leva o usuário para a tela de Detalhes da Reserva. Usado pelos botões
  // "Ver reserva", "Efetuar pagamento", "Tentar pagamento novamente" e "Ver detalhes".
  const handleVerReserva = (reservaId: string) => {
    const reserva = reservas.find((item) => item.id === reservaId);
    if (!reserva) return;

    setReservaSelecionada(reserva);
    navigate('detalhesReserva');
  };

  // Seleciona a reserva finalizada e leva o usuário direto para o fluxo de avaliação.
  const handleAvaliar = (reservaId: string) => {
    const reserva = reservas.find((item) => item.id === reservaId);
    if (!reserva) return;

    setReservaSelecionada(reserva);
    navigate('avaliacao');
  };

  // Notificações de promoção levam o usuário para a busca de ferramentas.
  const handleVerOfertas = () => {
    navigate('busca');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Header />

        <View style={styles.containerCont}>
          <CabecalhoPagina
            titulo="Notificações"
            acao={
              <View style={styles.controls}>
                <FilterDropdown value={filter} onChange={setFilter} />

                <Pressable
                  style={[styles.clearButton, notifications.length === 0 && styles.clearButtonDisabled]}
                  onPress={clearAll}
                  disabled={notifications.length === 0}
                >
                  <Trash2 size={16} color="#6B7280" />
                  <Text style={styles.clearButtonText}>Limpar tudo</Text>
                </Pressable>
              </View>
            }
          />

          {notifications.length === 0 ? (
            <View style={styles.emptyState}>
              <BellOff size={40} color="#D0D0D0" />
              <Text style={styles.emptyTitle}>Nenhuma notificação por aqui</Text>
              <Text style={styles.emptyDescription}>
                Assim que houver novidades sobre suas reservas e entregas, elas aparecem nesta tela.
              </Text>
            </View>
          ) : (
            <>
              <View style={styles.list}>
                {pageItems.map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    onRenovar={renovar}
                    onVerDetalhes={handleVerDetalhes}
                  />
                ))}
              </View>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
                onPrev={goToPrevPage}
                onNext={goToNextPage}
              />
            </>
          )}
        </View>
      </ScrollView>

      <NotificationDetailsModal
        notification={selectedNotification}
        onClose={handleCloseModal}
        onRenovar={renovar}
        onVerReserva={handleVerReserva}
        onAvaliar={handleAvaliar}
        onVerOfertas={handleVerOfertas}
      />
    </SafeAreaView>
  );
}
