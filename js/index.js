import { fetchPosts } from "./wp.js";
import { clickMore } from "./utility.js";

const loadingIndicator = document.querySelector(".loading-indicator");
var postNumber = 6;

const listPost = document.getElementById("list-post");
const selectorButtons = document.querySelectorAll(".list-post-selector button");


// Way to complicated way to fill the homepage
async function displayLatestPost() {
  loadingIndicator.style.display = "block";
  const latestContainer = document.getElementById("latest");
  const listPost = document.getElementById("list-post");
  const listItems = listPost.querySelectorAll("li");

  await fetchPosts(postNumber);

  const baseURL = "https://fed-exam.nykas.me/wp-json/wp/v2/posts/";

  const postsArray = JSON.parse(sessionStorage.getItem("tempPostsArray"));
  const sortedPosts = postsArray.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Fills the first post
  if (sortedPosts.length > 0) {
    const latestPost = sortedPosts[0];

    const imageElement = document.createElement("img");
    imageElement.src = latestPost.featuredImage;
    imageElement.alt = "";

    const childElement = document.createElement("div");
    childElement.classList.add("child");

    const titleElement = document.createElement("h2");
    titleElement.textContent = decodeEntities(latestPost.title);

    const dateElement = document.createElement("span");
    dateElement.textContent = `Posted ${latestPost.date}`;

    const contentElement = document.createElement("p");
    const firstParagraph = getFirstParagraph(latestPost.content);
    contentElement.textContent = firstParagraph;

    const postURL = baseURL + latestPost.id;

    const buttonElement = document.createElement("button");
    buttonElement.classList.add("btn-more");
    buttonElement.setAttribute("id", latestPost.id);
    buttonElement.setAttribute("url", postURL);
    buttonElement.textContent = "Read";

    latestContainer.innerHTML = "";

    latestContainer.appendChild(imageElement);
    latestContainer.appendChild(childElement);
    childElement.appendChild(dateElement);
    childElement.appendChild(titleElement);
    childElement.appendChild(contentElement);
    childElement.appendChild(buttonElement);
    clickMore();
  }

  const remainingPosts = sortedPosts.slice(1, 6);

  var postContainerId = 0;

  // Fills the latest posts carousel
  remainingPosts.forEach((post) => {
    const listItem = document.createElement("li");
    const containerPost = document.createElement("div");
    const imageElement = document.createElement("img");
    const titleElement = document.createElement("h3");
    const dateElement = document.createElement("span");

    postContainerId = postContainerId + 1;

    const postURL = baseURL + post.id;

    const buttonElement = document.createElement("button");
    buttonElement.classList.add("btn-more");
    buttonElement.setAttribute("id", post.id);
    buttonElement.setAttribute("url", postURL);
    buttonElement.textContent = "Read";

    const title = decodeEntities(post.title);
    const separatorIndex = title.indexOf(":");
    const buttonText =
      separatorIndex !== -1 ? title.substring(0, separatorIndex) : title;

    listItem.appendChild(containerPost);
    containerPost.appendChild(imageElement);
    containerPost.appendChild(titleElement);
    containerPost.appendChild(dateElement);
    containerPost.appendChild(buttonElement);

    containerPost.classList.add("container-post");
    containerPost.setAttribute("url", postURL);
    containerPost.id = "post-" + postContainerId;
    imageElement.classList.add("post-image");

    imageElement.src = post.featuredImage;
    imageElement.alt = "";
    dateElement.textContent = `Posted ${post.date}`;
    titleElement.textContent = decodeEntities(post.title);

    listPost.appendChild(listItem);

    const selectorButton = document.createElement("button");
    selectorButton.classList.add("selector-btn-" + postContainerId);
    selectorButton.textContent = buttonText;

    selectorButton.addEventListener("click", () => {
      const containerId = containerPost.id;
      const containers = document.querySelectorAll(".container-post");
      const selectorButtons = document.querySelectorAll(
        ".list-post-selector button"
      );

      containers.forEach((container) => {
        container.style.display = "flex";
        if (container.id !== containerId) {
          container.style.display = "none";
        }
      });

      selectorButtons.forEach((button) => {
        if (button.classList.contains("active")) {
          button.classList.remove("active");
        }
        if (button === selectorButton) {
          button.classList.add("active");
        }
      });
    });

    // Gives the carousel functionality
    const leftArrowButton = document.getElementById("btn-left");
    const rightArrowButton = document.getElementById("btn-right");

    function updatePostsVisibility(index, remainingPosts) {
      const postContainers = document.querySelectorAll(".container-post");
      postContainers.forEach((container, i) => {
        if (i === index) {
          container.style.display = "flex";
        } else {
          container.style.display = "none";
        }
      });
    }

    function updateActiveButton(index) {
      const selectorButtons = document.querySelectorAll(
        ".list-post-selector button"
      );
      selectorButtons.forEach((button) => {
        button.classList.remove("active");
      });
      selectorButtons[index].classList.add("active");
    }

    let currentIndex = 0;

    leftArrowButton.addEventListener("click", () => {
      currentIndex =
        (currentIndex - 1 + remainingPosts.length) % remainingPosts.length;
      updatePostsVisibility(currentIndex, remainingPosts);
      updateActiveButton(currentIndex);
    });

    rightArrowButton.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % remainingPosts.length;
      updatePostsVisibility(currentIndex, remainingPosts);
      updateActiveButton(currentIndex);
    });

    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowLeft":
          currentIndex =
            (currentIndex - 1 + remainingPosts.length) % remainingPosts.length;
          updatePostsVisibility(currentIndex, remainingPosts);
          updateActiveButton(currentIndex);
          break;
        case "ArrowRight":
          currentIndex = (currentIndex + 1) % remainingPosts.length;
          updatePostsVisibility(currentIndex, remainingPosts);
          updateActiveButton(currentIndex);
          break;
      }
    });

    const listPostSelector = document.querySelector(".list-post-selector");
    listPostSelector.appendChild(selectorButton);

    clickMore();
    loadingIndicator.style.display = "none";
  });
}

// Gets the first paragraph to display in the latest post
function getFirstParagraph(content) {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = content;

  const firstParagraphElement = tempElement.querySelector("p");

  if (firstParagraphElement) {
    return firstParagraphElement.textContent;
  }

  return "";
}

function decodeEntities(text) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}

displayLatestPost();