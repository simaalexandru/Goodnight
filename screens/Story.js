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
        this.state = { 'index': 0,'exists':0,'storyIndex':0};
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    static navigationOptions = {
        header: null,
    };

    componentWillMount() {
        // const story = this.props.navigation.state.params.currentPage;
        // const child = this.props.navigation.state.params.currentChild;
        if(this.props.navigation.state.params.currentChild.list.length){
            this.props.navigation.state.params.currentChild.list.forEach(element => {
            if(element.name==this.props.navigation.state.params.currentPage.name){
                this.setState({ index: element.currentPage-1, exists:1,
                storyIndex:element.id });
            }
        });
     }
     BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    
        // if(this.state.exists===1){
            
            
        // }
        // else
        // {
            
        // }
    }

    handleBackButtonClick() {
       var sw=1;
            this.props.navigation.state.params.currentChild.list.forEach(element => {
                
            if(element.name===this.props.navigation.state.params.currentPage.name){
                sw=0;
                console.log('egaaal', element.name, this.props.navigation.state.params.currentPage.name)
                var currentUserId = firebase.auth().currentUser.uid;
                firebase.database().ref('user/' + currentUserId +
                '/child/' + this.props.navigation.state.params.currentChild.id + '/storyList/'
                + this.state.storyIndex+ '/').update({
                    currentPage: this.state.index+1
                });
            }
          
        });

        if(sw===1){
            console.log('NU egaaal',  this.props.navigation.state.params.currentPage.name)
            var currentUserId = firebase.auth().currentUser.uid;
        firebase.database().ref('user/' + currentUserId +
        '/child/' + this.props.navigation.state.params.currentChild.id + '/storyList/').push({
            name:this.props.navigation.state.params.currentPage.name,
            currentPage:this.state.index+1
        })
        }
     
        this.props.navigation.goBack(null);
        return true;
    }





    displayStoryText() {
        const { navigate } = this.props.navigation;
        const story = this.props.navigation.state.params.currentPage;
        const child = this.props.navigation.state.params.currentChild;
        if (child.sex == "Baiat") {
            var replacement = story.listOfPages[this.state.index].textBoy.replace(/Inlocuit/gi,this.props.navigation.state.params.currentChild.name);
            if (this.state.index < (story.numberOfPages-1) && this.state.index>0) {
                return (
                    <View style={{marginTop:'5%', marginLeft:'5%', marginRight:'5%'}}>
                     <ScrollView style={{height:200}}>
                      <Text style={styles.storyText}>{replacement}</Text>
                      </ScrollView>
                      <View style={styles.buttonContainer}>
                       <Button onPress={this.prevPage.bind(this)}
                           title='<'
                           buttonStyle={styles.buttonPrevious}
                           />
                      <Button onPress={this.nextPage.bind(this)}
                       title='>'
                       buttonStyle={styles.buttonNext}
                       />
                       </View>
                    </View>
                )
            }
            else 
            if(this.state.index==0){
                return (
                    <View style={{marginTop:'5%', marginLeft:'5%', marginRight:'5%'}}>
                      <ScrollView style={{height:200}}>
                      <Text style={styles.storyText}>{replacement}</Text>
                      </ScrollView>
                      <View style={styles.buttonContainerFirst}>
                      <Button onPress={this.nextPage.bind(this)}
                       title='>'
                       buttonStyle={styles.buttonNext}
                       />
                     </View>
                    </View>
                )
            }
            else
            if(this.state.index == story.numberOfPages-1){
                return (
                    <View style={{marginTop:'5%', marginLeft:'5%', marginRight:'5%'}}>
                      <ScrollView style={{height:200}}>
                      <Text style={styles.storyText}>{replacement}</Text>
                      </ScrollView>
                      <View style={styles.buttonContainerLast}>
                       <Button onPress={this.prevPage.bind(this)}
                           title='<'
                           buttonStyle={styles.buttonPrevious}
                           />
                       </View>
                    </View>
                )
            }

        
        } else {
           var replacement = story.listOfPages[this.state.index].textGirl.replace(/Inlocuit/gi,this.props.navigation.state.params.currentChild.name);
                if (this.state.index < (story.numberOfPages-1) && this.state.index>0) {
                    return (
                        <View style={{marginTop:'5%', marginLeft:'5%', marginRight:'5%'}}>
                          <ScrollView style={{height:200}}>
                          <Text style={styles.storyText}>{replacement}</Text>
                          </ScrollView>
                          <View style={styles.buttonContainer}>
                          <Button onPress={this.prevPage.bind(this)}
                               title='<'
                               buttonStyle={styles.buttonPrevious}
                               />
                          <Button onPress={this.nextPage.bind(this)}
                           title='>'
                           buttonStyle={styles.buttonNext}
                           />
                         </View>
                        </View>
                    )
                }
                else 
                if(this.state.index==0){
                    return (
                        <View style={{marginTop:'5%', marginLeft:'5%', marginRight:'5%'}}>
                          <ScrollView style={{height:200}}>
                          <Text style={styles.storyText}>{replacement}</Text>
                          </ScrollView>
                          <View style={styles.buttonContainerFirst}>
                          <Button onPress={this.nextPage.bind(this)}
                           title='>'
                           buttonStyle={styles.buttonNext}
                           />
                         </View>
                        </View>
                    )
                }
                else
                if(this.state.index == story.numberOfPages-1){
                    return (
                        <View style={{marginTop:'5%', marginLeft:'5%', marginRight:'5%'}}>
                         <ScrollView style={{height:200}}>
                          <Text style={styles.storyText}>{replacement}</Text>
                          </ScrollView>
                          <View style={styles.buttonContainerLast}>
                           <Button onPress={this.prevPage.bind(this)}
                               title='<'
                               buttonStyle={styles.buttonPrevious}
                               />   
                          </View>        
                        </View>
                    )
                }
        }
    }


   nextPage(){
    this.setState({ index: this.state.index+1 });
       //console.log(this.state.index);
       this.displayStoryText();
   }

   prevPage(){
    this.setState({ index: this.state.index-1 });
       this.displayStoryText();
   }

    render() {
        const { navigate } = this.props.navigation;

        //setting a const that holds the child object 
        // const child = this.props.navigation.state.params.currentChild;
        const story = this.props.navigation.state.params.currentPage;
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
                <Image
                    style={styles.avatar}
                    source={{ uri: story.listOfPages[this.state.index].pagePicture }} />
                {this.displayStoryText()}
            
            </View>
        );
    }
}


const styles = StyleSheet.create({
    // listContainer: {
    //     marginTop: '10%',
    //     marginLeft: '5%',
    //     marginRight: '5%'
    // },
    container:{
        backgroundColor:'#7f7fd5',
        flex:1,
    },
    containerText: {
        marginTop: 23,
        backgroundColor: '#521987',
        height: 65,
        width: '100%',
        flexDirection: 'row',
    },
    title: {
        marginTop:'4%',
        fontSize: 30,
        color: '#ffffff',
        fontWeight: '500',
        fontWeight: 'bold',
    },
    storyText:{
        fontSize:18,
        color:'#FFFFFF'
    },
    buttonContainer:{
      flexDirection:'row', justifyContent:'space-between'
    },
    buttonContainerFirst:{
        flexDirection:'row', justifyContent:'flex-end'
    },
    buttonContainerLast:{
        flexDirection:'row', justifyContent:'flex-start'
    },
    buttonNext:{
        backgroundColor: "rgba(177, 32, 204, 9)",
        width: 50,
        height: 50,
        fontSize:12,
        fontWeight:'bold',
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 25,
        marginBotoom:20,
    },
    buttonPrevious:{
        backgroundColor: "rgba(177, 32, 204, 9)",
        width: 50,
        height: 50,
        fontSize:12,
        fontWeight:'bold',
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 25,
        position: 'fixed',
        marginBottom:20,
    },
    avatar: {
        width: '100%',
        height: 300,
    },
});
