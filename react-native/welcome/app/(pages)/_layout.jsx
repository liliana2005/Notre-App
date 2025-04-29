import { View, Text } from 'react-native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const PagesLayout = () => {
  return (
    
   
    <Stack>
     <Stack.Screen
        name='Bar'
        options={{headerShown:false}}
      />
        
     <Stack.Screen
        name='DonorInfo'
       options={{headerShown:false}}
     />
    
      <Stack.Screen
        name='Forgetpass'
       options={{headerShown:false}}
     />
      <Stack.Screen
        name='Home2'
       options={{headerShown:false}}
     />
     <Stack.Screen
        name='index'
       options={{headerShown:false}}
     />
      <Stack.Screen
        name='NewProject'
       options={{headerShown:false}}
     />
      <Stack.Screen
        name='Notification'
       options={{headerShown:false}}
     />
      <Stack.Screen
        name='SecondPage'
       options={{headerShown:false}}
     />
     <Stack.Screen
        name='SignIn'
       options={{headerShown:false}}
     />
     <Stack.Screen
        name='SignupNext'
       options={{headerShown:false}}
     />
    </Stack>
    
   
  )
}

export default PagesLayout