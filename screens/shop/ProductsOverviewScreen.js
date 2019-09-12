import React from "react";

import { View, FlatList, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Productitem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";

const ProductsOverviewScreen = props => {
  const products = useSelector(state => {
    return state.products.availableProducts;
  });

  const dispatch = useDispatch();

  return (
    <FlatList
      data={products}
      keyExtractor={(item, index) => item.id}
      renderItem={itemData => (
        <Productitem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() => {
            props.navigation.navigate("ProductDetail", {
              productId: itemData.item.id,
              productTitle: itemData.item.title
            });
          }}
          onAddToCart={() => {
            dispatch(cartActions.addToCart(itemData.item));
          }}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({});

export default ProductsOverviewScreen;
