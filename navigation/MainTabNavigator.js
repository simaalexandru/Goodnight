import React from 'react';
import { Platform, View, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LoginScreen from '../screens/LoginScreen';
import StoryScreen from '../screens/StoryScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AddChild from '../screens/AddChild';
import StoryList from '../screens/StoryList';
import Story from '../screens/Story';
import StoryDetail from '../screens/StoryDetail';
import EditChild from '../screens/EditChild';
import Quiz from '../screens/Quiz';

const HomeStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
  Home: HomeScreen,
  AddChild: AddChild,
  StoryList: StoryList,
  Story: Story,
  StoryDetail: StoryDetail,
  EditChild: EditChild,
  Quiz: Quiz
});

HomeStack.navigationOptions = {
  // tabBarLabel: 'Home',
  // tabBarIcon: ({ focused }) => (
  //   <TabBarIcon
  //     focused={focused}
  //     name={
  //       Platform.OS === 'ios'
  //         ? `ios-information-circle${focused ? '' : '-outline'}`
  //         : 'md-information-circle'
  //     }
  //   />
  // ),
  tabBarVisible: false,
 
};






const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
  tabBarVisible: false,

};

const StoryStack = createStackNavigator({
  Story: StoryScreen,
});

StoryStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
  tabBarVisible: false,

};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
  StoryStack,
});
