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
import { LinearGradient } from 'expo';
import { Icon } from 'react-native-elements';

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
      this.setState({ currentUserKids: copii });
      // console.log(this.state.currentUserKids);
    })
  }

  //opening the ChildInfo screen and transfering child's data
  // _onPressItem = () => {
  //   this.props.navigation.navigate('ChildInfo', {
  //     currentChld: currentChild
  //   })
  // };

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

          this._renderItemGirl = ({ item })
          return (
            <TouchableWithoutFeedback onPress={() => { this._onPressItem(item) }}>
              <LinearGradient
                colors={['#ff9a9e', '#fecfef']}
                style={styles.childStyling}
                start={[0, 0.5]}
                end={[1, 0.5]}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingTop: '8%' }}>
                  {<Image
                    style={styles.avatar}
                    source={require('../assets/images/girl.png')} />}
                  <Text style={styles.nameChild}>{item.name}</Text>
                </View>
                <View style={{ marginTop: '2%', marginRight: '2%' }}>
                  <TouchableOpacity
                    onPress={() => { this._onPressButton(item) }}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 30,
                      height: 30,
                      backgroundColor: '#521987',
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
        else {
          return (
            <TouchableWithoutFeedback onPress={() => { this._onPressItem(item) }}>
              <LinearGradient
                colors={['#30cfd0', '#c3dff5']}
                style={styles.childStyling}
                start={[0, 0.5]}
                end={[1, 0.5]}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingTop: '8%' }}>
                  {<Image
                    style={styles.avatar}
                    source={require('../assets/images/boy.png')} />}
                  <Text style={styles.nameChild}>{item.name}</Text>
                </View>
                <View style={{ marginTop: '2%', marginRight: '2%' }}>
                  <TouchableOpacity
                    onPress={() => { this._onPressButton(item) }}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 30,
                      height: 30,
                      backgroundColor: '#521987',
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
              backgroundColor: '#521987',
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
    backgroundColor: '#521987',
    height: 65,
    width: '100%',
    marginTop: 23
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
    fontSize: 28,
    backgroundColor: 'transparent',
    marginTop: '4%',
    marginLeft: '10%',
    color: '#ffffff',
    fontWeight: 'bold',
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
    marginTop: '4%',
    textAlign: 'center',
    fontSize: 30,
    color: '#ffffff',
    fontWeight: '500',
    fontWeight: 'bold',
  },
});