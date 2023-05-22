// const leftArrowButton = document.getElementById('btn-left');
// const rightArrowButton = document.getElementById('btn-right');
// const listPost = document.getElementById('list-post');

// const scrollAmount = 600; 

// leftArrowButton.addEventListener('click', () => {
//   listPost.scroll({
//     left: listPost.scrollLeft - scrollAmount,
//     behavior: 'smooth'
//   });
// });

// rightArrowButton.addEventListener('click', () => {
//   listPost.scroll({
//     left: listPost.scrollLeft + scrollAmount,
//     behavior: 'smooth'
//   });
// });


const listPost = document.getElementById('list-post');
const scrollAmount = 350;

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
