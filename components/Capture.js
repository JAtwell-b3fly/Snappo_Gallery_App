import React, {useState, useRef} from "react";
import {View, StyleSheet, Text, TouchableOpacity, Image, TextInput, Alert} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useAppContext } from "./AppNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Capture = () => {
    const navigation = useNavigation();

    const {gallery, dispatch} = useAppContext();
    const [capturedImage, setCapturedImage] = useState(null);
    const [imageTitle, setImageTitle] = useState("");

    const [imageUrl, setImageUrl] = useState(null);

    const openCameraLib = async() => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Camera permissions are required to use this feature.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setCapturedImage(result);
      setImageUrl(result.assets[0].uri);
    }
    }

    const openGalleryLib = async() => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Media Library permissions are required to use this feature.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setCapturedImage(result);
      setImageUrl(result.assets[0].uri)
    }
    }

    const takePicture = () => {
        openCameraLib();
    };

    const saveImage = async() => {
        if (capturedImage) {
            const newImage = {
                id: Date.now(),
                title: Date.now() + "img",
                date: new Date().toLocaleString(),
                uri: capturedImage.assets[0].uri,
            };

            try {
                // Get the current gallery from AsyncStorage
                const storedGallery = await AsyncStorage.getItem('images');
                const parsedGallery = storedGallery ? JSON.parse(storedGallery) : [];
    
                // Update the gallery with the new image
                const updatedGallery = [...parsedGallery, newImage];
    
                // Save the updated gallery back to AsyncStorage
                await AsyncStorage.setItem('images', JSON.stringify(updatedGallery));
    
                // Update your global state using dispatch
                dispatch({ type: "SET_CAPTURE", payload: updatedGallery });
    
                // Reset state and show a success message
                setCapturedImage(null);
                setImageTitle("");
    
                Alert.alert("Image Saved Successfully");
            } catch (error) {
                console.error('Error saving image to AsyncStorage:', error);
                Alert.alert("Failed to save image");
            }
        } else {
            Alert.alert("Enter an Image Title")
        }
    }

    return(
        <View style={styles.main}>
            <View style={styles.heading}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <Image style={styles.back} source={require("../assets/back.png")} resizeMode="contain" />
                </TouchableOpacity>

                <Text style={styles.heading_text}>Capture an Image</Text>

                <Image style={styles.avatar} source={require("../assets/avatar1.jpg")} resizeMode="cover" />
            </View>

            <View style={styles.capture_div}>

                {capturedImage ? (
                    <Image source={{uri: imageUrl}} style={styles.camera} resizeMode="contain" />
                ): (
                <TouchableOpacity style={styles.camera_btn} onPress={takePicture}>
                    <Image style={styles.camera} source={require("../assets/camera_btn.jpg")} resizeMode="contain" />
                </TouchableOpacity>
                )}

            </View>

            <View style={styles.cancel_save_div}>
                <TouchableOpacity>
                    <Image style={styles.bottom_btns} source={require("../assets/cross.png")} resizeMode="contain"/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.middle_btn} onPress={() => navigation.navigate("Gallery")}>
                    <Image style={styles.middle_btn_img} source={require("../assets/gallery.jpg")} resizeMode="cover"/>
                </TouchableOpacity>

                <TouchableOpacity style={{marginLeft: 200}} onPress={saveImage}>
                    <Image style={styles.bottom_btns} source={require("../assets/check.png")} resizeMode="contain"/>
                </TouchableOpacity>
            </View>
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
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        top: 40,
        position: "absolute",

    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    back: {
        width: 50,
        height: 50,
        marginRight: 30,
        marginLeft: 10,
        backgroundColor: "white",
        borderRadius: 50,
    },
    heading_text: {
        textAlign: "center",
        fontSize: 22,
        fontWeight: "600",
        paddingTop: 8,
        marginRight: 30,
        color: "purple",
    },
    capture_div: {
        height: 300,
        marginLeft: 10,
        marginRight: 10,
        width: 300,
        justifyContent: "center",
        textAlign: "center",
        position: "absolute",
        top: 200,
        left: 40,
    },
    camera_btn: {
        width: 300,
        height: 300,
        borderStyle: "solid",
        borderWidth: 15,
        borderColor: "purple",
        borderRadius: 150,
        marginTop: 10,
    },
    camera: {
        width: "100%",
        height: "100%",
        position: "relative",
        borderRadius: 150,
    },
    title_div: {
        justifyContent: "center",
        width: "auto",
        marginTop: 350,
        marginBottom: 15,
    },
    label: {
        textAlign: "center",
        fontSize: 22,
        fontWeight: "600",
        marginBottom: 20,
        color: "purple",
    },
    input: {
        textAlign: "center",
        justifyContent: "center",
        fontSize: 18,
        color: "white",
        fontStyle: "italic",
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "pink",
        padding: 10,
        width: 390,
        marginLeft: 10,
        borderRadius: 30,
        fontWeight: "600",
    },
    cancel_save_div: {
        position: "relative",
        top: 280,
        borderStyle: "solid",
        borderWidth: 3,
        borderColor: "pink",
        flexDirection: "row",
        width: 350,
        borderRadius: 50,
        marginLeft: 30,
        padding: 10,
    },
    bottom_btns: {
        width: 60,
        height: 60,
        backgroundColor: "white",
        borderRadius: 50,
    },
    middle_btn: {
        position: "absolute",
        left: 90,
        top: -40,
        padding: 10,
        borderWidth: 3,
        borderColor: "pink",
        borderRadius: 100,
        backgroundColor: "white"
    },
    middle_btn_img: {
        width: 130,
        height: 130,
        borderRadius: 100,
        position: "relative",

    }
});

export default Capture;