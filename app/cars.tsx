// src/screens/Cars.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Cars = () => {
    const [cars, setCars] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchCars = async () => {
            const token = await AsyncStorage.getItem('token');
            try {
                const response = await axios.get('http://ftcar.ru/SPA/api.php', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCars(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCars();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Мои Автомобили</Text>
            <FlatList
                data={cars}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.carItem}>
                        <Text>{item.brand} {item.model} ({item.year})</Text>
                        <Button
                            title="Подробнее"
                            //onPress={() => navigation.navigate('CarDetails', { carId: item.id })}
                        />
                    </View>
                )}
            />
            <Button
                title="Добавить автомобиль"
                //onPress={() => navigation.navigate('AddCar')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    carItem: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
});

export default Cars;