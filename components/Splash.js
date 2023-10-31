import React from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Splash = () => {

    const navigation = useNavigation();

    return(
        <View style={styles.main}>
            <View style={styles.heading}>
                <Text style={styles.app_name}>SNAPPO</Text>
                <Image style={styles.logo} source={require("../assets/camera_logo.jpg")} />
            </View>

            <View style={styles.btns_div}>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Capture")}>
                    <Image style={styles.btn_img} source={require("../assets/camera_img.jpg")} resizeMode="cover" />
                    <Text style={styles.btn_text}>Capture</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Gallery")}>
                    <Image style={styles.btn_img} source={require("../assets/gallery2.jpg")} resizeMode="cover" />
                    <Text style={styles.btn_text}>Gallery</Text>
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
        textAlign: "center",
        top: 5,
    },
    app_name: {
        textAlign: "center",
        fontSize: 30,
        fontWeight: "900",
        color: "purple",
    },
    logo: {
        width: "100%",
        height:400,
    },
    btns_div: {
        flexDirection: "column",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10,
    },
    btn: {
        borderStyle: "solid",
        borderWidth: 3,
        borderColor: "purple",
        margin: 30,
        padding: 10,
        borderRadius: 50,
        flexDirection: "row"
    },
    btn_text: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "500",
        marginLeft: 25,
        paddingTop: 20,
        color: "purple"
    },
    btn_img: {
        width: 160,
        height: 70,
        borderRadius: 50,
    }
});

export default Splash;