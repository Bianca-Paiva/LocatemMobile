import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  // Card principal da reserva
  card: {
    width: '100%',

    backgroundColor: '#FFFFFF',

    borderWidth: 1,

    borderColor: '#EEEEEE',

    borderRadius: 16,

    padding: 18,
  },

  // Cabeçalho com imagem + informações
  cabecalhoProduto: {
    flexDirection: 'row',

    alignItems: 'flex-start',

    marginBottom: 18,
  },

  // Container da imagem
  miniatura: {
    width: 96,

    height: 96,

    borderRadius: 12,

    overflow: 'hidden',

    backgroundColor: '#FFFFFF',

    justifyContent: 'center',

    alignItems: 'center',

    marginRight: 14,
  },

  // Imagem do produto
  imagem: {
    width: '100%',

    height: '100%',
  },

  // Área das informações do produto
  infoProduto: {
    flex: 1,
  },

  // Nome do produto
  titulo: {
    fontSize: 16,

    fontWeight: '800',

    color: '#141D23',

    lineHeight: 22,

    marginBottom: 4,
  },

  // Categoria
  categoria: {
    fontSize: 13,

    color: '#5D5E61',

    marginBottom: 6,
  },

  // Linha simples com ícone + texto
  linha: {
    flexDirection: 'row',

    alignItems: 'center',

    marginTop: 4,
  },

  // Texto do locador
  locador: {
    marginLeft: 6,

    fontSize: 13,

    color: '#4E4634',
  },

  // Linha avaliação + localização
  linhaAvaliacao: {
    flexDirection: 'row',

    flexWrap: 'wrap',

    alignItems: 'center',

    marginTop: 8,
  },

  // Estrela da avaliação
  star: {
    width: 14,

    height: 14,
  },

  // Nota do locador
  avaliacao: {
    marginLeft: 4,

    color: '#141D23',

    fontSize: 13,

    fontWeight: '600',
  },

  // Total de avaliações
  numeroAvaliacoes: {
    marginLeft: 2,

    color: '#4E4634',

    fontSize: 13,
  },

  maps:{
    flexDirection: 'row',
  },
  // Separador •
  separador: {
    marginHorizontal: 8,

    color: '#807662',
  },

  // Cidade/estado
  localizacao: {
    marginLeft: 4,

    color: '#4E4634',

    fontSize: 13,

    fontWeight: '500',
  },

  // Bloco de período
  periodoBloco: {
    borderTopWidth: 1,

    borderColor: '#F0F0F0',

    paddingTop: 16,

    marginBottom: 18,
  },

  // Título do período
  periodoRotulo: {
    fontSize: 13,

    fontWeight: '700',

    color: '#141D23',

    marginBottom: 10,
  },

  // Caixa que exibe o período
  periodoCaixa: {
    flexDirection: 'row',

    alignItems: 'center',

    paddingHorizontal: 16,

    paddingVertical: 14,

    borderRadius: 10,

    borderWidth: 1.5,

    borderColor: '#E5E7EB',

    backgroundColor: '#F9F9F9',
  },

  // Texto do período
  periodoTexto: {
    marginLeft: 12,

    flex: 1,
  },

  // Palavra "até"
  ate: {
    fontSize: 12,

    marginVertical: 2,

    color: '#141D23',
  },

  // Destaque de datas
  negrito: {
    fontWeight: '600',
  },

  // Rodapé do card
  rodape: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'flex-end',

    borderTopWidth: 1,

    borderColor: '#F0F0F0',

    paddingTop: 16,
  },

  // Área alinhada à direita
  rodapeDireita: {
    alignItems: 'flex-end',
  },

  // Label do rodapé
  rodapeRotulo: {
    fontSize: 13,

    fontWeight: '700',

    color: '#141D23',

    marginBottom: 4,
  },

  // Valor simples
  rodapeValor: {
    fontSize: 13,

    color: '#4E4634',

    fontWeight: '500',
  },

  // Valor destacado
  valorDestaque: {
    fontSize: 17,

    fontWeight: '800',

    color: '#141D23',
  },
});