import React from "react";
import { View, StyleSheet, ScrollView  } from "react-native";
import { Avatar, Text } from '@rneui/base';
import USER_DATA from "../data/users";

const Stories = () => {
    return (
        <View style={styles.conatiner}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}    
            >

                { USER_DATA.map((item) => (
                    <View style={styles.storiesContainer} key={item.id} >
                        
                        <Avatar rounded 
                            avatarStyle={{borderWidth: 3, borderColor: "#ffb347"}}
                            size={70}
                            source={{ uri: item.image}}    
                        />
                        <Text style={styles.storyText}> {
                            item.name.length > 8 ? item.name.slice(0,8) + ".." : item.name
                        } </Text>
                    </View>
                ))
                }

                


            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    conatiner: {
        paddingHorizontal: 5,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: "#E0E0E0"
    },
    storiesContainer: {
        paddingHorizontal: 7,
        alignItems:'center',
    },
    storyText: {
        fontSize: 13,
        color: '#787878',
    }

});

export default Stories;

