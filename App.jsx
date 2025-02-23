import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { InitLogin } from './src/navigation/stackNavigation/StackNavigation';




function App() {
  return (
    <NavigationContainer>
      <InitLogin />
    </NavigationContainer>
  );
}

export default App;
