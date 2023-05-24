export async function fetchPosts() {
  console.log('fetchposts Started');

  const baseURL = "https://fed-exam.nykas.me/";
  const wpMultiplePosts = "wp-json/wp/v2/posts?per_page=10";
  const embed = "&_embed";

  const URLMultiplePosts = baseURL + wpMultiplePosts + embed;
  let isPostsArrayFilled = false;

  let postsArray = sessionStorage.getItem('tempPostsArray');
  if (postsArray) {
    postsArray = JSON.parse(postsArray);
    isPostsArrayFilled = true;
    console.log('Test 1');
  } else {
    postsArray = [];
    console.log('Test 2');
  }

  if (!isPostsArrayFilled) {
    try {
      const response = await fetch(URLMultiplePosts);
      if (!response.ok) {
        throw new Error('Error fetching posts');
        console.log('Test 3');
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
          content: content.rendered // Include rendered content in the array
        };

        postsArray.push(postObject);
      });

      sessionStorage.setItem('tempPostsArray', JSON.stringify(postsArray));

      isPostsArrayFilled = true;
      console.log('Array filled');
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }
}
