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
  Icon,
  FlatList,
  ListItem,
  TouchableHighlight
} from 'react-native';
import * as firebase from 'firebase';
import { FormLabel, Input, Button, FormInput, FormValidationMessage} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import LogoTitle from './LogoTitle';

var radio_props = [
  {label: 'Baiat', value: 'Baiat' },
  {label: 'Fata', value: 'Fata' }
];

export default class AddChild extends React.Component {
  static navigationOptions = {

  };

  constructor(props) {
    super(props);
    this.state = {
      childName: '', childAge: '',
      childSex: '', storyList: '',
      error: '', currentUserKids: [],
      date:'04-24-2015'
    };
  }

//   componentDidMount() {
//     BackHandler.addEventListener('BackPress', this.handleBackPress);
//   }

//   componentWillUnmount() {
//     BackHandler.removeEventListener('BackPress', this.handleBackPress);
//   }

  handleBackPress = () => {
    this.goBack(); 
    return true;
  }


//   openChild() {
//     Alert.alert(
//       'Bravo baa'
//     );
//   }

  ValidateForm() {
    this.setState({ error: '', });
    const { childName, childAge, childSex } = this.state;
    let i = 1
    if (childName.length < 3) {
        this.setState({ error: 'Numele trebuie sa contina cel putin 3 caractere.' })
        i = -1
    }else {
        let textPattern = "[a-zA-Z]";
        if (!childName.match(textPattern)) {
            this.setState({ error: 'Numele trebuie sa contina doar litere' })
           i = -1
         }
         }
      if (childAge.length < 3) {
          this.setState({ error: 'Ziua nasteri este camp obligatoriu.'})
          i = -1
      }
      if (childSex.length < 1) {
        this.setState({ error: 'Sexul este camp obligatoriu.'})
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
      this.setState({ error: 'Inregistrarea copilului esuata.'});
     })
    this.setState({error:'Utilizatorul a fost inregistrat cu succes.', loading:false})
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <FormLabel labelStyle={{ fontSize: 16, color: 'white', }}>Nume</FormLabel>
          <FormInput
            inputStyle={{ width: '100%', color: '#ffffff', borderBottomColor:'#ffffff' }}
            onChangeText={childName => this.setState({ childName })}
            placeholderTextColor='white'
            containerStyle={{borderBottomColor: '#ffffff'}}
            underlineColorAndroid="#ffffff"
            autoCorrect={false}
            autoCapitalize = 'none'
          />
          <FormLabel labelStyle={{ fontSize: 16, color: 'white' }}>Ziua nasteri</FormLabel>
          {/* <FormInput
              inputStyle={{ width: 300, color: 'white' }}
              onChangeText={childAge => this.setState({childAge})}
              placeholderTextColor='white'
              /> */}
          <DatePicker
            style={{ width: '95%', color:'#ffffff'}}
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
                alignItems: 'flex-start',
                borderWidth: 0,
                borderBottomWidth: 1,
                borderBottomColor: '#ffffff',
                color:'#ffffff'
              },
              placeholderText: {
                      fontSize: 14,
                      color: '#ffffff'
                  },
              btnTextConfirm: {
                color: '#333333',
                fontSize: 18,                
              },
              btnTextCancel: {
                color: '#333333',
                fontSize: 18,                     
              },
              dateText:{
              color: '#ffffff',
              justifyContent: 'flex-start'
            }
            }}
            onDateChange={(childAge, date) => { this.setState({ childAge: childAge, date: date })}}
          />
          <FormLabel labelStyle={{ fontSize: 16, color: 'white' }}>Sexul copilului</FormLabel>
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
            onPress={(value) => {this.setState({childSex: value})}}
            labelStyle={{ color: '#ffffff', marginRight:20}}
            buttonWrapStyle={{color: '#ffffff'}}
           />
        </View>
        <Button onPress={this.registerChild.bind(this)}
          title='Inregistrare'
          buttonStyle={{
            backgroundColor: "rgba(177, 32, 204, 9)",
            width: 350,
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 25,
          }}
        />
        {/* <Button onPress={this.props.nav.goBack()}
                title='Go Back'
                buttonStyle={{
                    backgroundColor: "rgba(177, 32, 204, 9)",
                    width: 300,
                    height: 45,
                    borderColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 25,
                }}
            /> */}
        <Text style={{ marginLeft: '5%', marginTop: '2%', fontSize: 16, color: '#b20000' }}>{this.state.error}</Text>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7f7fd5',
  },

  radioButtons: {
    marginLeft:'5%',
    marginTop:'3%',
    marginBottom:'8%'
  },
  form: {
    marginTop: '30%',
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
