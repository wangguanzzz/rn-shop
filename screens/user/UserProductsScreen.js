import React from "react";

import { FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import ProductItem from "../../components/shop/ProductItem";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import * as productsActions from "../../store/actions/products";

const UserProductsScreen = props => {
  const dispatch = useDispatch();
  const userProducts = useSelector(state => state.products.userProducts);
  const editProductHandler = id => {
    props.navigation.navigate("EditProduct", { productId: id });
  };

  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              editProductHandler(itemData.item.id);
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => {
              dispatch(productsActions.deleteProduct(itemData.item.id));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = navData => {
  return {
    headerTitle: "User Products",
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
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="add"
          iconName={"md-create"}
          onPress={() => {
            navData.navigation.navigate("EditProduct");
          }}
        />
      </HeaderButtons>
    )
  };
};
export default UserProductsScreen;
