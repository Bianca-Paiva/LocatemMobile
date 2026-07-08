import { StyleSheet } from "react-native";
 
export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
 
    borderWidth: 1,
    borderColor: "#CFCFCF",
    borderRadius: 8,
 
    overflow: "hidden",
 
    height: 32,
  },
 
  button: {
    width: 28,
    justifyContent: "center",
    alignItems: "center",
  },
 
  symbol: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
 
  disabledText: {
    color: "#C0C0C0",
  },
 
  value: {
    paddingHorizontal: 10,
    fontSize: 12,
    color: "#333",
  },
});