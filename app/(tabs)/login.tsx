import axios from 'axios';
import { useNavigation } from 'expo-router';
import { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Alert, Button } from 'react-native';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    const response = await fetch('http://ftcar.ru/api/api.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'register',
        username,
        password,
      }),
    });
    const data = await response.json();
    setMessage(data.message || data.error);
  };

  const handleLogin = async () => {
    const response = await fetch('http://ftcar.ru/api/api.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'login',
        username,
        password,
      }),
    });
    const data = await response.json();
    setMessage(data.message || data.error);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Логин</Text>
      <TextInput
          style={styles.input}
          onChangeText={setUsername}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Text style={styles.text}>Пароль</Text>
      <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button title="Войти" onPress={handleLogin} />
        <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
  input: {
    height: 40,
    width: 150,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
