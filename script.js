const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];
let displayedImages = 0;
let imagesToDisplay = 0;
let ready = false;

//Unsplash API
let imagesToLoad = 5; // We only load 5 photos to make a faster first load, the subsecuent loads will be larger
const apiKey = "Jnp5edgOUkWsPwaYjvAvBasOHDJk3cPSvoZKfgyoHeo";
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${imagesToLoad}`;

function imagesLoaded() {
  displayedImages++;
  if (displayedImages === imagesToDisplay) {
    ready = true;
    loader.hidden = true;
    imagesToLoad = 20;
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${imagesToLoad}`;
  }
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
  displayedImages = 0;
  imagesToDisplay = photosArray.length;

  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    img.addEventListener("load", imagesLoaded);

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    console.log(apiUrl);
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // Catch Error Here
  }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// On Load
getPhotos();
