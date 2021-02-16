import React, { useState } from 'react';
import {View, ActivityIndicator, Text, StatusBar, StyleSheet, Image, TextInput, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';


function LoginScreen ({navigation}) {

     const [email, setEmail] = useState('')
     const [password, setPassword] = useState('')
     const [error, setError] = useState('')
     const [isloading, setIsLoading] = useState(false)

    const login = () => {
        auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            setIsLoading(true)
            navigation.navigate('Home')
        })
        .catch((error) => {
            setIsLoading(true)
            if(error.code === 'auth/wrong-password'){
                setError('The password is wrong')
            }
            if (error.code === 'auth/email-already-in-use') {
                setError('That email address is already in use!')
              }
          
            if (error.code === 'auth/invalid-email') {
                setError('That email address is invalid!')
              }
        })
        .finally(() => setIsLoading(false))
    }

    

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <StatusBar hidden />
                
                <Image style={styles.logo} source={require('../../assets/logo.png')} />
                
                <TextInput
                    onChangeText={(email) => setEmail(email)}
                    style={styles.textInput}
                    placeholder="Email"
                    keyboardType="email-address"
                    value={email}
                />

                <TextInput
                    onChangeText={(password) => setPassword(password)}
                    style={styles.textInput}
                    secureTextEntry
                    placeholder="Password"
                    value={password}
                />

                { isloading ? <ActivityIndicator size={30} color="blue" /> : <Text style={styles.error}>{error}</Text>}

                <TouchableOpacity onPress={login} style={styles.login}>
                    <Text style={{textAlign: 'center', color: '#fff'}}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}
                    style={[styles.login, styles.register]}
                >
                    <Text style={{textAlign: 'center', color: '#000'}}>Register</Text>
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
        backgroundColor: '#fff'
    },

    logo: {
        width: 150,
        height: 150,
        borderRadius: 10
    },

    textInput: {
        width: '100%',
        marginTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#2c6bed',
    },

    error: {
        textAlign: 'center',
        marginVertical: 20,
        color: 'red',
        fontSize: 16
    },

    login: {
        backgroundColor: '#2c6bed',
        width: '70%',
        paddingVertical: 15,
        marginTop: 20
    },

    register: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#2c6bed'
    }
})
 
export default LoginScreen;