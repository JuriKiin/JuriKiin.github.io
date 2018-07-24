window.onscroll = function() {AnimateNavigation()};

var header = document.getElementsByClassName("navBar")[0];
var about = document.getElementsByClassName('about')[0];
var projects = document.getElementsByClassName('projects')[0];
var contact = document.getElementsByClassName('contact')[0];

var triggerAnimationHeight = header.offsetTop;

function AnimateNavigation() {
  if (window.pageYOffset > triggerAnimationHeight) {
  } else {
  }
}
function loadURL(url) {
  window.open(url,'_blank');
}

function scrollToSection(section) {
  var element;
  if(section == 'about'){
    about.scrollIntoView();
  } else if(section == 'projects'){
    projects.scrollIntoView();
  } else {
    contact.scrollIntoView();
  }
}