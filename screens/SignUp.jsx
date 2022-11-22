import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { createUser } from '../services/api/createUser';
import { Title } from '../components/Title';
import { TextField } from '../components/TextField';
import { ButtonComponent } from '../components/ButtonComponent';
import { Spinner } from '../components/Spinner';
import { Notify } from '../components/Notify';


export const SignUp = ({ navigation }) => {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwordConfirm, setPasswordConfirm ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState('');

  const handleNameChange = value => setName(value);
  const handleEmailChange = value => setEmail(value);
  const handlePasswordChange = value => setPassword(value);
  const handlePasswordConfirmChange = value => setPasswordConfirm(value);
  const handleLoginPress = () => navigation.navigate('Login');
  const handleSignUp = () => {
    setIsLoading(true);
    createUser(name, email, password, passwordConfirm)
      .then(({ data }) => {
        if (data.status) {
          setError('');
          setName('');
          setEmail('');
          setPassword('');
          setPasswordConfirm('');

          return navigation.navigate('Login');
        }

        const error = typeof data.errors === 'object'
          ? Object.entries(data.errors)[0][1]
          : data.errors;

        setError(error);
      })
      .catch(e => {
        if (e instanceof Error) {
          return setError(e.message);
        }

        setError('Something went wrong');
      })
      .finally(() => setIsLoading(false));
  };

  if (isLoading) return <Spinner/>

  return (
    <View style={styles.container}>
      {error && <Notify type='error' reason={error}/>}
      <Title title='Registration' styles={styles.title}/>
      <TextField
        value={name}
        placeholder='name'
        onChange={handleNameChange}
        styles={styles.input}
      />
      <TextField
        value={email}
        placeholder='email'
        onChange={handleEmailChange}
        styles={styles.input}
        keyboardType='email-address'
      />
      <TextField
        value={password}
        placeholder='password'
        onChange={handlePasswordChange}
        styles={styles.input}
        secureTextEntry
      />
      <TextField
        value={passwordConfirm}
        placeholder='password confirm'
        onChange={handlePasswordConfirmChange}
        secureTextEntry
        styles={{
          ...styles.input,
          ...styles.lastInput,
        }}
      />
      <ButtonComponent
        type='primary'
        title='SUBMIT'
        disabled={isLoading || !name || !email || !password || !passwordConfirm}
        onPress={handleSignUp}
      />
      <ButtonComponent
        type='secondary'
        title='LOGIN'
        onPress={handleLoginPress}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: 35,
    paddingBottom: 35,
    paddingLeft: 46,
    paddingRight: 46,
  },
  title: {
    marginBottom: 30,
  },
  input: {
    width: '100%',
    fontSize: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#9A9A9A',
    borderStyle: 'solid',
    marginBottom: 25,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
  },
  lastInput: {
    marginBottom: 61,
  },
})