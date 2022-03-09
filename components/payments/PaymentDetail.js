import * as React from 'react';
import { Text, View, StyleSheet,Image } from 'react-native';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';


export default function PaymentDetail({ route }){
    return (
        <View style={styles.container}>
      <View>
        <Text style={styles.orderTitle}>Ordine N.</Text>
        <View><Text style={styles.prodottoLoremIpsum}>Prodotto: </Text>
        <Text style={styles.descrizione}>Tachipirina </Text></View>
        <View>
        <Text style={styles.farmaciaLoremIpsum}>Acquistato da: </Text>
        <Text style={styles.descrizione}>Farmacia Pomarico </Text>
        </View>
        <View>
        <Text style={styles.prodottoLoremIpsum2}>
          Data Acquisto: LoremIpsum
        </Text>
        <Text style={styles.descrizione}>24/02/2022 - 17:33 </Text></View>
      </View>
      <View style={styles.totaleRow}>
        <Text style={styles.totale}>Totale:</Text>
        <Text style={styles.totale2}>€120,00</Text>
      </View>
      <Text style={styles.paragraph}> Scansiona il codice QR per ritirare il prodotto</Text>
      <Card>
      <View style={styles.QR}>
        <Image style={styles.imageqr} source={require('../../assets/icon.png')} />
      </View>
      </Card>
    </View>
      );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Constants.statusBarHeight-30,
      padding: 8
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
      },
    imageqr: {
        height: 128,
        width: 128,
      },
    orderTitle: {
      color: "#45C476",
      fontSize: 45,
      fontWeight: "bold",
      textAlign: "left",
      
    },
    descrizione: {
        
        color: "#121212",
        fontSize: 21,
        
      
      },
    prodottoLoremIpsum: {
        fontWeight: "bold",
        color: "#121212",
        fontSize: 21,
        marginTop:24
      
      },
      farmaciaLoremIpsum: {
        fontWeight: "bold",
        color: "#121212",
        fontSize: 21,
        marginTop:12
      },
      prodottoLoremIpsum2: {
        fontWeight: "bold",
        color: "#121212",
        fontSize: 21,
        marginTop:12
      },
      orderTitleRow: {
        height: 182,
        flexDirection: "row",
        
      },
      totale: {
        fontWeight: "bold",
        color: "rgba(40,185,74,1)",
        fontSize: 30,
        paddingTop: 60
      },
      totale2: {
        fontWeight: "bold",
        color: "rgba(0,0,0,1)",
        fontSize: 30,
        paddingTop: 60,
        marginLeft: 10
      
      },
      totaleRow: {
        height: 37,
        flexDirection: "row",
        flex: 1,
      
      },
    QR: {
    alignItems: 'center',
    
    padding: 24,
  },
    });
 

