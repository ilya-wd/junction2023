import { View, StyleSheet, Dimensions } from 'react-native';
import FriendList from '../../components/friends_components/FriendList';
import friends_data from '../../data/friends_data/friends_data';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export default function FriendsScreen() {
  const windowWidth = Dimensions.get('window').width;

  return (

    <LinearGradient colors={['#71D552', '#C9D2BD', '#A0C1CA']} style={{ flex: 1, justifyContent: 'flex-end' }}>

      <View style={{ marginTop: windowWidth * 0.3, flex: 1, backgroundColor: '#ffffff',                 borderTopLeftRadius: windowWidth * 0.1, 
                borderTopRightRadius: windowWidth * 0.1,
                paddingTop: windowWidth * 0.05,
                paddingLeft: windowWidth * 0.05,
                paddingRight: windowWidth * 0.05 }}>
        
        <FriendList friends={friends_data} />

      </View>
  
    </LinearGradient>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});