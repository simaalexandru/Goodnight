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
    BackHandler,
    FlatList,
    ListItem,
    TouchableHighlight
} from 'react-native';
import * as firebase from 'firebase';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import { StackNavigation } from 'react-navigation';
import { Icon } from 'react-native-elements';
import ls from 'react-native-local-storage';



export default class StoryDetail extends React.Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    static navigationOptions = {
        header: null,
    };

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

    _onPressStory() {
        const { navigate } = this.props.navigation;
        this.props.navigation.navigate('Story', {
            currentPage: this.props.navigation.state.params.currentPage,
            currentChild: this.props.navigation.state.params.currentChild
        })
    };

    render() {
        //transferring data through props
        const story = this.props.navigation.state.params.currentPage;
        const child = this.props.navigation.state.params.currentChild;
        return (
            <View style={styles.container}>
                <View style={styles.containerText}>
                <TouchableOpacity
                        onPress={this.handleBackButtonClick.bind(this)}
                        style={{
                            marginTop: '5%',
                            marginLeft:'2%',
                            width: 45,
                            height: 45,
                            backgroundColor: '#3F3470',
                            borderRadius: 100,
                        }}
                    >
                        <Icon name={"arrow-back"} size={30} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.title}>{story.name}</Text>
                    <TouchableOpacity
                        onPress={this.logout.bind(this)}
                        style={{ marginTop: '5%', backgroundColor: '#3F3470', marginLeft:'14%'}}
                      >
                      <Icon name={"exit-to-app"} size={30} color="#fff" />
                    </TouchableOpacity>
                </View>
                 <Image
                    style={styles.avatar}
                    source={{ uri: story.coverPicture }} /> 
                <ScrollView style={{ marginLeft: '5%', marginRight: '5%', marginTop:'2%'}}>
                  <Text style={styles.description}>Descriere poveste</Text>  
                  <Text style={styles.descriptionText}>{story.description}</Text>
                  <View style={{ flexDirection:'row', justifyContent:'space-between', marginTop:'5%'}}>
                  <View style={{ flexDirection:'column'}}>
                    <Text style={{fontFamily:'Roboto', fontSize:18, color:'#f0f0f0', alignSelf:'center'}}>Numar de pagini</Text> 
                    <Text style={{fontFamily:'Roboto-Thin',fontSize:32, color:'#f0f0f0', alignSelf:'center'}}>{story.numberOfPages}</Text>  
                 </View>
                 <View style={{ flexDirection:'column'}}>
                    <Text style={{fontFamily:'Roboto', fontSize:18, color:'#f0f0f0', alignSelf:'center'}}>Varsta recomandata</Text> 
                    <Text style={{fontFamily:'Roboto-Thin',fontSize:32, color:'#f0f0f0', alignSelf:'center'}}>{story.recommendedAge}</Text>  
                 </View>
                 </View>
                <Button onPress={this._onPressStory.bind(this)}
                 title='Citeste povestea'
                 buttonStyle={styles.button}
                 textStyle={{fontFamily:'Roboto', color: "#FFFFFF", fontSize: 24, fontWeight: '300' }}
                    />
                </ScrollView>
          </View>
        );
    }
}




const styles = StyleSheet.create({
    container: {
        backgroundColor: '#7f7fd5',
        flex: 1
    },
    containerText: {
        marginTop: 23,
        backgroundColor: '#3F3470',
        height: 65,
        width: '100%',
        flexDirection: 'row',
    },
    containerInfo: {
        flexDirection:'column'
    },
    descriptionText:{
     color:'#f0f0f0',
     fontFamily:'Roboto'
    },
    description:{
        color:'#f0f0f0',
        fontFamily:'Roboto',
        fontSize:18,
        marginBottom:'1%',
    },
    button: {
        backgroundColor: "#3F3470",
        width: 300,
        height: 55,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 25,
        marginTop:10,
        titleSize: 24
    },
    backButton:{
        marginTop: '5%',
        marginRight: '15%',
        width: 45,
        height: 45,
        backgroundColor: '#3F3470',
        borderRadius: 100,
    },
    title: {
        marginTop: '4%',
        fontSize: 30,
        color: '#ffffff',
        fontWeight: '500',
        fontWeight: 'bold',
        marginLeft:'11%',
        fontFamily:'Roboto',
    },
    avatar: {
        width: '100%',
        height: 330,
    },
});
