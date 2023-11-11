import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import FriendItem from './FriendItem'; //

const FriendList = ({ friends }) => {
  console.log('FRIEND LIST:   ', friends);
  return (
    <FlatList
      data={friends}
      renderItem={(friend) => <FriendItem friend={friend} />}
      keyExtractor={(friend) => friend.id.toString()}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

export default FriendList;
