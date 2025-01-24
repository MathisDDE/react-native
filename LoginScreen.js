import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  StatusBar,
  ImageBackground,
} from 'react-native';
import * as SQLite from 'expo-sqlite/legacy';

const db = SQLite.openDatabase('InstaDB.db');

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [errors, setErrors] = useState({ email: '', motDePasse: '' });

  useEffect(() => {
    // Vérifiez si un utilisateur est déjà connecté (hypothèse : stockage local ou base de données)
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM CurrentUser;',
        [],
        (_, { rows }) => {
          if (rows.length > 0) {
            const user = rows._array[0];
            Alert.alert(
              'Bienvenue',
              `Reconnexion automatique pour ${user.email}`,
              [
                {
                  text: 'OK',
                  onPress: () => navigation.navigate('MainTabs'), // Redirection
                },
              ]
            );
          }
        },
        (_, error) => {
          
        }
      );
    });
  }, []); // Exécute le useEffect uniquement lors du montage du composant

  const validateFields = () => {
    let valid = true;
    let newErrors = { email: '', motDePasse: '' };

    if (!email) {
      newErrors.email = 'L’email est requis';
      valid = false;
    } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      newErrors.email = 'Format de l’email invalide';
      valid = false;
    }

    if (!motDePasse) {
      newErrors.motDePasse = 'Le mot de passe est requis';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = () => {
    if (!validateFields()) {
      return;
    }

    // Vérification pour l'admin
    if (email === 'admin@gmail.com' && motDePasse === 'admin26') {
      Alert.alert('Admin connecté', 'Bienvenue dans le panneau administrateur.', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('AdminScreen'), // Redirection vers AdminScreen
        },
      ]);
      return;
    }

    // Vérification dans la base de données
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Users WHERE email = ? AND motDePasse = ?;',
        [email, motDePasse],
        (_, { rows }) => {
          if (rows.length > 0) {
            Alert.alert('Succès', 'Connexion réussie.', [
              {
                text: 'OK',
                onPress: () => navigation.navigate('MainTabs'), // Redirection vers la page d'accueil
              },
            ]);
            console.log('Utilisateur connecté:', rows._array[0]);

            // Enregistrement de l'utilisateur connecté
            db.transaction(tx => {
              tx.executeSql('DELETE FROM CurrentUser;'); // Supprime les connexions précédentes
              tx.executeSql('INSERT INTO CurrentUser (email) VALUES (?);', [
                email,
              ]);
            });
          } else {
            Alert.alert('Erreur', 'Email ou mot de passe incorrect.');
          }
        },
        (_, error) => {
          console.error('Erreur lors de la connexion :', error);
          Alert.alert(
            'Erreur',
            'Une erreur est survenue lors de la vérification des informations.'
          );
        }
      );
    });
  };

  return (
    <ImageBackground
      source={require('./assets/bg.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <StatusBar hidden={true} />

        <Text style={styles.header}>Connexion</Text>

        <Text style={styles.label}>Email :</Text>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="Entrez votre email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#888"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <Text style={styles.label}>Mot de passe :</Text>
        <TextInput
          style={[styles.input, errors.motDePasse && styles.inputError]}
          placeholder="Entrez votre mot de passe"
          secureTextEntry
          value={motDePasse}
          onChangeText={setMotDePasse}
          placeholderTextColor="#888"
        />
        {errors.motDePasse && (
          <Text style={styles.errorText}>{errors.motDePasse}</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Formulaire')}>
          <Text style={styles.signUpText}>
            Pas encore de compte ? Inscrivez-vous
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(240, 242, 245, 0.9)',
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    marginBottom: 5,
    fontWeight: '600',
    color: '#555',
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#FF0000',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#841584',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpText: {
    marginTop: 15,
    textAlign: 'center',
    color: '#841584',
    textDecorationLine: 'underline',
  },
});
 