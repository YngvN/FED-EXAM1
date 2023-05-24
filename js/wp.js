import { displayPosts } from "./blog.js";

window.addEventListener('DOMContentLoaded', fetchPosts);

async function fetchPosts() {
console.log('fetchposts Started')

  const baseURL = "https://fed-exam.nykas.me/";
  const wpMultiplePosts = "wp-json/wp/v2/posts?per_page=10";
  const embed = "&_embed";

  const URLMultiplePosts = baseURL + wpMultiplePosts + embed;
  let isPostsArrayFilled = false;

  let postsArray = sessionStorage.getItem('tempPostsArray');
  if (postsArray) {
    postsArray = JSON.parse(postsArray);
    isPostsArrayFilled = true;
    console.log('Test 1')

  } else {
    postsArray = [];
    console.log('Test 2')

  }

  if (!isPostsArrayFilled) {
    try {
      const response = await fetch(URLMultiplePosts);
      if (!response.ok) {
        throw new Error('Error fetching posts');
        console.log('Test 3')

      }

      const posts = await response.json();

      posts.forEach(post => {
        const { id, title, image, content, link } = post;

        // Randomizing the date to see different posts at different spots
        const year = Math.floor(Math.random() * (2022 - 2020 + 1)) + 2020;
        const month = Math.floor(Math.random() * 12) + 1;
        const day = Math.floor(Math.random() * 28) + 1;

        const parser = new DOMParser();
        const htmlContent = parser.parseFromString(content.rendered, 'text/html');
        const imageElement = htmlContent.querySelector('img');
        const featuredImage = imageElement ? imageElement.src : '';

        const postObject = {
          id,
          title: title.rendered,
          date: `${year}-${month}-${day}`,
          featuredImage,
          link
        };

        postsArray.push(postObject);
      });

      sessionStorage.setItem('tempPostsArray', JSON.stringify(postsArray));

      isPostsArrayFilled = true;
      console.log('Array filled');

      displayPosts();
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }
    displayPosts();

    // Retrieve the "btn-more" buttons from the DOM
    const btnMoreButtons = document.querySelectorAll('.btn-more');

    // Add event listeners to each "btn-more" button
    btnMoreButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Get the link attached to the button
        const link = button.getAttribute('url');

        // Encode the link and navigate to the post.html file with the selected post's link as a URL parameter
        const encodedLink = encodeURIComponent(link);
        window.location.href = `post.html?url=${encodedLink}`;
    });
    });

}


