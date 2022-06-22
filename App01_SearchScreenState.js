import * as React from 'react';
import { useState } from 'react';
import { Button, View, StyleSheet, Text, ScrollView, SafeAreaView, Image, TouchableOpacity, TouchableHighlight, Dimensions, FlatList, TextInput, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

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

// DETAILS
function DetailsScreen({ route, navigation }) {
  const { itemId } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image style={styles.imgDetail} source={{uri: itemId}}/>
    </View>
  );
}

const knafehProfilePic = 'https://www.dropbox.com/s/9egchibv56pk8fe/jj_circle.png?dl=1';

// PROFILE
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

// SEARCH SCREEN

function SearchScreen({ route, navigation }) {
  const [spinnerDisplay, setSpinnerDisplay] = useState("none");
  const [resultsDisplay, setResultsDisplay] = useState("none");
  const [searchBarEditable, setSearchBarEditable] = useState(true);
  const [searchBarBackground, setSearchBarBackground] = useState("white");
  const [userQuery, setUserQuery] = useState("");
  return (
    <SafeAreaView>
      <TextInput
        style={{borderWidth: 5, backgroundColor: searchBarBackground, margin: 5, padding: 5, fontSize: 24}}
        editable={searchBarEditable}
        onChangeText={(newText) => {setUserQuery(newText)}}
      >
      </TextInput>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setSpinnerDisplay("block"); setResultsDisplay("none");
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
            setResultsDisplay("block"); setSpinnerDisplay("none");
            setSearchBarEditable("true");
            setSearchBarBackground("white");
          }}
        >
          <Text>Finish Loading Please!</Text>
        </TouchableOpacity>
      </View>
      <View style={{alignItems: 'center', display: resultsDisplay }}>
        <Text style={styles.centeredText}>Here are your results for your query "{userQuery}" :)</Text>
      </View>
    </SafeAreaView>
  )
}

// RESULTS SCREEN

function ResultsScreen({ route, navigation }) {
  const { itemId } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      //<Image style={styles.imgDetail} source={{uri: itemId}}/>
      <Text>Here are your results :)</Text>
    </View>
  );
}

// PROFILE STACK

const ProfileStack = createNativeStackNavigator();
function ProfileStackScreen({ navigation, route}) {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile Screen" component={ProfileScreen} />
      <ProfileStack.Screen name="Edit Profile Screen" component={EditProfileScreen} />
    </ProfileStack.Navigator>
  );
}

// SEARCH STACK

const SearchStack = createNativeStackNavigator();
function SearchStackScreen({ navigation, route}) {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Search Screen" component={SearchScreen} />
      <SearchStack.Screen name="Results Screen" component={ResultsScreen} />
    </SearchStack.Navigator>
  )
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
  spinner: {
    alignItems: 'center',
  }
});
