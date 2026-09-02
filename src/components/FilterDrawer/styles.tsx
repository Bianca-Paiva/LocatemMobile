import { StyleSheet } from "react-native";
import colors from "../../theme/colors";

export default StyleSheet.create({

  // botão "Filtros"
  filterButton: {
    width: 110,
    height: 35,
    backgroundColor: "#FFC107",
    borderRadius: 25,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    gap: 6,
  },

  filterText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },

  // fundo escuro
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  drawerContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "88%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
  },

  handle: {
    width: 50,
    height: 5,
    backgroundColor: "#ddd",
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 10,
  },

  // título "Filtros"
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    alignSelf: "center",
  },

  // texto das seções (Categoria, Marca, etc)
  section: {
    fontSize: 16,
    fontWeight: "800",
    marginTop: 15,
    marginBottom: 10,
    color: "#333",
  },

  // botão de "voltar" quando uma categoria com subcategorias está expandida
  categoriaVoltarBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 10,
  },

  categoriaVoltarTexto: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textDark,
  },

  // container das tags
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  // tag padrão
  tag: {
    borderWidth: 1.5,
    borderColor: "#DDD",
    borderRadius: 20,

    paddingHorizontal: 14,
    paddingVertical: 8,

    marginBottom: 8,
  },

  tagText: {
    fontSize: 15,
    color: "#333",
  },

  // tag selecionada
  selectedTag: {
    backgroundColor: "#FFC107",
    borderColor: "#FFC107",
  },

  selectedTagText: {
    fontWeight: "600",
    color: "#222",
  },

  // input de marca
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,

    paddingHorizontal: 10,
    height: 42,

    marginBottom: 10,
  },

  // botão aplicar filtro
  applyButton: {
    marginTop: 30,
    backgroundColor: "#FFC107",
    borderRadius: 25,

    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },

  applyText: {
    fontWeight: "700",
    color: "#222",
  },

  // botão limpar filtros
  clearButton: {
    marginTop: 12,
    marginBottom: 20,
    borderWidth: 1,
    backgroundColor: "#F5E3B3",
    borderColor: "transparent",

    borderRadius: 25,
    height: 45,

    justifyContent: "center",
    alignItems: "center",
  },

  clearText: {
    color: "#6E5000",
    fontWeight: "700",
  },

  emptyText: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 10,
  },
});
