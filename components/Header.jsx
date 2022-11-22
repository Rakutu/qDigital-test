import { Text, View, StyleSheet } from 'react-native';


export const Header = ({ title }) => (
  <View style={styles.titleContainer}>
    <Text style={styles.title}>{title}</Text>
  </View>
)

const styles = StyleSheet.create({
  titleContainer: {
    minHeight: 60,
    justifyContent: 'center',
    paddingLeft: 69,
    backgroundColor: '#002538',
  },
  title: {
    fontSize: 16,
    lineHeight: '19px',
    fontWeight: 'bold',
    color: '#fff',
  },
})