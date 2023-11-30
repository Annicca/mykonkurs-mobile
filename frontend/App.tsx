/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native'
import { StatusBar } from 'react-native';
import TabBar from './src/components/tabbar/TabBar';
import { UserContextProvider } from './src/context/UserContext';

function App(): JSX.Element {

  return (
    <UserContextProvider>
      <NavigationContainer>
          <StatusBar 
          backgroundColor="#FFD700" />
          <TabBar />
      </NavigationContainer>
    </UserContextProvider>
  );
}

export default App;
