import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useProductContext } from './ProductContext';

export default function ProductDetailScreen() {
  const { selectedProduct } = useProductContext();

  if (!selectedProduct) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Aucun produit sélectionné.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={selectedProduct.image} style={styles.productImage} />
      <Text style={styles.productName}>{selectedProduct.name}</Text>
      <Text style={styles.productDescription}>{selectedProduct.description}</Text>
      <Text style={styles.productPrice}>{selectedProduct.price}€</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  productImage: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
  productPrice: {
    fontSize: 18,
    color: '#841584',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
  },
});
