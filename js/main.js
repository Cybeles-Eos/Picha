
import { pass } from './code.js';

function generateContent(){
   setTimeout(() =>{
      document.querySelector('.home_page_container').style.display = 'block';
      document.getElementsByTagName('header')[0].style.display = 'flex';
      document.getElementsByTagName('footer')[0].style.display = 'flex';
      document.querySelector('.sep-cont').style.display = 'block';
   },300);
}
generateContent();



document.addEventListener('DOMContentLoaded', () => {
   const goGalleryBtn = document.getElementById('goGalleryBtn');
   const logoPicha = document.getElementById('logoPicha');

   function createAccessCode(){
      let nDiv = document.createElement('div');
      nDiv.className = 'prof-box';
   
      let nLog = document.createElement('div');
      nLog.className = 'log';
   
      let nInput = document.createElement('input');
      nInput.type = 'password';
      nInput.placeholder = 'Access Code';
      nInput.className = 'log-code';
      
      let nBtn = document.createElement('button');
      nBtn.className = 'subm';
      nBtn.textContent = 'O';

      nBtn.addEventListener('click', ()=>{
         if(nInput.value == pass){
            location.href = 'admin.html'
         }else{
            nDiv.remove();
            // createAccessCode.removeThisCode();
         }
      });
      nDiv.appendChild(nLog);
      nLog.appendChild(nInput);
      nLog.appendChild(nBtn);
      document.querySelector('.about-picha-container').appendChild(nDiv);
   }

   document.querySelector('.contact-btn')?.addEventListener('click', ()=>{
      location.href = "contact.html";
   });
   
   //Shortcut code
   document.getElementById('headerBtn')?.addEventListener('click', () => {
      location.href = "media.html";
   });

   if(goGalleryBtn) {
      goGalleryBtn.addEventListener('click', () => {
         location.href = "Gallery.html";
      });
   }

   if(logoPicha) {
      logoPicha.addEventListener('click', () => {
         location.href = "index.html";
      });
   }

   const prof = document.getElementById('prof');
   prof.addEventListener('click', () => {
      createAccessCode(); // Append the new div to the body or any other specific parent element.
      console.log('2');
   });
   


  
 
});




