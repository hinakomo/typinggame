let p = document.getElementById('text');
let main = document.getElementsByClassName('mainGame');
let timer = document.getElementById('timer');
let modalClose = document.getElementsByClassName('modalClose');
let modal = document.getElementsByClassName('modal');
let easy = document.getElementsByClassName('modalEasy');
let normal = document.getElementsByClassName('modalNormal');
let hard = document.getElementsByClassName('modalHard');
let attention = document.getElementsByClassName('attention');
modalClose = [].slice.call(modalClose);
let modalResult = document.getElementsByClassName('modalResult');
let modalScore = document.getElementsByClassName('modalScore');
let percent = document.getElementsByClassName('percent');
let back = document.getElementsByClassName('back');

let gameLevel = '';
let typeC = 0;
let typeMiss = 0;
let score = 0;
count = '';

let interval_id;
let start_click = false;
let limit = 60;
let min = 0;
let sec = 0;

let checkTexts = [];

let textLists = [
  [
    'Hello world',
    'Keep it up!',
    'You can do it!',
    'This is my App.',
    'How have you been?',
    'Can we talk a bit?',
    'Nice to meet you.',
    'Just hear me out.',
    'How does that sound?',
  ],
  [
    'Please pick me up!',
    'You are, in short, perfect.',
    'Hang out with my friend.',
    'I have a quick question.',
    'You really made me feel at home.',
    'It is commonly believed that',
    'The point is that you did your best.',
    'Thanks again for your help',
    'The bus for the airport is over there.',
    'Thank you for the additional info.',
  ],
  [
    'supercalifragilisticexpialidocious',
    'Is there any chance I could get a discount?',
    'Second, add the tomatoes, garlic and herbs.',
    'She had to leave work early due to a family emergency.',
    'My teacher never puts students down, but always gives us confidence!',
    'I have to prepare for a meeting in the afternoon.',
    'Could you explain that in a little more detail?',
  ]
];

modalClose.forEach(function(item,index) {
  item.onclick = function() {
    gameLevel = index;
    fadeOut();
    createText();
    countStart();
    countDown();
  }
});

const fadeOut = function() {
  const number = modal[0].style.opacity;
  const begin = new Date() - 0;
  const time = 1000;
  const id = setInterval(function() {
    let current = new Date() - begin;
    if (current > number * time) {
      clearInterval(id);
      current = number * time;
      modal[0].style.display = 'none';
    }
    modal[0].style.opacity= number - (current/time);
  },10); 
}

function countStart(){
  if(start_click === false){
    interval_id = setInterval(countDown , 1000);
    start_click = true;
  }
}

function countDown(){
  if (limit === 1 ){
    gameEnd();
  }else{
    limit--;
    min = Math.floor(limit / 60);
    sen = Math.floor(limit % 60);
    timer.innerHTML = '0' + min +':' + sen ;
  }if (sen<10) {
    timer.innerHTML = '0' + min + ':' + '0' + sen;
  }
}

function createText() {
  attention[0].innerHTML= '空欄はスペースキーを押してください';
  let rnd = Math.floor(Math.random() * textLists[gameLevel].length);
  p.textContent = '';
  checkTexts = textLists[gameLevel][rnd].split('').map(function(value) {
    let span = document.createElement('span');
    
    span.textContent = value;
    p.appendChild(span);
    
    return span;
  });
}

document.addEventListener('keydown', keydown);

function keydown(e){
  if(e.key === checkTexts[0].textContent && limit > 1){
    checkTexts[0].className = 'add-blue';
    checkTexts.shift();
    typeC ++;
    console.log(typeC);
    if(!checkTexts.length && limit > 1){
      createText();
     score = parseInt(score + 1);
     console.log(score);
    }
  }else if(e.key !== checkTexts[0].textContent && limit > 1){
    sound();
    typeMiss ++;
    console.log(typeMiss);
  }  
}

function sound(){
  // [ID:sound-file]の音声ファイルを再生[play()]する
  document.getElementById( 'sound-file' ).play();
}

const gameEnd = function(){
  gameDone();
  scoreShow();
}

const gameDone = () => {
  const number = main[0].style.opacity;
  const begin = new Date() - 0;
  const time = 1000;
  const id = setInterval(function() {
    let current = new Date() - begin;
    if (current > number * time) {
      clearInterval(id);
      current = number * time;
      main[0].style.display = 'none';
    }
    main[0].style.opacity= number - (current/time);
  },10); 
}

const scoreShow = function(){
  let seikairitu = (typeC/(typeC+typeMiss)*100).toFixed(1);
  if(isNaN(seikairitu)) {
    seikairitu = 0;
  }
  percent[0].innerHTML= '正確さ  '+seikairitu+'%';
  modalScore[0].innerHTML= 'クリア数  '+score+'問';
  modalResult[0].style.display = 'block';
}

back[0].onclick = function() {
  location.reload();
}


