import React from "react";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import OnBoardingScreen from "../Screens/OnBoardingScreen";
import TabsNavigator, { TabsStackParams } from "./TabsNavigation";
import { NavigatorScreenParams } from "@react-navigation/native";
import ProductDetails from "../Screens/ProductDetails";

export type RootStackParams = {
  OnBoardingScreen: undefined;
  TabsStack: undefined;
  Deals: undefined;
  Cart: undefined;
  Profile: undefined;
  productDetails: {
    _id: string;
    images: [string];
    name: string;
    price: number;
    oldPrice?: number;
    inStock?: boolean;
    color?: string;
    size?: string;
    description?: string;
    quantity: number;
  };
};

const RootStack = createNativeStackNavigator<RootStackParams>();
export type RootStackScreenProps<T extends keyof RootStackParams> =
  NativeStackScreenProps<RootStackParams, T>;

const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="OnBoardingScreen"
        component={OnBoardingScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="TabsStack"
        component={TabsNavigator}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="productDetails"
        component={ProductDetails}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
