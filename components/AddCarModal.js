import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const AddCarModal = ({ visible, onClose, onAdd }) => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [plate, setPlate] = useState('');

  const handleAdd = () => {
    if (!brand || !model || !year || !plate) {
      alert('Заполните все поля');
      return;
    }
    onAdd({ brand, model, year, plate });
    setBrand('');
    setModel('');
    setYear('');
    setPlate('');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Добавить автомобиль</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Марка (например, Toyota)"
            value={brand}
            onChangeText={setBrand}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Модель (например, Camry)"
            value={model}
            onChangeText={setModel}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Год выпуска"
            value={year}
            onChangeText={setYear}
            keyboardType="numeric"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Госномер (например, А123БВ777)"
            value={plate}
            onChangeText={setPlate}
          />
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>Отмена</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
              <Text style={styles.buttonText}>Добавить</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    color: 'grey',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  }
});

export default AddCarModal;