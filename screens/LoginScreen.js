import React from 'react';
import { View, Text, StyleSheet, Image, StatusBar,} from 'react-native';
import * as firebase from 'firebase';
import MainTabNavigator from '../navigation/MainTabNavigator';
import { StackNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FormLabel, Input, Button, FormInput, FormValidationMessage } from 'react-native-elements';

// firebase.initializeApp({
//     apiKey: "AIzaSyDO0bDMYykXmXlk7mMtNW4mKN3RZnu_M_s",
//     authDomain: "goodnight-de58f.firebaseapp.com",
//     databaseURL: "https://goodnight-de58f.firebaseio.com",
//     projectId: "goodnight-de58f",
//     storageBucket: "goodnight-de58f.appspot.com",
//     messagingSenderId: "167348977707"
// }
// );

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', error: '',message:'', loading: false };
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
            return <Text style={{marginLeft:'5%', marginTop:'2%',fontSize: 16, color:'#b20000' }}
            >Loading</Text>
        }
        return <View style={styles.buttons}>
                <Button onPress={this.onLoginPress.bind(this)}
                    title='Autentificare'
                    buttonStyle={{
                      backgroundColor: "rgba(177, 32, 204, 9))",
                      width: 300,
                      height: 45,
                      borderColor: "transparent",
                      borderWidth: 0,
                      borderRadius: 25,
                      marginTop:25,
                      marginBottom:15,
                     }}
                    />

                <View style={styles.bottomText}>
                 <Text style={{color:'white', fontSize: 16 }}>Nu esti inregistrat?</Text>
                 <Text onPress={() =>  navigate('Register')}
                     style={{ color:'rgba(177, 32, 204, 9)', paddingLeft:5,fontSize: 16 }}>
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
                    style={{ width: 190, height: 70, marginTop:'20%' }}
                    source={require('../assets/images/Nick_(Logo).png')}
                />
        </View>

         <View style={styles.form}>     
            <FormLabel labelStyle={{ fontSize: 16, color: 'white' }}>E-mail</FormLabel>
            <FormInput
                inputStyle={{ width: 300, color: 'white' }}
                onChangeText={email => this.setState({ email })}
                placeholderTextColor='white'
            />

            <FormLabel labelStyle={{ fontSize: 16, color: 'white'}}>Parola </FormLabel>
            <FormInput
                inputStyle={{ width: 300, color: 'white',  }}
                secureTextEntry
                placeholderTextColor='white'
                onChangeText={password => this.setState({ password })} />
            <Text style={{marginLeft:'5%', marginTop:'2%',fontSize: 16, color:'#b20000' }}>{this.state.error}</Text>
            {this.renderButtonOrLoading()}
         </View>
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
        flexDirection:'row',
        justifyContent: 'center',
    },
  });