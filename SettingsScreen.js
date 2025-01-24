import React, { useState } from 'react';
import {View,Text,TouchableOpacity,Alert,FlatList,TextInput,StyleSheet,} from 'react-native';
import * as SQLite from 'expo-sqlite/legacy';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const db = SQLite.openDatabase('InstaDB.db');

export default function SettingsScreen({ navigation }) {
  const [showAccounts, setShowAccounts] = useState(false);
  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editedUser, setEditedUser] = useState({});

  const fetchUsers = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Users;',
        [],
        (_, { rows }) => {
          setUsers(rows._array);
          console.log('Utilisateurs récupérés :', rows._array);
        },
        (_, error) => {
          console.error('Erreur lors de la récupération des utilisateurs :', error);
          Alert.alert('Erreur', 'Impossible de récupérer les utilisateurs.');
        }
      );
    });
  };

  const deleteUser = id => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM Users WHERE id = ?;',
        [id],
        () => {
          Alert.alert('Succès', 'Utilisateur supprimé avec succès.');
          fetchUsers(); // Recharge la liste des utilisateurs
        },
        (_, error) => {
          console.error('Erreur lors de la suppression :', error);
          Alert.alert('Erreur', 'Impossible de supprimer cet utilisateur.');
        }
      );
    });
  };

  const startEditing = user => {
    setEditMode(user.id);
    setEditedUser(user);
  };

  const saveUser = () => {
    const { id, nom, prenom, email } = editedUser;

    db.transaction(tx => {
      tx.executeSql(
        'UPDATE Users SET nom = ?, prenom = ?, email = ? WHERE id = ?;',
        [nom, prenom, email, id],
        () => {
          Alert.alert('Succès', 'Utilisateur mis à jour avec succès.');
          setEditMode(null);
          fetchUsers(); // Recharge la liste des utilisateurs
        },
        (_, error) => {
          console.error('Erreur lors de la mise à jour :', error);
          Alert.alert('Erreur', 'Impossible de mettre à jour cet utilisateur.');
        }
      );
    });
  };

  const toggleAccounts = () => {
    if (!showAccounts) {
      fetchUsers(); // Charge les utilisateurs uniquement lorsqu'on clique sur le lien
    }
    setShowAccounts(!showAccounts); // Change l'état d'affichage
  };

  const handleInputChange = (field, value) => {
    setEditedUser(prev => ({ ...prev, [field]: value }));
  };

  const handleLogout = () => {
    Alert.alert('Déconnexion', 'Êtes-vous sûr de vouloir vous déconnecter ?', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Déconnexion',
        style: 'destructive',
        onPress: () => {
          navigation.navigate('Login'); // Redirection vers l'écran de connexion
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleAccounts}>
        <Text style={styles.linkText}>Mes comptes</Text>
      </TouchableOpacity>

      {showAccounts && (
        <FlatList
          data={users}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.userContainer}>
              {editMode === item.id ? (
                <>
                  <TextInput
                    style={styles.input}
                    value={editedUser.nom}
                    onChangeText={value => handleInputChange('nom', value)}
                    placeholder="Nom"
                  />
                  <TextInput
                    style={styles.input}
                    value={editedUser.prenom}
                    onChangeText={value => handleInputChange('prenom', value)}
                    placeholder="Prénom"
                  />
                  <TextInput
                    style={styles.input}
                    value={editedUser.email}
                    onChangeText={value => handleInputChange('email', value)}
                    placeholder="Email"
                  />
                  <TouchableOpacity onPress={saveUser}>
                    <MaterialCommunityIcons name="content-save" size={24} color="green" />
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text style={styles.userText}>
                    {item.nom} {item.prenom} - {item.email}
                  </Text>
                  <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => startEditing(item)}>
                      <MaterialCommunityIcons name="pencil" size={24} color="blue" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteUser(item.id)}>
                      <MaterialCommunityIcons name="delete" size={24} color="red" />
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Aucun utilisateur trouvé.</Text>
          }
        />
      )}

      {/* Bouton de déconnexion */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Déconnexion</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  linkText: {
    fontSize: 18,
    color: '#841584',
    textDecorationLine: 'underline',
    marginBottom: 20,
    textAlign: 'center',
  },
  userContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userText: {
    fontSize: 16,
    color: '#333',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
    padding: 5,
    marginVertical: 5,
    flex: 1,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  logoutButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
