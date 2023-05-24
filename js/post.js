window.addEventListener('DOMContentLoaded', fetchPost);

async function fetchPost() {
  // Get the URL parameter from the button
  const urlParams = new URLSearchParams(window.location.search);
  const encodedLink = urlParams.get('url');
  const postLink = decodeURIComponent(encodedLink);

  try {
    const response = await fetch(postLink);
    if (!response.ok) {
      throw new Error('Error fetching post');
    }

    const post = await response.json();

    console.log(post);

    const { title, content } = post;

    const titleElement = document.getElementById('post-title');
    titleElement.textContent = title.rendered;

    // Extract the featured image from the HTML content
    const parser = new DOMParser();
    const htmlContent = parser.parseFromString(content.rendered, 'text/html');
    const imageElement = htmlContent.querySelector('img');
    const featuredImage = imageElement ? imageElement.src : '';

    // Display the featured image, if available
    const postImageElement = document.getElementById('post-image');
    postImageElement.src = featuredImage;
    postImageElement.alt = ''; // Set appropriate alt text if available

    // Display the post content
    const postContentElement = document.getElementById('post-content');
    postContentElement.innerHTML = content.rendered;
  } catch (error) {
    console.error('Error fetching post:', error);
  }
}
