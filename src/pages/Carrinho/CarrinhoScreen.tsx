import {useState} from "react";


import {
     StyleSheet, 
     Text, 
     View, 
     FlatList 
} from "react-native";

// Components ↓
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import BarNav from "../../components/BarNav";
import { Product } from "../../Types/Product";
import ProductCardCar from "./componentesCar/ProductCardCar/ProductCardCar";

// Mocks dados
import { cartMock } from "./Data/MockCar";



export const CarrinhoScreen = () => {

const [products, setProducts] = useState(cartMock);

    return (
        <View style={styles.container}>
             <Header />
               
               <FlatList
                    data={products}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
             <ProductCardCar
                    image={item.image}
                    title={item.title}
                    dailyPrice={item.dailyPrice}
                    rentalDays={item.rentalDays}
                    quantity={item.quantity}
                    availableQuantity={item.availableQuantity}
                    selected={item.selected}

                    onSelect={() => {}}
                    onDelete={() => {}}
                    onIncreaseDays={() => {}}
                    onDecreaseDays={() => {}}
                    onIncreaseQuantity={() => {}}
                    onDecreaseQuantity={() => {}}
                />
                    )}
                />                
               
            <BarNav />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})