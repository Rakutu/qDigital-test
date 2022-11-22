import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';


const MAX_LENGTH = 25;

export const LibraryBookItem = ({ index, book, onPress, onAddFavorite, onDelete }) => {
  const handleAddToFavorite = () => onAddFavorite(book.id, book.favorite);
  const handlePress = () => onPress(book);
  const handleDelete = () => onDelete(book.id);
  const statusStyles = [ styles.status, book.favorite === 1 ? styles.favoriteStatus : '' ];

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={statusStyles}/>
      <View style={styles.textBlock}>
        <Text style={styles.index}>{index + 1}.</Text>
        <Text style={styles.title} numberOfLines={1}>
          {book.title.length > MAX_LENGTH
            ? book.title.substring(0, MAX_LENGTH - 3) + '...'
            : book.title
          }
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={[ styles.button, styles.favorite ]} onPress={handleAddToFavorite}>
          <Text style={styles.buttonText}>F</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[ styles.button, styles.delete ]} onPress={handleDelete}>
          <Text style={styles.buttonText}>D</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[ styles.button, styles.info ]} onPress={handlePress}>
          <Text style={styles.buttonText}>I</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
    paddingLeft: 12,
    paddingTop: 20,
    paddingRight: 12,
    paddingBottom: 20,
    backgroundColor: '#FAFAFA',
    borderBottomColor: '#ccc',
    borderBottomWidth: '1px',
    borderTopColor: '#ccc',
    borderTopWidth: '1px',
    borderLeftColor: '#ccc',
    borderLeftWidth: '1px',
    borderRightColor: '#ccc',
    borderRightWidth: '1px',
    borderStyle: 'solid',
    borderRadius: 3,
  },
  status: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 6,
    backgroundColor: '#fff',
  },
  favoriteStatus: {
    backgroundColor: '#62A420',
  },
  textBlock: {
    flexDirection: 'row',
  },
  index: {
    color: '#565656',
    marginRight: 30,
  },
  title: {
    color: '#565656',
    marginRight: 30,
    justifyContent: 'flex-start',
  },
  actions: {
    flexDirection: 'row',
  },
  button: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginRight: 3,
  },
  favorite: {
    backgroundColor: '#62A420',
  },
  delete: {
    backgroundColor: '#E62700',
  },
  info: {
    backgroundColor: '#0079B8',
  },
  buttonText: {
    color: '#fff',
    fontSize: 11,
  },
})