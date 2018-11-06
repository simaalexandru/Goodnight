


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
    TouchableHighlight
  } from 'react-native';
  import * as firebase from 'firebase';
  import PropTypes from 'prop-types';
  import { FormLabel, Input, Button, FormInput, FormValidationMessage } from 'react-native-elements';
  import DatePicker from 'react-native-datepicker';
  import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
  
  
  export default class HomeScreen extends React.Component {
    static propTypes= {
        currentUserKids: PropTypes.array.isRequired,
      };
  
    constructor(props) {
      super(props);
    }

    render() {  
      //setting a const that holds the child object 
      const child = this.props.navigation.state.params.currentChild;
      return (
        <View style={styles.container}>
          <Text> Child Info</Text>
          <Text>{child.list[0].currentPage}</Text>
        </View>
      );
    }
  }
  
  
  
  const styles = StyleSheet.create({
 
  });
  