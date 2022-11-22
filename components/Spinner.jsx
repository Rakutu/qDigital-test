import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';


export const Spinner = () => (
  <View style={styles.container}>
    <ActivityIndicator size='large' color='#0079B8'/>
    <Text style={styles.text}>Loading...</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    paddingTop: 10,
  },
})