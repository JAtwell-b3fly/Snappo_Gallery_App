import React, {useContext} from "react";
import {View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "./AppNavigation";

const Gallery = () => {
    const navigation = useNavigation();

    const {gallery} = useContext(useAppContext);
    return(
        <View style={styles.main}>
            <View style={styles.heading}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <Image style={styles.back} source={require("../assets/back.png")} resizeMode="contain" />
                </TouchableOpacity>

                <View style={styles.search_div}>
                    <Image style={styles.search_icon} source={require("../assets/search.png")} resizeMode="contain" />

                    <TextInput style = {styles.input} placeholder="Search for image..." />
                </View>

                <Image style={styles.avatar} source={require("../assets/avatar1.jpg")} resizeMode="contain" />
            </View>

            <ScrollView style={styles.content}>
                {gallery.map((image) => (
                    <View key={image.id} style={styles.card}>
                    <Image style={styles.image} source={{uri: image.uri}} resizeMode="contain" />
                    
                    <View style={styles.details}>
                        <Text style={styles.image_title}>{image.title}</Text>
                        <Text style={styles.image_details}>{image.date}| {image.time} | {image.filesize}</Text>

                        <View style={styles.btns_div}>
                            <TouchableOpacity>
                                <Image style={styles.btn} source={require("../assets/bin_pink.png")} resizeMode="contain" />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate("Share")}>
                                <Image style={styles.btn} source={require("../assets/share_purple.png")} resizeMode="contain" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                ))}
            </ScrollView>
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
        height: 40,
        marginRight: 15,
        marginLeft: 10,
        backgroundColor: "white",
        borderRadius: 50,
        marginTop: 5,
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
        marginRight: 15,
        backgroundColor: "rgba(255,255,255,0.5)",
        borderRadius: 10,
        padding: 10,
        width: 230,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    content: {
        width: "auto",
        height: "auto",
        paddingTop: 30,
        backgroundColor: "pink",
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
        backgroundColor: "white",
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
        fontWeight: "700",
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
    }
});

export default Gallery;