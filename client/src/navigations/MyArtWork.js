import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native'
import React from 'react'

const screenHeight = Dimensions.get('window').height;

export default function MyArtWork() {

  return (
    <View style={styles.container}>
      <FlatList/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: screenHeight,
    paddingLeft: 20,
    paddingTop: 20,
  },
}
)

