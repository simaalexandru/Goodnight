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
                        style={styles.backButton}
                    >
                        <Icon name={"arrow-back"} size={30} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.title}>{story.name}</Text>
                </View>
                <Image
                    style={styles.avatar}
                    source={{ uri: story.coverPicture }} />
                <View style={{ marginLeft: '5%', marginRight: '5%', marginTop:'2%',}}>
                    <Text style={{color:'#ffffff', fontSize:'16'}}>Descriere poveste</Text> 
                    <Text style={styles.description}>{story.descriere}</Text>
                  <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:'3%', marginBottom:'5%'}}>
                     <View style={{flexDirection:'column'}}>
                     <Text style={{color:'#ffffff', fontSize:'16', alignSelf:'center'}}>
                       Numar de pagini
                    </Text> 
                    <Text style={{color:'#ffffff', fontSize:'32', alignSelf:'center'}}>
                      {story.numberOfPages}
                    </Text> 
                    </View>
                    <View style={{flexDirection:'column'}}>
                     <Text style={{color:'#ffffff', fontSize:'16',alignSelf:'center'}}>
                       Varsta recomandata
                    </Text> 
                    <Text style={{color:'#ffffff', fontSize:'32', alignSelf:'center'}}>
                      3-5
                    </Text> 
                    </View>
                  </View>
              
                    <Button onPress={this._onPressStory.bind(this)}
                        title='Citeste povestea'
                        buttonStyle={styles.button}
                        textStyle={{ color: "#FFFFFF", fontSize: 24, fontWeight: '300' }}
                    />
              
                </View>
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
        backgroundColor: '#521987',
        height: 65,
        width: '100%',
        flexDirection: 'row',
    },
    description: {
        color: '#ffffff',
        fontSize:12,
        marginBottom:'2%'
        
    },
    button: {
        backgroundColor: "#521987",
        width: 300,
        height: 55,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 25,
        marginTop:20,
        titleSize: 24
    },
    backButton:{
        marginTop: '5%',
        marginRight: '15%',
        width: 45,
        height: 45,
        backgroundColor: '#521987',
        borderRadius: 100,
    },
    title: {
        marginTop: '4%',
        fontSize: 30,
        color: '#ffffff',
        fontWeight: '500',
        fontWeight: 'bold',
    },
    avatar: {
        width: '100%',
        height: 300,
    },
});
