import style from './index.scss'
// import createAvatar from './createAvatar'
import  avatar from './images/404.png'

// import Header from './header.js'
// import Sidebar from './sidebar.js'
// import Content from './content.js'

import "@babel/polyfill";

const arr = [
  new Promise(() => {}),
  new Promise(() => {})
]

arr.map(item => {
  console.log(item)
})

const img = new Image()
img.src = avatar;
img.classList.add(style.avatar);
const root = document.getElementById('root');
root.append(img);

createAvatar()

new Header()
new Sidebar()
new Content()