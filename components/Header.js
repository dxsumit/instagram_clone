import React from "react";
import {View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Icon } from '@rneui/themed';
import { signOut } from "firebase/auth";
import { auth } from "../config";

// https://www.freepnglogos.com/uploads/logo-ig-png/logo-ig-stunning-instagram-logo-vector-download-for-new-7.png

// setVisible is coming from App.js
const Header = ({navigation, setVisible}) => {

    const logOut = () => {
        signOut(auth).then( () =>{
            console.log("Signed out!")
            setVisible(true)
            
        }).catch( (err) => {
            alert(err.message)
        });    
    }

    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={logOut}>
                <Image 
                    style={styles.logo}
                    source={{uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png"}}
                />
            </TouchableOpacity>

            <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.iconStyle} onPress={()=> navigation.push('New post')}>
                    <Icon
                        name='diff-added'
                        type='octicon'
                        color='#282C35'
                        size={25}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconStyle}>
                    <Icon
                        name='location-arrow'
                        type='font-awesome'
                        color='#282C35'
                        size={25}
                    />
                    
                </TouchableOpacity>
                

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        color: 'red'
    },  
    headerContainer: {
        // backgroundColor:'red',
        paddingTop: 5, 
        marginHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',    
        alignItems: 'center',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',  
        justifyContent: 'space-between',
        paddingHorizontal: 5,
    },  
    iconStyle: {
        paddingHorizontal: 15,
    },  
    logo: {
        height: 50,
        width: 110,
        resizeMode: 'contain',
    }
});

export default Header;

