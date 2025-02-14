import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import React, { useState } from "react";
import { Entypo, AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { GoBack } from "./GoBackButton";

interface IHeaderParams {
  goToPrevios?: () => void;
  search?: () => void;
  cartLength?: number;
  gotoCartScreen?: () => void;
}

export const HeadersComponent = ({
  goToPrevios,
  search,
  cartLength,
  gotoCartScreen,
}: IHeaderParams) => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <View
      style={{
        backgroundColor: "#000",
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <GoBack onPress={goToPrevios} />
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 7,
          gap: 10,
          backgroundColor: "white",
          borderRadius: 10,
          height: 38,
          flex: 1,
        }}
      >
        <Pressable style={{ padding: 10 }} onPress={search}>
          <AntDesign name="search1" size={20} color={"blue"} />
        </Pressable>
        <TextInput
          value={searchInput}
          onChangeText={setSearchInput}
          placeholder="search Items ... "
        />
      </Pressable>
      <Pressable onPress={gotoCartScreen}>
        <View style={styles.cartNum}>
          <Text style={{ color: "pink" }}>{cartLength}</Text>
        </View>
      </Pressable>
      <MaterialIcons
        name="shopping-cart"
        size={24}
        color={"white"}
        style={{ padding: 5, marginTop: 3 }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  cartNum: {},
});
