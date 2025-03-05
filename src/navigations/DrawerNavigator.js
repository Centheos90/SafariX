import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({navigation}) => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen  name="Home" component={TabNavigator}/>
        </Drawer.Navigator>
    )
}

export default DrawerNavigator;
