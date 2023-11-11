import { View, StyleSheet } from 'react-native';
import FriendList from '../../components/friends_components/FriendList';
import friends_data from '../../data/friends_data/friends_data';
import React from 'react';

export default function FriendsScreen() {
  return (

   <View style={styles.container}>
      
      <FriendList friends={friends_data} />

    </View>
  
  
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});