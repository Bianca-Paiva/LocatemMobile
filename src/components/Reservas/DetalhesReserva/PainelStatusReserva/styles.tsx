import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  // Container principal do painel
  painel: {
    width: '100%',

    flexDirection: 'row',

    alignItems: 'flex-start',

    padding: 16,

    borderRadius: 14,

    borderWidth: 1,

    marginBottom: 30,
    marginTop: 15, 
    
  },

  // Círculo que contém o símbolo do status
  simbolo: {
    width: 32,

    height: 32,

    borderRadius: 16,

    justifyContent: 'center',

    alignItems: 'center',

    marginRight: 14,
  },

  // Texto do símbolo
  simboloTexto: {
    fontSize: 16,

    fontWeight: '800',
  },

  // Área textual do painel
  textoConteudo: {
    flex: 1,
    
  },

  // Título principal
  titulo: {
    fontSize: 14,

    fontWeight: '700',

    marginBottom: 4,
  },

  // Texto auxiliar
  mensagem: {
    fontSize: 13,

    lineHeight: 20,
  },

  // Texto destacado (equivale ao <strong>)
  destaque: {
    fontWeight: '800',
  },

  // ==========================
  // STATUS: PENDENTE
  // ==========================

  pendente: {
    backgroundColor: '#FFF4DD',

    borderColor: '#FFE9A8',
    
  },

  pendenteSimbolo: {
    backgroundColor: '#FDE7A6',
  },

  pendenteTexto: {
    color: '#8A6100',
  },

  // ==========================
  // STATUS: AGUARDANDO PAGAMENTO
  // ==========================

  aguardandoPagamento: {
    backgroundColor: '#FFEBCF',

    borderColor: 'rgba(167,75,0,0.25)',
  },

  aguardandoPagamentoSimbolo: {
    backgroundColor: '#A74B00',
  },

  aguardandoPagamentoTexto: {
    color: '#A74B00',
  },

  // ==========================
  // STATUS: AZUIS
  // ==========================

  preparandoEntrega: {
    backgroundColor: '#EAF6FF',

    borderColor: 'rgba(0,93,117,0.25)',
  },

  emTransporte: {
    backgroundColor: '#EAF6FF',

    borderColor: 'rgba(0,93,117,0.25)',
  },

  emAndamento: {
    backgroundColor: '#EAF6FF',

    borderColor: 'rgba(0,93,117,0.25)',
  },

  aguardandoDevolucao: {
    backgroundColor: '#EAF6FF',

    borderColor: 'rgba(0,93,117,0.25)',
  },

  devolucaoEmTransporte: {
    backgroundColor: '#EAF6FF',

    borderColor: 'rgba(0,93,117,0.25)',
  },

  azulSimbolo: {
    backgroundColor: '#005D75',
  },

  azulTexto: {
    color: '#005D75',
  },

  // ==========================
  // STATUS: FINALIZADA
  // ==========================

  finalizada: {
    backgroundColor: '#E6F4EA',

    borderColor: 'rgba(19,115,51,0.25)',
  },

  finalizadaSimbolo: {
    backgroundColor: '#137333',
  },

  finalizadaTexto: {
    color: '#137333',
  },

  // ==========================
  // STATUS: RECUSADA
  // ==========================

  recusada: {
    backgroundColor: '#FDE3E3',

    borderColor: '#F7C1C1',
  },

  recusadaSimbolo: {
    backgroundColor: '#F2A3A3',
  },

  recusadaTitulo: {
    color: '#8A1414',
  },

  recusadaMensagem: {
    color: '#A13A3A',
  },

  // ==========================
  // STATUS: CANCELADA
  // ==========================

  cancelada: {
    backgroundColor: '#EEF1F5',

    borderColor: '#DFE4EA',
  },

  canceladaSimbolo: {
    backgroundColor: '#CBD3DC',
  },

  canceladaTexto: {
    color: '#4B5563',
  },
});