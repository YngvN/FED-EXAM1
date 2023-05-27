const hamburgerButton = document.querySelector(".hamburger");
const navigation = document.querySelector(".navigation");
const hamburgerBars = document.querySelector(".fa-bars");
const hamburgerX = document.querySelector(".fa-x");

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

function updateImageSrc(isMobile) {
  const images = document.querySelectorAll("img");

  images.forEach((image) => {
    const src = image.getAttribute("src");

    if (isMobile && src) {
      const filename = src.substring(src.lastIndexOf("/") + 1);
      const updatedSrc = src.replace(
        filename,
        filename.replace(/(\.[\w\d_-]+)$/i, "-min$1")
      );
      image.setAttribute("src", updatedSrc);
    }
  });
}

hamburgerX.style.display = "none";
hamburgerButton.addEventListener("click", function () {
  navigation.classList.toggle("show");

  if (hamburgerButton.classList.contains("active")) {
    hamburgerX.style.display = "none";
    hamburgerBars.style.display = "block";
    hamburgerButton.classList.remove("active");
    document.body.classList.remove("disable-scroll");
  } else {
    hamburgerBars.style.display = "none";
    hamburgerX.style.display = "block";
    hamburgerButton.classList.add("active");
    document.body.classList.add("disable-scroll");
  }
});

var prevScrollPos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (!hamburgerButton.classList.contains("active")) {
    if (prevScrollPos > currentScrollPos) {
      document.querySelector(".header").style.top = "0";
    } else {
      document.querySelector(".header").style.top = "-10em";
      if (isMobile) {
        document.querySelector(".header").style.top = "-4em";
      }
    }
  }
  prevScrollPos = currentScrollPos;
};

const loadingIndicator = document.querySelector(".loading-indicator");

loadingIndicator.style.display = "block";

window.addEventListener("load", function () {
  loadingIndicator.style.display = "none";
});

export function clickMore() {
  const btnMoreButtons = document.querySelectorAll(".btn-more");
  const postContainer = document.querySelectorAll(".click");

  const handleClick = (link) => {
    const encodedLink = encodeURIComponent(link);
    window.location.href = `post.html?url=${encodedLink}`;
  };

  btnMoreButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const link = button.getAttribute("url");
      handleClick(link);
    });
  });

  postContainer.forEach((container) => {
    container.addEventListener("click", () => {
      const link = container.getAttribute("url");
      handleClick(link);
    });

    if (isMobile) {
      container.addEventListener("touchstart", (event) => {
        event.preventDefault();
        const link = container.getAttribute("url");
        handleClick(link);
      });
    }
  });
}

updateImageSrc(isMobile);
