import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Header } from '../components/Header';


export const BookInfo = ({ route }) => {
  const { bookInfo } = route.params;

  const authors = Array.isArray(bookInfo.authors)
    ? bookInfo.authors.join(', ')
    : bookInfo.authors;

  return (
    <ScrollView>
      <Header title='Library - Info'/>
      <View style={styles.container}>
        <Text style={styles.title}>{bookInfo.title}</Text>
        <View style={styles.authorsContainer}>
          <Text style={styles.authors}>{authors}</Text>
        </View>
        <Text style={styles.description}>{bookInfo.description}</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    padding: 24,
  },
  title: {
    marginBottom: 10,
    fontSize: 22,
    lineHeight: '24px',
  },
  authorsContainer: {
    paddingTop: 5,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 5,
    marginBottom: 10,
    backgroundColor: '#E1F1F6',
    borderRadius: 11,
    borderStyle: 'solid',
    borderRightWidth: 1,
    borderRightColor: '#89CBDF',
    borderLeftWidth: 1,
    borderLeftColor: '#89CBDF',
    borderTopWidth: 1,
    borderTopColor: '#89CBDF',
    borderBottomWidth: 1,
    borderBottomColor: '#89CBDF',
  },
  authors: {
    color: '#004A70',
  },
  description: {
    fontSize: 14,
    lineHeight: '24px',
    color: '#565656',
  },
})