import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { supabase } from '../lib/supabase';

const Connexion = () => {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');

  const connecter = async () => {
    if (!email || !motDePasse) {
      Alert.alert('Champs manquants', 'Remplis ton e-mail et ton mot de passe.');
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: motDePasse,
    });

    if (error) {
      if (error.message === 'Invalid login credentials') {
        Alert.alert('Connexion impossible', 'E-mail ou mot de passe incorrect.');
      } else if (error.message === 'Email not confirmed') {
        Alert.alert('Connexion impossible', 'Confirme ton e-mail avant de te connecter.');
      } else {
        Alert.alert('Connexion impossible', error.message);
      }
    } else {
      router.replace('/');
    }
  };

  return (
    <View style={styles.ecran}>
      <Text style={styles.titre}>Connexion</Text>
      <Text style={styles.sousTitre}>Content de te revoir.</Text>

      <TextInput style={styles.champ} value={email} onChangeText={setEmail}
        placeholder="E-mail" placeholderTextColor="#8A97A6"
        autoCapitalize="none" keyboardType="email-address" />

      <TextInput style={styles.champ} value={motDePasse} onChangeText={setMotDePasse}
        placeholder="Mot de passe" placeholderTextColor="#8A97A6"
        secureTextEntry autoCapitalize="none" />

      <Pressable style={({ pressed }) => [styles.bouton, pressed && { opacity: 0.7 }]} onPress={connecter}>
        <Text style={styles.boutonTexte}>Se connecter</Text>
      </Pressable>

      <Pressable onPress={() => router.replace('/inscription')} style={styles.lien}>
        <Text style={styles.lienTexte}>
          Pas encore de compte ? <Text style={styles.lienFort}>S'inscrire</Text>
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  ecran: { flex: 1, backgroundColor: '#000000', justifyContent: 'center', padding: 24 },
  titre: { color: '#FFFFFF', fontSize: 28, fontWeight: '800' },
  sousTitre: { color: '#8A97A6', fontSize: 15, marginTop: 6, marginBottom: 24 },
  champ: { backgroundColor: '#1C1C1E', color: '#FFFFFF', fontSize: 16, padding: 16, borderRadius: 12, marginBottom: 12 },
  bouton: { backgroundColor: '#22C55E', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  boutonTexte: { color: '#000000', fontSize: 17, fontWeight: '700' },
  lien: { marginTop: 20, alignItems: 'center' },
  lienTexte: { color: '#8A97A6', fontSize: 15 },
  lienFort: { color: '#22C55E', fontWeight: '700' },
});

export default Connexion;