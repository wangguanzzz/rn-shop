import React from "react";

import { View, FlatList, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const ProductsOverviewScreen = props => {
  const products = useSelector(state => {
    return state.products.availableProducts;
  });

  return (
    <FlatList
      data={products}
      keyExtractor={(item, index) => item.id}
      renderItem={itemData => <Text>{itemData.item.title}</Text>}
    />
  );
};

const styles = StyleSheet.create({});

export default ProductsOverviewScreen;
