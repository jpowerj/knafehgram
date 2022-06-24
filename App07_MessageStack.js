import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, View, StyleSheet, Text, ScrollView, SafeAreaView, Image, TouchableOpacity, TouchableHighlight, Dimensions, FlatList, TextInput, ActivityIndicator } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import axios from 'axios';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

const knafehProfilePic = 'https://www.dropbox.com/s/9egchibv56pk8fe/jj_circle.png?dl=1';
const knafehImages = [
  'https://www.dropbox.com/s/rrtdoufzlgtquxa/jj_morecrop.jpg?dl=1',
  'https://www.dropbox.com/s/wxfe8ctvcvbgboy/jj_hk.jpg?dl=1',
  'https://www.dropbox.com/s/c02frpskmy991xj/jj_cat.jpg?dl=1',
  'https://www.dropbox.com/s/rrtdoufzlgtquxa/jj_morecrop.jpg?dl=1',
  'https://www.dropbox.com/s/wxfe8ctvcvbgboy/jj_hk.jpg?dl=1',
  'https://www.dropbox.com/s/c02frpskmy991xj/jj_cat.jpg?dl=1',
  'https://www.dropbox.com/s/rrtdoufzlgtquxa/jj_morecrop.jpg?dl=1',
  'https://www.dropbox.com/s/wxfe8ctvcvbgboy/jj_hk.jpg?dl=1',
  'https://www.dropbox.com/s/c02frpskmy991xj/jj_cat.jpg?dl=1',
  'https://www.dropbox.com/s/rrtdoufzlgtquxa/jj_morecrop.jpg?dl=1',
  'https://www.dropbox.com/s/wxfe8ctvcvbgboy/jj_hk.jpg?dl=1',
  'https://www.dropbox.com/s/c02frpskmy991xj/jj_cat.jpg?dl=1'
];

// PROFILE SCREEN

function ProfileScreen({ navigation })  {
  return (
    <SafeAreaView style = {{flex: 1}}>
    <ScrollView>
      <View style={styles.container}>
      <Image style={{height: 150, width: 150, padding: 20, borderRadius: 80}} source={{uri:knafehProfilePic}}/>
      <Text style={styles.paragraph}>
        Jeff Jacobs
      </Text>
      <Text>
      1000000 followers
      </Text>
      <Text>
      1 following
      </Text>
      <TouchableOpacity style={{ padding:20, backgroundColor: 'white'}} onPress={() => navigation.navigate('Edit Profile')}>
      <Text> Edit Profile </Text>
      </TouchableOpacity>
    </View>
    <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row'}}>
    <View style={{flexDirection: 'row', justifyContent: 'space-around', padding: 8}}>
    <FlatList horizontal={false} numColumns={3} data={knafehImages} renderItem={({item})=> (
              <TouchableOpacity onPress= {() => navigation.navigate('Details', {itemId: item})}>
  <Image style={{height: screenWidth/3, width: screenWidth/3, borderWidth:1}} source={{uri: item}}/>
  </TouchableOpacity>
    )}/>
    </View>
    </View>
    </ScrollView>
    </SafeAreaView>
    )
}

// EDIT PROFILE SCREEN

function EditProfileScreen({ navigation, route }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text> This is where you can edit my profile! </Text>
    </View>
  )
}

// VIEW IMAGE SCREEN

function ViewImageScreen({ route, navigation }) {
  const { itemId } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image style={styles.imgDetail} source={{uri: itemId}}/>
    </View>
  );
}

// SEARCH SCREEN

function SearchScreen({ navigation, route }) {
  const [spinnerDisplay, setSpinnerDisplay] = useState("none");
  const [searchBarEditable, setSearchBarEditable] = useState(true);
  const [searchBarBackground, setSearchBarBackground] = useState("white");
  const [userQuery, setUserQuery] = useState("");
  return (
    <SafeAreaView>
      <TextInput
        style={{borderWidth: 5, backgroundColor: searchBarBackground, margin: 5, padding: 5, fontSize: 24}}
        editable={searchBarEditable}
        onChangeText={
          (newText) => {setUserQuery(newText);}
        }
      >
      </TextInput>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setSpinnerDisplay("block");
          setSearchBarEditable(false);
          setSearchBarBackground("lightgray");
        }}
      >
        <Text>Search</Text>
      </TouchableOpacity>
      <View style={{alignItems: 'center', display: spinnerDisplay}}>
        <Text style={styles.centeredText}>
          Searching for "{userQuery}"...
        </Text>
        <ActivityIndicator />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setSpinnerDisplay("none");
            setSearchBarEditable("true");
            setSearchBarBackground("white");
            // Ask search API for results
            navigation.navigate("Results Screen", {query: userQuery});
          }}
        >
          <Text>Finish Loading Please!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const dbUrl = "https://knafehgram.herokuapp.com";

const MyItemSeparator = () => {
  return (
    <View style={{backgroundColor: "black", height:1, width:"100%", marginRight: 2}} />
  );
}

// RESULTS SCREEN

function ResultsScreen({ navigation, route }) {
  const query = route.params.query;
  const [results, setResults] = useState([]);
  const [resultsLoaded, setResultsLoaded] = useState(false);
  //console.log("In results screen");
  useEffect(() => {
    if (!resultsLoaded) {
      axios.get(dbUrl, {'query':'Jeff'})
      .then(function(response){
        console.log(response.data);
        setResults(response.data);
        setResultsLoaded(true);
      });
    }
  });
  const goToResult = (resultName) => {
    navigation.navigate("View Result Screen", {name: resultName});
  };
  const renderResult = ({item}) => {
    return (
      <View style={{width: "100%"}}>
        <TouchableOpacity
          onPress={() => {
            goToResult(item.name);
          }}
        >
          <Text style={styles.searchResult}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator style={{display: resultsLoaded ? 'none' : 'block' }} />
        <FlatList 
          data={results}
          renderItem={renderResult}
          keyExtractor={item => item.id}
          style={styles.resultList}
          ItemSeparatorComponent={MyItemSeparator}
        />
    </SafeAreaView>
  );
}

// VIEW RESULT SCREEN

function ViewResultScreen({ navigation, route }) {
  return (
    <View>
      <Text>Viewing {route.params.name}'s profile!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Message Stack",
            {
              screen: "Send Message Screen",
              initial: false,
              params: {recipientName: route.params.name}
            }
          );
        }}>
        <Text>Send {route.params.name} a message</Text>
      </TouchableOpacity>
    </View>
  );
}

// ALL MESSAGES SCREEN

const fakeMessages = [
  {id: "0_1_0", senderName: "Jeff", recipientName: "Alex", text: "Hello how are you?"},
  {id: "0_1_1", senderName: "Jeff", recipientName: "Alex", text: "Did you get my message?"},
  {id: "160_170_0", senderName: "Ammar", recipientName: "Jeff", text: "Let's get a bitiykh!"}
];

function AllMessagesScreen({ navigation, route }) {
  const renderMessage = ({ item }) => { 
    console.log(item);
    const shortText = item.text.slice(0,10) + "...";
    return (
      <View style={styles.searchResult}>
        <Text>From {item.senderName}: {shortText}</Text>
      </View>
    );
  };
  return (
    <View>
      <Text style={styles.uiText}>Here are your messages :)</Text>
      <FlatList
        data={fakeMessages}
        renderItem={renderMessage}
        style={{height:"80%", padding: 5}}
        ItemSeparatorComponent={MyItemSeparator}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Send Message Screen", {recipientName: ""});
        }}
        style={styles.button}
      >
        <Text>Send New Message</Text>
      </TouchableOpacity>
    </View>
  )
}

// READ MESSAGE SCREEN

function ReadMessageScreen({ navigation, route }) {
  return (
    <View>
      <Text>Here is the message from {route.params.message.senderName}: Hi!</Text>
    </View>
  )
}

// SEND MESSAGE SCREEN

function SendMessageScreen({ navigation, route }) {
  return (
    <View>
      <View style={[styles.uiText, {flex: 2, flexDirection: "row"}]}>
        <Text style={{fontSize: 18}}>Message To: </Text>
        <TextInput 
          value={route.params.recipientName}
          style={styles.usernameInput}
        >
        </TextInput>
      </View>
      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: StyleSheet.hairlineWidth,
          marginBottom: 5
        }}
      />
      <TextInput
        style={styles.messageBox}
        multiline={true}
      >
      </TextInput>
      <TouchableOpacity style={styles.button}>
        <Text>Send Message</Text>
      </TouchableOpacity>
    </View>
  )
}

// PROFILE STACK

const ProfileStack = createNativeStackNavigator();
function ProfileStackScreen({ navigation, route}) {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile Screen" component={ProfileScreen} />
      <ProfileStack.Screen name="Edit Profile Screen" component={EditProfileScreen} />
      <ProfileStack.Screen name="View Image Screen" component={ViewImageScreen} />
    </ProfileStack.Navigator>
  );
}

// SEARCH STACK

const SearchStack = createNativeStackNavigator();
function SearchStackScreen({ navigation, route }) {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Search Screen" component={SearchScreen} />
      <SearchStack.Screen name="Results Screen" component={ResultsScreen} />
      <SearchStack.Screen name="View Result Screen" component={ViewResultScreen} />
    </SearchStack.Navigator>
  )
}

// MESSAGE STACK

const MessageStack = createNativeStackNavigator();
function MessageStackScreen({ navigation, route }) {
  return (
    <MessageStack.Navigator>
      <MessageStack.Screen name="All Messages Screen" component={AllMessagesScreen} />
      <MessageStack.Screen name="Read Message Screen" component={ReadMessageScreen} />
      <MessageStack.Screen name="Send Message Screen" component={SendMessageScreen} />
    </MessageStack.Navigator>
  );
}

// TABS

const Tabs = createBottomTabNavigator();
function AppTabs() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name='Profile Stack'
        component={ProfileStackScreen}
        options={{headerShown: false}}
      />
      <Tabs.Screen
        name='Search Stack'
        component={SearchStackScreen}
        options={{headerShown: false}}
      />
      <Tabs.Screen
        name='Message Stack'
        component={MessageStackScreen}
        options={{headerShown: false}}
      />
    </Tabs.Navigator>
  )
}

// MAIN APP

export default function App() {
  return (
    <NavigationContainer>
      <AppTabs />
    </NavigationContainer>
  )
}

// STYLES

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    padding: 5,
    margin: 10,
    alignItems: "center",
  },
  centeredText: {
    padding: 5,
    margin: 5,
    width: "100%",
  },
  container: {
    //flex: 1,
    alignItems: 'center',
    paddingTop: 15,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imgDetail: {
    borderWidth: 10,
    height: 300,
    width: 300,
  },
  messageBox: {
    width: "99%",
    fontSize: 14,
    height: 100,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
    padding: 5,
    margin: 5,
  },
  resultList: {
    width: "100%"
  },
  searchResult: {
    fontSize: 20,
    padding: 4
  },
  spinner: {
    alignItems: 'center',
  },
  uiText: {
    padding: 5,
    margin: 5
  },
  usernameInput: {
    backgroundColor: 'white',
    fontSize: 20
  }
});
