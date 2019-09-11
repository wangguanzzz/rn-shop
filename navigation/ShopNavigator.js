import { createAppContainer, createNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Colors from "../constants/Colors";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";

const ProdcutsNavigator = createStackNavigator(
  {
    ProductsOverView: ProductsOverviewScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.primary
      },
      headerTintColor: "white"
    }
  }
);

export default createAppContainer(ProdcutsNavigator);
