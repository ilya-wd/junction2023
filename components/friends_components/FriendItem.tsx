import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

const FriendItem = ({ friend }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: friend.item.image }} style={styles.image} />
      <View style={styles.column}>
        <Text style={styles.name}>{friend.item.name}</Text>
        <Text style={styles.online}>{friend.item.online}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 5,
    borderRadius: 20,
    borderColor: '#E7E7E7',
    // borderWidth: 0.5,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 2,
    marginLeft: 2,
    boxShadow: '',
    // shadowRadius: 10,
    shadowColor: 'black',
    // shadowOpacity: 0.5,
    shadowOffset: {width: 5, height: 5},
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 25,
    shadowOpacity: 0,
    marginRight: 10,
    resizeMode: "contain"
  },
  online: {
    flex: 1,
    fontSize: 14,
    marginTop: 20,
  },
  name: {
    flex: 1,
    fontSize: 18,
    marginTop: 20,
  },
  column: {
    flexDirection: 'column',
  },
  chatButton: {
    marginLeft: 'auto',
    // position: 'absolute',
    // right: '10',
  },
});

export default FriendItem;
