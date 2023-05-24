const hamburgerButton = document.querySelector('.hamburger');
const navigation = document.querySelector('.navigation');
const hamburgerBars = document.querySelector('.fa-bars');
const hamburgerX = document.querySelector('.fa-x');

hamburgerX.style.display = 'none';
hamburgerButton.addEventListener('click', function() {

    navigation.classList.toggle('show');

    if (hamburgerButton.classList.contains('active')) {
        hamburgerX.style.display = 'none';
        hamburgerBars.style.display = 'block';
        hamburgerButton.classList.remove('active');
    } else {
        hamburgerBars.style.display = 'none';
        hamburgerX.style.display = 'block';
        hamburgerButton.classList.add('active');
    }
});

var prevScrollPos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (!hamburgerButton.classList.contains('active')) {
    if (prevScrollPos > currentScrollPos) {
      document.querySelector(".header").style.top = "0";
    } else {
      document.querySelector(".header").style.top = "-10em";
    }
  }
  prevScrollPos = currentScrollPos;
};


const loadingIndicator = document.querySelector('.loading-indicator');

loadingIndicator.style.display = 'block';

window.addEventListener('load', function() {
  loadingIndicator.style.display = 'none';
});