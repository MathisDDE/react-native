import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite/legacy';

const db = SQLite.openDatabase('InstaDB.db');

const Inscription= () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const addItem = () => {
    if (username.trim() === '' || password.trim()=== '') {
      Alert.alert('Erreur', 'le username et mot de passe  sont obligatoires');
      return;
    }

    //  useEffect(() => {
         db.transaction(tx => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT,password TEXT)')
        });

//    }, [db]); 
   
    //insert
    db.transaction((tx) => {
      tx.executeSql(   
        "INSERT INTO Users (username, password) VALUES (?,?)",
        [username, password],
        (tx, results) => {
          console.log("user ajouté avec succès");
        },
        (_, error) => {
          Alert.alert('Erreur', 'Echec');
        }
      );
    });
  };

  return (
    <View style={styles.item}>
      <TextInput style={styles.Input}
        value={username}
        onChangeText={setUsername}
        placeholder="saisir le username"
      />
       <TextInput style={styles.Input}
        value={password}
        onChangeText={setPassword}
        placeholder="saisir le password"
      />
      <Button title="Ajouter" onPress={addItem} />
    </View>
  );
};

export default Inscription;

const styles = StyleSheet.create({
    item: {
        margin:50,
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: 'red',
    
    },

  Input:{
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'gray',
      } 

  });