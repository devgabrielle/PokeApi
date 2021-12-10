import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../home';
import Details from '../details';

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Details" component={Details} 
         options={{
          title: '',
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
