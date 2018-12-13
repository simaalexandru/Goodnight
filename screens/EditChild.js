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

export default class EditChild extends React.Component {
    static navigationOptions = {
        header: null,
    };


    constructor(props) {
        super(props);
        const child = this.props.navigation.state.params.currentChild;
        this.state = {
            childName: child.name, childAge: child.age,
            childSex: child.sex, storyList: '',
            error: '', currentUserKids: [],
            date: child.age,
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        const child = this.props.navigation.state.params.currentChild;
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

    editChild() {
        if (this.ValidateForm() === 1) {
            var user = firebase.auth().currentUser;
            const { childName, childAge, childSex, storyList } = this.state;
            firebase.database().ref('user/' + user.uid + '/child/' + this.props.navigation.state.params.currentChild.id + '/').update({
                childName,
                childAge,
                childSex
            })
                .catch(() => {
                    this.setState({ error: 'Editarea copilului esuata.' });
                })
            this.setState({ error: 'Copilul a fost editat cu succes.', loading: false })
            setTimeout(() => {
                this.props.navigation.navigate('Home');
            }, 1000)
        }
    }

    remove() {
        Alert.alert(
          'Eliminare copil',
          'Esti sigur ca vrei sa elimini copilul din lista?',
          [
            { text: 'Da', onPress: () => this.removeChild()},
            { text: 'Renunta'}
          ],
          { cancelable: true }
        )
    }

    removeChild() {
            var user = firebase.auth().currentUser;
            const { childName, childAge, childSex, storyList } = this.state;
            firebase.database().ref('user/' + user.uid + '/child/' + this.props.navigation.state.params.currentChild.id)
            .remove()
                .catch(() => {
                    this.setState({ error: 'Stergerea copilului esuata.' });
                })
            this.setState({ error: 'Copilul a fost sters cu succes.', loading: false })
            setTimeout(() => {
                this.props.navigation.navigate('Home');
            }, 1000)
    }

    render() {
        console.log(this.props.navigation.state.params.currentChild);

        const child = this.props.navigation.state.params.currentChild;
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
                    <Text style={styles.title}>Editeaza copil</Text>
                </View>
                <View style={styles.form}>
                    <FormLabel labelStyle={{fontFamily:'Roboto', fontSize: 22, color: 'white', fontWeight: '400' }}>Nume</FormLabel>
                    <FormInput
                        inputStyle={{fontFamily:'Roboto-Thin', width: '100%', color: '#ffffff', borderBottomColor: '#ffffff' }}
                        onChangeText={childName => this.setState({ childName })}
                        placeholder={this.props.navigation.state.params.currentChild.name}
                        placeholderTextColor='white'
                        containerStyle={{ borderBottomColor: '#ffffff' }}
                        underlineColorAndroid="#ffffff"
                    />
                    <FormLabel labelStyle={{fontFamily:'Roboto', fontSize: 22, color: 'white', fontWeight: '400', paddingTop:'4%' }}>Ziua nasteri</FormLabel>
                    <DatePicker
                        style={{ width: '95%', color: '#ffffff' }}
                        showIcon={false}
                        date={this.props.navigation.state.params.currentChild.age}
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
                                alignItems: 'flex-start',
                                borderWidth: 0,
                                borderBottomWidth: 1,
                                borderBottomColor: '#ffffff',
                                color: '#ffffff',
                                fontFamily:'Roboto-Thin',
                            },
                            placeholderText: {
                                fontFamily:'Roboto-Thin',
                                fontSize: 14,
                                color: '#ffffff'
                            },
                            btnTextConfirm: {
                                fontFamily:'Roboto',
                                color: '#333333',
                                fontSize: 18,
                            },
                            btnTextCancel: {
                                fontFamily:'Roboto',
                                color: '#333333',
                                fontSize: 18,
                            },
                            dateText: {
                                fontFamily:'Roboto-Thin',
                                color: '#ffffff',
                                justifyContent: 'flex-start'
                            }
                        }}
                        onDateChange={(childAge, date) => { this.setState({ childAge: childAge, date: date }) }}
                    />
                    <FormLabel labelStyle={{fontFamily:'Roboto',paddingTop:'4%', fontSize: 22, color: 'white', fontWeight: '400' }}>Sexul copilului</FormLabel>
                    <RadioForm
                        style={styles.radioButtons}
                        initial={this.props.navigation.state.params.currentChild.sex === 'Baiat' ? 0 : 1}
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
                <View style={{flexDirection:'row', justifyContent:'space-between',marginLeft:'5%', marginRight:'5%'}}>
                <TouchableOpacity
                    onPress={this.editChild.bind(this)}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 70,
                        height: 70,
                        backgroundColor: '#3F3470',
                        borderRadius: 100,
                    }}
                >
                    <Icon name={"save"} size={40} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.remove.bind(this)}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 70,
                        height: 70,
                        backgroundColor: '#3F3470',
                        borderRadius: 100,
                    }}
                >
                    <Icon name={"delete"} size={40} color="#fff" />
                </TouchableOpacity>
                </View>
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
        marginTop: '4%',
        fontSize: 30,
        color: '#ffffff',
        fontWeight: '500',
        fontWeight: 'bold',
        fontFamily:'Roboto',
    },
    radioButtons: {
        marginLeft: '5%',
        marginTop: '3%',
        marginBottom: '8%'
    },
    form: {
        marginTop: '5%',
        marginBottom: '35%'
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



