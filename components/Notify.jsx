import { View, StyleSheet, Text, Image } from 'react-native';

export const Notify = ({ type, reason, style }) => (
  <View style={{
    ...styles.container,
    ...style,
    backgroundColor: type === 'error'
      ? '#C92100'
      : '#62A420'
  }}>
    {type === 'error'
      ? <Image style={{ marginRight: 10 }} source={require('../assets/error.png')}/>
      : (
        <View style={styles.icon}>
          <Text style={styles.text}>✓</Text>
        </View>
      )
    }
    <Text style={styles.text}>{reason}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 35,
    left: 45,
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    zIndex: 100,
  },
  icon: {
    backgroundColor: 'transparent',
    marginRight: 10,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 5,
    paddingRight: 5,
    borderBottomColor: '#fff',
    borderBottomWidth: '2px',
    borderTopColor: '#fff',
    borderTopWidth: '2px',
    borderLeftColor: '#fff',
    borderLeftWidth: '2px',
    borderRightColor: '#fff',
    borderRightWidth: '2px',
    borderStyle: 'solid',
    borderRadius: '50%',
  },
  text: {
    color: '#fff',
  },
})