import {
  View,
  Image,
  Platform,
  ScrollView,
  SectionList,
  Dimensions,
  Pressable,
  Alert,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import React from "react";
import {
  RootStackParams,
  RootStackScreenProps,
} from "../Navigation/RootNavigator";
import { HeadersComponent } from "../Components/HeaderComponents/HeaderComponent";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const ProductDetails = ({
  navigation,
  route,
}: RootStackScreenProps<"productDetails">) => {
  const {
    _id,
    images,
    name,
    price,
    oldPrice,
    inStock,
    color,
    size,
    description,
    quantity,
  } = route.params;
  const gotoCartScreen = () => {
    navigation.navigate("Cart");
  };

  const gotoPreviousScreen = () => {
    if (navigation.canGoBack()) {
      console.log("Chuyển về trang trước.");
      navigation.goBack();
    } else {
      console.log("Không thể quay lại, chuyển về trang OnBoarding.");
      navigation.navigate("OnBoardingScreen");
    }
  };
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 20 : 0,
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <HeadersComponent
        gotoCartScreen={gotoCartScreen}
        goToPrevious={goToPreviousScreen}
      />
    </SafeAreaView>
  );
};

export default ProductDetails;
