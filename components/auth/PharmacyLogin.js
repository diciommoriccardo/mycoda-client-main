import React, { useState, useContext } from 'react';
import { Alert, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { View, TextField, Text, Button, Image } from 'react-native-ui-lib';
import { API } from '../../config/config';
import localUserData from '../../helpers/localUserData';
import AuthContext from '../AuthContext';
import headerLogo from '../../assets/header.png';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function PharmacyLogin() {

	const navigation = useNavigation();
	
	const [piva, setpIva] = useState('');
	const [password, setPassword] = useState('');
	const { signIn } = useContext(AuthContext);

	const login = () => {
		fetch(`${API.URL}/api/pharmacies/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					piva: piva,
					password: password,
				})
			})
			.then((response) => response.json())
			.then((json) => {
				if ('error' in json) {
					Alert.alert("Errore", "Credenziali errate");
					return;
				}
				localUserData.save({
					email: json.email,
					id: json.piva,
					businessName: json.ragSociale,
					address: json.indirizzo,
					telephone: json.numTel,
					type: 'pharmacy',
				}, {
					accessToken: json.accessToken,
					refreshToken: json.refreshToken,
				}).then(data => signIn(data))
				
			})
			.catch((error) => console.error(error))
	}

	return (
		<SafeAreaView
        style={{
            flex:1
            }}>
        <KeyboardAwareScrollView>
		<ScrollView>
			<View flex paddingH-30>
				<View flex center >
					<Image source={headerLogo} resizeMode={'contain'} style={{ width: 250, height: 250 }} />
				</View>
				<Text grey20 text30 marginB-30>Farmacie</Text>
				<Text primaryColor text60 marginB-10>Partita IVA</Text>
				<TextField text70 dark10
					placeholder="Partita iva della farmacia"
					onChangeText={text => setpIva(text)}
					returnKeyType="next"
                    onSubmitEditing={() => {
                        this.secondTextInput.focus();
                    }}
				/>
				<Text primaryColor text60 marginB-10>Password</Text>
				<TextField text70 secureTextEntry dark10
					placeholder="Password"
					onChangeText={text => setPassword(text)}
					ref={(input) => { this.secondTextInput = input; }}
                    returnKeyType="done"
				/>
				<View flex top>
					<Button text70 white background-primaryColor borderRadius={10} marginT-10
						label="Accedi"
						onPress={login}
					/>
					<View flex row bottom marginT-30 centerH>
						<Text grey10 text70 centerV>Non hai una farmacia? </Text>
						<Button link text70 primaryColor
							label="Accedi"
							onPress={() => navigation.navigate('user-login')} />
					</View>
				</View>
			</View>
		</ScrollView>
		</KeyboardAwareScrollView>
        </SafeAreaView>
	);
}
