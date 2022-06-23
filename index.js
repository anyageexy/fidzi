// "use strict"

// const lazyArr = document.querySelectorAll('img[data-src], source[data-srcset]');
// const windowHeight = document.documentElement.clientHeight;

// let lazyImagesPos = [];
// if(lazyArr.length > 0){
//   lazyArr.forEach(img => {
//     if(img.dataset.src || img.dataset.srcset){
//       lazyImagesPos.push(img.getBoundingClientRect().top + scrollY);
//       lazyScrollCheck();
//     }
//   });
// }

// window.addEventListener("scroll", lazyScroll);

// function lazyScroll(){
//   if(document.querySelectorAll('img[data-src], source[data-srcset]').length > 0){
//     lazyScrollCheck();
//   }
// }


// function lazyScrollCheck(){
//   let imgIndex = lazyImagesPos.findIndex(
//     item => scrollY > item - windowHeight
//   );
//   if(imgIndex>=0){
//     if(lazyArr[imgIndex].dataset.src){
//       lazyArr[imgIndex].src = lazyArr[imgIndex].dataset.src;
//       lazyArr[imgIndex].removeAttribute('data-src');
//     } else if (lazyArr[imgIndex].dataset.srcset){
//       lazyArr[imgIndex].srcset = lazyArr[imgIndex].dataset.srcset;
//       lazyArr[imgIndex].removeAttribute('data-srcset');
//     }
//     delete lazyImagesPos[imgIndex];
//   }
// }

document.addEventListener("DOMContentLoaded", function() {
  var lazyloadImages;    

  if ("IntersectionObserver" in window) {
    lazyloadImages = document.querySelectorAll(".lazy");
    var imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var image = entry.target;
          image.classList.remove("lazy");
          imageObserver.unobserve(image);
          console.log('работает')
        }
      });
    });

    lazyloadImages.forEach(function(image) {
      imageObserver.observe(image);
    });
  } else {  
    var lazyloadThrottleTimeout;
    lazyloadImages = document.querySelectorAll(".lazy");
    
    function lazyload () {
      if(lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }    

      lazyloadThrottleTimeout = setTimeout(function() {
        var scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function(img) {
            if(img.offsetTop < (window.innerHeight + scrollTop)) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
            }
        });
        if(lazyloadImages.length == 0) { 
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
      }, 20);
    }

    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
  }
})