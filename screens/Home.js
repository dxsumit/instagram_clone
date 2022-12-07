import React, {useLayoutEffect, useEffect} from "react";
import { View, Text, StyleSheet, ScrollView  } from "react-native";
import Header from "../components/Header";
import { createStackNavigator } from '@react-navigation/stack';
import Post from "../components/Post";
import NewPostScreen from "./NewPostScreen";


import { auth, db } from "../config";
import { doc, onSnapshot, collectionGroup, getDocs } from "firebase/firestore";

const Home = ({navigation, route}) => {


  useEffect( () => {
    
      console.log("here.");

      const unsubscribe = onSnapshot(collectionGroup(db, 'post'), (postSnapshot) => {
        postSnapshot.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data());
          });
        });

      
    // When the component is unmounted, we need to unsubscribe from the query so we don't keep getting updates
    return () => unsubscribe();

  }, []);

  useLayoutEffect( () => {
    navigation.setOptions({
      headerShown: false
    });
  }, [navigation])


  return (
    <View style={styles.conatiner}>
      <Header navigation={navigation} setVisible={(value) => route.params.setVisible(value)} />
      {/* <Header navigation={navigation} /> */}
      {/* <Stories /> */}
      <Post />
    </View>
  );

}



const Homestack = createStackNavigator();
const HomeTab = ({route}) => {
  
    return (
      <View style={{flex: 1}} >
        <Homestack.Navigator screenOptions={{
            // headerTransparent: true,
          }}
        >
          <Homestack.Screen  name='Home' component={Home} initialParams={{setVisible: (value) => route.params.setVisible(value) }} />
          <Homestack.Screen  name='New post' component={NewPostScreen}/>
        
        </Homestack.Navigator>
      </View>
    );
  }




const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        marginTop: 20,
    }
});

export default HomeTab;

