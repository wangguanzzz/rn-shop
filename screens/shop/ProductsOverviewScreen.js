import React from "react";

import { FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Productitem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
const ProductsOverviewScreen = props => {
  const products = useSelector(state => {
    return state.products.availableProducts;
  });

  const dispatch = useDispatch();

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title
    });
  };
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

export default ProductsOverviewScreen;
