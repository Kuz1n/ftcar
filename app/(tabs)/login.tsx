import axios from 'axios';
import { useRouter } from 'expo-router';
import { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, TextInput, Alert, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();



  // Загрузка токена при монтировании
  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token') || '';
        if (storedToken) {
          setToken(storedToken);
          await verifyToken(storedToken);
        }
      } catch (error) {
        console.error('Ошибка при загрузке токена:', error);
      }
    };
    
    loadToken();
  }, []);

  // Проверка токена (используем useCallback для стабильной ссылки)
  const verifyToken = useCallback(async (tokenToVerify: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://ftcar.ru/api/api.php', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${tokenToVerify}`,
          'Content-Type': 'application/json',
        }
        
      });

      //console.log(tokenToVerify);
      
      const data = await response.json();
      
      if (data.valid) {
        setUser(data.user);
        setMessage(`Вы вошли как ${data.user.username}`);
        router.navigate('./MyCarsScreen')
      } else {
        setToken('');
        await AsyncStorage.removeItem('token');
        setMessage('Сессия истекла. Войдите снова.');
      }
    } catch (error) {
      console.error('Ошибка проверки токена:', error);
      setMessage('Ошибка соединения с сервером');
    } finally {
      setIsLoading(false);
    }
  }, []);

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
    setIsLoading(true);
    try {
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
      
      if (data.token) {
        setToken(data.token);
        await AsyncStorage.setItem('token', data.token);
        //console.log(data.token);
        await verifyToken(data.token);
      } else {
        setMessage(data.error || 'Ошибка входа');
      }
    } catch (error) {
      setMessage('Ошибка соединения');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setToken('');
    AsyncStorage.removeItem('token');
    setUser(null);
    setMessage('Вы вышли из системы');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Авторизация</Text>
      
      {isLoading && <Text>Загрузка...</Text>}
      {message ? <Text style={styles.message}>{message}</Text> : null}

      {user ? (
        <View style={styles.section}>
          <Text>Добро пожаловать, {user.username}!</Text>
          <Button title="Выйти" onPress={handleLogout} />
        </View>
      ) : (
        <View style={styles.section}>
          <TextInput
            style={styles.input}
            placeholder="Логин"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Пароль"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <View style={styles.buttonContainer}>
            <Button title="Войти" onPress={handleLogin} />
            <View style={styles.buttonSpacer} />
            <Button title="Регистрация" onPress={handleRegister} />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    gap: 15,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  buttonContainer: {
    marginTop: 10,
  },
  buttonSpacer: {
    height: 10,
  },
  message: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
});
