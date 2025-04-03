import { Text, View, StyleSheet } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';
import Login from './login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyCarsScreen from './MyCarsScreen';

const PlaceholderImage = require('@/assets/images/background-image.jpg');

export default function Index() {
  const [user, setUser] = useState();
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

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
    //setIsLoading(true);
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
      } else {
        setToken('');
        await AsyncStorage.removeItem('token');
        setMessage('Сессия истекла. Войдите снова.');
      }
    } catch (error) {
      console.error('Ошибка проверки токена:', error);
      setMessage('Ошибка соединения с сервером');
    } finally {
      //setIsLoading(false);
    }
  }, []);


  return (
    <View style={styles.container}>
      {message ? <Text>{message}</Text> : null}
      {user ? (
        
        <View>
          {/* <Text>Авторизован 1</Text> */}
          <MyCarsScreen></MyCarsScreen>
        </View>
        
      ):(
        // <Text>Не авторизован 2</Text>
        <Login></Login>
      ) }
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
