const theImage = require('/Users/ilyanekrasov/Desktop/junction/my-app/src/data/images/dalle_1.png');

const startTimeOne = new Date('2023-11-11T02:00:00');
const startTimeTwo = new Date('2023-11-11T00:00:00');
const startTimeThree = new Date('2023-11-11T11:00:00');

function getHoursPassed(since) {
  // 'since' is a Date object representing the point in time from which you want to calculate the hours passed
  const now = new Date(); // current time
  const differenceInMilliseconds = now - since; // difference in milliseconds
  const differenceInHours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60)); // convert milliseconds to hours

  return `${differenceInHours} hours ago`;
}

export default friends_data = [
  {
    image: '/Users/ilyanekrasov/Desktop/junction/my-app/src/data/images/dalle_1.png',
    name: 'First',
    id: '1',
    online: 'Last seen: ' + getHoursPassed(startTimeOne),
  },
  {
    image: '/src/data/friends_data/friendsData.js',
    name: 'Second',
    id: '2',
    online: 'Online 🟢',
  },
  // {
  //   image: theImage,
  //   name: 'Third',
  //   id: '3',
  // },
  {
    image: '../images/dalle_1.png',
    name: 'Fourth',
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
