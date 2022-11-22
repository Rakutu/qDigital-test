import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';


const MAX_LENGTH = 30;

export const BookItem = ({ index, bookInfo, uid, onAdd, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={() => onPress({ ...bookInfo, uid })}>
    <View style={styles.textBlock}>
      <Text style={styles.index}>{index + 1}.</Text>
      <Text style={styles.title} numberOfLines={1}>
        {bookInfo.title.length > MAX_LENGTH
          ? bookInfo.title.substring(0, MAX_LENGTH - 3) + '...'
          : bookInfo.title
        }
      </Text>
    </View>
    <TouchableOpacity style={styles.addButton} onPress={() => onAdd({ ...bookInfo, uid })}>
      <Text style={styles.buttonText}>Add</Text>
    </TouchableOpacity>
  </TouchableOpacity>
)

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
  addButton: {
    paddingLeft: 10,
    paddingBottom: 5,
    paddingRight: 10,
    paddingTop: 5,
    backgroundColor: '#62A420',
    borderRadius: 3,
  },
  buttonText: {
    color: '#fff',
  },
})