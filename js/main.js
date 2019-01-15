window.onscroll = function() {AnimateNavigation()};

let header = document.getElementsByClassName("navBar")[0];
let about = document.getElementsByClassName('about')[0];
let projects = document.getElementsByClassName('projectBanner')[0];
let contact = document.getElementsByClassName('contactBanner')[0];

let text = document.querySelector('#welcomeSpeech');
let cursor = document.querySelector('.blinking');

let scrollToTopButton = document.querySelector("#scrollToTop");

let triggerAnimationHeight = header.offsetTop;

function AnimateNavigation() {
  if (window.pageYOffset > triggerAnimationHeight) {
  } else {
  }
}
function loadURL(url) {
  window.open(url,'_blank');
}

function scrollToSection(section) {
  if(section == 'about'){
    about.scrollIntoView();
  } else if(section == 'projects'){
    projects.scrollIntoView();
  } else {
    contact.scrollIntoView();
  }
}

window.onload = init;

function init() {
  requestAnimationFrame(welcomeSpeech);
}

let sayings = ['Hello, My name is Juri.', 'I am a web developer.', 'I like to make cool things!', 'Check out my projects!'];
let phrase = 0;
let curPhrase = '';
let letterCount = 0;
let typeSpeed = 7;
let frame = 0;

function welcomeSpeech() {
  if(frame % typeSpeed == 0) {
    if(letterCount >= sayings[phrase].length) {
      phrase >= sayings.length-1 ? phrase = 0 : phrase++;
      count = 0;
      curPhrase = '';
      letterCount = 0;
      cancelAnimationFrame(welcomeSpeech);
      setTimeout(function(){
        requestAnimationFrame(welcomeSpeech);
      }, 1500);
      return;
    } else {
      let saying = sayings[phrase];
      curPhrase += saying[letterCount];
      text.innerHTML = curPhrase;
      text.appendChild(cursor);
      letterCount++;
    }
  }
  frame++;
  requestAnimationFrame(welcomeSpeech);
}


window.onscroll = checkScroll;

function checkScroll() {
  if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
    scrollToTopButton.style.display = "block";
  } else {
    scrollToTopButton.style.display = "none";
  }
}

function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}