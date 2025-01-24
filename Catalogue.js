import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useProductContext } from './ProductContext';

const Catalogue = () => {
  const { offers } = useProductContext();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catalogue</Text>

      {offers && offers.length > 0 ? (
        <FlatList
          data={offers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.productCard}>
          <Image source={item.image} style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productDescription}>{item.description}</Text>
              <Text style={styles.productPrice}>{item.price} €</Text>
              <Text style={styles.productDiscount}>{item.discount}% OFF</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyMessage}>Aucune offre disponible pour le moment.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  productCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 16,
    color: '#841584',
    fontWeight: 'bold',
  },
  productDiscount: {
    fontSize: 14,
    color: '#FF6347',
    marginTop: 5,
  },
  emptyMessage: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Catalogue;
