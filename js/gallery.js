
// MY CODE | LIMITED STORAGE 

// import { images as imgs } from './upload.js';


// function generateContent(){
//    setTimeout(() =>{
//       document.querySelector('.gallery-container').style.display = 'block';
//       document.getElementsByTagName('header')[0].style.display = 'flex';
//       document.getElementsByTagName('footer')[0].style.display = 'flex';
//       document.querySelector('.sep-cont').style.display = 'block';
//    },300);
// }
// generateContent();


// document.getElementById('logoPicha').addEventListener('click', ()=> {
//    location.href = "Picha.html";
// });
// document.querySelector('.contact-btn')?.addEventListener('click', ()=>{
//    location.href = "contact.html";
// });

// function createImageBox(img){
//    let imgBox = document.createElement('div');
//    imgBox.className = 'img-box';

//    let nImg = document.createElement('img');
//    nImg.className = 'imgD';
//    nImg.src = img;

//    let nDiv = document.createElement('div');
//    nDiv.className = 'hover-dl';

//    let downloadLink = document.createElement('a');
//    downloadLink.download = 'downloaded-image.png'; // Default filename
//    downloadLink.style.display = 'none'; // Hide the link
//    nDiv.addEventListener('click', ()=>{
//       downloadLink.href = img;
//       downloadLink.click();
//    });

//    let dlImg = document.createElement('img');
//    dlImg.src = '../Pictures/download-cloud-line.svg';

//    imgBox.appendChild(nImg);
//    imgBox.appendChild(nDiv);
//    nDiv.appendChild(dlImg);
//    nDiv.appendChild(downloadLink);
//    document.querySelector('.gridImagesHolder').appendChild(imgBox);
// }
// function showImages(){
//    document.querySelector('.gridImagesHolder').innerHTML = ''; // Clear previous images
//    imgs.forEach(img => {
//       createImageBox(img);
//    });
// };

// showImages();
// main.js






























// WORKING CODE: 1

// import { getImagesFromIndexedDB } from './upload.js';

// function generateContent(){
//    setTimeout(() =>{
//       document.querySelector('.gallery-container').style.display = 'block';
//       document.getElementsByTagName('header')[0].style.display = 'flex';
//       document.getElementsByTagName('footer')[0].style.display = 'flex';
//       document.querySelector('.sep-cont').style.display = 'block';
//    },300);
// }
// generateContent();

// document.getElementById('logoPicha').addEventListener('click', ()=> {
//    location.href = "Picha.html";
// });
// document.querySelector('.contact-btn')?.addEventListener('click', ()=>{
//    location.href = "contact.html";
// });

// function createImageBox(img){
//    let imgBox = document.createElement('div');
//    imgBox.className = 'img-box';

//    let nImg = document.createElement('img');
//    nImg.className = 'imgD';
//    nImg.src = img;

//    let nDiv = document.createElement('div');
//    nDiv.className = 'hover-dl';

//    let downloadLink = document.createElement('a');
//    downloadLink.download = 'downloaded-image.png'; // Default filename
//    downloadLink.style.display = 'none'; // Hide the link
//    nDiv.addEventListener('click', ()=>{
//       downloadLink.href = img;
//       downloadLink.click();
//    });

//    let dlImg = document.createElement('img');
//    dlImg.src = '../Pictures/download-cloud-line.svg';

//    imgBox.appendChild(nImg);
//    imgBox.appendChild(nDiv);
//    nDiv.appendChild(dlImg);
//    nDiv.appendChild(downloadLink);
//    document.querySelector('.gridImagesHolder').appendChild(imgBox);
// }

// async function showImages(){
//    const imgs = await getImagesFromIndexedDB();
//    document.querySelector('.gridImagesHolder').innerHTML = ''; // Clear previous images
//    imgs.forEach(img => {
//       createImageBox(img);
//    });
// };

// showImages();



















// WORKING CODE: 2 - WITH REMOVE IMG

import { deleteImageFromIndexedDB, openDatabase, getImagesFromIndexedDB } from './upload.js';

function generateContent() {
    setTimeout(() => {
        document.querySelector('.gallery-container').style.display = 'block';
        document.getElementsByTagName('header')[0].style.display = 'flex';
        document.getElementsByTagName('footer')[0].style.display = 'flex';
        document.querySelector('.sep-cont').style.display = 'block';
    }, 300);
}
generateContent();

document.getElementById('logoPicha').addEventListener('click', () => {
    location.href = "index.html";
});
document.querySelector('.contact-btn')?.addEventListener('click', () => {
    location.href = "contact.html";
});

function createImageBox(img, imgId) {
    let imgBox = document.createElement('div');
    imgBox.className = 'img-box';

    let nImg = document.createElement('img');
    nImg.className = 'imgD';
    nImg.src = img;

    let nDiv = document.createElement('div');
    nDiv.className = 'hover-dl';

    let downloadLink = document.createElement('a');
    downloadLink.download = 'downloaded-image.png'; // Default filename
    downloadLink.style.display = 'none'; // Hide the link
    nDiv.addEventListener('click', () => {
        downloadLink.href = img;
        downloadLink.click();
    });

    let dlImg = document.createElement('img');
    dlImg.src = '../Pictures/download-cloud-line.svg';

    imgBox.appendChild(nImg);
    imgBox.appendChild(nDiv);

    nDiv.appendChild(dlImg);
    nDiv.appendChild(downloadLink);
    document.querySelector('.gridImagesHolder').appendChild(imgBox);
}

async function showImages() {
    try {
        const imgRecords = await getImagesFromIndexedDB();
        document.querySelector('.gridImagesHolder').innerHTML = ''; // Clear previous images
        imgRecords.forEach((imageRecord) => {
            createImageBox(imageRecord.data, imageRecord.id);
        });
    } catch (error) {
        console.error('Error loading images:', error);
    }
}

showImages();






