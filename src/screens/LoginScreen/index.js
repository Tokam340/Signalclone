import React, { Component } from 'react';
import {View, ActivityIndicator, Text, StatusBar, StyleSheet, Image, TextInput, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';


class LoginScreen extends Component {
    state = { 
        email: '',
        password: '',
        error: '',
        isloading: false
     }

    login = () => {
        auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
            this.setState({isloading: true})
            this.props.navigation.navigate('Home')
        })
        .catch((error) => {
            this.setState({isloading: true})
            if(error.code === 'auth/wrong-password'){
                this.setState({error: 'The password is wrong'})
            }
            if (error.code === 'auth/email-already-in-use') {
                this.setState({error: 'That email address is already in use!'});
              }
          
            if (error.code === 'auth/invalid-email') {
                this.setState({error: 'That email address is invalid!'});
              }
        })
        .finally(() => this.setState({isloading: false}))
    }

    render() { 

        const {email, password, error, isloading} = this.state

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <StatusBar hidden />
                
                <Image style={styles.logo} source={require('../../assets/logo.png')} />
                
                <TextInput
                    onChangeText={(email) => this.setState({email})}
                    style={styles.textInput}
                    placeholder="Email"
                    keyboardType="email-address"
                />

                <TextInput
                    onChangeText={(password) => this.setState({password})}
                    style={styles.textInput}
                    secureTextEntry
                    placeholder="Password"
                />

                { isloading ? <ActivityIndicator size={30} color="blue" /> : <Text style={styles.error}>{error}</Text>}

                <TouchableOpacity onPress={this.login} style={styles.login}>
                    <Text style={{textAlign: 'center', color: '#fff'}}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Register')}
                    style={[styles.login, styles.register]}
                >
                    <Text style={{textAlign: 'center', color: '#000'}}>Register</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>
         );
    }
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