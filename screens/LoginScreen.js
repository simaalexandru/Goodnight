import React from 'react';
import { View, Text, StyleSheet, Image, StatusBar, } from 'react-native';
import * as firebase from 'firebase';
import MainTabNavigator from '../navigation/MainTabNavigator';
import { StackNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Font } from 'expo';
import { FormLabel, Input, Button, FormInput, FormValidationMessage } from 'react-native-elements';
import ls from 'react-native-local-storage';

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = { email: '', password: '', error: '', message: '', loading: false, fontLoaded: false };
    }
 
    componentWillMount(){
        ls.get('email').then((email) => {
            if (email!=null){
               ls.get('password').then((password) => {
                this.setState({ email: email, password: password });
               });
             }
           });
    }

    componentWillReceiveProps(){
        ls.get('email', 'password').then((email, password) => {
           
                this.setState({ email: email, password: password });
             
           });
    }

    static navigationOptions = {
        tabBarVisible: false,
        header: null,
    };


    onLoginPress() {
        this.setState({ error: '', loading: true });
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                ls.save('email', email)
                    .then(() => {
                        ls.get('email');
                        // output should be "get: Kobe Bryant"
                    })


                ls.save('password', password)
                    .then(() => {
                        ls.get('password');
                        // output should be "get: Kobe Bryant"
                    })
            
                this.setState({ error: '', loading: false });
                this.props.navigation.navigate('Home');
                
            })
            .catch(() => {
                this.setState({ error: 'Autentificare esuata.', loading: false });
            })
    }


    renderButtonOrLoading() {
        const { navigate } = this.props.navigation;

        if (this.state.loading) {
            return <Text style={{ marginTop: '2%', fontSize: 16, color: '#3F3470' }}
            >Loading</Text>
        }
        return <View style={styles.buttons}>
            <Button onPress={this.onLoginPress.bind(this)}
                title='Autentificare'
                buttonStyle={{
                    backgroundColor: "#3F3470",
                    width: 300,
                    height: 55,
                    borderColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 25,
                    marginTop: 25,
                    marginBottom: 15,
                    titleSize: 24,
                }}
                textStyle={{ fontFamily: 'Roboto', color: "#FFFFFF", fontSize: 24, fontWeight: '300' }}
            />

            <View style={styles.bottomText}>
                <Text style={{ fontFamily: 'Roboto', color: 'white', fontSize: 16 }}>Nu esti inregistrat?</Text>
                <Text onPress={() => navigate('Register')}
                    style={{ fontFamily: 'Roboto', color: '##3F3470', paddingLeft: 5, fontSize: 16 }}>
                    Inregistreaza-te</Text>
            </View>
        </View>
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="blue" barStyle="light-content" />

                <View>
                    <Image
                        style={{ width: 260, height: 170, marginTop: '15%' }}
                        source={require('../assets/images/finallogoversion.png')}
                    />
                </View>

                <View style={styles.form}>
                    <FormLabel labelStyle={{ fontFamily: 'Roboto', fontSize: 24, color: 'white', fontWeight: '400' }}>E-mail</FormLabel>
                    <FormInput
                        inputStyle={{ fontFamily: 'Roboto-Thin', width: 300, color: 'white', }}
                        defaultValue={this.state.email}
                        onChangeText={email => this.setState({ email })}
                        placeholderTextColor='white'
                        autoCorrect={false}
                        autoCapitalize = 'none'
                    />

                    <FormLabel labelStyle={{ fontFamily: 'Roboto', fontSize: 24, color: 'white', fontWeight: '400' }}>Parola </FormLabel>
                    <FormInput
                        inputStyle={{ fontFamily: 'Roboto-Thin', width: 300, color: 'white', }}
                        secureTextEntry
                        defaultValue={this.state.password}
                        placeholderTextColor='white'
                        autoCorrect={false}
                        autoCapitalize = 'none'
                        onChangeText={password => this.setState({ password })} />
                    <Text style={{ marginLeft: '5%', marginTop: '2%', fontSize: 16, color: '#3F3470' }}>{this.state.error}</Text>
                </View>
                {this.renderButtonOrLoading()}
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#7f7fd5',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        backgroundColor: '#7f7fd5',
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },

    bottomText: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttons: {
        marginBottom: '5%'
    }
});