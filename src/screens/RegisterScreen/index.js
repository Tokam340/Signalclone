import React, { Component } from 'react';
import {View, Text, StatusBar, StyleSheet, Image, TextInput, KeyboardAvoidingView, TouchableOpacity, ScrollView} from 'react-native';
import auth from '@react-native-firebase/auth';

class RegisterScreen extends Component {
    state = { 
        name: '',
        email: '',
        password: '',
        imageUrl: ''
     }

    register = () => {
        auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((authUser) => {
            authUser.user.updateProfile({
                displayName: this.state.name,
                photoURL: this.state.imageUrl || 'https://static.theceomagazine.net/wp-content/uploads/2018/10/15093202/elon-musk.jpg'
            })
            this.props.navigation.navigate('Login')
        })
        .catch((error) => console.log(error))
    }

    render() { 
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <StatusBar hidden />
                    
                    <Text style={styles.title}>Create a Signal account</Text>
                    
                    <TextInput
                        onChangeText={(name) => this.setState({name})}
                        style={styles.textInput}
                        placeholder="Full Name"
                    />

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

                    <TextInput
                        onChangeText={(imageUrl) => this.setState({imageUrl})}
                        style={styles.textInput}
                        placeholder="Profil picture(optionnal)"
                    />

                    <TouchableOpacity
                        onPress={this.register}
                        style={styles.register}
                    >
                        <Text style={{textAlign: 'center', color: '#fff'}}>Register</Text>
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