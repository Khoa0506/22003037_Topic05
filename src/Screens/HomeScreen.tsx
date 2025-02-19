import {
  View,
  Text,
  Platform,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { TabsStackScreenProps } from "../Navigation/TabsNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeadersComponent } from "../Components/HeaderComponents/HeaderComponent";
import ImageSlider from "../Components/HomeScreenComponent/ImageSlider";
import { ProductListParams } from "../TypesCheck/HomeProps";
import { CategoryCard } from "../Components/HomeScreenComponent/CategoryCard";
import {
  fetchCategories,
  fetchProductsByCatID,
} from "../MiddleWares/HomeMiddleWare";
import { useFocusEffect } from "@react-navigation/native";
import { getProductByID } from "./../../apiMongoDB/Controllers/ProductControllers";

type Props = {};

const HomeScreen = ({ navigation, route }: TabsStackScreenProps<"Home">) => {
  const gotoCartScreen = () => {
    navigation.navigate("Cart");
  };
  const sliderImages = [
    "https://cdn.tuoitre.vn/471584752817336320/2025/2/11/edit-4777768226376952389118115503521146827030165n-17392846395421224095965.jpeg", // Network image
    "https://cdn-media.sforum.vn/storage/app/media/wp-content/uploads/2023/10/tho-chuc-tet-hai-huoc-thumbnail.jpg",
    "https://i.ytimg.com/vi/OvUolZfo1Qc/maxresdefault.jpg",
    "https://bizweb.dktcdn.net/thumb/1024x1024/100/408/770/products/d373f758-620f-4da0-b31e-6c993c0195fe.jpg",
    // require("../../assets/sliderImages/hand.png"),
    // require("../../assets/sliderImages/location.png"),
    // require("../../assets/sliderImages/schedule.png"),
  ];
  const [getCategory, setGetCategory] = useState<ProductListParams[]>([]);
  const [getProductsByCatID, setGetProductsByCatID] = useState<
    ProductListParams[]
  >([]);
  const [activeCat, setActiveCat] = useState<string>("");
  useEffect(() => {
    fetchCategories({ setGetCategory });
  }, []);

  useEffect(() => {
    console.log("fetchProductByCatID:", fetchProductsByCatID);
    if (activeCat) {
      fetchProductsByCatID({ setGetProductsByCatID, catID: activeCat });
    }
  }, [activeCat]);

  useFocusEffect(
    useCallback(() => {
      fetchCategories({ setGetCategory });
      if (activeCat) {
        fetchProductsByCatID({ setGetProductsByCatID, catID: activeCat });
      }
    }, [activeCat])
  );

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 40 : 0,
        flex: 1,
        backgroundColor: "black",
      }}
    >
      <HeadersComponent gotoCartScreen={gotoCartScreen}></HeadersComponent>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ backgroundColor: "#efg" }}
      >
        <ImageSlider images={sliderImages} />
      </ScrollView>
      <View style={{ backgroundColor: "yellow", flex: 1 }}>
        <Text>Hello</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          style={{ marginTop: 4 }}
        >
          {getCategory.map((item, index) => (
            <CategoryCard
              item={{ name: item.name, images: item.images, _id: item._id }}
              catStyleProps={{
                height: 50,
                width: 55,
                radius: 20,
                resizeMode: "contain",
              }}
              catProps={{
                activeCat: activeCat,
                onPress: () => setActiveCat(item._id),
              }}
            />
          ))}
        </ScrollView>
      </View>
      <View
        style={{
          backgroundColor: "pink",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: "bold", padding: 10 }}>
          Products from Selected Category
        </Text>
        <Pressable>
          <Text style={{ fontSize: 11, fontWeight: "bold", padding: 10 }}>
            See All
          </Text>
        </Pressable>
      </View>
      <View
        style={{
          backgroundColor: "#fff",
          borderWidth: 7,
          borderColor: "green",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {getProductsByCatID.length > 0 ? (
            getProductsByCatID.map((item, index) => (
              <CategoryCard
                key={index}
                item={{ name: item.name, images: item.images, _id: item._id }}
                catStyleProps={{
                  height: 100,
                  width: 100,
                  radius: 10,
                  resizeMode: "contain",
                }}
                catProps={{
                  onPress: () => Alert.alert(item.name),
                  imageBg: bgImg,
                }}
              />
            ))
          ) : (
            <Text> Không có sản phẩm nào </Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
