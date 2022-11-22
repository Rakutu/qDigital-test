import { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { getFavoriteBooks } from '../services/api/getFavoriteBooks';
import { setFavorite } from '../services/api/setFavorite';
import { deleteBookFromLibrary } from '../services/api/deleteBookFromLibrary';
import { Spinner } from '../components/Spinner';
import { Notify } from '../components/Notify';
import { Footer } from '../components/Footer';
import { ModalComponent } from '../components/ModalComponent';
import { LibraryBookItem } from '../components/LibraryBookItem';
import { Header } from '../components/Header';


export const Library = ({ route, navigation }) => {
  const { token, mode } = route.params;
  const [ books, setBooks ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ error, setError ] = useState('');
  const [ success, setSuccess ] = useState('');
  const [ isOpenModal, setIsOpenModal ] = useState(false);
  const [ deletingId, setDeletingId ] = useState(0);

  const fetchLibraryBooks = () => {
    setIsLoading(true);
    getFavoriteBooks(token)
      .then(data => {
        if (data.status === 200) {
          setError('');

          const booksToView = mode === 'favorite'
            ? data.data.data.filter(({ favorite }) => favorite === 1)
            : data.data.data

          setBooks(booksToView);
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
  }

  useEffect(() => {
    setError('');
    setSuccess('');

    fetchLibraryBooks();
  }, []);

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setDeletingId(0);
  };

  const handleOpenModal = useCallback((id) => {
    setIsOpenModal(true);
    setDeletingId(id);
  }, []);

  const handlePressToBook = useCallback((bookInfo) => {
    navigation.navigate('BookInfo', { bookInfo });
  }, []);

  const handleAddToFavorite = useCallback((id, favorite) => {
    setIsLoading(true);
    setFavorite(token, id, favorite)
      .then(data => {
        if (data.status === 200) {
          setError('');
          setSuccess('Successful');

          setTimeout(() => setSuccess(''), 1000);
          fetchLibraryBooks();
          return
        }

        setError('Something went wrong');
      })
      .catch(e => {
        if (e instanceof Error) {
          setError(e.message);
        }

        setError('Something went wrong');
      })
  }, []);

  const handleDeleteBookFromLibrary = () => {
    setIsLoading(true);
    deleteBookFromLibrary(token, deletingId)
      .then(data => {
        if (data.status === 200) {
          setError('');
          setSuccess('Successful');
          handleCloseModal();

          setTimeout(() => setSuccess(''), 1000);
          fetchLibraryBooks();
          return
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
      <Header title={mode === 'favorite' ? 'Library - Favorite' : 'Library'}/>
      <View style={styles.main}>
        {isLoading
          ? <Spinner/>
          : (
            <FlatList
              data={books}
              refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchLibraryBooks}/>}
              renderItem={({ index, item }) =>
                <LibraryBookItem
                  index={index}
                  book={item}
                  onAddFavorite={handleAddToFavorite}
                  onPress={handlePressToBook}
                  onDelete={handleOpenModal}
                />
              }
            />
          )
        }
      </View>
      <Footer navigation={navigation} token={token}/>
      {isOpenModal && (
        <ModalComponent
          title='Delete book'
          description='Are you sure you want to delete this book?'
          onConfirm={handleDeleteBookFromLibrary}
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
    top: 60,
  },
  main: {
    flex: 1,
    marginBottom: 60,
  },
})