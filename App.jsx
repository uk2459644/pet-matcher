import React, { useContext } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, ThemeContext } from './src/theme/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';


function App() {  
  return (
    <ThemeProvider>
      <SafeAreaProvider>
          <MainApp />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

function MainApp() {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <StatusBar
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.backgroundColor}
      />
      <AppNavigator />
    </>
  );
}

export default App;
