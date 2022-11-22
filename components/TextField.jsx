import { useEffect, useState } from 'react';
import { TextInput } from 'react-native';


export const TextField = ({ placeholder, value, onChange, styles, ...otherProps }) => {
  const [ substring, setSubstring ] = useState('');

  useEffect(() => {
    setSubstring(value);
  }, [ value ]);

  const handleChange = (newValue) => {
    setSubstring(newValue);
    onChange(newValue);
  }

  return (
    <TextInput
      placeholder={placeholder}
      onChangeText={handleChange}
      value={substring}
      style={styles}
      {...otherProps}
    />
  )
}