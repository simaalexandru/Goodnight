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
import Accordion from 'react-native-collapsible/Accordion';
import email from 'react-native-email';
import ls from 'react-native-local-storage';




const SECTIONS = [
    {
        title: 'Ai o idee pentru o poveste?',
        content: 'Ne poti trimite poveste ta pe e-mail. Ne poti trimite ideea povestii iar noi iti vom raspunde in cel mai scurt timp.'
    },
];


export default class StoryList extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            stories: [],
            id: '', coverPicture: '',
            listOfPages: [], number: '',
            pagePicture: '', textBoy: '', recommendedAge: '',
            description: '',
            textGirl: '', name: '',
            numberOfPages: '', sex: '', pages: [],
            storyList: [], pov: [],
            answers: [], ques: [],
            activeSections: []
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
                    id: story.key,
                    name: story.val().name,
                    currentPage: story.val().currentPage
                })
            })
            this.setState({ pov: povesti });
            return this.state.pov;
        })


    }


    getQuestionList(item) {
        var usersRef = firebase.database().ref('/story/' + item + '/questions/');
        var theQuestions = [];
        usersRef.on('value', (snapshot) => {
            snapshot.forEach((question) => {
                theQuestions.push({
                    questions: question.val().question,
                })
            })
            this.setState({ ques: theQuestions });
            // console.log('state->>>>>>>>',this.state.ques)

        })
        return theQuestions;;
    }

    getAnswerList(item) {
        var usersRef = firebase.database().ref('/story/' + item + '/answers/');
        var answers = [];
        usersRef.on('value', (snapshot) => {
            snapshot.forEach((ans) => {
                answers.push({
                    answer: ans.val().answer,
                })
            })
        })
        return answers;
    }

    handleEmail = () => {
        const to = ['simax_west@yahoo.com'] // string or array of email addresses
        email(to, {
            subject: 'Adaugare poveste noua.',
            body: 'Aici ai un template pentru povestea pe care vrei sa o adaugi. Trebuie sa aiba un titlu, o scurta descriere si varsta potrivita micilor cititori. Poti adauga cate pagini doresti, dar minimul este de 5 pagini. Vei primi un e-mail imediat ce povestea ajunge la noi. Va multumim.'
        }).catch(console.error)
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
                    description: story.val().description,
                    recommendedAge: story.val().recommendedAge,
                    numberOfPages: story.val().numberOfPages,
                    listOfPages: this.getListOfPages(story.key),
                    answers: this.getAnswerList(story.key),
                    questions: this.getQuestionList(story.key)
                })
            })
            this.setState({ stories: theStories });
            //console.log(this.state.stories[0].listOfPages)
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
        var lista = [];
        lista = this.state.pov;
        child.list = [];
        lista.forEach(element => {
            this.props.navigation.state.params.currentChild.list.push(element);
        })

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
                            fontFamily: 'Roboto',
                            paddingTop: 2,
                            paddingLeft: 5,
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
        }  else {
            return(
            <View style={{ marginLeft: '3%', marginRight: '3%' }}>
            <View style={{
                marginBottom: 10,
                width: '100%',
                borderWidth: 1,
                borderColor: '#a6c1ee',
            }}>
                <Text style={{
                    fontFamily: 'Roboto',
                    paddingTop: 2,
                    paddingLeft: 5,
                    color: '#f0f0f0',
                    width: width,
                    height: 20,
                    fontSize: 14
                }}>Nu ai inceput cartea
                </Text>
            </View>
        </View>
            )}
    }

    logout() {
        Alert.alert(
            'Log Out',
            'Esti sigur ca vrei sa te deloghezi?',
            [
                { text: 'Da', onPress: () => this.logOutUser() },
                { text: 'Renunta' }
            ],
            { cancelable: true }
        )
    }

    logOutUser() {
        ls.save('email', '')
        ls.save('password', '')

        this.props.navigation.navigate('Login', {
            email: '',
            password: ''
        })
    }

    _renderHeader = section => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{ fontFamily: 'Roboto', fontSize: 16, color: '#f0f0f0', marginTop: 5, marginBottom: 5, marginRight: 5 }}>{section.title}</Text>
                <Icon name={'add-circle-outline'} size={20} color="#fff" />
            </View>
        );
    };

    _renderContent = section => {
        return (
            <View>
                <Text
                    style={{ fontFamily: 'Roboto-Thin', color: '#f0f0f0', alignSelf: 'center', marginTop: 5, marginBottom: 5, marginLeft: '5%', marginRight: '5%' }}
                >{section.content}</Text>
                <Button
                    onPress={this.handleEmail}
                    title='Trimite povestea'
                    buttonStyle={styles.button}
                    textStyle={{ fontFamily: 'Roboto', color: "#FFFFFF", fontSize: 24, fontWeight: '300' }}
                />
            </View>
        );
    };

    _updateSections = activeSections => {
        this.setState({ activeSections });
    };


    _renderItem = ({ item }) => (
        <TouchableWithoutFeedback onPress={() => { this._onPressItem(item) }}>
            <View style={{ marginTop: 10 }}>
                {<Image
                    style={styles.avatar}
                    source={{ uri: item.coverPicture }} />}
                <View style={{ backgroundColor: '#3F3470', borderColor: 'transparent', borderWidth: 1, borderTopWidth: 0, borderTopStartRadius: 0, borderTopEndRadius: 0, borderRadius: 10, }}>
                    {/* <Text style={{ fontSize: 28, color: 'white',marginLeft:'3%', fontWeight: '400', marginTop: 10}}>{item.name}</Text> */}
                    <Text style={{ fontSize: 22, fontFamily: 'Roboto', color: 'white', marginLeft: '3%', fontWeight: '400', marginBottom: 5, marginTop: 5, }}>Progres:</Text>
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
                            marginLeft: '2%',
                            width: 45,
                            height: 45,
                            backgroundColor: '#3F3470',
                            borderRadius: 100,
                        }}
                    >
                        <Icon name={"arrow-back"} size={30} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Raft de carti</Text>
                    <TouchableOpacity
                        onPress={this.logout.bind(this)}
                        style={{ marginTop: '5%', backgroundColor: '#3F3470', marginLeft: '14%' }}
                    >
                        <Icon name={"exit-to-app"} size={30} color="#fff" />
                    </TouchableOpacity>

                </View>
                {this.returnStories()}
                <Accordion
                    sections={SECTIONS}
                    activeSections={this.state.activeSections}
                    renderHeader={this._renderHeader}
                    renderContent={this._renderContent}
                    onChange={this._updateSections}
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
        marginLeft: '5%',
        marginRight: '5%'
    },
    containerText: {
        marginTop: 23,
        backgroundColor: '#3F3470',
        height: 65,
        width: '100%',
        flexDirection: 'row',
    },
    button: {
        backgroundColor: "#3F3470",
        width: 300,
        height: 55,
        alignSelf: 'center',
        marginBottom: 10,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 25,
        marginTop: 10,
        titleSize: 24
    },
    title: {
        marginTop: '4%',
        fontSize: 30,
        color: '#ffffff',
        fontWeight: '500',
        fontWeight: 'bold',
        fontFamily: 'Roboto-Medium'
    },
    avatar: {
        width: '100%',
        height: 320,
        marginTop: 5,
        

    },


});
