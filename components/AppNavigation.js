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
    gallery: [],
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
        gallery: [],
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