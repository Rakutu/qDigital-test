import { Text, View, StyleSheet } from 'react-native';


export const Title = ({ title, styles }) => (
  <View>
    <Text style={[ innerStyles.title, styles ]}>
      {title}
    </Text>
  </View>
)

const innerStyles = StyleSheet.create({
  title: {
    fontSize: 32,
    lineHeight: '36px',
  },
})