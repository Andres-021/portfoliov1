const btnAbout = document.getElementById('btn-about');
const item = document.getElementsByClassName("item");
const navLinks = document.querySelectorAll('.item a');
const sections = document.querySelectorAll('section');


// let title = document.querySelectorAll('title');


// document.addEventListener("DOMContentLoaded", function() {
  window.addEventListener("scroll", function() {
    let currentSection = '';

    // Revisamos cada sección y usamos getBoundingClientRect para ver si está en vista
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
  
      if (sectionTop <= 50 && sectionTop >= -130) {  // Ajusta el umbral según sea necesario
        currentSection = section.getAttribute('id'); // Capturamos el id de la sección en vista
        // Aquí usamos scrollIntoView para centrar la sección en vista
        section.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    });
  
    // Ahora recorremos los links y activamos el correspondiente
    navLinks.forEach(link => {
      const sectionId = link.getAttribute('href').substring(1);
      
      this.document.title = `Portfolio - ${currentSection.charAt(0).toUpperCase() + currentSection.slice(1)}`;
      
      if (sectionId === currentSection) {
        link.parentElement.classList.add('active');
        
      } else {
        link.parentElement.classList.remove('active');
        
      }
    });
  });
// });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting){
      // if(entry.intersectionRatio <= .55){
        entry.target.classList.add('show')
      // }
    }else{
      entry.target.classList.remove('show')
    }
  })
})

function smoothScrollTo(element, duration) {
  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - (window.innerHeight / 2); // Centramos
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}
// const hiddenElements = document.querySelectorAll('.hidden')
// hiddenElements.forEach((el) => observer.observe(el))

const transitionScroll = (sectionId) => {
  const section = document.getElementById(sectionId)
  var scrollY = window.scrollY;
  var destinationOffset = section.offsetTop;
  var duration = 500; // duración en milisegundos
  var startingTime = performance.now();
  
  function scrollStep(timestamp) {
    var progress = timestamp - startingTime;
    var percentage = Math.min(progress / duration, 1);
    var currentOffset = scrollY + (destinationOffset - scrollY) * percentage;
    window.scrollTo(0, currentOffset);
    if (percentage < 1) {
      window.requestAnimationFrame(scrollStep);
    }
  }

  window.requestAnimationFrame(scrollStep);
}


// Se
document.querySelectorAll('.item a').forEach( a =>{
  a.addEventListener('click', (e) => {
    e.preventDefault();

    const parentLi = e.target.parentElement;
    
    for (let i = 0; i < item.length; i++) {
      item[i].classList.remove('active');
    }

    // Luego, agregamos la clase 'active' al elemento actual
    parentLi.classList.add('active');
  });
});

btnAbout.addEventListener('click',() => {
  transitionScroll('Proyectos')
})

// function scrollByPixels(scrollAmount) {
//   window.scrollBy({
//     top: scrollAmount,
//     left: 0,
//     behavior: 'auto'
//   });
// }