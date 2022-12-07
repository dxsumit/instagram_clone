import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, Image, TextInput, Keyboard, LogBox } from "react-native";
import { Button, Icon } from "@rneui/themed";
import * as yup from 'yup'
import { Formik } from 'formik'

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config";

// LogBox.ignoreLogs([
//     'AsyncStorage has been extracted from react-native core and will be removed in a future release.',
//     'Non-serializable values were found in the navigation state',
//   ]);

const Login = ({navigation, route}) => {

    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
          setVisible(false);
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
          setVisible(true);
        });
    
        return () => {
          showSubscription.remove();
          hideSubscription.remove();
        };
    }, []);


    const onLogIN = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            console.log("Logged IN - ", email, password);
            route.params.setVisible(false)
        }
        catch(error){
            alert('password or username/email are wrong..');
        }
        
    }

    const LOGO = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png"

    const LoginValidationSchema = yup.object().shape({
        user: yup
            .string()
            .max(20, 'Caption limit has been reached.')
            .required('This field is required'),

        pasword: yup
            .string()
            .min(8, 'password should be atleast of 8 characters')
            .required()
        
    })

    return (
        <Formik
            initialValues={{
                user: "",
                pasword: "",
            }}
            onSubmit={(values) => {
                onLogIN(values.user, values.pasword)        
            }}
            validationSchema={LoginValidationSchema}
            validateOnMount={true}
        >

        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit, handleBlur }) => (
            <View style={styles.container}> 
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
                            placeholder="Phone number, username, or email"
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
                            secureTextEntry={true}
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
                        title="Log in"
                        buttonStyle={styles.loginBtn(isValid)}
                        containerStyle={{
                            marginTop: 30,
                        }}
                        onPress={handleSubmit}
                    />

                    <Button
                        title="Forgot password?"
                        type="clear"
                        titleStyle={{ fontSize: 16}}
                        containerStyle={{
                            marginTop: 20,
                        }}
                    />
                </View>

                { visible && (
                    <View style={styles.signUP}>
                        <Text style={{color: '#A8A8A8'}} > Don't have an account? </Text>
                        <Button
                            title="Sign Up"
                            type="clear"
                            titleStyle={{ fontSize: 13}}
                            onPress={()=> navigation.push('SignUP')}
                        />
                    </View>
                    )
                }

            </View> )
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
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default Login;
