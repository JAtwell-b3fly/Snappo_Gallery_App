import React, {useContext, useEffect, useState} from "react";
import {View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "./AppNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Gallery = () => {
    const navigation = useNavigation();

    const {gallery, dispatch} = useAppContext();

    const [selectedImage, setSelectedImage] = useState(null);

    const ShareNav = (image) => {
        setSelectedImage(image);

        navigation.navigate("Share", {selectedImage: image})
    }

    useEffect(() => {
        const loadImages = async () => {
            try {
              const storedImages = await AsyncStorage.getItem('images');
              if (storedImages) {
                const parsedImages = JSON.parse(storedImages);
                // Dispatch an action to update the gallery in your global state
                dispatch({ type: "SET_CAPTURE", payload: parsedImages });
              }
            } catch (error) {
              console.error('Error loading images from AsyncStorage:', error);
            }
          };
        
          loadImages();
    }, [dispatch]);

    const removeImage = (id) => {
        //Dispatch the "REMOVE_IMAGE" action to remove the image with the given id
        dispatch({type: "REMOVE_IMAGE", payload: {id}})

        // Get the updated gallery from the state
    const updatedGallery = gallery.filter((image) => image.id !== id);

    // Save the updated gallery data to AsyncStorage
    AsyncStorage.setItem('images', JSON.stringify(updatedGallery))
        .then(() => {
            console.log('Image removed and updated in AsyncStorage');
        })
        .catch((error) => {
            console.error('Error updating AsyncStorage:', error);
        });
    }

    return(
        <View style={styles.main}>
            <View style={styles.heading}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <Image style={styles.back} source={require("../assets/back.png")} resizeMode="contain" />
                </TouchableOpacity>

                <Text style={styles.heading_text}>Gallery</Text>

                <Image style={styles.avatar} source={require("../assets/avatar1.jpg")} resizeMode="contain" />
            </View>

            <ScrollView style={styles.content}>
            <View style={styles.imageContainer}>
                {gallery.map((image, index) => (
                    <React.Fragment key={image.id}>
                    <View key={image.id} style={styles.card}>
                    <Image style={styles.image} source={{uri: image.uri}} resizeMode="contain" />
                    
                    <View style={styles.details}>
                        <View style={styles.btns_div}>
                            <TouchableOpacity key={image.id} onPress={() => removeImage(image.id)}>
                                <Image style={styles.btn} source={require("../assets/bin_pink.png")} resizeMode="contain" />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => ShareNav(image)}>
                                <Image style={styles.btn} source={require("../assets/share_purple.png")} resizeMode="contain" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {index % 2 === 1 && <View style={{ width: "100%", height: 20 }} />}
                </React.Fragment>
                ))}
                </View>
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
        marginLeft: 20,
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
        paddingBottom: 20,
    },
    card: {
        width: 190,
        height: 190,
        borderWidth: 3,
        borderStyle: "solid",
        borderColor: "purple",
        marginLeft: 10,
        borderRadius: 50,
        flexDirection: "row",
        backgroundColor: "white",
        marginTop: 10,
        marginBottom: 10,
    },
    image: {
        borderRadius: 45,
        width: "100%",
        height: "100%"
    },
    details: {
        flexDirection: "column",
        textAlign: "center",
        paddingTop: 20,
        paddingLeft: 50,
        position: "absolute",
        paddingTop: 115,
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
    },
    heading_text: {
        textAlign: "center",
        fontSize: 22,
        fontWeight: "600",
        paddingTop: 8,
        marginRight: 30,
        color: "purple",
        marginLeft: 80,
        marginRight: 100,
    },
    imageContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between", // Adjust for space between the columns
        marginBottom:20,
      },
});

export default Gallery;