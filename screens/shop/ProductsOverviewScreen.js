import React from "react";

import { View, FlatList, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Productitem from "../../components/shop/ProductItem";

const ProductsOverviewScreen = props => {
  const products = useSelector(state => {
    return state.products.availableProducts;
  });

  return (
    <FlatList
      data={products}
      keyExtractor={(item, index) => item.id}
      renderItem={itemData => (
        <Productitem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() => {}}
          onAddToCart={() => {}}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({});

export default ProductsOverviewScreen;
