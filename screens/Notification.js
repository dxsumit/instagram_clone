import React from "react";
import { View, Text, StyleSheet  } from "react-native";


const Notifications = () => {

    return (
        <View style={styles.container}> 
            <Text> This is Notifications Screen </Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default Notifications;

