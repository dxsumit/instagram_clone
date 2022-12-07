import React, {useState} from "react";
import {View, Image, StyleSheet, TouchableOpacity, Text, ScrollView, FlatList, ActivityIndicator } from "react-native";
import { Icon } from '@rneui/themed';
import { Avatar } from '@rneui/base';
import Stories from "./Stories";

import POSTS from "../data/posts";


const Post = () => {

    const renderItem = (obj) => (
            <View style={{marginBottom: 20}}>
                <PostHeader profilePic={obj.item.profilePic} user={obj.item.user} />
                <Body postURL={obj.item.postURL} />
                <Footer {...(obj.item)}/>
            </View>
        );
    

    return (

        <FlatList
            keyExtractor={item => item.postID}
            data={POSTS}
            renderItem = {renderItem}
            ListHeaderComponent={ <Stories /> }
            showsVerticalScrollIndicator={false}
        />

    );
}


const PostHeader = ({profilePic, user}) => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.headerProfile}>
                <Avatar rounded 
                    avatarStyle={{borderWidth: 1.5, borderColor: "#c71585"}}
                    size={30}
                    source={{ uri: profilePic}}    
                />
                <Text style={{fontSize: 14, fontWeight: '500', paddingLeft: 8}}> {user}</Text>
            </View>
            <Text style={styles.more}> ... </Text>
        </View>
    );
}


const Body = ({postURL}) => {

    const [imgLoading, setImageLoading] = useState(true);
    
    return (
        <View style={{
            width: "100%",
            height: 400,
        }}>
            {imgLoading ? <ActivityIndicator style={styles.activity} size="large" color="#808080" /> : null}
            <Image 
                source={{uri: postURL}}
                onLoadStart={() => setImageLoading(true)}
                onLoadEnd={() => setImageLoading(false)}
                style={styles.image}
            />
        </View>
    );
}


const Footer = (props) => {
    
    return (
        <View>

            <View style={styles.footerContainer}>
                <View style={styles.leftIcons}>
                    <TouchableOpacity style={styles.icon}>
                        <Icon
                            name='hearto'
                            type='antdesign'
                            size={25}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon}>
                        <Icon
                            name='chatbubble-outline'
                            type='ionicon'
                            size={25}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon}>
                        <Icon
                            name='location-arrow'
                            type='font-awesome'
                            size={25}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.rightIcon}> 
                <TouchableOpacity style={styles.icon}>
                        <Icon
                            name='bookmark-o'
                            type='font-awesome'
                            size={25}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.postStats}>
                <Text style={{fontWeight: "600"}}> {props.likes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} likes </Text>

                <View style={styles.caption}>
                    <Text>
                        <Text style={{fontWeight: "600"}}>{props.user}</Text>
                        <Text style={styles.captionText}> {props.caption}</Text>
                    </Text>
                </View>

                <View style={styles.commentIndicator}> 
                    { props.comment.length ? <Text style={{color: "#808080"}}>
                                                    View{props.comment.length > 1 ? ' all' : ''} {props.comment.length} {props.comment.length > 1 ? 'comments' : 'comment'} 
                                                </Text> 
                                            : null }
                     
                </View>

                { props.comment.map( (item, index) => (
                    <View key={index} style={styles.comments}> 
                        <Text>
                            <Text style={{fontWeight: "600"}}>{item.user}</Text>
                            <Text> {item.text}</Text>
                        </Text>
                    </View>
                ))
        
                    
                }

            </View>

        </View>

    );
}




const styles = StyleSheet.create({
    activity: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }, 
    caption: {
        paddingTop: 3,
        paddingLeft: 4,
    },  
    captionText: {
        color: '#282828',
    },
    comments: {
        marginTop: 3,
    },
    commentIndicator: {
        // paddingLeft: 4,
        marginTop: 5,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        paddingTop: 5
    },  
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
    },
    headerProfile: {
        paddingLeft: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },  
    icon: {
        paddingHorizontal: 10,
    },
    leftIcons: {
        flexDirection: 'row'
    },  
    postStats: {
        paddingTop: 5,
        paddingHorizontal: 10,
    },
    more: {
        fontWeight: "600",
        fontSize: 18,
    },
    image: {
        height: "100%",
        resizeMode: 'contain',
    }
})

export default Post;


