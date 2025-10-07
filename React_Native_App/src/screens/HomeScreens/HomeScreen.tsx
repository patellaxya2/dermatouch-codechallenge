import React, { useState, useMemo, useEffect } from 'react';
import { View, TextInput, FlatList, StyleSheet } from 'react-native';
import { HomeStackParamList, IProduct } from '../../types';
import EmptyList from '../../components/EmptyList';
import ProductCard from '../../components/ProductCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import useMyCartContext from '../../hooks/useMyCartContext';
import { apiCall } from '../../api/setup';
import Loader from '../../components/Loader';


type HomeScreenProps = NativeStackScreenProps<HomeStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {

    const { addToCart, isInCart, removeFromCart } = useMyCartContext();
    const [loader, setLoader] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [productList, setProductList] = useState<IProduct[]>([]);

    const filtered = useMemo(
        () =>
            productList.filter(
                p =>

                    p.title.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
            ),
        [search, productList]
    );

    const handleAdd = (item: IProduct) =>
        // setCart(prev => [...prev, item]{}
        addToCart(item)


    useEffect(() => {
        fetchProducts()

    }, [])

    const fetchProducts = async () => {
        try {
            const data: IProduct[] = await apiCall("GET", "/products", "", {}, "")
            setProductList(data);
            setLoader(false)
        } catch (error) {

            setLoader(false)

        }
    }



    return (
        <View style={styles.container}>
            <View>
                <TextInput
                    placeholder="Search by products,category..."
                    value={search}
                    onChangeText={setSearch}
                    style={styles.search}
                />

            </View>
            <Loader visible={loader} />
            <FlatList
                data={filtered}
                keyExtractor={item => item.id}
                ListEmptyComponent={<EmptyList message="No products found" />}
                renderItem={({ item }) => <ProductCard
                    inCart={isInCart(item.id)}
                    product={item} onAddToCart={handleAdd}
                    onRemove={() => removeFromCart(item.id)}
                />}
            />
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 15, backgroundColor: '#fff' },
    search: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 10,
        borderRadius: 8,
    },
});
