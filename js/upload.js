
// WORKING CODE: 2 - WITH REMOVE IMG

export function openDatabase() {
   return new Promise((resolve, reject) => {
       const request = indexedDB.open("ImageDB", 2);

       request.onupgradeneeded = function(event) {
           const db = event.target.result;
           if (!db.objectStoreNames.contains("images")) {
               db.createObjectStore("images", { keyPath: "id", autoIncrement: true });
           }
       };

       request.onsuccess = function(event) {
           resolve(event.target.result);
       };

       request.onerror = function(event) {
           reject("Database error: " + event.target.errorCode);
       };
   });
}

// Function to delete an image from IndexedDB by its ID
export function deleteImageFromIndexedDB(db, id) {
   return new Promise((resolve, reject) => {
       const transaction = db.transaction(["images"], "readwrite");
       const store = transaction.objectStore("images");
       const request = store.delete(id);

       request.onsuccess = function() {
           resolve();
       };

       request.onerror = function(event) {
           reject("Error deleting image: " + event.target.errorCode);
       };
   });
}

// Function to save images to IndexedDB
export function saveImageToIndexedDB(db, image) {
   return new Promise((resolve, reject) => {
       const transaction = db.transaction(["images"], "readwrite");
       const store = transaction.objectStore("images");
       const request = store.add({ data: image });

       request.onsuccess = function() {
           resolve();
       };

       request.onerror = function(event) {
           reject("Error saving image: " + event.target.errorCode);
       };
   });
}

// Function to get images from IndexedDB
export function getImagesFromIndexedDB() {
   return new Promise((resolve, reject) => {
       const request = indexedDB.open("ImageDB", 2);

       request.onsuccess = function(event) {
           const db = event.target.result;
           const transaction = db.transaction(["images"], "readonly");
           const store = transaction.objectStore("images");
           const getRequest = store.getAll();

           getRequest.onsuccess = function(event) {
               resolve(event.target.result);
           };

           getRequest.onerror = function(event) {
               reject("Error loading images: " + event.target.errorCode);
           };
       };

       request.onerror = function(event) {
           reject("Database error: " + event.target.errorCode);
       };
   });
}

// Declare images array
export let images = [];

// Generate content for the page
function generateContent(){
   setTimeout(() => {
       let mCont = document.querySelector('.uplolad-container');
       if (mCont) {
           mCont.style.display = 'block';
       }

       document.getElementsByTagName('header')[0].style.display = 'flex';
       document.getElementsByTagName('footer')[0].style.display = 'flex';
       document.querySelector('.sep-cont').style.display = 'block';
   }, 300);
}
generateContent();

document.addEventListener('DOMContentLoaded', async () => {
   const saves = [];
   const fileInput = document.getElementById('fileInput');

   // Open the IndexedDB
   const db = await openDatabase();

   // Load existing images from IndexedDB
   images = await getImagesFromIndexedDB();

   document.getElementById('logoPicha')?.addEventListener('click', () => {
       location.href = "index.html";
   });
   document.querySelector('.contact-btn')?.addEventListener('click', () => {
       location.href = "contact.html";
   });

   const btnUpGal = document.getElementById('headerBtn');
   btnUpGal?.addEventListener('click', () => {
       location.href = "Gallery.html";
   });

   // Open User Folder
   document.querySelector('.choseImage-holder')?.addEventListener('click', () => {
       fileInput.click();
   });

   fileInput?.addEventListener('change', function(event) {
       const file = event.target.files[0];
       if (file) {
           document.querySelector('.upload-image-cont').style.cursor = 'default';
           const reader = new FileReader();
           reader.onload = function(e) {
               document.querySelector('.choseImage-holder').src = e.target.result;
               saves.push(e.target.result);
           }
           reader.readAsDataURL(file);

           // Temporarily disable the input after the first click.
           fileInput.disabled = true;
       }
   });

   document.querySelector('.uploadNow')?.addEventListener('click', async () => {
       try {
           if (saves.length > 0) {
               for (const image of saves) {
                   await saveImageToIndexedDB(db, image);
               }

               // Update the images array after saving
               images = [...images, ...saves];

               resetDefault();
               alert('Image saved!');
           } else {
               alert('No image to save.');
           }
       } catch (error) {
           alert(error);
       }
   });

   document.querySelector('.cancelUpload')?.addEventListener('click', () => {
       resetDefault();
   });

   function resetDefault() {
       document.querySelector('.upload-image-cont').style.cursor = 'pointer';
       fileInput.disabled = false;
       saves.length = 0; // Clear the saves array after saving
       document.querySelector('.choseImage-holder').src = './Pictures/BorderDashedImg2.png';
   }
});
