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

    let removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.innerHTML = '&times;'; // HTML entity for multiplication sign (×)
    removeBtn.title = 'Remove Image';

    removeBtn.addEventListener('click', async () => {
        // Remove image from IndexedDB
        try {
            const db = await openDatabase(); // Ensure openDatabase is accessible
            await deleteImageFromIndexedDB(db, imgId);

            // Remove image from UI
            imgBox.remove();
            alert('Image removed successfully!');
        } catch (error) {
            alert('Error removing image: ' + error);
        }
    });

    imgBox.appendChild(nImg);
    imgBox.appendChild(nDiv);
    imgBox.appendChild(removeBtn); // Append the remove button
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
