import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Text, Image } from 'react-native';
import LoadingScreen from './LoadingScreen';
import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';
import WelcomeScreen from './WelcomeScreen';
import LoginScreen from './LoginScreen';
import FormulaireScreen from './FormulaireScreen';
import Catalogue from './Catalogue';
import AdminScreen from './AdminScreen'; 
import ProductDetailScreen from './ProductDetailScreen';
import { ProductProvider } from './ProductContext'; 
import CartScreen from './CartScreen'; 

const Tab = createBottomTabNavigator(); // Création du Tab Navigator
const Stack = createStackNavigator(); // Création du Stack Navigator

function MainStack() { 
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerTitle: () => <Text style={{ fontSize: 18 }}>Connexion</Text>,
        }}
      />
      <Stack.Screen
        name="Formulaire"
        component={FormulaireScreen}
        options={{
          headerTitle: () => <Text style={{ fontSize: 18 }}>Inscription</Text>,
        }}
      />
      <Stack.Screen
        name="AdminScreen"
        component={AdminScreen}
        options={{
          headerTitle: () => <Text style={{ fontSize: 18 }}>Admin Panel</Text>,
        }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen} // Ajout de la page ProductDetailScreen
        options={{
          headerTitle: () => <Text style={{ fontSize: 18 }}>Détails du produit</Text>,
        }}
      />
      <Stack.Screen
        name="MainTabs"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function BottomTabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerTitle: () => (
            <Image
              source={require('./assets/logo.jpg')}
              style={{ width: 40, height: 40 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Catalogue"
        component={Catalogue}
        options={{
          tabBarLabel: () => <Text style={{ fontSize: 12 }}>Catalogue</Text>,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="book-open-page-variant"
              color={color}
              size={size}
            />
          ),
        }}
      />
            <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: 'Panier',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cart" color={color} size={size} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: () => <Text style={{ fontSize: 12 }}>Paramètres</Text>,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true); // Création d'un état isLoading

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer); 
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ProductProvider>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </ProductProvider>
  );
}
