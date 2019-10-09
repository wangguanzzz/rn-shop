import React from "react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";

import Colors from "../constants/Colors";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import { Ionicons } from "@expo/vector-icons";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primary
  },
  headerTintColor: "white",
  headerTitleStyle: {
    fontFamily: "open-sans-bold"
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans"
  }
};
const ProdcutsNavigator = createStackNavigator(
  {
    ProductsOverView: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions,
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons name={"md-cart"} size={23} color={drawerConfig.tintColor} />
      )
    }
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions,
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons name={"md-list"} size={23} color={drawerConfig.tintColor} />
      )
    }
  }
);

const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions,
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons name={"md-create"} size={23} color={drawerConfig.tintColor} />
      )
    }
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProdcutsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
    }
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen
  },
  { defaultNavigationOptions: defaultNavOptions }
);
const MainNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  Shop: ShopNavigator
});
export default createAppContainer(MainNavigator);
