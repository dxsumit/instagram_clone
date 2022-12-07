import React, {useState, useLayoutEffect} from 'react';
import {View, LogBox } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from '@rneui/themed';
import { Avatar } from '@rneui/base';
import HomeTab from './screens/Home';
import Explore from './screens/Explore';
import Notifications from './screens/Notification';
import Profile from './screens/Profile';
import Reels from './screens/Reels';
import Login from './screens/Login';
import SignUP from './screens/SignUP';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config";

LogBox.ignoreLogs([
  'AsyncStorage has been extracted from react-native core and will be removed in a future release.',
  'Non-serializable values were found in the navigation state',
]);


// Bottom nativator start point of the App..
const Tab = createBottomTabNavigator();

const App = () => {

  const [visible, setVisible] = useState(false);

  useLayoutEffect( ()=> {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if(user){
          setVisible(false);
          
        }
      });

      return unsubscribe;
  }, []);


  if(visible) {
      return (
        <View style={{flex: 1}}>
          <AuthStack setVisible={(visible) => setVisible(visible)}/>
        </View>
      ) 
  } else {

    return (
      // <Home />
      <NavigationContainer>
        <Tab.Navigator screenOptions={{headerShown: false}} initialRouteName="HomeTab">
          
          <Tab.Screen name='HomeTab' component={HomeTab} 
            initialParams={{setVisible: (value) => setVisible(value) }}
            options={{
              tabBarShowLabel: false,
              tabBarIcon: () => (
                <Icon
                  name='home'
                  type='foundation'
                  size={29}
                />
              ),
            }}
          />
          <Tab.Screen name='Explore' component={Explore} 
            options={{
              tabBarShowLabel: false,
              tabBarIcon: () => (
                <Icon
                  name='search'
                  type='feather'
                  size={27}
                />
              ),
            }}
          />
          <Tab.Screen name='Reels' component={Reels} 
            options={{
              tabBarShowLabel: false,
              tabBarIcon: () => (
                <Icon
                  name='video'
                  type='octicon'
                  size={28}
                />
              ),
            }}
          />
          <Tab.Screen name='Notifications' component={Notifications} 
            options={{
              tabBarShowLabel: false,
              tabBarIcon: () => (
                <Icon
                  name='hearto'
                  type='antdesign'
                  size={26}
                />
              ),
            }}
          />
          <Tab.Screen name='Profile' component={Profile} 
            options={{
              tabBarShowLabel: false,
              tabBarIcon: () => (
                <Avatar 
                  rounded
                  size={27}
                  source={{uri: "https://picsum.photos/id/1005/300/300"}}
                />
              ),
            }}
          />
  
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}



const AuthStack = ({setVisible}) => {
  const Log = createStackNavigator();
  return (
    <NavigationContainer>
      <Log.Navigator screenOptions={{
          // headerShown: false
          headerTransparent: true, 
          title: ""
        }}
      >
        <Log.Screen  name='Login' component={Login} initialParams={{setVisible: (value) => setVisible(value) }}/>
        <Log.Screen  name='SignUP' component={SignUP} initialParams={{setVisible: (value) => setVisible(value) }} />
      
      </Log.Navigator>
    </NavigationContainer>
    );
  }


export default App;

