import React from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions ,Text} from "react-native";
import { Tabs } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg";


const { width } = Dimensions.get("window");

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabContainer}>
      {/* Background Curve */}
      <Svg width={width} height={70} viewBox={`0 0 ${width} 70`} style={styles.curve}>

      <Path fill="white" d={`M0,0 Q ${width / 2},70 ${width},0 L0,70 Z`} />

      </Svg>

      {/* Bottom Tabs */}
      <View style={styles.innerTabBar}>
        {state.routes
         .filter(route => !["personalinfo", "changepassword","customerservice","creditcard","details"].includes(route.name))
        .map((route, index) => {
          const { options } = descriptors[route.key];
          const label = route.name;
          const profileScreens = ["profile", "personalinfo", "changepassword", "customerservice","creditcard" ];
          const homeScreens =["home","details"];

         

          // Ensure state and state.routes exist before accessing them
          const currentRoute = state?.routes?.[state.index]?.name || "";
          
          const isFocused =
            state.index === index ||
            (route.name === "profile" && profileScreens.includes(currentRoute))||
            (route.name === "home" && homeScreens.includes(currentRoute));
          const onPress = () => navigation.navigate(route.name);

          const iconMap = {
            home: "home",
            favorite: "heart",
            projects: "briefcase",
            profile: "user",
          };

          return (
            <TouchableOpacity key={index} onPress={onPress} >
              <View style={styles.tabsContainer}>
              <FontAwesome5 name={iconMap[label]} size={24} color={isFocused ? "#FFB82B" : "#581380"}  style={styles.tabButton}/>
              <Text style={[styles.tabText, { color: isFocused ? "#FF882B" : "#581380" }]}> {label} </Text>
              </View>
              
            </TouchableOpacity>
            
          );
        })}
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={() => console.log("FAB Clicked")}>
        <FontAwesome5 name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="home"  />
      <Tabs.Screen name="favorite" />
      <Tabs.Screen name="projects" />
      <Tabs.Screen name="profile" />
      

    </Tabs>
  );
};

    
   
    

const styles = StyleSheet.create({
  tabContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 55,
    
    alignItems: "center",
  },
  curve: {
    position: "absolute",
    top: 0,
  },
  innerTabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: 60,
    backgroundColor: "rgb(223, 211, 219)",
    
   
  },
  tabButton: {
   marginLeft:6,
   marginRight:11,
    

    

  },
  fab: {
    position: "absolute",
    top: -30,
    backgroundColor: "#581380",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  tabText:{
    fontSize:10,
    textAlign: 'center',
    

  },
  tabsContainer:{
    flexDirection:'column',
    justifyContent:'space-between',
    
    
  },
});

export default TabsLayout;