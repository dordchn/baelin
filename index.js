const delay = ms => new Promise(res => setTimeout(res, ms));
const ANIM_TIME = 400;

const messages = document.querySelector('.messages');
const typingElement = document.querySelector('#typingElement');
const input = document.querySelector('input');
const loadingScreen = document.querySelector('#loading-screen');
let chatEnabled = true;
input.focus();

(async() => {
  await Promise.all([
    loadImage('res/background.png'),
    loadImage('res/user.jpg'),
    loadImage('res/baelin.png'),
  ]);
  loadingScreen.style.opacity = 0;
  await delay(ANIM_TIME);
  loadingScreen.style.display = 'none';
  baelinsTurn();
})();

input.addEventListener('keypress', async evt => {
  if (evt.key !== 'Enter' || input.value === '' || !chatEnabled) return;

  sendMessage(input.value);
  input.value = '';
  baelinsTurn();
})

/* Methods */

function sendMessage(str) {
  const message = document.createElement('div');
  message.classList.add('message', 'user-message');
  message.innerHTML = `<div>${str}</div>`;
  messages.insertBefore(message, messages.lastElementChild);
  messages.scrollTop = messages.scrollHeight
}

function baelinMessage(str) {
  const message = document.createElement('div');
  message.classList.add('message', 'bot-message');
  message.innerHTML = `<div>${str}</div>`;
  messages.insertBefore(message, messages.lastElementChild);
}

async function baelingType(ms) {
  typingElement.style.display = "block";
  await delay(1);
  messages.scrollTop = messages.scrollHeight;
  typingElement.children[0].style.transform = "scale(1)";
  await delay(ANIM_TIME + ms);
  typingElement.children[0].style.transform = "";
  await delay(ANIM_TIME);
  typingElement.style.display = "";
}

async function baelinsTurn() {
  chatEnabled = false;
  await delay(200);
  
  await baelingType(400);
  baelinMessage('Morning!');
  await delay(300);
  await baelingType(1000);
  baelinMessage("Nice day for fishing ain't it! Hu ha!");

  chatEnabled = true;
}

async function loadImage(url) {
  let resolver;
  const result = new Promise(res => resolver = res);
  const img = new Image();
  img.onload = resolver;
  img.src = url;
  if (img.complete) resolver();
  return result;
}