import { fetchPosts } from "./wp.js";
import { clickMore } from "./utility.js";


const listPost = document.getElementById('list-post');
var postNumber = 10;

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

async function displayLatestPost() {
  console.log('displayLatestPosts Started')

  const latestContainer = document.getElementById('latest');
  const listPost = document.getElementById('list-post');
  const listItems = listPost.querySelectorAll('li');

  await fetchPosts(postNumber);

  const baseURL = 'https://fed-exam.nykas.me/wp-json/wp/v2/posts/';

  const postsArray = JSON.parse(sessionStorage.getItem('tempPostsArray'));
  const sortedPosts = postsArray.sort((a, b) => new Date(b.date) - new Date(a.date));

  if (sortedPosts.length > 0) {
    const latestPost = sortedPosts[0];

    const imageElement = document.createElement('img');
    imageElement.src = latestPost.featuredImage;
    imageElement.alt = '';

    const childElement = document.createElement('div');
    childElement.classList.add("child")

    const titleElement = document.createElement('h2');
    titleElement.textContent = decodeEntities(latestPost.title);

    const dateElement = document.createElement('span');
    dateElement.textContent = `Posted ${latestPost.date}`;

    const contentElement = document.createElement('p');
    const firstParagraph = getFirstParagraph(latestPost.content);
    contentElement.textContent = firstParagraph;

    const postURL = baseURL + latestPost.id;

    const buttonElement = document.createElement("button");
    buttonElement.classList.add("btn-more");
    buttonElement.setAttribute("id", latestPost.id);
    buttonElement.setAttribute("url", postURL);
    buttonElement.textContent = "Read";

    latestContainer.innerHTML = '';

    latestContainer.appendChild(imageElement);
    latestContainer.appendChild(childElement);
    childElement.appendChild(dateElement);
    childElement.appendChild(titleElement);
    childElement.appendChild(contentElement);
    childElement.appendChild(buttonElement);
    clickMore();
  }

  const remainingPosts = sortedPosts.slice(1, 6); 

  remainingPosts.forEach(post => {
    const listItem = document.createElement('li');
    const containerPost = document.createElement('div');
    const imageElement = document.createElement('img');
    const titleElement = document.createElement('h3');
    const dateElement = document.createElement('span');

    const postURL = baseURL + post.id;

    const buttonElement = document.createElement("button");
    buttonElement.classList.add("btn-more");
    buttonElement.setAttribute("id", post.id);
    buttonElement.setAttribute("url", postURL);
    buttonElement.textContent = "Read";

    listItem.appendChild(containerPost);
    containerPost.appendChild(imageElement);
    containerPost.appendChild(titleElement);
    containerPost.appendChild(dateElement);
    containerPost.appendChild(buttonElement);

    containerPost.classList.add('container-post');
    containerPost.setAttribute("url", postURL);
    imageElement.classList.add('post-image');


    imageElement.src = post.featuredImage;
    imageElement.alt = '';
    dateElement.textContent = `Posted ${post.date}`;
    titleElement.textContent = decodeEntities(post.title);


    listPost.appendChild(listItem);
    clickMore();
  });
}

function getFirstParagraph(content) {
    console.log('paragraph Started')

  const tempElement = document.createElement('div');
  tempElement.innerHTML = content;

  const firstParagraphElement = tempElement.querySelector('p');
    console.log(firstParagraphElement)

  if (firstParagraphElement) {

    return firstParagraphElement.textContent;
  }

  
  return '';
}

function decodeEntities(text) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}




displayLatestPost();

