import { View, Image, TextInput, StyleSheet, KeyboardTypeOptions, } from "react-native";

interface InputProps {
  image:any; 
  placeholder: string;
  keyboardType: KeyboardTypeOptions;
  value: string;
  style: any;
  onChangeText: (text: string) => void;
}

export default function SearchInput({ image, placeholder, keyboardType, value, onChangeText, style}: InputProps) {
  return (
    <View style={[styles.searchContainer, style]}>
      <Image
        source={image}
        style={styles.icon}
      />  
      <TextInput
      
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({

  input: {
    flex: 1,
    paddingLeft: 10,
  
    color: "#1a1c1e",
    backgroundColor: "transparent",

    borderColor: "#d0d5dd",

    borderRadius:50,
    paddingVertical: 0,
    paddingHorizontal: 10,
    fontSize: 16,

    textAlignVertical: "center",

  },
  searchContainer:{

    flexDirection:"row",
    alignItems:"center",

    height:42,
    backgroundColor:"#f9fafb",

    borderWidth:1,
    borderColor:"#d0d5dd",
    borderRadius:50,

    paddingHorizontal:15,

    flex:1

  },
  icon:{
     width:20,
    height:20,
    resizeMode:"contain",
  }
});
