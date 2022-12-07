import React from "react";
import { View, Text, StyleSheet  } from "react-native";
import AddNewPost from "../components/AddNewPost";


const NewPostScreen = ({navigation}) => {

    return (
        <View style={styles.conatiner}> 
            <AddNewPost navigation={navigation}/>
        </View>
    );
}


const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        backgroundColor: "#fff"
    }
})

export default NewPostScreen;

