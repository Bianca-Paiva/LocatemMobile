import { StyleSheet } from "react-native";
import colors from "../../theme/colors";

export default StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 16,
    marginBottom: 24,
    paddingHorizontal: 12,
  },

  pageInfo: {
    fontSize: 13,
    color: colors.textMuted,
    marginHorizontal: 8,
  },

  navBtn: {
    paddingHorizontal: 12,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },

  navBtnDisabled: {
    opacity: 0.4,
  },

  navBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textDark,
  },

  pageBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },

  pageBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  pageBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textDark,
  },

  pageBtnTextActive: {
    color: "#222",
  },
});
