import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TextInput, Image, Keyboard, TouchableWithoutFeedback, Button, Pressable  } from "react-native";
import * as yup from 'yup'
import { Formik } from 'formik'

import { auth, db } from "../config";
import { doc, addDoc, collection, serverTimestamp, getDocs } from "firebase/firestore"; 


const AddNewPost = ({navigation, route}) => {


    const test = async () => {

        // await addDoc(collection(db, "users"), {
        //     username: username,
        //     email: email,
        //     profilePic: await randomProfilePic(),
        // });


        console.log("Post Data..")
        const newData = {
            timestamp: serverTimestamp(),
            caption: "this is the second post from the user..",
            imageURL: "http://easd.com",
        }

        const docRef = doc(db, "users", auth.currentUser.uid);
        const newDoc = await addDoc(collection(docRef, "post"), newData);



        // const docRef = doc(db, "users", "a8uhuQ6lNknr0HPx4XLK ");
        // const querySnapshot = await getDocs(
        //     collection(docRef, "post")
        // );

        // querySnapshot.forEach((doc) => {
        //     console.log(doc)
        // })

        console.log("done here")

    }

    
    const newPost_firebase = async () => {
        console.log("newPost_firebase.")

        // adding another collection messages within that
        // const newData = {
        //     timestamp: serverTimestamp(),
        //     caption: caption,
        //     imageURL: image,
        //     user: auth.currentUser.username,
        //     profilePic: auth.currentUser.profilePic,
        //     likes: 0,
        //     liked_by_others: [],
        //     comments: []
        // }

        // getting the perticular chat id within chats collection
        // const docRef = doc(db, "users", route.params.id);
        // const newDoc = await addDoc(collection(docRef, "post"), newData);

        // id of newly created post
        // newDoc.id


        // const docRef = doc(db, "users");
        // const querySnapshot = await getDocs(
        //     collection(docRef, auth.currentUser.uid)
        // );

        // querySnapshot.forEach((doc) => {
        //     console.log(doc)
        // })


    } 




    const placeholderIMG = "https://static.thenounproject.com/png/187803-200.png";
    const [image, setImage] = useState(placeholderIMG);

    const uploadValidationSchema = yup.object().shape({
        caption: yup
            .string()
            .max(220, 'Caption limit has been reached.'),

        imageURL: yup
            .string()
            .url()
            .required('image URL is required.'),
        
    })

    return (
        <Formik
            initialValues={{
                caption: '',
                imageURL: '',

            }}
            onSubmit={(values) => {
                    console.log(values)
                    test();
                    // navigation.goBack()                        
                } 
            }
            validationSchema={uploadValidationSchema}
            validateOnMount={true}
        >

        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit, handleBlur }) => (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{flex: 1, padding: 5}}>
                <View style={{flexDirection:'row'}}>
                    <Image 
                        source={{uri: image}}
                        style={{width: 120, height: 120, resizeMode: 'contain'}}
                    />
                    <TextInput 
                        style={[styles.input, {textAlignVertical:'top', width: 260}]}
                        placeholder="Add caption"
                        multiline={true}
                        numberOfLines={6}
                        maxLength={250}
                        onChangeText={handleChange('caption')}
                        onBlur={handleBlur('caption')}
                        value={values.caption}
                    />
                </View>
                {errors.caption && (
                    <Text style={{fontSize: 13, fontStyle: 'italic', color: "#ff0038"}}>
                        {errors.caption}
                    </Text>
                )}

                <View style={{padding: 5, paddingVertical: 20}}>
                    <TextInput 
                        style={[styles.input]}
                        placeholder="add image URL"
                        onEndEditing={(e) => setImage(e.nativeEvent.text)}
                        multiline={true}
                        numberOfLines={2}
                        maxLength={100}
                        onChangeText={handleChange('imageURL')}
                        onBlur={handleBlur('imageURL')}
                        value={values.imageURL}
                    />
                    {errors.imageURL && (
                        <Text style={{fontSize: 13, fontStyle: 'italic', color: "#ff0038"}}>{errors.imageURL}</Text>
                    )}
                </View>

                <View style={styles.button}>
                    <Button title="Submit" disabled={!isValid} onPress={handleSubmit}/>
                </View>
            </View>
            </TouchableWithoutFeedback>
        )}
    </Formik>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        fontSize: 14,
        margin: 1,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 2,
        padding: 5,
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        // fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'blue',
    },
})

export default AddNewPost;

