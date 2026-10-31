import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const YourApp = () => {
  return (
    <View style={styles.ecran}>
      {/* Partie haute : logo + titre au centre */}
      <View style={styles.haut}>
        <Image
          source={require('../../assets/images/ascend-logo.png')}
          style={{ width: 120, height: 120 }}
          contentFit="contain"
        />
        <Text style={styles.titre}>Ascend</Text>
        <Text style={styles.slogan}>Mange mieux. Entraîne-toi plus fort.</Text>
      </View>

      {/* Partie basse : les boutons */}
      <View style={styles.bas}>
        <Pressable
          onPress={() => router.push('/inscription')}
          style={({ pressed }) => [styles.bouton, pressed && { opacity: 0.7 }]}
        >
          <Text style={styles.boutonTexte}>Commencer</Text>
        </Pressable>

        <Pressable
          onPress={() => router.push('/connexion')}
          style={({ pressed }) => [styles.boutonSecondaire, pressed && { opacity: 0.7 }]}
        >
          <Text style={styles.boutonSecondaireTexte}>J'ai déjà un compte</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ecran: { flex: 1, backgroundColor: '#000000', padding: 24 },
  haut: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  titre: { color: '#FFFFFF', fontSize: 34, fontWeight: '800', marginTop: 16 },
  slogan: { color: '#8A97A6', fontSize: 16, marginTop: 8 },
  bas: { paddingBottom: 30 },
  bouton: {
    backgroundColor: '#22C55E',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  boutonTexte: { color: '#0F1720', fontSize: 17, fontWeight: '700' },
  boutonSecondaire: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 12,
    borderWidth: 1.5,
    borderColor: '#22C55E',
  },
  boutonSecondaireTexte: { color: '#22C55E', fontSize: 17, fontWeight: '600' },
});

export default YourApp;