import FriendList from '../../components/friends_components/FriendList';
import friends_data from '../../data/friends_data/friends_data';

export default function FriendsScreen() {
  console.log('FRIENDS SCREEN:   ', friends_data);
  return <FriendList friends={friends_data} />;
}
