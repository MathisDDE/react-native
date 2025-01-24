import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, Image } from 'react-native';

const LoadingScreen = () => {
  // Références d'animation pour le rebond et l'opacité
  const bounceValue = useRef(new Animated.Value(1)).current;
  const fadeValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animation de rebond et de fondu
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(bounceValue, {
            toValue: 1.2,
            duration: 700,
            useNativeDriver: true,
          }),
          Animated.timing(bounceValue, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(fadeValue, {
            toValue: 0.7,
            duration: 700,
            useNativeDriver: true,
          }),
          Animated.timing(fadeValue, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  }, [bounceValue, fadeValue]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('./assets/logo.jpg')}
        style={[
          styles.logo,
          { transform: [{ scale: bounceValue }], opacity: fadeValue },
        ]}
      />
      <Text style={styles.loadingText}>Chargement...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 100,
    height: 100,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: '#333',
  },
});

export default LoadingScreen;
