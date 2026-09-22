import React from 'react';

import {
  View,
  Text,
} from 'react-native';

import type {
  StatusLocacao,
} from '../../../../pages/Locacoes/MinhasLocacoes/MinhasLocacoes.types';

import { formatarIntervaloHorario } from '../../../../utils/Formatacao/horario';

import { styles } from './styles';

interface PainelStatusLocacaoProps {
  status: StatusLocacao;

  // Exibido apenas quando a locacao foi recusada
  motivoRecusa?: string;

  // Exibido apenas quando a locacao foi cancelada
  motivoCancelamento?: string;

  // Horário de entrega escolhido pelo usuário
  horaInicio?: string;

  // Horário de devolução escolhido pelo usuário
  horaFim?: string;
}

interface ConteudoStatus {
  titulo: string;
  mensagem: (
    horaInicio?: string,
    horaFim?: string
  ) => string;
  simbolo: string;
}

// Configuração das mensagens por status
const CONTEUDO_POR_STATUS: Record<
  StatusLocacao,
  ConteudoStatus
> = {
  pendente: {
    titulo:
      'Sua solicitação está aguardando aprovação.',
    mensagem: () =>
      'O locador tem até 24h para analisar e responder.',
    simbolo: '!',
  },

  aguardandoPagamento: {
    titulo:
      'Sua locacao foi aprovada!',
    mensagem: () =>
      'O locador confirmou sua solicitação. Efetue o pagamento em até 24h para continuar.',
    simbolo: '✓',
  },

  preparandoEntrega: {
    titulo:
      'Pagamento confirmado!',
    mensagem: () =>
      'O locador está preparando a ferramenta para envio.',
    simbolo: 'i',
  },

  emTransporte: {
    titulo:
      'Sua ferramenta está a caminho.',
    mensagem: (horaInicio) =>
      horaInicio
        ? `Ela chegará entre ${formatarIntervaloHorario(
            horaInicio
          )}.`
        : 'Ela chegará em breve no endereço informado.',
    simbolo: 'i',
  },

  emAndamento: {
    titulo:
      'Locação em andamento.',
    mensagem: () =>
      'Você recebeu a ferramenta. Aproveite o período contratado.',
    simbolo: '✓',
  },

  aguardandoDevolucao: {
    titulo:
      'Está na hora de devolver.',
    mensagem: (
      _horaInicio,
      horaFim
    ) =>
      horaFim
        ? `A ferramenta deve estar disponível para coleta entre ${formatarIntervaloHorario(
            horaFim
          )}.`
        : 'O período de locação está acabando e a ferramenta deve retornar para o locador.',
    simbolo: '!',
  },

  devolucaoEmTransporte: {
    titulo:
      'Devolução em andamento.',
    mensagem: () =>
      'A ferramenta foi coletada e está voltando para o locador.',
    simbolo: 'i',
  },

  finalizada: {
    titulo:
      'Locacao finalizada!',
    mensagem: () =>
      'A locação foi concluída com sucesso.',
    simbolo: '✓',
  },

  recusada: {
    titulo:
      'Motivo da recusa',
    mensagem: () =>
      'O locador não informou um motivo para a recusa.',
    simbolo: '!',
  },

  cancelada: {
    titulo:
      'Esta locacao foi cancelada.',
    mensagem: () =>
      'Se precisar, você pode solicitar uma nova locacao para outras datas ou procurar equipamentos similares.',
    simbolo: 'i',
  },
};

export default function PainelStatusLocacao({
  status,
  motivoRecusa,
  motivoCancelamento,
  horaInicio,
  horaFim,
}: PainelStatusLocacaoProps) {

  // Obtém a configuração visual baseada no status
  const conteudo =
    CONTEUDO_POR_STATUS[status];

  // Mensagem padrão
  let mensagem =
    conteudo.mensagem(
      horaInicio,
      horaFim
    );

  // Substitui pela mensagem personalizada quando existir
  if (
    status === 'recusada' &&
    motivoRecusa
  ) {
    mensagem = motivoRecusa;
  }

  if (
    status === 'cancelada' &&
    motivoCancelamento
  ) {
    mensagem = motivoCancelamento;
  }

  return (
    <View
      style={[
        styles.painel,
        styles[status],
      ]}
    >
      {/* Símbolo visual do status */}
      <View style={styles.simbolo}>
        <Text
          style={styles.simboloTexto}
        >
          {conteudo.simbolo}
        </Text>
      </View>

      {/* Conteúdo textual */}
      <View
        style={styles.textoConteudo}
      >
        <Text style={styles.titulo}>
          {conteudo.titulo}
        </Text>

        <Text
          style={styles.mensagem}
        >
          {mensagem}
        </Text>
      </View>
    </View>
  );
}
