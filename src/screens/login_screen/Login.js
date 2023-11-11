import { StyleSheet, View, Text, TextInput, Button, Image } from 'react-native';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      {/* Top Third Section */}
      <View style={styles.topSection}>
        {/* Add your text or image here. Example: */}
        <Text style={styles.title}>Welcome Back!</Text>
        {/* <Image source={{uri: 'image_url_here'}} style={styles.image} /> */}
      </View>

      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
        />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry />
        <Button
          title="Forgot Password?"
          onPress={() => console.log('Restore Password')}
        />
      </View>

      {/* Bottom Space */}
      <View style={styles.bottomSpace}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  topSection: {
    flex: 1, // Takes up 1/3 of the screen
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  inputSection: {
    flex: 2, // Takes up 2/3 of the screen
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  bottomSpace: {
    flex: 0.5, // Adjust this for visual balance
  },
});

export default LoginScreen;
