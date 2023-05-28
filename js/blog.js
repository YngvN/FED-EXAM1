import { fetchPosts } from "./wp.js";
import { clickMore } from "./utility.js";

const btnViewMore = document.getElementById("btn-view-more");
const listBlog = document.getElementById("list-blog");
var postNumber = 5;
const loadingIndicator = document.querySelector(".loading-indicator");


// Displays the current array stored
async function displayPosts() {
  loadingIndicator.style.display = "block";

  await fetchPosts(postNumber);

  // Makes the search url get more posts for each time it's run
  postNumber = postNumber + 5;

  const postsArray = JSON.parse(sessionStorage.getItem("tempPostsArray"));

  const listBlog = document.getElementById("list-blog");

  listBlog.innerHTML = "";

  postsArray.sort((a, b) => new Date(b.date) - new Date(a.date));

  postsArray.forEach((post) => {
    const { id, title, date, featuredImage, link } = post;

    const baseURL = "https://fed-exam.nykas.me/wp-json/wp/v2/posts/";

    const postURL = baseURL + id;

    const postElement = document.createElement("div");
    postElement.classList.add("post", "container", "click");
    postElement.setAttribute("id", id);
    postElement.setAttribute("url", postURL);

    const textElement = document.createElement("div");
    textElement.classList.add("text");

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
    postElement.appendChild(textElement);
    textElement.appendChild(dateElement);
    textElement.appendChild(titleElement);
    textElement.appendChild(buttonElement);

    listBlog.appendChild(postElement);

    clickMore();
  });
  loadingIndicator.style.display = "none";
}

displayPosts();

function decodeEntities(text) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}


if (btnViewMore) {
  btnViewMore.addEventListener("click", async () => {
    displayPosts();
    clickMore();
  });
}
