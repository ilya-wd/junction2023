import { Asset } from 'expo-asset';

const imageYellow = Asset.fromModule(
  require('../../assets/images/yellow_creature.png'),
).uri;
const imagePurple = Asset.fromModule(
  require('../../assets/images/purple_creature.png'),
).uri;
const imageGreen = Asset.fromModule(
  require('../../assets/images/green_creature.png'),
).uri;
const imageRed = Asset.fromModule(require('../../assets/images/red_creature.png')).uri;

const startTimeOne = new Date('2023-11-11T02:00:00');
const startTimeTwo = new Date('2023-11-11T00:00:00');
const startTimeThree = new Date('2023-11-11T16:00:00');

function getHoursPassed(since) {
  // 'since' is a Date object representing the point in time from which you want to calculate the hours passed
  const now = new Date(); // current time
  const differenceInMilliseconds = now - since; // difference in milliseconds
  const differenceInHours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60)); // convert milliseconds to hours

  return `${differenceInHours} hours ago`;
}

export default friends_data = [
  {
    image: imageYellow,
    name: 'Doodley Pum',
    id: '1',
    online: 'Last seen: ' + getHoursPassed(startTimeOne),
  },
  {
    image: imageGreen,
    name: 'Diane',
    id: '2',
    online: 'Online 🟢',
  },
  {
    image: imagePurple,
    name: 'Unicorn',
    id: '3',
    online: 'Last seen: ' + getHoursPassed(startTimeThree),
  },
  {
    image: imageRed,
    name: 'Juho',
    id: '4',
    online: 'Last seen: ' + getHoursPassed(startTimeTwo),
  },
  // {
  //   image: 'src/data/friends_data/friendsData.js',
  //   name: 'Fifth',
  //   id: '5',
  // },
  // {
  //   image: 'src/data/friends_data/friendsData.js',
  //   name: 'Sixth',
  //   id: '6',
  // },
  // {
  //   image: 'src/data/friends_data/friendsData.js',
  //   name: 'First',
  //   id: '7',
  // },
];
