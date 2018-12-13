import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    Alert,
    ListView,
    TouchableOpacity,
    View,
    BackHandler,
    FlatList,
    ListItem,
    TouchableHighlight
} from 'react-native';
import * as firebase from 'firebase';
import { FormLabel, Input, Button, FormInput, FormValidationMessage } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import LogoTitle from './LogoTitle';
import { Icon } from 'react-native-elements';


var radio_props = [
    { label: 'Baiat', value: 'Baiat' },
    { label: 'Fata', value: 'Fata' }
];

export default class AddChild extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            childName: '', childAge: '',
            childSex: '', storyList: '',
            error: '', currentUserKids: [],
            date: '04-24-2015'
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }

    ValidateForm() {
        this.setState({ error: '', });
        const { childName, childAge, childSex } = this.state;
        let i = 1
        if (childName.length < 3) {
            this.setState({ error: 'Numele trebuie sa contina cel putin 3 caractere.' })
            i = -1
        } else {
            let textPattern = "[a-zA-Z]";
            if (!childName.match(textPattern)) {
                this.setState({ error: 'Numele trebuie sa contina doar litere' })
                i = -1
            }
        }
        if (childAge.length < 3) {
            this.setState({ error: 'Ziua nasteri este camp obligatoriu.' })
            i = -1
        }
        if (childSex.length < 1) {
            this.setState({ error: 'Sexul este camp obligatoriu.' })
            i = -1
        }
        return i
    }

    registerChild() {
        if (this.ValidateForm() === 1) {
            var user = firebase.auth().currentUser;
            const { childName, childAge, childSex, storyList } = this.state;
            firebase.database().ref('user/' + user.uid + '/child').push({
                childName: childName,
                childAge: childAge,
                childSex: childSex,
                storyList: storyList
            })
                .catch(() => {
                    this.setState({ error: 'Inregistrarea copilului esuata.' });
                })
            this.setState({ error: 'Copilul a fost inregistrat cu succes.', loading: false })
            setTimeout(() => { 
                this.props.navigation.navigate('Home');
              }, 1000)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerText}>
                    <TouchableOpacity
                        onPress={this.handleBackButtonClick.bind(this)}
                        style={{
                            marginTop: '5%',
                            marginRight: '15%',
                            width: 45,
                            height: 45,
                            backgroundColor: '#3F3470',
                            borderRadius: 100,
                        }}
                    >
                        <Icon name={"arrow-back"} size={30} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Adauga copil</Text>
                </View>
                <View style={styles.form}>
                    <FormLabel labelStyle={{fontFamily:'Roboto', fontSize: 22, color: 'white', fontWeight: '400' }}>Nume</FormLabel>
                    <FormInput
                        inputStyle={{fontFamily:'Roboto-Thin', width: '100%', color: '#ffffff', borderBottomColor: '#ffffff' }}
                        onChangeText={childName => this.setState({ childName })}
                        placeholderTextColor='white'
                        containerStyle={{ borderBottomColor: '#ffffff' }}
                        underlineColorAndroid="#ffffff"
                        autoCorrect={false}
                        autoCapitalize = 'none'
                    />
                    <FormLabel labelStyle={{fontFamily:'Roboto', fontSize: 22, color: 'white', fontWeight: '400', paddingTop:'4%' }}>Ziua nasteri</FormLabel>
                    {/* <FormInput
                     inputStyle={{ width: 300, color: 'white' }}
                     onChangeText={childAge => this.setState({childAge})}
                     placeholderTextColor='white'
                    /> */}
                    <DatePicker
                        style={{ width: '95%', color: '#ffffff' }}
                        showIcon={false}
                        date={this.state.date}
                        mode="date"
                        format="MM-DD-YYYY"
                        minDate={"01-01-2001"}
                        maxDate={"01-01-2019"}
                        confirmBtnText="Confirma"
                        cancelBtnText="Inchide"
                        customStyles={{
                            dateInput: {
                                height: 30,
                                width: 500,
                                marginLeft: '6%',
                                fontFamily:'Roboto-Thin',
                                alignItems: 'flex-start',
                                borderWidth: 0,
                                borderBottomWidth: 1,
                                borderBottomColor: '#ffffff',
                                color: '#ffffff'
                            },
                            placeholderText: {
                                fontFamily:'Roboto-Thin',
                                fontSize: 14,
                                color: '#ffffff'
                            },
                            btnTextConfirm: {
                                color: '#333333',
                                fontSize: 18,
                                fontFamily:'Roboto',
                            },
                            btnTextCancel: {
                                color: '#333333',
                                fontSize: 18,
                                fontFamily:'Roboto',
                            },
                            dateText: {
                                color: '#ffffff',
                                justifyContent: 'flex-start',
                                fontFamily:'Roboto-Thin',
                            }
                        }}
                        onDateChange={(childAge, date) => { this.setState({ childAge: childAge, date: date }) }}
                    />
                    <FormLabel labelStyle={{fontFamily:'Roboto', fontSize: 22,paddingTop:'4%', color: 'white', fontWeight: '400' }}>Sexul copilului</FormLabel>
                    <RadioForm
                        style={styles.radioButtons}
                        initial={'Baiat'}
                        radio_props={radio_props}
                        formHorizontal={true}
                        buttonSize={10}
                        labelHorizontal={true}
                        buttonColor={'#ffffff'}
                        buttonInnerColor={'#ffffff'}
                        buttonOuterColor={'#ffffff'}
                        selectedButtonColor={'#ffffff'}
                        animation={true}
                        onPress={(value) => { this.setState({ childSex: value }) }}
                        labelStyle={{fontFamily:'Roboto-Thin', color: '#ffffff', marginRight: 20 }}
                        buttonWrapStyle={{ color: '#ffffff' }}
                    />
                </View>
                <Text style={{fontFamily:'Roboto', marginLeft: '5%', marginTop: '2%', fontSize: 16, color: '#3F3470' }}>{this.state.error}</Text>
                <Button onPress={this.registerChild.bind(this)}
                    title='Inregistrare'
                    buttonStyle={{
                      backgroundColor: "#3F3470",
                      width: '100%',
                      height: 55,
                      borderColor: "transparent",
                      borderWidth: 0,
                      borderRadius: 25,
                      marginTop:25,
                      marginBottom:15,
                      titleSize:24
                     }}
                     textStyle={{fontFamily:'Roboto', color: "#FFFFFF", fontSize: 24, fontWeight: '300' }}
                />
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7f7fd5',
    },
    containerText: {
        marginTop: 23,
        backgroundColor: '#3F3470',
        height: 65,
        width: '100%',
        flexDirection: 'row',
    },
    title: {
        fontFamily:'Roboto',
        marginTop:'4%',
        fontSize: 30,
        color: '#ffffff',
        fontWeight: '500',
        fontWeight: 'bold',
    },
    radioButtons: {
        marginLeft: '5%',
        marginTop: '3%',
        marginBottom: '8%'
    },
    form: {
        marginTop: '5%',
        marginBottom:'35%'
    },
    text: {
        color: 'red',
        fontSize: 12,
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    liText: {
        color: 'green'
    },
});
