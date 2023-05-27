window.addEventListener("DOMContentLoaded", fetchPost);
const loadingIndicator = document.querySelector(".loading-indicator");

async function fetchPost() {
  loadingIndicator.style.display = "block";

  let postLink = "";

  const urlParams = new URLSearchParams(window.location.search);
  const encodedLink = urlParams.get("url");
  const storedPostLink = sessionStorage.getItem("postLink");

  if (encodedLink) {
    postLink = decodeURIComponent(encodedLink);
    // Save post link in sessionStorage
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

    console.log(post);

    const { title, content } = post;

    const titleElement = document.getElementById("post-title");
    titleElement.textContent = decodeEntities(title.rendered);

    const parser = new DOMParser();
    const htmlContent = parser.parseFromString(content.rendered, "text/html");
    const imageElement = htmlContent.querySelector("img");
    const featuredImage = imageElement ? imageElement.src : "";

    const postContentElement = document.getElementById("post-content");
    postContentElement.innerHTML = content.rendered;

    const newUrlParams = new URLSearchParams();
    newUrlParams.set("slug", post.slug);
    const newUrl = `${window.location.origin}${
      window.location.pathname
    }?${newUrlParams.toString()}`;
    window.history.replaceState(null, null, newUrl);
  } catch (error) {
    console.error("Error fetching post:", error);
  }

  loadingIndicator.style.display = "none";
}

window.addEventListener("DOMContentLoaded", () => {
  const storedPostLink = sessionStorage.getItem("postLink");
  if (storedPostLink) {
    fetchPost(storedPostLink);
  }
});

function decodeEntities(text) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}
