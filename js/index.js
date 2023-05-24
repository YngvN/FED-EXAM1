const listPost = document.getElementById('list-post');
const scrollAmount = 450;

function scrollList(direction, scrollAmount) {
  const newScrollLeft = listPost.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
  listPost.scroll({
    left: newScrollLeft,
    behavior: 'smooth'
  });
}
const leftArrowButton = document.getElementById('btn-left');
const rightArrowButton = document.getElementById('btn-right');

leftArrowButton.addEventListener('click', () => {
  scrollList('left', scrollAmount);
});

rightArrowButton.addEventListener('click', () => {
  scrollList('right', scrollAmount);
});

document.addEventListener('keydown', event => {
  switch (event.key) {
    case 'ArrowLeft':
      scrollList('left', scrollAmount);
      break;
    case 'ArrowRight':
      scrollList('right', scrollAmount);
      break;
  }
});
