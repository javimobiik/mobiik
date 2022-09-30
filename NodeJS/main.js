window.onload = function(e){ 
    var myNav = document.getElementById("nav");
    var myHeader = document.getElementById("header");
  
    window.onscroll = function() {
      "use strict";
      if (document.body.scrollTop >= myHeader.offsetHeight || document.documentElement.scrollTop >= myHeader.offsetHeight) {
        myNav.classList.add("scroll");
      } else {
        myNav.classList.remove("scroll");
      }
    };
  }