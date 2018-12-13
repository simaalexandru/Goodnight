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


export default class AddStory extends React.Component {
  static navigationOptions = {

  };

  constructor(props) {
    super(props);
    this.state = {
       id: '', 
       currentPage: '',
    };
  }


  registerChild() {
   
    var user = firebase.auth().currentUser;
    const { id, currentPage} = this.state;
    firebase.database().ref('user/' + user.uid + '/child/-LQZBLqFf4EgnEuFx72p/storyList').push({
      id: id,
      currentPage: currentPage
    })
    .catch(() => {
      this.setState({ error: 'Inregistrarea copilului esuata.'});
     })
    this.setState({error:'Utilizatorul a fost inregistrat cu succes.', loading:false})
    
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <FormLabel labelStyle={{ fontSize: 16, color: 'white', }}>Id</FormLabel>
          <FormInput
            inputStyle={{ width: '100%', color: '#ffffff', borderBottomColor:'#ffffff' }}
            onChangeText={id => this.setState({ id })}
            placeholderTextColor='white'
            containerStyle={{borderBottomColor: '#ffffff'}}
            underlineColorAndroid="#ffffff"
          />
          <FormLabel labelStyle={{ fontSize: 16, color: 'white', }}>curr page</FormLabel>
          <FormInput
            inputStyle={{ width: '100%', color: '#ffffff', borderBottomColor:'#ffffff' }}
            onChangeText={currentPage => this.setState({ currentPage})}
            placeholderTextColor='white'
            containerStyle={{borderBottomColor: '#ffffff'}}
            underlineColorAndroid="#ffffff"
          />
       
        </View>
        <Button onPress={this.registerChild.bind(this)}
          title='Inregistrare'
          buttonStyle={{
            backgroundColor: "#3F3470",
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
