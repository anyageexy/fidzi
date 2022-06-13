"use strict"

const lazyArr = document.querySelectorAll('img[data-src], source[data-srcset]');
const windowHeight = document.documentElement.clientHeight;

let lazyImagesPos = [];
if(lazyArr.length > 0){
  lazyArr.forEach(img => {
    if(img.dataset.src || img.dataset.srcset){
      lazyImagesPos.push(img.getBoundingClientRect().top + scrollY);
      lazyScrollCheck();
    }
  });
}

window.addEventListener("scroll", lazyScroll);

function lazyScroll(){
  if(document.querySelectorAll('img[data-src], source[data-srcset]').length > 0){
    lazyScrollCheck();
  }
}


function lazyScrollCheck(){
  let imgIndex = lazyImagesPos.findIndex(
    item => scrollY > item - windowHeight
  );
  if(imgIndex>=0){
    if(lazyArr[imgIndex].dataset.src){
      lazyArr[imgIndex].src = lazyArr[imgIndex].dataset.src;
      lazyArr[imgIndex].removeAttribute('data-src');
    } else if (lazyArr[imgIndex].dataset.srcset){
      lazyArr[imgIndex].srcset = lazyArr[imgIndex].dataset.srcset;
      lazyArr[imgIndex].removeAttribute('data-srcset');
    }
    delete lazyImagesPos[imgIndex];
  }
}