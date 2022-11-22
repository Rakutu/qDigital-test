import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { loginUser } from '../services/api/loginUser';
import { Title } from '../components/Title';
import { TextField } from '../components/TextField';
import { ButtonComponent } from '../components/ButtonComponent';
import { Spinner } from '../components/Spinner';
import { Notify } from '../components/Notify';


export const Login = ({ navigation }) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);
  const [ token, setToken ] = useState('');
  const [ error, setError ] = useState('');

  const handleEmailChange = value => setEmail(value);
  const handlePasswordChange = value => setPassword(value);
  const handleSignUpPress = () => {
    setEmail('');
    setPassword('');
    setError('');
    navigation.navigate('SignUp');
  };

  const handleLogin = () => {
    setIsLoading(true);
    loginUser(email, password)
      .then(({ data }) => {
        if (data.status) {
          setToken(data.data.access_token);
          setError('');

          return navigation.navigate('FindBooks', { token });
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
      <Title title='Login' styles={styles.title}/>
      <TextField
        value={email}
        placeholder='email'
        onChange={handleEmailChange}
        keyboardType='email-address'
        styles={styles.input}
      />
      <TextField
        value={password}
        placeholder='password'
        onChange={handlePasswordChange}
        secureTextEntry
        styles={{
          ...styles.input,
          ...styles.lastInput,
        }}
      />
      <ButtonComponent
        type='primary'
        title='LOG IN'
        disabled={isLoading || !email || !password}
        onPress={handleLogin}
      />
      <ButtonComponent
        type='secondary'
        title='SIGN UP'
        onPress={handleSignUpPress}
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