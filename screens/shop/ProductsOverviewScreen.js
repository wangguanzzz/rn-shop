import React, { useEffect, useState, useCallback } from "react";

import {
  View,
  FlatList,
  Button,
  ActivityIndicator,
  StyleSheet,
  Text
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Productitem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import * as prodctsActions from "../../store/actions/products";
const ProductsOverviewScreen = props => {
  const products = useSelector(state => {
    return state.products.availableProducts;
  });

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const loadproducts = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(prodctsActions.fetchProducts());
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadproducts();
  }, [dispatch, loadproducts]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title
    });
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>no prodcuts</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.centered}>
        <Text>an error occurred</Text>
        <Button
          title="Try again"
          onPress={loadproducts}
          color={Colors.primary}
        />
      </View>
    );
  }
  return (
    <FlatList
      data={products}
      keyExtractor={(item, index) => item.id}
      renderItem={itemData => (
        <Productitem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={selectItemHandler.bind(
            this,
            itemData.item.id,
            itemData.item.title
          )}
        >
          <Button
            color={Colors.primary}
            title="view Details"
            onPress={selectItemHandler.bind(
              this,
              itemData.item.id,
              itemData.item.title
            )}
          />
          <Button
            color={Colors.primary}
            title="to Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        </Productitem>
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: "All Products",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={"md-cart"}
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="menu"
          iconName={"md-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
export default ProductsOverviewScreen;
