import React from "react";
import {
  ProductListParams,
  FetchProductsParams,
} from "../TypesCheck/HomeProps";
import axios from "axios";

interface ICatProps {
  setGetCategory: React.Dispatch<React.SetStateAction<ProductListParams[]>>;
}

interface IProdByCatProps {
  catID: string;
  setGetProductsByCatID: React.Dispatch<
    React.SetStateAction<ProductListParams[]>
  >;
}

interface ITrendingProductProps {
  setTrendingProducts: React.Dispatch<
    React.SetStateAction<ProductListParams[]>
  >;
}
export const fetchCategories = async ({ setGetCategory }: ICatProps) => {
  try {
    const response = await axios.get(
      "http://10.0.2.2:8888/category/getAllCategories"
    );
    console.log("API Response:", response.data);

    if (Array.isArray(response.data)) {
      const fixedData = response.data.map((item) => ({
        ...item,
        images: item.images.map((img: string) =>
          img.replace("http://localhost", "http://10.0.2.2")
        ),
      }));

      setGetCategory(fixedData);
    } else {
      console.warn(
        "fetchCategories: Dữ liệu API không phải là mảng",
        response.data
      );
      setGetCategory([]);
    }
  } catch (error) {
    console.log("axios get error ", error);
    setGetCategory([]);
  }
};
export const fetchProductsByCatID = async ({
  setGetProductsByCatID,
  catID,
}: IProdByCatProps) => {
  try {
    const response: FetchProductsParams = await axios.get(
      `http://10.0.2.2:8888/product/getProductByCatID/${catID}`
    );
    console.log("API Response:", response.data);

    if (Array.isArray(response.data)) {
      const fixedData = response.data.map((item) => ({
        ...item,
        images: item.images.map((img: string) =>
          img.replace("http://localhost", "http://10.0.2.2")
        ),
      }));

      setGetProductsByCatID(fixedData);
    } else {
      console.warn(
        "fetchProductsByCatID: Dữ liệu API không phải là mảng",
        response.data
      );
      setGetProductsByCatID([]);
    }
  } catch (error) {
    console.log("axios get error", error);
    setGetProductsByCatID([]);
  }
};
export const fetchTrendingProducts = async ({
  setTrendingProducts,
}: ITrendingProductProps) => {
  try {
    const response: FetchProductsParams = await axios.get(
      "http://10.2.2.2::8888/product/getTrendingProducts"
    );
    console.log("API Response:", response.data);

    if (Array.isArray(response.data)) {
      const fixedData = response.data.map((item) => ({
        ...item,
        images: item.images.map((img: string) =>
          img.replace("http://localhost", "http://10.0.2.2")
        ),
      }));
      setTrendingProducts(fixedData);
    } else {
      console.warn(
        "fetchCategories: Dữ liệu API không phải là mảng",
        response.data
      );
    }
  } catch (error) {
    console.log("axios get error", error);
    setTrendingProducts([]);
  }
};
