import { fetchPosts } from "./wp.js";
import { clickMore } from "./utility.js";

const btnViewMore = document.getElementById("btn-view-more");
const listBlog = document.getElementById("list-blog");

if (btnViewMore) {
  btnViewMore.addEventListener("click", async () => {
    await fetchPosts(); // Fetch the next 10 posts

    // Get the updated posts array from sessionStorage
    const postsArray = JSON.parse(sessionStorage.getItem('tempPostsArray'));

    // Clear the current content in the listBlog
    listBlog.innerHTML = '';

    // Iterate through the postsArray and append the new posts to the listBlog
    postsArray.forEach(post => {
      const listItem = document.createElement('li');
      const postTitle = document.createElement('h2');
      const postContent = document.createElement('p');

      postTitle.textContent = post.title;
      postContent.textContent = post.content;

      listItem.appendChild(postTitle);
      listItem.appendChild(postContent);

      listBlog.appendChild(listItem);
    });

    clickMore(); // Call any necessary functionality after appending the new posts
  });
}

async function displayPosts() {
  console.log('displayPosts Started')
  await fetchPosts();

  const postsArray = JSON.parse(sessionStorage.getItem('tempPostsArray'));


  
  const listBlog = document.getElementById("list-blog");

  listBlog.innerHTML = "";

  postsArray.sort((a, b) => new Date(b.date) - new Date(a.date));

  postsArray.forEach(post => {
    const { id, title, date, featuredImage, link } = post;

    const baseURL = 'https://fed-exam.nykas.me/wp-json/wp/v2/posts/';

    const postURL = baseURL + id;

    const postElement = document.createElement("div");
    postElement.classList.add("post");
    postElement.classList.add("click");
    postElement.setAttribute("id", id);
    postElement.setAttribute("url", postURL);


    const imageElement = document.createElement("img");
    imageElement.src = featuredImage;
    imageElement.alt = featuredImage.alt_text;

    const dateElement = document.createElement("span");
    dateElement.classList.add("date");
    dateElement.textContent = date;

    const titleElement = document.createElement("h3");
    titleElement.classList.add("title");
    titleElement.innerHTML = decodeEntities(title);


    const buttonElement = document.createElement("button");
    buttonElement.classList.add("btn-more");
    buttonElement.setAttribute("id", `${id}`);
    buttonElement.setAttribute("url", postURL);
    buttonElement.textContent = "Read";


    postElement.appendChild(imageElement);
    postElement.appendChild(dateElement);
    postElement.appendChild(titleElement);
    postElement.appendChild(buttonElement);

    listBlog.appendChild(postElement);

    clickMore();
  });
}

displayPosts();

function decodeEntities(text) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}
