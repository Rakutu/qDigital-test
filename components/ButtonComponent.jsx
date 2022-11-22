import { StyleSheet, Text, TouchableOpacity } from 'react-native';


export const ButtonComponent = (props) => (
  <TouchableOpacity
    {...props}
    style={{
      ...props.styles,
      ...styles.root,
      backgroundColor: props.type === 'primary'
        ? '#0079B8'
        : '#004366',
      opacity: props.disabled
        ? 0.5
        : 1,
    }}
  >
    <Text style={styles.text}>{props.title}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  root: {
    color: '#fff',
    textAlign: 'center',
    width: '100%',
    marginBottom: 23,
    paddingRight: 12,
    paddingLeft: 12,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 3,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  }
})