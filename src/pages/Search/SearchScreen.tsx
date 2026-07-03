import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

// importacao dos elementos de navegação
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/AppRoutes';

// Components ↓
import BarNav from "../../components/BarNav";
import SecondaryHeader from "../../components/SecondaryHeader";
import SortFilter from "../../components/SortFilter";
import FilterDrawer from "../../components/FilterDrawer";
import { Filters } from "../../components/FilterDrawer/types";

export const SearchScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [sort, setSort] = useState("Mais relevantes");
    const [filters, setFilters] = useState<Filters>({
        category: [],
        brands: [],
        prices: [],
        payment: [],
        disponibility: [],
        reviews: [],
    });

    
    return(
        <View style={styles.container}>
            <ScrollView>

                <SecondaryHeader/>
                <View style={styles.barraFiltros}>
                    <SortFilter
                    value={sort}
                    onSelect={(value) => {
                        setSort(value);
                        console.log(value);
                    }}
                />


                    <FilterDrawer
                    onApply={(f) => {
                        setFilters(f);
                        console.log(f);
                    }}
                    />
                </View>
                
                                
            </ScrollView>
   
            <BarNav/>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#ffff",
    },

    barraFiltros:{
        marginLeft: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginRight: 20,
    },
   
});