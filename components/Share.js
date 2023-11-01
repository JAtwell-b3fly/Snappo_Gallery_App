import React, {useEffect, useRef} from "react";
import {View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput, Animated} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

const Share = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { selectedImage } = route.params;

    const translateY = useRef(new Animated.Value(700)).current;

    const slideOut = () => {
        //Start the slide out animation when navigating from the share screen back to the list screen

        Animated.timing(translateY, {
            toValue: 700, //Move the share box off screen in the y axis direction
            duration: 400,
            useNativeDriver: false,
        }).start(() =>{
            //Navigate to the list screen after the animation completes its movement
            navigation.navigate("Gallery");
        });
    };

    useEffect(() => {
        //Start the slide in animation when navigating from the list screen to the share screen

        Animated.timing(translateY, {
            toValue: 0, //The final position where the component should stop
            duration: 500, //Duration of the animation in milliseconds
            useNativeDriver: false, //Set this to true if possible for better performance
        }).start();
    }, []);

    return(
        <View style={styles.main}>
            <View style={styles.heading}>
                <TouchableOpacity>
                    <Image style={styles.back} source={require("../assets/back.png")} resizeMode="contain" />
                </TouchableOpacity>

                <View style={styles.search_div}>
                    <Image style={styles.search_icon} source={require("../assets/search.png")} resizeMode="contain" />

                    <TextInput style = {styles.input} placeholder="Search for image..." />
                </View>

                <Image style={styles.avatar} source={require("../assets/avatar1.jpg")} resizeMode="contain" />
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.card}>
                    <Image style={styles.image} source={{uri: selectedImage.uri}} resizeMode="contain" />
                    
                    <View style={styles.details}>
                        <Text style={styles.image_title}>{selectedImage.title}</Text>
                        <Text style={styles.image_details}>{selectedImage.date}</Text>

                        <View style={styles.btns_div}>
                            <TouchableOpacity>
                                <Image style={styles.btn} source={require("../assets/bin_pink.png")} resizeMode="contain" />
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Image style={styles.btn} source={require("../assets/share_purple.png")} resizeMode="contain" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <Animated.View style={[styles.share_content, {transform: [{translateY}]}]}>
                <Text style={styles.line}>_____________________________</Text>

                <Text style={styles.share_text}>Share with your friends</Text>

                <View style={styles.socials}>
                   <View style={styles.social}>
                        <TouchableOpacity>
                            <Image style={styles.social_img} source={require("../assets/whatsapp.png")} resizeMode="contain" />
                        </TouchableOpacity>

                        <Text style={styles.social_text}>Whatsapp</Text>
                   </View>

                   <View style={styles.social}>
                        <TouchableOpacity>
                            <Image style={styles.social_img} source={require("../assets/messenger.png")} resizeMode="contain" />
                        </TouchableOpacity>

                        <Text style={styles.social_text}>Messenger</Text>
                   </View>

                   <View style={styles.social}>
                        <TouchableOpacity>
                            <Image style={styles.social_img} source={require("../assets/instagram.png")} resizeMode="contain" />
                        </TouchableOpacity>

                        <Text style={styles.social_text}>Instagram</Text>
                   </View>

                   <View style={styles.social}>
                        <TouchableOpacity>
                            <Image style={styles.social_img} source={require("../assets/skype.png")} resizeMode="contain" />
                        </TouchableOpacity>

                        <Text style={styles.social_text}>Skype</Text>
                   </View>
                </View>


                <View style={styles.socials}>
                   <View style={styles.social}>
                        <TouchableOpacity>
                            <Image style={styles.social_img} source={require("../assets/avatar5.jpg")} resizeMode="contain" />
                        </TouchableOpacity>

                        <Text style={styles.social_text}>Preston Magakwe</Text>
                   </View>

                   <View style={styles.social}>
                        <TouchableOpacity>
                            <Image style={styles.social_img} source={require("../assets/avatar4.jpg")} resizeMode="contain" />
                        </TouchableOpacity>

                        <Text style={styles.social_text}>Shania Ludick</Text>
                   </View>

                   <View style={styles.social}>
                        <TouchableOpacity>
                            <Image style={styles.social_img} source={require("../assets/avatar3.jpg")} resizeMode="contain" />
                        </TouchableOpacity>

                        <Text style={styles.social_text}>Michael McAnda</Text>
                   </View>

                   <View style={styles.social}>
                        <TouchableOpacity>
                            <Image style={styles.social_img} source={require("../assets/avatar2.jpg")} resizeMode="contain" />
                        </TouchableOpacity>

                        <Text style={styles.social_text}>Maxine Geard</Text>
                   </View>
                </View>

                <TouchableOpacity style={styles.cancel_btn} onPress={() => navigation.navigate("Gallery")}>
                    <Text style={styles.cancel_btn_text}>Cancel</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    )
};

const styles = StyleSheet.create({
    main: {
        justifyContent: "center",
        textAlign: "center",
        flex: 1,
    },
    heading: {
        flexDirection: "row",
        marginTop: 40,
        marginBottom: 20,
    },
    back: {
        width: 40,
        height: 50,
        marginRight: 20,
        marginLeft: 10
    },
    search_div: {
        flexDirection: "row"
    },
    search_icon: {
        width: 30,
        height: 50,
    },
    input: {
        fontSize: 20,
        color: "black",
        fontStyle: "italic",
        marginLeft: 10,
        marginRight: 30,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    content: {
        width: "auto",
        height: "100%",
        paddingTop: 40,
        backgroundColor: "rgba(63, 42, 45, 0.7)",
    },
    card: {
        width: 350,
        height: 150,
        borderWidth: 3,
        borderStyle: "solid",
        borderColor: "purple",
        marginLeft: 30,
        borderRadius: 50,
        flexDirection: "row",
    },
    image: {
        borderRadius: 45,
        width: "42%",
        height: "100%"
    },
    details: {
        flexDirection: "column",
        textAlign: "center",
        paddingTop: 20,
        paddingLeft: 10,
    },
    image_title: {
        color: "black",
        fontSize: 18,
        fontWeight: "500",
        color: "purple",
    },
    image_details: {
        fontSize: 15,
        fontStyle: "normal",
        marginTop: 5,
    },
    btns_div: {
        justifyContent: "flex-end",
        flexDirection: "row",
        marginTop: 20,
    },
    btn: {
        width: 38,
        height: 38,
        marginLeft: 20,
    },
    share_content: {
        backgroundColor: "white",
        ...StyleSheet.absoluteFillObject,
        position: "absolute",
        top: 390,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    line: {
        paddingTop: 30,
        fontSize: 16,
        textAlign: "center",
    },
    share_text: {
        fontSize: 18,
        textAlign: "center",
        paddingTop: 20,
        fontWeight: "500",
        paddingBottom: 20,
    },
    socials: {
        flexDirection: "row",
        paddingLeft: 20,
        paddingRight: 20,
    },
    social: {
        flexDirection: "column",
        marginRight: 8,
        marginLeft: 8,
        marginBottom: 25,
    },
    social_img: {
        width: 60,
        height: 60,
        borderRadius: 15,
        justifyContent: "center",
        marginLeft: 10,
    },
    social_text: {
        textAlign: "center",
        paddingTop: 5,
        fontSize: 14,
        width: 80
    },
    cancel_btn: {
        justifyContent: "center",
        width: 300,
        height: 60,
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 50,
        marginLeft: 50,
        marginTop: 15,
        padding: 10,
        backgroundColor: "pink"
    },
    cancel_btn_text: {
        textAlign: "center",
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
    }
});

export default Share;