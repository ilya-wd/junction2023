import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { Asset } from 'expo-asset';
const imageURI = Asset.fromModule(require('../../data/images/dalle_1.png')).uri;

const FriendItem = ({ friend }) => {
  console.log('FRIEND ITEM:   ', friend);
  console.log('IMAGE', friend.item.image);
  return (
    <View style={styles.container}>
      {/* <Image source={{ uri: '../../data/images/dalle_1.png' }} style={styles.image} /> */}
      <Image source={{ uri: imageURI }} style={styles.image} />
      {/* <Image source={require(friend.item.image)} style={styles.image} /> */}
      <View style={styles.column}>
        <Text style={styles.name}>{friend.item.name}</Text>
        <Text style={styles.online}>{friend.item.online}</Text>
      </View>
      <View style={styles.chatButton}>
        <Button title="Chat" onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#eee',
    backgroundColor: '#c2e1ed',
    borderRadius: 15,
    marginTop: 3,
    marginBottom: 3,
    marginRight: 2,
    marginLeft: 2,
    shadowRadius: 5,
    // shadowColor: '#c2ede3 ',
    shadowColor: '#c2ede3 ',
    shadowOpacity: 0,
    shadowOffset: 5,
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 25,
    marginRight: 10,
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
