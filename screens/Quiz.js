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



export default class Story extends React.Component {
    constructor(props) {
        super(props);
        this.state = { answer1: '', answer2: '', answer3: '', answer4: '' };
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

    answerQuiz() {
        const { answer1, answer2, answer3, answer4 } = this.state;
        this.setState({
            answer1: story.answers[0].answer,
            answer2: story.answers[1].answer,
            answer3: story.answers[2].answer,
            answer4: story.answers[3].answer
        });
    }


    render() {
        story = this.props.navigation.state.params.currentPage
        console.log(story.answers[0])
        return (
            <View style={styles.container}>
                <View style={styles.containerText}>
                    <TouchableOpacity
                        onPress={this.handleBackButtonClick.bind(this)}
                        style={{
                            marginTop: '5%',
                            marginRight: '8%',
                            width: 45,
                            height: 45,
                            backgroundColor: '#521987',
                            borderRadius: 100,
                        }}
                    >
                        <Icon name={"arrow-back"} size={30} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Intrebari poveste</Text>
                </View>
                <View style={{marginTop:'5%',marginLeft:'5%', marginRight:'5%'}}>
                   <View style={{marginBottom:'3%'}}>
                    <Text style={styles.question}>{story.questions[0].questions}</Text>
                    <Text style={styles.answer}>{this.state.answer1}</Text>
                   </View>
                   <View style={{marginBottom:'3%'}}>
                    <Text style={styles.question}>{story.questions[1].questions}</Text>
                    <Text style={styles.answer}>{this.state.answer2}</Text>
                   </View>
                   <View style={{marginBottom:'3%'}}>
                    <Text style={styles.question}>{story.questions[2].questions}</Text>
                    <Text style={styles.answer}>{this.state.answer3}</Text>
                   </View>
                   <View style={{marginBottom:'3%'}}>
                    <Text style={styles.question}>{story.questions[3].questions}</Text>
                    <Text style={styles.answer}>{this.state.answer4}</Text>
                   </View>
                </View>
                <Button onPress={this.answerQuiz.bind(this)}
                    title='Afiseaza raspunsurile'
                    buttonStyle={styles.button}
                    textStyle={{ color: "#FFFFFF", fontSize: 24, fontWeight: '300' }}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#7f7fd5',
        flex: 1,
    },
    containerText: {
        marginTop: 23,
        backgroundColor: '#521987',
        height: 65,
        width: '100%',
        flexDirection: 'row',
    },
    listContainer: {
        marginLeft: '5%',
        marginRight: '5%'
    },
    button: {
        backgroundColor: "#521987",
        width: 300,
        height: 55,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 25,
        marginTop: 120,
        titleSize: 24,
        alignSelf:'center'
    },
    title: {
        marginTop: '4%',
        fontSize: 30,
        color: '#ffffff',
        fontWeight: '500',
        fontWeight: 'bold',
    },
    question:{
        fontSize: 22,
        color: '#f0f0f0'
    },
    answer:{
        fontSize: 18,
        color: '#111',
        marginTop:'1%'
    }
});
