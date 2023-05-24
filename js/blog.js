const btnViewMore = document.getElementById("btn-view-more");
const listBlog = document.getElementById("list-blog");

if (btnViewMore) {
  btnViewMore.addEventListener("click", () => {
    listBlog.style.height = "auto";
  });
}

export async function displayPosts() {
  console.log('displayPosts Started')
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
    postElement.setAttribute("id", id);

    const imageElement = document.createElement("img");
    imageElement.src = featuredImage;
    imageElement.alt = featuredImage.alt_text;

    const dateElement = document.createElement("span");
    dateElement.classList.add("date");
    dateElement.textContent = date;

    const titleElement = document.createElement("h3");
    titleElement.classList.add("title");
    titleElement.textContent = title;

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
  });
}
