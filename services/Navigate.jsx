import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Login } from '../screens/Login';
import { SignUp } from '../screens/SignUp';
import { FindBooks } from '../screens/FindBooks';
import { BookInfo } from '../screens/BookInfo';
import { Library } from '../screens/Library';


const Stack = createNativeStackNavigator();

export const Navigate = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='Login' component={Login}/>
      <Stack.Screen name='SignUp' component={SignUp}/>
      <Stack.Screen name='FindBooks' component={FindBooks}/>
      <Stack.Screen name='BookInfo' component={BookInfo}/>
      <Stack.Screen name='Library' component={Library}/>
      <Stack.Screen name='Favorite' component={Library}/>
    </Stack.Navigator>
  </NavigationContainer>
)