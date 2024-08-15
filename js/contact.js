

function generateContent(){
   setTimeout(() =>{
      const conta = document.querySelector('.contact-container');
      if(conta){
         conta.style.display = 'block';
      }
      
      document.getElementsByTagName('header')[0].style.display = 'flex';
      document.getElementsByTagName('footer')[0].style.display = 'flex';
      document.querySelector('.sep-cont').style.display = 'block';
   },300);
}
generateContent();

document.getElementById('logoPicha').addEventListener('click', ()=> {
   location.href = "index.html";
});
document.querySelector('.contact-btn')?.addEventListener('click', ()=>{
   location.reload();
});

