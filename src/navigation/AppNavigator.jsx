import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import { Screens } from '../global/Screen';
import ConfirmPetScreen from '../screens/ConfirmPetScreen';
import SubmissionSuccessScreen from '../screens/SubmissionSuccessScreen';
import AddPetScreen from '../screens/AddPetScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={Screens.BottomTabs} component={BottomTabs} />
        
        <Stack.Screen name={Screens.AddPetScreen} component={AddPetScreen} />
        
        <Stack.Screen name={Screens.ConfirmPetScreen} component={ConfirmPetScreen} />
        <Stack.Screen name={Screens.ConfirmSucessScreen} component={SubmissionSuccessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
