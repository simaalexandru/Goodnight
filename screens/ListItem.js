import React, {Component} from 'react'
import {
  View,
  TouchableHighlight,
  Text,
} from 'react-native';


export default class ListItem extends Component {
 render() {
  return (
   <TouchableHighlight onPress={this.props.onPress}>
    <View>
     <Text>{this.props.item.name}</Text>
    </View>
   </TouchableHighlight>
  );
 }
}