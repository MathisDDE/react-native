import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite/legacy';
import { products, couponProducts, banners,offers } from './data/ProductData';

const db = SQLite.openDatabase('InstaDB.db');

// Fonction pour créer la table Produits
const createProductsTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Produits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        image TEXT
      );`,
      [],
      () => console.log('Table Produits créée avec succès'),
      (_, error) => console.error('Erreur lors de la création de la table Produits:', error)
    );
  });
};

// Fonction pour vérifier si un produit existe déjà dans la base
const productExists = (name, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT * FROM Produits WHERE name = ?;`,
      [name],
      (_, { rows }) => callback(rows.length > 0), // Si le produit existe, rows.length > 0
      (_, error) => console.error('Erreur lors de la vérification du produit:', error)
    );
  });
};

// Fonction pour insérer les produits dans la base uniquement s'ils n'existent pas
const insertProductsIfNotExists = (products) => {
  db.transaction((tx) => {
    products.forEach((product) => {
      productExists(product.name, (exists) => {
        if (!exists) {
          tx.executeSql(
            `INSERT INTO Produits (name, description, price, image) VALUES (?, ?, ?, ?);`,
            [product.name, product.description, product.price, product.image],
            () => console.log(`Produit ${product.name} inséré avec succès`),
            (_, error) => console.error('Erreur lors de l’insertion d’un produit:', error)
          );
        } else {
          console.log(`Produit ${product.name} existe déjà.`);
        }
      });
    });
  });
};

// Fonction pour lire les produits depuis la base de données
const fetchProducts = (callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT * FROM Produits;`,
      [],
      (_, { rows }) => callback(rows._array), // Retourne les produits dans un tableau
      (_, error) => console.error('Erreur lors de la récupération des produits:', error)
    );
  });
};

const ProductContext = createContext();

// Fournisseur de contexte
export const ProductProvider = ({ children }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productsFromDB, setProductsFromDB] = useState([]);
    const [cart, setCart] = useState([]); 
  
    const addToCart = (product) => {
      setCart((prevCart) => [...prevCart, product]); // Ajoute le produit au panier
    };
  
    const removeFromCart = (id) => {
      setCart((prevCart) => prevCart.filter((item) => item.id !== id)); // Retire le produit du panier
    };
  
    useEffect(() => {
      createProductsTable();
      insertProductsIfNotExists(products);
      fetchProducts(setProductsFromDB);
    }, []);
  
    return (
      <ProductContext.Provider
        value={{
          products: productsFromDB,
          couponProducts,
          banners,
          selectedProduct,
          offers,
          setSelectedProduct,
          cart,
          addToCart,
          removeFromCart,
        }}
      >
        {children}
      </ProductContext.Provider>
    );
  };
  

// Hook personnalisé pour utiliser le contexte
export const useProductContext = () => useContext(ProductContext);
