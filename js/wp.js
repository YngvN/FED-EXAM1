export async function fetchPosts(number) {
  console.log("fetchposts Started");

  // URL creator
  const baseURL = "https://fed-exam.nykas.me/";
  const wpMultiplePosts = "wp-json/wp/v2/posts?per_page=" + number;
  const embed = "&_embed";

  const URLMultiplePosts = baseURL + wpMultiplePosts + embed;

  // Array to store the first posts and checks if it's empty or not
  let postsArray = sessionStorage.getItem("tempPostsArray");
  if (postsArray) {
    postsArray = JSON.parse(postsArray);
  } else {
    postsArray = [];
  }

  try {
    const response = await fetch(URLMultiplePosts);
    if (!response.ok) {
      throw new Error("Error fetching posts");
    }

    const posts = await response.json();

    // Filter out duplicates based on post id. Adds on more posts thats not already there
    const uniquePosts = posts.filter(
      (post) => !postsArray.some((existingPost) => existingPost.id === post.id)
    );

    uniquePosts.forEach((post) => {
      const { id, title, image, content, link, date } = post;

      const postDate = new Date(date);
      const year = postDate.getFullYear();
      const month = postDate.getMonth() + 1;
      const day = postDate.getDate();

      const parser = new DOMParser();
      const htmlContent = parser.parseFromString(content.rendered, "text/html");
      const imageElement = htmlContent.querySelector("img");
      const featuredImage = imageElement ? imageElement.src : "";

      const postObject = {
        id,
        title: title.rendered,
        date: `${month}-${day}-${year}`,
        featuredImage,
        content: content.rendered,
      };

      postsArray.push(postObject);
    });

    sessionStorage.setItem("tempPostsArray", JSON.stringify(postsArray));

  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}
