import React from 'react';
import { View, Text, StyleSheet, Image, StatusBar, ScrollView, FlatList} from 'react-native';
import * as firebase from 'firebase';
import MainTabNavigator from '../navigation/MainTabNavigator';
import { StackNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FormLabel, Input, Button, FormInput, FormValidationMessage } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


firebase.initializeApp({
    apiKey: "AIzaSyDO0bDMYykXmXlk7mMtNW4mKN3RZnu_M_s",
    authDomain: "goodnight-de58f.firebaseapp.com",
    databaseURL: "https://goodnight-de58f.firebaseio.com",
    projectId: "goodnight-de58f",
    storageBucket: "goodnight-de58f.appspot.com",
    messagingSenderId: "167348977707"
}
);

export default class RegisterScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', firstName: '', lastName: '', error: '', message: '', child: '', loading: false };
    }


    static navigationOptions = {
        tabBarVisible: false,
        header: null,
    };

    // onSignUpPress() {
    //     this.setState({ error: '', loading: true });
    //     const {email, password, name } = this.state;
    //     firebase.auth().createUserWithEmailAndPassword(email, password)
    //         .then(() => {
    //             this.setState({ error: '', loading: false });
    //         })
    //         .catch(() => {
    //             this.setState({ error: 'Registration failed', loading: false });
    //         })
    // }

    // onLoginButtonPress() {
    //    this.props.navigation.navigate('Login');
    // }

    //Function that checks client input, 
    //using the i variable and from each if statement returning -1
    //if the ValidateForm===1 (the user gives the right input), then the
    //function createUserWithEmailAndPassword gets executed
    ValidateForm() {
        this.setState({ error: '', loading: true });
        const { firstName, lastName, email, password, } = this.state;
        let i = 1
        if (firstName.length < 3) {
            this.setState({ error: 'Prenumele trebuie sa contina cel putin 3 caractere.', loading: false })
            i = -1
        }else {
            let textPattern = "[a-zA-Z]";
            if (!firstName.match(textPattern)) {
                this.setState({ error: 'Prenumele trebuie sa contina doar litere', loading: false })
                i = -1
            }

        }
        if (lastName.length < 3) {
            this.setState({ error: 'Numele trebuie sa contina cel putin 3 caractere.', loading: false })
            i = -1
        }
        else {
            let textPattern = "^[^0-9]+$";
            if (!lastName.match(textPattern)) {
                this.setState({ error: 'Numele trebuie sa contina doar litere', loading: false })
                i = -1
            }

        }
        if (password.length < 6) {
            this.setState({ error: 'Parola trebuie sa contina cel putin 6 caractere.', loading: false })
            i = -1
        }
        if (email.length < 1) {
            this.setState({ error: 'Introduceti adresa de e-mail', loading: false })
            i = -1
        } else {
            let emailPattern = "[a-zA-Z0-9._-]+@[a-z]+\\.+[a-z]+";
            if (!email.match(emailPattern)) {
                this.setState({ error: 'Adresa de e-mail este invalida.', loading: false })
                i = -1
            }

        }
        return i

    }

    onSignUpPress() {
        this.setState({ error: '', loading: true });
        if (this.ValidateForm() === 1) {
            const { email, password, firstName, lastName, child } = this.state;
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((res) => {
                    this.setState({ error: '', loading: false });
                    firebase.database().ref('user/' + res.user.uid).set({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password: password,
                        child: child
                    })
                })
                .catch(() => {
                    this.setState({ error: 'Inregistrare esuata.', loading: false });
                })

        this.setState({error:'Utilizatorul a fost inregistrat cu succes.', loading:false})
        setTimeout(() => { 
            this.props.navigation.navigate('Login');
          }, 1000)
        } 
    }

    renderButtonOrLoading() {
        const { navigate } = this.props.navigation;

        if (this.state.loading) {
            return <Text style={{marginLeft:'5%', marginTop:'2%',fontSize: 16, color:'#b20000' }}
                   >Loading</Text>
        }
        return <View style={styles.buttons}>
            <Button onPress={this.onSignUpPress.bind(this)}
                title='Inregistrare'
                buttonStyle={{
                    backgroundColor: "#521987",
                      width: 300,
                      height: 55,
                      borderColor: "transparent",
                      borderWidth: 0,
                      borderRadius: 25,
                      marginTop:25,
                      marginBottom:15,
                      titleSize:24
                     }}
                     textStyle={{ color: "#FFFFFF", fontSize: 24, fontWeight: '300' }}
            />

            <View style={styles.bottomText}>
              <Text style={{color:'white', fontSize: 16 }}>Ai deja un cont?</Text>
              <Text onPress={() =>  navigate('Login')}
                    style={{ color:'#521987', paddingLeft:5,fontSize: 16 }}>
                    Autentificare</Text>
            </View>
        </View>
    }

    render() {
        return (
            <View style={styles.container}>
            <StatusBar backgroundColor="blue" barStyle="light-content" />

             <View style={styles.logo}>
                    <Image
                        style={{ width: 190, height: 70,}}
                        source={require('../assets/images/Nick_(Logo).png')}
                    />
            </View>

             <KeyboardAwareScrollView extraScrollHeight={100} enableOnAndroid={true} style={styles.form}>
                <FormLabel labelStyle={{ fontSize: 22, color: 'white', fontWeight: '400' }}>Nume</FormLabel>
                <FormInput
                    inputStyle={{ width: 300, color: 'white',  }}
                    onChangeText={lastName => this.setState({ lastName })}
                    placeholderTextColor='white'
                />
                <FormLabel labelStyle={{ fontSize: 22, color: 'white', fontWeight: '400' }}>Prenume</FormLabel>
                <FormInput
                    inputStyle={{ width: 300, color: 'white' }}
                    onChangeText={firstName => this.setState({ firstName })}
                    placeholderTextColor='white'
                />
                <FormLabel labelStyle={{ fontSize: 22, color: 'white', fontWeight: '400' }}>E-mail</FormLabel>
                <FormInput
                    inputStyle={{ width: 300, color: 'white' }}
                    onChangeText={email => this.setState({ email })}
                    placeholderTextColor='white'
                />
                <FormLabel labelStyle={{ fontSize: 22, color: 'white', fontWeight: '400'}}>Parola </FormLabel>
                <FormInput
                    inputStyle={{ width: 300, color: 'white'}}
                    secureTextEntry
                    placeholderTextColor='white'
                    onChangeText={password => this.setState({ password })} />
                </KeyboardAwareScrollView>
                <Text style={{marginLeft:'5%', marginTop:'2%',fontSize: 16, color:'#b20000'  }}>{this.state.error}</Text>
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
    logo: {
        marginTop:'30%',
        alignItems: 'center',
        flexDirection:'row',
        justifyContent: 'center',
    },
    buttons:{
        marginBottom:'4%',
    },
    bottomText: { 
        alignItems: 'flex-start',
        flexDirection:'row',
        justifyContent: 'center',
    },
});