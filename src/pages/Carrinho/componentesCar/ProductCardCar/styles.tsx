import { StyleSheet } from "react-native";
 
export default StyleSheet.create({
 
  container: {
 
    flexDirection: "row",
 
    alignItems: "flex-start",
 
    backgroundColor: "#FFF",
 
    borderRadius: 14,
 
    padding: 12,
 
    elevation: 2,
 
    margin:10,
  },
 
  image: {
 
    width: 80,
 
    height: 80,
 
    borderRadius: 10,
 
    marginHorizontal: 10,
 
  },
 
  content: {
 
    flex: 1,
 
  },
 
  header: {
 
    flexDirection: "row",
 
    justifyContent: "space-between",
 
    alignItems: "center",
 
  },
 
  title: {
 
    fontSize: 20,
 
    fontWeight: "700",
 
    flex: 1,
 
    marginRight: 10,
 
  },
 
  subtitle: {
 
    color: "#777",
 
    marginTop: 4,
 
    fontSize: 14,
 
  },
 
  priceRow: {
 
    flexDirection: "row",
 
    justifyContent: "space-between",
 
    marginTop: 4,
 
    alignItems: "center",
 
  },
 
  price: {
 
    fontSize: 13,
 
    color: "#666",
 
  },
 
  total: {
 
    fontSize: 15,
 
    fontWeight: "700",
 
  },
 
  selectorRow: {
 
    flexDirection: "row",
 
    justifyContent: "space-between",
 
    marginTop: 12,
 
  },
 
  info: {
 
    color: "#999",
 
    fontSize: 10,
 
    marginBottom: 4,
 
  },
 
});