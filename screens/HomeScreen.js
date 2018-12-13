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
  TouchableWithoutFeedback,
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
import { LinearGradient, Font } from 'expo';
import { Icon } from 'react-native-elements';
import ls from 'react-native-local-storage';


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
      date: '04-24-2015',
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
        // var storyList= this.getStoryList(child.key);
        copii.push({
          id: child.key,
          name: child.val().childName,
          age: child.val().childAge,
          sex: child.val().childSex,
          photo: child.val().photo,
          list: this.getStoryList(child.key)
        })
      })
      if (copii.length === 0) {
        Alert.alert(
          'Niciun copil adaugat in lista',
          'Pentru a accesa povestile, trebuie sa adaugati un copil, folosind butonul de mai jos.',
          [
            { text: 'OK' },
          ],
          { cancelable: true }
        )
      }
      this.setState({ currentUserKids: copii });
    })
  }


  logout() {
      Alert.alert(
        'Log Out',
        'Esti sigur ca vrei sa te deloghezi?',
        [
          { text: 'Da', onPress: () => this.logOutUser()},
          { text: 'Renunta'}
        ],
        { cancelable: true }
      )
  }

  logOutUser(){
    ls.save('email', '')
    ls.save('password', '')

    this.props.navigation.navigate('Login', {
      email: '',
      password: ''
    })
  }


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
          id: story.key,
          name: story.val().name,
          currentPage: story.val().currentPage
        })
      })
      this.setState({ storyList: povesti });
    })
    return this.state.storyList;
  }



  //displaying kids in flatlist
  returnKids() {
    if (this.state.currentUserKids.length > 0) {
      return <FlatList
        style={styles.listContainer}
        data={this.state.currentUserKids}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {

          if (item.sex === 'Fata') {
            this._renderItemGirl = ({ item })
            return (
              <TouchableWithoutFeedback onPress={() => { this._onPressItem(item) }}>
                <LinearGradient
                  colors={['#EF7D95', '#FDA0A4']}
                  style={styles.childStyling}
                  start={[0, 0.5]}
                  end={[1, 0.5]}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingTop: '8%' }}>
                    {<Image
                      style={styles.avatar}
                      source={require('../assets/images/girl.png')} />}
                    <Text style={styles.nameChild}>Cartile lui {item.name}</Text>
                  </View>
                  <View style={{ marginTop: '2%', marginRight: '2%' }}>
                    <TouchableOpacity
                      onPress={() => { this._onPressButton(item) }}
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 30,
                        height: 30,
                        backgroundColor: '#3F3470',
                        borderRadius: 100,
                      }}
                    >
                      <Icon name={"edit"} size={15} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </TouchableWithoutFeedback>
            )
          }
          if (item.sex === 'Baiat') {
            return (
              <TouchableWithoutFeedback onPress={() => { this._onPressItem(item) }}>
                <LinearGradient
                  colors={['#3B6AB7', '#759BE3']}
                  ///DBF2FD
                  style={styles.childStyling}
                  start={[0, 0.5]}
                  end={[1, 0.5]}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingTop: '8%' }}>
                    {<Image
                      style={styles.avatar}
                      source={require('../assets/images/boy.png')} />}
                    <Text style={styles.nameChild}>Cartile lui {item.name}</Text>
                  </View>
                  <View style={{ marginTop: '2%', marginRight: '2%' }}>
                    <TouchableOpacity
                      onPress={() => { this._onPressButton(item) }}
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 30,
                        height: 30,
                        backgroundColor: '#3F3470',
                        borderRadius: 100,
                      }}
                    >
                      <Icon name={"edit"} size={15} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </TouchableWithoutFeedback>

            )
          }
        }
        }
      />

    }
  }



  //opens the StoryList screen of the selected child
  //transferring the currentChild info through state
  _onPressItem = (currentChild) => {
    this.props.navigation.navigate('StoryList', {
      currentChild: currentChild,
    })
  };

  _onPressButton = (currentChild) => {
    this.props.navigation.navigate('EditChild', {
      currentChild: currentChild,
    })
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.containerText}>
        <Text style={styles.title}>Lista copiilor</Text>
                    <TouchableOpacity
                        onPress={this.logout.bind(this)}
                        style={{ marginTop: '5%', backgroundColor: '#3F3470', marginLeft:'15%'}}
                      >
                      <Icon name={"exit-to-app"} size={30} color="#fff" />
                    </TouchableOpacity>
         </View>
        <ScrollView style={{ height: 370 }}>
          {this.returnKids()}
        </ScrollView>
        <View style={styles.containerButton}>
          <TouchableOpacity
            onPress={() => navigate('AddChild')}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 50,
              height: 50,
              backgroundColor: '#3F3470',
              borderRadius: 100,
            }}
          >
            <Icon name={"add"} size={30} color="#fff" />
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
  containerButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  listContainer: {
    marginLeft: '5%',
    marginRight: '5%'
  },
  avatar: {
    width: 50,
    height: 50,
  },
  nameChild: {
    fontSize: 20,
    backgroundColor: 'transparent',
    marginTop: '6%',
    marginLeft: '5%',
    color: '#ffffff',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  noChild: {
    fontSize: 22,
    backgroundColor: 'transparent',
    marginTop: '4%',
    marginLeft: '10%',
    marginLeft: '10%',
    color: '#ffffff',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  noChildAvatar: {
    width: 240,
    height: 260,
    alignSelf: 'center',
  },
  childStyling: {
    height: 100,
    marginTop: '5%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingLeft: '5%',
    // paddingRight: '5%',
    borderRadius: 10,
    // alignContent: 'spaceAround', //  CRUSH ON ANDROID
    backgroundColor: 'transparent',
  },
  title: {
    marginTop:'4%',
    marginLeft: '25%',
    fontSize: 30,
    color: '#ffffff',
    fontWeight: '500',
    fontWeight: 'bold',
    fontFamily: 'Roboto-Medium',
  },
});