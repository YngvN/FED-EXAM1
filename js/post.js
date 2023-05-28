window.addEventListener("DOMContentLoaded", fetchPost);

const loadingIndicator = document.querySelector(".loading-indicator");
const modalContainer = document.getElementById("modal");


modalContainer.addEventListener("click", function () {
  modalContainer.style.display = "none";
});


let imageArray = [];


// Uses the url to get entire post then switches out the url to the slug
async function fetchPost() {
  loadingIndicator.style.display = "block";

  let postLink = "";

  const urlParams = new URLSearchParams(window.location.search);
  const encodedLink = urlParams.get("url");
  const storedPostLink = sessionStorage.getItem("postLink");


// Stores the link in case the page is reloaded
  if (encodedLink) {
    postLink = decodeURIComponent(encodedLink);
    sessionStorage.setItem("postLink", postLink);
  } else if (storedPostLink) {
    postLink = storedPostLink;
  }

  try {
    if (!postLink) {
      throw new Error("Post link not found");
    }

    const response = await fetch(postLink);
    if (!response.ok) {
      throw new Error("Error fetching post");
    }

    const post = await response.json();

    const { title, content } = post;

    const titleElement = document.getElementById("post-title");
    titleElement.textContent = decodeEntities(title.rendered);

    const postContentElement = document.getElementById("post-content");
    postContentElement.innerHTML = content.rendered;

    const parser = new DOMParser();
    const htmlContent = parser.parseFromString(content.rendered, "text/html");
    imageArray = htmlContent.getElementsByTagName("img");


    const newUrlParams = new URLSearchParams();
    newUrlParams.set("slug", post.slug);
    const newUrl = `${window.location.origin}${
      window.location.pathname
    }?${newUrlParams.toString()}`;
    window.history.replaceState(null, null, newUrl);
  } catch (error) {
    console.error("Error fetching post:", error);
  }
    const images = document.querySelectorAll("figure");


      for (let i = 0; i < images.length; i++) {
      const image = images[i];
      image.classList.add("img-" + i)
      image.addEventListener("click", imageClick);
    }
  modal(imageArray);
  


  loadingIndicator.style.display = "none";
}


// Backup link in case of page-update
window.addEventListener("DOMContentLoaded", () => {
  const storedPostLink = sessionStorage.getItem("postLink");
  if (storedPostLink) {
    fetchPost(storedPostLink);
  }
});

// Simple fix for the ' character bug from WordPress
function decodeEntities(text) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}


// Pre-fills the modal
function modal(imageArray) {

  modalContainer.innerHTML = '';

  for (let i = 0; i < imageArray.length; i++) {
    const imageElement = imageArray[i];
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("modal-img-container", "img-" + i);

    const image = document.createElement("img");
    image.setAttribute("src", imageElement.src);

    const button = document.createElement("button");
    button.innerHTML = '<i class="fa-solid fa-x btn-modal"></i>';

    modalContainer.appendChild(imageContainer);
    imageContainer.appendChild(image);
    imageContainer.appendChild(button);

    button.addEventListener("click", function () {
      modalContainer.style.display = "none";
    });


  }
}

// Gives functionality to the images in the post
function imageClick(event) {
  const clickedImageSrc = event.target.src;

  modalContainer.style.display = "flex";

  const imageContainers = modalContainer.getElementsByClassName("modal-img-container");


  for (let i = 0; i < imageContainers.length; i++) {
    imageContainers[i].classList.remove("active");
  }


  for (let i = 0; i < imageContainers.length; i++) {
    const imageContainer = imageContainers[i];
    const image = imageContainer.getElementsByTagName("img")[0];
    const imageSrc = image.getAttribute("src");

    if (imageSrc === clickedImageSrc) {

      imageContainer.classList.add("active");
      break; 
    }
  }
}



