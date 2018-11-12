import React from 'react';
import {
    Image,
    Dimensions,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    Alert,
    ListView,
    BackHandler,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    FlatList,
    ListItem,
    TouchableHighlight
} from 'react-native';
import * as firebase from 'firebase';
import PropTypes from 'prop-types';
import { FormLabel, Input, Button, FormInput, FormValidationMessage } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Icon } from 'react-native-elements';
//import Accordion from 'react-native-collapsible/Accordion';


// const SECTIONS = [
//     {
//         title: 'First',
//         content: 'Lorem ipsum...'
//     },
//     {
//         title: 'Second',
//         content: 'Lorem ipsum...'
//     }
// ];

export default class StoryList extends React.Component {
    // static propTypes = {
    //     currentUserKids: PropTypes.array.isRequired,
    // };

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            stories: [],
            id: '', coverPicture: '',
            listOfPages: [], number: '',
            pagePicture: '', textBoy: '',
            textGirl: '', name: '',
            numberOfPages: '', sex: '', pages: [],
            storyList :[], pov:[]
            //activeSections: []
        };
    }

    componentWillMount() {
        this.listStories();
        const child = this.props.navigation.state.params.currentChild;
        this.getStoryList(child.id);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }


    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.goBack();
        return true;
    }

  
    getStoryList(item) {
        var currentUserId = firebase.auth().currentUser.uid
        var usersRef = firebase.database().ref('user/' + currentUserId +
          '/child/' + item + '/storyList/');
        usersRef.on('value', (snapshot) => {
          var povesti = [];
          snapshot.forEach((story) => {
            povesti.push({
              id:story.key,
              name: story.val().name,
              currentPage: story.val().currentPage
            })
          })
        
          this.setState({ pov: povesti});
       //   console.log('---------->',this.state.pov);
          return this.state.pov;
        })
      
    
      }

    listStories() {
        var usersRef = firebase.database().ref('story/');
        usersRef.on('value', (snapshot) => {
            var theStories = [];
            snapshot.forEach((story) => {
                theStories.push({
                    id: story.key,
                    coverPicture: story.val().coverPicture,
                    name: story.val().name,
                    descriere: story.val().descriere,
                    sex: story.val().sex,
                    numberOfPages: story.val().numberOfPages,
                    listOfPages: this.getListOfPages(story.key)
                })
            })
            //console.log(theStories)
            this.setState({ stories: theStories });
        })
    }

    getListOfPages(item) {
        var usersRef = firebase.database().ref('story/' + item + '/listOfPages/');
        var pagini
        usersRef.on('value', (snapshot) => {
            pagini = [];
            snapshot.forEach((page) => {
                pagini.push({
                    number: page.val().number,
                    pagePicture: page.val().pagePicture,
                    textBoy: page.val().textBoy,
                    textGirl: page.val().textGirl
                })
            })
            //console.log(usersRef)
            //this.setState({ pages: pagini });  
        })
        return pagini
    }


    returnStories() {
        return (<FlatList
            style={styles.listContainer}
            data={this.state.stories}
            keyExtractor={item => item.id}
            renderItem={this._renderItem}
        />
        );
    }

    progressBar(item) {
        const child = this.props.navigation.state.params.currentChild;
        var sw = 0;
        var currPage;
        var nrOfpages = item.numberOfPages;
        var lista=[];
        lista=this.state.pov;
        child.list=[];
        lista.forEach(element=>{
            this.props.navigation.state.params.currentChild.list.push(element);
        })
       // console.log('***********>',child.list);
        child.list.forEach(element => {
            if (element.name == item.name) {
                sw = 1;
                currPage = element.currentPage;
            }
        })
        var value = currPage / nrOfpages;
        var width = value * (Dimensions.get('window').width - 60);
        if (sw) {
            return (
                <View style={{ marginLeft: '3%', marginRight: '3%' }}>
                    <View style={{
                        marginBottom: 10,
                        width: '100%',
                        borderWidth: 1,
                        borderColor: '#a6c1ee',
                    }}>
                        <Text style={{
                            color: '#333',
                            width: width,
                            backgroundColor: '#a6c1ee',
                            height: 20,
                            fontSize: 14
                        }}>{currPage} / {item.numberOfPages}
                        </Text>
                    </View>
                </View>
            );
        }
        // else {
        //     return (
        //         <View style={{ marginLeft: '3%', marginRight: '3%' }}>
        //         <View style={{
        //             marginBottom: 10,
        //             width: '100%',
        //             borderWidth: 1,
        //             borderColor: '#a6c1ee',
        //         }}>
        //         <Text style={{
        //             fontSize:14,
        //             color:'#f0f0f0',
        //             marginLeft:5,
        //         }}
        //         >0 / {item.numberOfPages}</Text>
        //         </View>
        //     </View>
        //     );
        // }
    }

    // _renderSectionTitle = section => {
    //     return (
    //         <View>
    //             <Text>{section.content}</Text>
    //         </View>
    //     );
    // };

    // _renderHeader = section => {
    //     return (
    //         <View >
    //             <Text >{section.title}</Text>
    //         </View>
    //     );
    // };

    // _renderContent = section => {
    //     return (
    //         <View>
    //             <Text>{section.content}</Text>
    //         </View>
    //     );
    // };

    // _updateSections = activeSections => {
    //     this.setState({ activeSections });
    // };


    _renderItem = ({ item }) => (
        <TouchableWithoutFeedback onPress={() => { this._onPressItem(item) }}>
            <View style={{ marginTop: 10 }}>
                {<Image
                    style={styles.avatar}
                    source={{ uri: item.coverPicture }} />}
                <View style={{ backgroundColor: '#521987', borderWidth: 1, borderTopWidth: 0, borderTopStartRadius: 0, borderTopEndRadius: 0, borderRadius: 10, }}>
                    {/* <Text style={{ fontSize: 28, color: 'white',marginLeft:'3%', fontWeight: '400', marginTop: 10}}>{item.name}</Text> */}
                    <Text style={{ fontSize: 22, color: 'white', marginLeft: '3%', fontWeight: '400', marginBottom: 10 }}>Progres:</Text>
                    {this.progressBar(item)}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );

    _onPressItem = (currentPage) => {
        this.props.navigation.navigate('StoryDetail', {
            currentPage: currentPage,
            currentChild: this.props.navigation.state.params.currentChild
        })
        // console.log('dasd', currentPage);
    };

    render() {
        //setting a const that holds the child object 
        const child = this.props.navigation.state.params.currentChild;
        return (
            <View style={styles.container}>
                <View style={styles.containerText}>
                    <TouchableOpacity
                        onPress={this.handleBackButtonClick.bind(this)}
                        style={{
                            marginTop: '5%',
                            marginRight: '15%',
                            width: 45,
                            height: 45,
                            backgroundColor: '#521987',
                            borderRadius: 100,
                        }}
                    >
                        <Icon name={"arrow-back"} size={30} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Raft de carti</Text>
                </View>
                {this.returnStories()}
                {/* <Accordion
        sections={SECTIONS}
        activeSections={this.state.activeSections}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        onChange={this._updateSections}
      /> */}
                {/* <Text style={{ color: '#fa3d41' }}>{child.name}</Text> */}
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
        marginLeft: '5%',
        marginRight: '5%'
    },
    containerText: {
        marginTop: 23,
        backgroundColor: '#521987',
        height: 65,
        width: '100%',
        flexDirection: 'row',
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
        marginTop: 5,
    },
});
