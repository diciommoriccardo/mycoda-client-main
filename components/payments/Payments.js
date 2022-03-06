import React, { useEffect, useState, useContext, useRef } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import PaymentItem from './PaymentItem';
import { useNavigation } from '@react-navigation/native';
import { API } from '../../config/config';


export default function Payments({ route }) {
  const navigation = useNavigation();

  const { localUser } = route.params;
  const { accessToken, type: loginType } = localUser;

  const [payments, _setPayments] = useState([]);
  const paymentsRef = useRef(payments);
  const setPayments = payments => {
    paymentsRef.current = payments;
    _setPayments(payments);
  }

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => navigation.addListener('focus', fetchPayments), [navigation]);

  const fetchPayments = () => {
    setRefreshing(true);
    fetch(`${API.URL}/api/payments`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    })
    .then(response => response.json())
    .then(json => {
      console.log(json)
      if ('error' in json) throw new Error(json.error.message);
      setPayments(json);
      setRefreshing(false);
    })
    .catch(error => {
      setRefreshing(false);
      setPayments([]);
    })
  }

  const renderListEmpty = () => {
    return (
      <View style={styles.emptyChatView}>
        <View style={styles.emptyChatContainer}>
          <Text style={styles.emptyChatText}>{
              `Nessun pagamento rilevato` 
            }
          </Text>
        </View>
      </View>
    );
  }


  return (
    <FlatList
      data={payments}
      onRefresh={fetchPayments}
      refreshing={refreshing}
      keyExtractor={item => item.id}
      contentContainerStyle={{ flexGrow: 1 }}
      ListEmptyComponent={renderListEmpty}
      renderItem={({ item }) => (
        <PaymentItem
          // key={item.userId}
          // userId={item.userId}
          // name={item.displayName}
          desc={item.desc}
          somma={item.somma}
          imgUri="https://reactnative.dev/img/tiny_logo.png"
          time={item.time}/>
      )} />
  );
}

const styles = StyleSheet.create({
  emptyChatView: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyChatContainer: {
    top: '-10%',
    backgroundColor: '#45C476',
    width: '70%',
    padding: 16,
    borderRadius: 16,
  },
  emptyChatText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  }
});


