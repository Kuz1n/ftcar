import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AddCarModal from '../../components/AddCarModal';

const MyCarsScreen = () => {
  const [cars, setCars] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // Загрузка автомобилей (в реальном приложении - с API)
  useEffect(() => {
    // Заглушка - в реальном приложении загружаем с сервера
    const initialCars = [
      { id: '1', brand: 'Toyota', model: 'Camry', year: '2020', plate: 'А123БВ777' },
      { id: '2', brand: 'BMW', model: 'X5', year: '2019', plate: 'У456КХ777' },
    ];
    setCars(initialCars);
  }, []);

  const addCar = (newCar) => {
    setCars([...cars, { ...newCar, id: Math.random().toString() }]);
    setModalVisible(false);
  };

  const deleteCar = (id) => {
    Alert.alert(
      'Удаление автомобиля',
      'Вы уверены, что хотите удалить этот автомобиль?',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Удалить', onPress: () => setCars(cars.filter(car => car.id !== id)) },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.carCard}>
      <View style={styles.carInfo}>
        <Text style={styles.carTitle}>{item.brand} {item.model}</Text>
        <Text style={styles.carDetail}>Год: {item.year}</Text>
        <Text style={styles.carDetail}>Номер: {item.plate}</Text>
      </View>
      <TouchableOpacity onPress={() => deleteCar(item.id)}>
        <Ionicons name="trash-outline" size={24} color="#ff3b30" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cars}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>У вас пока нет добавленных автомобилей</Text>
        }
      />

      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>

      <AddCarModal 
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={addCar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  carCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  carTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  carDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007bff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default MyCarsScreen;