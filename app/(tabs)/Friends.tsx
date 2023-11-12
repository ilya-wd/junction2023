import { View, StyleSheet } from 'react-native';
import FriendList from '../../components/friends_components/FriendList';
import friends_data from '../../data/friends_data/friends_data';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export default function FriendsScreen() {
  return (

    // <LinearGradient colors={['#71D552', '#C9D2BD', '#A0C1CA']} style={{ flex: 1 }}>

   <View style={styles.container}>
      
      <FriendList friends={friends_data} />

    </View>
  
    // </LinearGradient>
  
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