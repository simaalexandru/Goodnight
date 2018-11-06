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
  FlatList,
  ListItem,
  TouchableHighlight,
} from 'react-native';
import * as firebase from 'firebase';
import { FormLabel, Input, Button, FormInput, FormValidationMessage } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import PropTypes from 'prop-types';
import { StackNavigation } from 'react-navigation';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';


// var radio_props = [
//   {label: 'Baiat', value: 'Baiat' },
//   {label: 'Fata', value: 'Fata' }
// ];

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    currentUserKids: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      childName: '', childAge: '',
      childSex: '', storyList: [], childPhoto: '',
      error: '', currentUserKids: [],
      displayMessage: '',
      date: '04-24-2015'
    };
  }

  componentWillMount() {
    this.listKids();
  }

  //listing the child/'s of the current user 
  //accessing all the properties of the child
  listKids() {
    var currentUserId = firebase.auth().currentUser.uid
    var usersRef = firebase.database().ref('user/' + currentUserId + '/child');
    usersRef.on('value', (snapshot) => {
      var copii = [];
      //console.log(snapshot.val())
      snapshot.forEach((child) => {
        copii.push({
          id: child.key,
          name: child.val().childName,
          age: child.val().childAge,
          sex: child.val().childSex,
          photo: child.val().photo,
          list: this.getStoryList(child.key)
        })
      })
      this.setState({ currentUserKids: copii });
      // console.log(this.state.currentUserKids);
    })
  }

  //opening the ChildInfo screen and transfering child's data
  _onPressItem = () => {
    this.props.navigation.navigate('ChildInfo', {
      currentChld: currentChild
    })
  };

  //accessing the storyList array from db 
  //getting the stories values and adding them to my state array (storyList)
  getStoryList(item) {
    var currentUserId = firebase.auth().currentUser.uid
    var usersRef = firebase.database().ref('user/' + currentUserId +
      '/child/' + item + '/storyList/');
    usersRef.on('value', (snapshot) => {
      var povesti = [];
      snapshot.forEach((story) => {
        povesti.push({
          id: story.val().id,
          currentPage: story.val().currentPage
        })
      })
      this.setState({ storyList: povesti });
    })
    return this.state.storyList;

  }

  //displaying kids in flatlist
  returnKids() {
    // if(!this.state.currentUserKids.length){
    //   return <Text style={{marginTop:'10%'}}>Nu exista nici un copil inregistrat pentru acest cont.</Text>
    // } 
    // else{
    return <FlatList
      style={styles.listContainer}
      data={this.state.currentUserKids}
      keyExtractor={item => item.id}
      renderItem={({ item }) => {
        //console.log(item);
        if (item.sex === 'Fata') {

          //  this._renderItemGirl=({item})
          return (<TouchableOpacity onPress={() => { this._onPressItem(item) }}>
            <View style={styles.childStyling}>
              <Text style={styles.nameChild}>{item.name}</Text>
              <Image
                style={styles.avatar}
                source={require('../assets/images/girl.png')} />
            </View>
          </TouchableOpacity>)
        }
        else {
          return (
            <TouchableOpacity onPress={() => { this._onPressItem(item) }}>
              <View style={styles.childStyling}>
                <Text style={styles.nameChild}>{item.name}</Text>
                <Image
                  style={styles.avatar}
                  source={require('../assets/images/boy.png')} />
              </View>
            </TouchableOpacity>)
        }
      }
      }
    />
  }

  //opens the ChildInfo screen of the selected child
  //transferring the currentChild info through state
  _onPressItem = (currentChild) => {
    this.props.navigation.navigate('ChildInfo', {
      currentChild: currentChild
    })
  };

  render() {
    const { navigate } = this.props.navigation;
    
    return (
      <View style={styles.container}>
        {this.returnKids()}
        <Button onPress={() => navigate('AddChild')}
          title='Add New Child'
          buttonStyle={{
            backgroundColor: "rgba(177, 32, 204, 9)",
            width: '100%',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 25,
            marginBottom: 20,
          }}
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
  listContainer: {
    marginTop: '10%',
    marginLeft: '5%',
    marginRight: '5%'
  },
  avatar: {
    width: 50,
    height: 50,
  },
  childStyling: {
    height: 80,
    marginTop: '2%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: '5%',
    alignContent: 'spaceAround',
    backgroundColor: '#333',
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 15
  },
  nameChild: {
    fontSize: 22,
    color: '#ffffff',
    marginTop: '3%'
  },
});