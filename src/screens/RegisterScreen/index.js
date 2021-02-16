import React, { useState } from 'react';
import {View, Text, StatusBar, StyleSheet, Image, TextInput, KeyboardAvoidingView, TouchableOpacity, ScrollView} from 'react-native';
import auth from '@react-native-firebase/auth';

function RegisterScreen ({navigation}) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    const register = () => {
        auth().createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL: imageUrl || 'https://static.theceomagazine.net/wp-content/uploads/2018/10/15093202/elon-musk.jpg'
            })
            navigation.navigate('Login')
        })
        .catch((error) => console.log(error))
    }

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <StatusBar hidden />
                    
                    <Text style={styles.title}>Create a Signal account</Text>
                    
                    <TextInput
                        onChangeText={(name) => setName(name)}
                        style={styles.textInput}
                        placeholder="Full Name"
                    />

                    <TextInput
                        onChangeText={(email) => setEmail(email)}
                        style={styles.textInput}
                        placeholder="Email"
                        keyboardType="email-address"
                    />

                    <TextInput
                        onChangeText={(password) => setPassword(password)}
                        style={styles.textInput}
                        secureTextEntry
                        placeholder="Password"
                    />

                    <TextInput
                        onChangeText={(imageUrl) => setImageUrl(imageUrl)}
                        style={styles.textInput}
                        placeholder="Profil picture(optionnal)"
                    />

                    <TouchableOpacity
                        onPress={register}
                        style={styles.register}
                    >
                        <Text style={{textAlign: 'center', color: '#fff'}}>Register</Text>
                    </TouchableOpacity>

                </KeyboardAvoidingView>
         );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        backgroundColor: '#fff',
    },

    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 30
    },

    textInput: {
        width: '100%',
        marginTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#2c6bed',
    },

    register: {
        backgroundColor: '#2c6bed',
        width: '70%',
        paddingVertical: 15,
        marginTop: 50
    }
})
 
export default RegisterScreen;