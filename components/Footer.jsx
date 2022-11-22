import { Image, View, StyleSheet, TouchableOpacity } from 'react-native';


export const Footer = ({ navigation, token }) => {
  const handleRouteToFind = () => navigation.navigate('FindBooks', { token });
  const handleRouteToLib = () => navigation.navigate('Library', { token, mode: 'library' });
  const handleRouteToFavorite = () => navigation.navigate('Favorite', { token, mode: 'favorite' });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleRouteToLib}>
        <Image source={require('../assets/books.png')}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRouteToFind}>
        <Image source={require('../assets/find.png')}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRouteToFavorite}>
        <Image source={require('../assets/favorite.png')}/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 53,
    paddingRight: 53,
    backgroundColor: '#EEEEEE',
  }
});