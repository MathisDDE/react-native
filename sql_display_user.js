import React, { useState } from 'react';
import * as SQLite from 'expo-sqlite/legacy';
import { View, Text, FlatList, Button, StyleSheet} from 'react-native';



const db = SQLite.openDatabase('InstaDB.db');

 const DisplayUser=()=>
  {     
    
    const [Users, setUsers] = useState([]);

const GetUsers=()=>
{


  try{

db.transaction(tx => {
  tx.executeSql(
    'SELECT * FROM Users;',
    [],
    (_, { rows }) => setUsers(rows._array),
  
  );
});
  }
  catch{
    (_, error) => console.error('Error fetching users:', error)

  }
  finally{
    db.closeAsync
  }
 };

    return (
      <View style={{ padding: 20 }}>
      
    <Button title="Afficher les utilisateurs" onPress={GetUsers} />
        <FlatList
          data={Users}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
            <Text>Nom:{item.username}</Text>
            <Text>Prenom: {item.password}</Text>

            </View>


          )}
        />
      
      </View>
    );
  
   }

 
export default DisplayUser;


const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'red',
  
  },
});