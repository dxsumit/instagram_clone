import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, Image, TextInput, KeyboardAvoidingView, LogBox } from "react-native";
import { Button, Icon } from "@rneui/themed";
import * as yup from 'yup'
import { Formik } from 'formik'
import { auth, db } from "../config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore"; 


// LogBox.ignoreLogs([
//     'AsyncStorage has been extracted from react-native core and will be removed in a future release.',
//     'Non-serializable values were found in the navigation state',
//   ]);


const SignUP = ({route}) => {

    const randomProfilePic = async () => {
        try {
            const url = 'https://randomuser.me/api';
            const response = await fetch(url)
            const result = await response.json()

            return result.results[0].picture.large
        }
        catch(e){
            alert(e.message);
        }
    }

    // call this function from formik, for creating new user..
    const onSignUp = async (email, password, username) => {

        // this part of the code is important for running and initialising the firestore database.
        // 
        // await addDoc(collection(db, "users"), {
        //     username: username,
        //     email: email,
        //     profilePic: await randomProfilePic(),
        // });



        // try {
        //     await createUserWithEmailAndPassword(auth, email, password);
        //     console.log('User Created..');

            route.params.setVisible(false);
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                updateProfile(userCredential.user, {
                    displayName: username, 
                    email: email,
                    profilePic: randomProfilePic()

                }).then(() => {
                    console.log("profile Updated");

                }).catch((err) => {
                    console.log("Could Not update user");
                    console.log(err.message);
                });

            })
            .catch( (error => {
                alert(error.message);
            }))

    }

    const LOGO = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png"

    const SignUpValidationSchema = yup.object().shape({
        phone_email: yup
                    .string()
                    .min(10, "enter valid input.")
                    .required(),
        
        name: yup
            .string()
            .max(20, 'Caption limit has been reached.')
            .required(),
            
        user: yup
            .string()
            .max(20, 'Caption limit has been reached.')
            .required(),

        pasword: yup
            .string()
            .min(8, 'password should be atleast of 8 characters')
            .required()
    })

    return (
        <Formik
            initialValues={{
                phone_email: "",
                name: "",
                user: "",
                pasword: "",
            }}
            onSubmit={(values) => {
                onSignUp(values.phone_email, values.pasword, values.user)          
            }}
            validationSchema={SignUpValidationSchema}
            // validateOnMount={true}
        >

        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit, handleBlur }) => (
            <KeyboardAvoidingView style={styles.container} behavior='padding'> 
                
                <Image 
                    style={styles.logo}
                    source={{uri: LOGO}}
                />
               
                <Button
                    // title="Button"
                    buttonStyle={{
                        backgroundColor: '#1e90ff',
                        borderRadius: 7,
                    }}
                    containerStyle={{
                        width: 300,
                        marginHorizontal: 50,
                        marginVertical: 20,
                    }}
                >
                    <Icon type="antdesign" name="facebook-square" color="white" />
                    <Text style={{color: "#fff", fontSize: 16, fontWeight: '600'}}> Continue with Facebook </Text>
                </Button>
                
                
                
                <Text style={{color: "#A8A8A8", fontSize: 17, fontWeight: '600'}} > OR </Text>
                

                <View style={styles.formContainer}>
                    
                    <View style={styles.inputField}>
                        <TextInput 
                            placeholder="Mobile number or email"
                            style={styles.input}
                            onChangeText={handleChange('phone_email')}
                            onBlur={handleBlur('phone_email')}
                            value={values.phone_email}
                        />
                    </View>
                    {errors.phone_email && (
                        <Text style={{fontSize: 13, fontStyle: 'italic', color: "#ff0038"}}>
                            this is a required field
                        </Text>
                    )}
                 

              
                    <View style={styles.inputField}>
                        <TextInput 
                            placeholder="Full Name"
                            style={styles.input}
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                        />
                    </View>
                    {errors.name && (
                        <Text style={{fontSize: 13, fontStyle: 'italic', color: "#ff0038"}}>
                            {errors.name}
                        </Text>
                    )}
                    

                    
                    <View style={styles.inputField}>
                        <TextInput 
                            placeholder="Username"
                            style={styles.input}
                            onChangeText={handleChange('user')}
                            onBlur={handleBlur('user')}
                            value={values.user}
                        />
                    </View>
                    {errors.user && (
                        <Text style={{fontSize: 13, fontStyle: 'italic', color: "#ff0038"}}>
                            {errors.user}
                        </Text>
                    )}
                   
                    <View style={styles.inputField}>
                        <TextInput 
                            placeholder="Password"
                            style={styles.input}
                            onChangeText={handleChange('pasword')}
                            onBlur={handleBlur('pasword')}
                            value={values.pasword}
                        />
                    </View>
                    {errors.pasword && (
                        <Text style={{fontSize: 13, fontStyle: 'italic', color: "#ff0038"}}>
                            {errors.pasword}
                        </Text>
                    )}
                    
                    
                    <Button
                        title="Sign up"
                        buttonStyle={styles.loginBtn(isValid)}
                        containerStyle={{
                            marginTop: 30,
                        }}
                        onPress={handleSubmit}
                    />
            
                </View>
            
                <View style={styles.signUP}>
                    <Text style={{color: '#A8A8A8'}} >By signinig up, you agree to our terms, Data Policy and Cookies Policy. </Text>
                </View>

            </KeyboardAvoidingView> )
        }
        </Formik>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#fff",
        paddingTop: 100,
    },
    formContainer: {
        marginTop: 30,
        width: 300,
    },
    inputField: {
        width: "100%",
        marginVertical: 5,
        backgroundColor: '#F5F5F5', 
        padding: 7, 
        borderRadius: 5, 
        borderWidth: 1, 
        borderColor: '#E0E0E0',
    },
    logo: {
        height: 80,
        width: 150,
        resizeMode: 'contain',
    },
    // styling as fucntions 
    loginBtn: (isValid) => ({
        backgroundColor: isValid ? '#1e90ff' : '#72A0C1',
        borderRadius: 7,
    }),
    signUP: {
        width: 250,
        paddingTop: 30,
        alignItems: 'center'
    }
})

export default SignUP;
