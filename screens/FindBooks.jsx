import { useCallback, useEffect, useState } from 'react';
import {
  RefreshControl,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { getBooksBySubstring } from '../services/api/getBooksBySubstring';
import { addBookToLibrary } from '../services/api/addBookToLibrary';
import { debounce } from '../utils/debounce';
import { TextField } from '../components/TextField';
import { Footer } from '../components/Footer';
import { Spinner } from '../components/Spinner';
import { BookItem } from '../components/BookItem';
import { Notify } from '../components/Notify';
import { ModalComponent } from '../components/ModalComponent';


export const FindBooks = ({ route, navigation }) => {
  const { token } = route.params;
  const [ isLoading, setIsLoading ] = useState(false);
  const [ books, setBooks ] = useState([]);
  const [ value, setValue ] = useState('');
  const [ isOpenModal, setIsOpenModal ] = useState(false);
  const [ chosenItem, setChosenItem ] = useState(null);
  const [ error, setError ] = useState('');
  const [ success, setSuccess ] = useState('');

  const fetchBooks = () => {
    setIsLoading(true);
    getBooksBySubstring(value)
      .then(data => {
        if (data.status === 200) {
          setError('');
          setBooks(data.data.items);

          return;
        }

        setError('Something went wrong');
      })
      .catch(e => {
        if (e instanceof Error) {
          setError(e.message);
        }

        setError('Something went wrong');
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setError('');
    setSuccess('');

    if (value !== '') {
      fetchBooks();
    }
  }, [ value ]);

  const handleClear = () => setValue('');

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setChosenItem(null);
  };

  const handleSearch = useCallback(
    debounce(
      (newValue) => setValue(newValue.toString())
    ), [ value ],
  );

  const handleOpenModal = useCallback((item) => {
    setIsOpenModal(true);
    setChosenItem(item);
  }, []);

  const handlePressToBook = useCallback((bookInfo) => {
    navigation.navigate('BookInfo', { bookInfo });
  }, []);

  const handleAddToFavorite = () => {
    const authors = Array.isArray(chosenItem.authors)
      ? chosenItem.authors.join(', ')
      : chosenItem.authors;

    addBookToLibrary({
      title: chosenItem.title,
      description: chosenItem.description,
      uid: chosenItem.uid,
      favorite: 0,
      authors,
    }, token)
      .then(data => {
        if (data.status === 201) {
          setError('');
          setSuccess('Successful');
          setIsOpenModal(false);
          setBooks(books.filter(({ id }) => id !== chosenItem.uid));

          setTimeout(() => setSuccess(''), 1000);
          return;
        }

        setError('Something went wrong');
      })
      .catch(e => {
        if (e instanceof Error) {
          setError(e.message);
        }

        setError('Something went wrong');
      })
  };

  return (
    <View style={styles.container}>
      {error && <Notify type='error' reason={error} style={styles.notify}/>}
      {success && <Notify type='success' reason={success} style={styles.notify}/>}
      <View style={styles.inputContainer}>
        <Image style={styles.searchIcon} source={require('../assets/search.png')}/>
        <TouchableOpacity style={styles.clearIcon} onPress={handleClear}>
          <Image source={require('../assets/clear.png')}/>
        </TouchableOpacity>
        <TextField
          value={value}
          placeholder='search books'
          onChange={handleSearch}
          styles={styles.input}
        />
      </View>
      <View style={styles.main}>
        {isLoading
          ? <Spinner/>
          : (
              <FlatList
                data={books}
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchBooks}/>}
                renderItem={({ index, item: { volumeInfo, id } }) =>
                  <BookItem
                    index={index}
                    bookInfo={volumeInfo}
                    onPress={handlePressToBook}
                    onAdd={handleOpenModal}
                    uid={id}
                  />
                }
              />
          )
        }
      </View>
      <Footer navigation={navigation} token={token}/>
      {isOpenModal && (
        <ModalComponent
          title='Add book'
          description='Are you sure you want to add this book?'
          onConfirm={handleAddToFavorite}
          onCancel={handleCloseModal}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  notify: {
    left: 0,
    top: 50,
  },
  inputContainer: {
    position: 'relative',
    paddingTop: 12,
    paddingRight: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    backgroundColor: '#002538',
  },
  searchIcon: {
    position: 'absolute',
    top: 13,
    left: 18,
    zIndex: 10,
  },
  clearIcon: {
    position: 'absolute',
    top: 18,
    right: 20,
    zIndex: 10,
  },
  input: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 40,
    paddingLeft: 40,
    backgroundColor: '#fff',
    borderRadius: 3,
  },
  main: {
    flex: 1,
    marginBottom: 60,
  },
})