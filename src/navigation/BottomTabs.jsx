import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import AddPetScreen from '../screens/AddPetScreen';
import MyPetsScreen from '../screens/MyPetsScreen';
import { ThemeContext } from '../theme/ThemeContext';
import {Screens} from "../global/Screen"

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const { theme } = useContext(ThemeContext);

  const screenOptions = ({ route }) => ({
    headerShown: false,
    tabBarStyle: {
      backgroundColor: theme.backgroundColor,
      borderTopColor: theme.borderColor,
      height: 60,
    },
    tabBarLabelStyle: {
      fontSize: theme.fontSizes.sm,
      fontWeight: theme.fontWeights.medium,
    },
    tabBarActiveTintColor: theme.textColor,
    tabBarInactiveTintColor: theme.textTertiary,
    tabBarIcon: ({ color, size }) => {
      let iconName;
      switch (route.name) {
        case Screens.MyPetsScreen:
          iconName = 'home';
          break;
        case Screens.AddPetScreen:
          iconName = 'add';
          break;
        default:
          iconName = 'circle';
      }
      return <Icon name={iconName} size={20} color={color} />;
    },
  });

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name={Screens.MyPetsScreen} component={MyPetsScreen} />
      <Tab.Screen name={Screens.AddPetScreen} component={AddPetScreen} />
    </Tab.Navigator>
  );
}
