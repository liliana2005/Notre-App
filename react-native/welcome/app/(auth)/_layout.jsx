import { View, Text } from 'react-native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const AuthLayout = () => {
  return (
    
   
    <Stack>
     <Stack.Screen
        name='sign-in'
        options={{headerShown:false}}
      />
        
     <Stack.Screen
        name='forgetpassword'
       options={{headerShown:false}}
     />
      <Stack.Screen
        name='phonenumber'
       options={{headerShown:false}}
     />
      <Stack.Screen
        name='sign-up1'
       options={{headerShown:false}}
     />
      <Stack.Screen
        name='verifyphone'
       options={{headerShown:false}}
     />
     <Stack.Screen
        name='index'
       options={{headerShown:false}}
     />
    </Stack>
    
   
  )
}

export default AuthLayout