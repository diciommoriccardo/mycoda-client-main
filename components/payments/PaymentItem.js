import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, Image } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';


export default function PaymentItem({
  id,
  imgUri,
  desc,
  somma,
  time,
  stato, 
  storageKey
}) {

  const navigation = useNavigation();

  const onPress = () => {
		navigation.navigate('payment-detail', { id, desc, somma, time, stato, storageKey });
	}


  return (
    <TouchableHighlight
			onPress={onPress} 
			underlayColor="white">
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{
          uri: imgUri,
        }}
      />
      <View flex row paddingL-10>
        <View flex spread>
          <View flex spread top>
            <Text grey10 text65>{desc}</Text>
          </View>
          <View flex row bottom>
            <MaterialCommunityIcons name="cart" size={18} color="red" />
            <Text numberOfLines={1} ellipsizeMode='tail' grey20 text80 style={styles.text}>{somma}</Text>
          </View>
        </View>
        <View flex row right centerV>
          <Text numberOfLines={1} grey20 text70 style={styles.text}>{`${somma} €`}</Text>
        </View>
      </View>
    </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 50,
    margin: 14,
    overflow: 'hidden',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 18,
  },
});

