import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, StatusBar, ImageBackground, ScrollView, } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as SQLite from 'expo-sqlite/legacy';

const db = SQLite.openDatabase('InstaDB.db');

export default function FormulaireScreen({ navigation }) {
  const { control, handleSubmit, formState: { errors } } = useForm();
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nom TEXT,
          prenom TEXT,
          telephone TEXT,
          age INTEGER,
          email TEXT,
          motDePasse TEXT
        );`,
        [],
        () => {
          console.log('Table Users vérifiée ou créée avec succès.');
        },
        (_, error) => {
          console.error('Erreur lors de la création de la table:', error);
        }
      );
    });
  }, []);

  const onSubmit = data => {
    const { nom, prenom, telephone, age, email, motDePasse } = data;

    db.transaction(tx => { // Insertion des données dans la base de données
      tx.executeSql( // Requête SQL pour insérer un utilisateur
        'INSERT INTO Users (nom, prenom, telephone, age, email, motDePasse) VALUES (?, ?, ?, ?, ?, ?);',
        [nom, prenom, telephone, age, email, motDePasse],
        () => {
          Alert.alert('Succès', 'Compte créé avec succès.', [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Login'), // Redirection vers la page de connexion
            },
          ]);
          console.log('Utilisateur ajouté avec succès');
        },
        (_, error) => {
          Alert.alert('Erreur', 'Impossible de créer le compte.');
          console.error('Insertion échouée:', error);
        }
      );
    });
  };

  return (
    <ImageBackground
      source={require('./assets/bg.png')}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <StatusBar hidden={true} />

        <Text style={styles.header}>Inscription</Text>

        <Text style={styles.label}>Nom :</Text>
        <Controller
          control={control}
          name="nom"
          rules={{
            required: 'Le nom est requis',
            minLength: {
              value: 6,
              message: 'Le nom doit contenir au moins 6 caractères',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.nom && styles.inputError]}
              placeholder="Entrez votre nom"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholderTextColor="#888"
            />
          )}
        />
        {errors.nom && <Text style={styles.errorText}>{errors.nom.message}</Text>}

        <Text style={styles.label}>Prénom :</Text>
        <Controller
          control={control}
          name="prenom"
          rules={{
            required: 'Le prénom est requis',
            minLength: {
              value: 6,
              message: 'Le prénom doit contenir au moins 6 caractères',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.prenom && styles.inputError]}
              placeholder="Entrez votre prénom"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholderTextColor="#888"
            />
          )}
        />
        {errors.prenom && <Text style={styles.errorText}>{errors.prenom.message}</Text>}

        <Text style={styles.label}>Téléphone :</Text>
        <Controller
          control={control}
          name="telephone"
          rules={{
            required: 'Le téléphone est requis',
            pattern: {
              value: /^[+]?([0-9]{1,3})?[-.●]?[(]?[0-9]{1,4}[)]?[-.●]?[0-9]{1,4}[-.●]?[0-9]{1,9}$/i,
              message: 'Le numéro de téléphone est invalide',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.telephone && styles.inputError]}
              placeholder="Entrez votre numéro de téléphone"
              keyboardType="phone-pad"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholderTextColor="#888"
            />
          )}
        />
        {errors.telephone && <Text style={styles.errorText}>{errors.telephone.message}</Text>}


        <Text style={styles.label}>Âge :</Text>
        <Controller
          control={control}
          name="age"
          rules={{
            required: 'L’âge est requis',
            pattern: {
              value: /^[0-9]+$/,
              message: 'L’âge doit être un nombre',
            },
            validate: value => value >= 18 || 'Vous devez avoir au moins 18 ans',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.age && styles.inputError]}
              placeholder="Entrez votre âge"
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholderTextColor="#888"
            />
          )}
        />
        {errors.age && <Text style={styles.errorText}>{errors.age.message}</Text>}

        <Text style={styles.label}>Email :</Text>
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'L’email est requis',
            pattern: {
              value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
              message: 'Format de l’email invalide',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="Entrez votre email"
              keyboardType="email-address"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholderTextColor="#888"
            />
          )}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

        <Text style={styles.label}>Mot de passe :</Text>
        <Controller
          control={control}
          name="motDePasse"
          rules={{
            required: 'Le mot de passe est requis',
            minLength: {
              value: 6,
              message: 'Le mot de passe doit contenir au moins 6 caractères',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.motDePasse && styles.inputError]}
              placeholder="Entrez votre mot de passe"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholderTextColor="#888"
            />
          )}
        />
        {errors.motDePasse && <Text style={styles.errorText}>{errors.motDePasse.message}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Créer un compte</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  scrollContainer: {
    flexGrow: 1,
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
});
