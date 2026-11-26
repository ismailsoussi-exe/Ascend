import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { supabase } from '../lib/supabase';

const Inscription = () => {
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [confirmationEmail, setConfirmationEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [confirmationMotDePasse, setConfirmationMotDePasse] = useState('');


  const regles = [
    { texte: '12 caractères minimum', ok: motDePasse.length >= 12 },
    { texte: 'Une majuscule', ok: /[A-Z]/.test(motDePasse) },
    { texte: 'Une minuscule', ok: /[a-z]/.test(motDePasse) },
    { texte: 'Un chiffre', ok: /[0-9]/.test(motDePasse) },
    { texte: 'Un caractère spécial (!@#$…)', ok: /[^A-Za-z0-9]/.test(motDePasse) },
  ];

  const inscrire = async () => {
    if (!prenom || !nom || !email || !confirmationEmail || !motDePasse || !confirmationMotDePasse) {
      Alert.alert('Champs manquants', 'Remplis tous les champs.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      Alert.alert('E-mail invalide', "L'adresse e-mail n'est pas valide.");
      return;
    }

    if (email.trim().toLowerCase() !== confirmationEmail.trim().toLowerCase()) {
      Alert.alert('Erreur', 'Les deux adresses e-mail ne sont pas identiques.');
      return;
    }

    if (regles.some((regle) => !regle.ok)) {
      Alert.alert('Mot de passe trop faible', 'Ton mot de passe doit respecter toutes les règles.');
      return;
    }

    if (motDePasse !== confirmationMotDePasse) {
      Alert.alert('Erreur', 'Les deux mots de passe ne sont pas identiques.');
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password: motDePasse,
      options: {
        data: { prenom: prenom.trim(), nom: nom.trim() },
      },
    });

    if (error) {
      Alert.alert('Inscription impossible', error.message);
    } else {
      router.replace('/');
    }
  };

  return (
    <ScrollView style={styles.ecran} contentContainerStyle={styles.contenu} keyboardShouldPersistTaps="handled">
      <Text style={styles.titre}>Créer un compte</Text>

      <TextInput style={styles.champ} value={prenom} onChangeText={setPrenom}
        placeholder="Prénom" placeholderTextColor="#8A97A6" />

      <TextInput style={styles.champ} value={nom} onChangeText={setNom}
        placeholder="Nom" placeholderTextColor="#8A97A6" />

      <TextInput style={styles.champ} value={email} onChangeText={setEmail}
        placeholder="E-mail" placeholderTextColor="#8A97A6"
        autoCapitalize="none" keyboardType="email-address" />

      <TextInput style={styles.champ} value={confirmationEmail} onChangeText={setConfirmationEmail}
        placeholder="Confirmer l'e-mail" placeholderTextColor="#8A97A6"
        autoCapitalize="none" keyboardType="email-address" />

      <TextInput style={styles.champ} value={motDePasse} onChangeText={setMotDePasse}
        placeholder="Mot de passe" placeholderTextColor="#8A97A6"
        secureTextEntry autoCapitalize="none" />

      <View style={styles.regles}>
        {regles.map((regle) => (
          <Text key={regle.texte} style={[styles.regle, regle.ok && styles.regleOk]}>
            {regle.ok ? '✓' : '•'} {regle.texte}
          </Text>
        ))}
      </View>

      <TextInput style={styles.champ} value={confirmationMotDePasse} onChangeText={setConfirmationMotDePasse}
        placeholder="Confirmer le mot de passe" placeholderTextColor="#8A97A6"
        secureTextEntry autoCapitalize="none" />

      <Pressable style={({ pressed }) => [styles.bouton, pressed && { opacity: 0.7 }]} onPress={inscrire}>
        <Text style={styles.boutonTexte}>S'inscrire</Text>
      </Pressable>

      <Pressable onPress={() => router.replace('/connexion')} style={styles.lien}>
        <Text style={styles.lienTexte}>
          Déjà un compte ? <Text style={styles.lienFort}>Se connecter</Text>
        </Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ecran: { flex: 1, backgroundColor: '#000000' },
  contenu: { padding: 24, paddingTop: 80, paddingBottom: 60 },
  titre: { color: '#FFFFFF', fontSize: 28, fontWeight: '800', marginBottom: 24 },
  champ: { backgroundColor: '#1C1C1E', color: '#FFFFFF', fontSize: 16, padding: 16, borderRadius: 12, marginBottom: 12 },
  regles: { marginTop: -4, marginBottom: 14, paddingLeft: 4 },
  regle: { color: '#8A97A6', fontSize: 13, marginBottom: 3 },
  regleOk: { color: '#22C55E' },
  bouton: { backgroundColor: '#22C55E', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  boutonTexte: { color: '#000000', fontSize: 17, fontWeight: '700' },
  lien: { marginTop: 20, alignItems: 'center' },
  lienTexte: { color: '#8A97A6', fontSize: 15 },
  lienFort: { color: '#22C55E', fontWeight: '700' },
});

export default Inscription;