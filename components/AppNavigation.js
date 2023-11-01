import React from "react";
import {createContext, useReducer, useContext} from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

//Components
import Splash from "./Splash";
import Capture from "./Capture";
import Gallery from "./Gallery";
import Share from "./Share";

//Creating the app context containing the containers used to store the states
const AppContext = createContext({
    gallery: [{
        id: 12345,
        title: "Default Image",
        uri: "https://i.pinimg.com/564x/3c/61/3c/3c613ca28996e4255753f7d4b2902d4d.jpg",
        date: "today",
    },
    {
        id: 9999,
        title: "Anime Image",
        uri: "https://i.pinimg.com/564x/70/4c/f6/704cf674a86b284238aad608a244183f.jpg",
        date: "today",
    },    
],
    dispatch: () => {},
});

//Creating the app reducer where we define the actions and cases we will use to update the arrays
const appReducer = (state, action) => {
    switch (action.type) {
        case "SET_CAPTURE":
            return {...state, gallery: action.payload};
        case "ADD_IMAGE": 
            return {...state, gallery: [...state.gallery, action.payload]};
        case "REMOVE_IMAGE":
            return {
                ...state,
                gallery: state.gallery.filter((image) => image.id !== action.payload.id)}
        default:
            return state;
    }
}

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, {
        gallery: [{
            id: 12345,
            title: "Default Image",
            uri: "https://i.pinimg.com/564x/3c/61/3c/3c613ca28996e4255753f7d4b2902d4d.jpg",
            date: "today",
        },
        {
            id: 9999,
            title: "Anime Image",
            uri: "https://i.pinimg.com/564x/70/4c/f6/704cf674a86b284238aad608a244183f.jpg",
            date: "today",
        }, 
    ],
    });

    return (
        <AppContext.Provider value={{gallery: state.gallery, dispatch}}>
            {children}
        </AppContext.Provider>
    )
};

export const useAppContext = () => {
    return useContext(AppContext);
}

const AppNavigator = () => {
    return(
        <AppProvider>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash" screenOptions = {{headerShown: false}}>
                <Stack.Screen name="Home" component={Splash} />
                <Stack.Screen name="Capture" component={Capture} />
                <Stack.Screen name="Gallery" component={Gallery} />
                <Stack.Screen name="Share" component={Share} />
            </Stack.Navigator>
        </NavigationContainer>
        </AppProvider>
    )
};

export default AppNavigator;