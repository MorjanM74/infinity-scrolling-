const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

//Unspla API
const count = 30;
const apiKey = 'eRr4k9x96ErrZDaQCSQqL8SiLdzGuXP3x9JHF2ro-jc';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images are loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}
//Create img, a elements for each array
function displayPhoto() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach(function (photo) {
        //Create a element to link for unsplash
        const item = document.createElement('a')
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        //Create img element to display
        const image = document.createElement('img');
        image.setAttribute('src', photo.urls.regular);
        image.setAttribute('alt', photo.alt_description);
        image.setAttribute('title', photo.alt_description);

        //Create event listener to check when each image is loaded
        image.addEventListener('load', imageLoaded)
        //Put img, a in the image container
        item.appendChild(image);
        imageContainer.appendChild(item);

    });
}

if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhoto()
}


//Get Photos 
async function getPhoto() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhoto();
    } catch (error) {

    }
}

// Run function
getPhoto();