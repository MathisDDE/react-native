import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite/legacy';

const db = SQLite.openDatabase('InstaDB.db');

export default function AdminScreen() {
  const [tables, setTables] = useState([]);
  const [tableData, setTableData] = useState({});

  useEffect(() => {
    // Récupérer toutes les tables
    db.transaction(tx => {
      tx.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table';",
        [],
        (_, { rows }) => {
          const tableNames = rows._array.map(row => row.name);
          setTables(tableNames);
        },
        (_, error) => console.error('Erreur lors de la récupération des tables:', error)
      );
    });
  }, []);

  useEffect(() => { // Récupérer les données de chaque table
    if (tables.length > 0) {
      tables.forEach(table => {
        db.transaction(tx => {
          tx.executeSql(
            `SELECT * FROM ${table};`,
            [],
            (_, { rows }) => {
              setTableData(prev => ({
                ...prev,
                [table]: rows._array,
              }));
            },
            (_, error) => console.error(`Erreur lors de la récupération des données pour ${table}:`, error)
          );
        });
      });
    }
  }, [tables]);

  return (
    // Afficher les tables et leurs données
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Admin Panel</Text>
      {tables.map(table => (
        <View key={table} style={styles.tableContainer}>
          <Text style={styles.tableName}>{table}</Text>
          {tableData[table]?.map((row, index) => (
            <Text key={index} style={styles.row}>
              {JSON.stringify(row)}
            </Text>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  tableContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  tableName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    fontSize: 14,
    marginBottom: 5,
    color: '#555',
  },
});
