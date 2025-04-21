import React from 'react';
import { View, StyleSheet } from 'react-native';
import HeaderBar from './HeaderBar';

export default function ScreenLayout({ children, navigation }) {
  return (
    <View style={styles.container}>
      <HeaderBar navigation={navigation} />
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 0, // Header đã có paddingTop riêng rồi
  },
});
