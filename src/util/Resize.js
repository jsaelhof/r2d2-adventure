import $ from 'jquery';

export default function onResize ( e ) {
    // Get the viewport width and height
    // This is the only place in the code I'm actually using JQuery.
    // I'm only using it here because of it's ability to accurately measure the viewport cross-browser.
    let vpwidth = $(window).width();
    let vpheight = $(window).height();

    // Set the default scale and offsetY.
    // By default we'll assume a scale value of 100% and no offset.
    // The y offset comes into play because when css scales the content it does not actually scale the 
    // container in the document flow...it takes up it's natural size and scales it's internal content.
    // The offsetY code here compensates for this by pulling the game up to pull the white space off
    // the top of the screen.
    let scale = 1;
    let offsetY = 0;

    // If the game doesn't fit in either dimension, we'll have to scale it and possibly move it in the Y dimension.
    if (vpwidth < 1000 || vpheight < 800) {
      // Using the window and game dimensions to determine how much it
      // would need to be scaled in each dimension in order to fit.
      let scaleX = vpwidth/1000;
      let scaleY = vpheight/800;

      // We now have two scale values. Using both would distort the game to fill the window edge to edge.
      // We want to scale it but maintain the correct aspect ratio so we'll need to pick one of the 
      // two scale values. Picking the smaller of the two ensures the game fits inside the window.
      scale = Math.min(scaleX,scaleY);
      
      // If the scaleX is larger than the scaleY, then it means we are scaling the game to fit the height
      // of the viewport. When we do this we have to pull the game up by half the amount of the difference
      // between the natural size and the scaled size. Essentially, pull it up by the amount of blank
      // space above the game.
      if (scaleX > scaleY) {
        // Calculate the size of the game after scaling it.
        let scaledY = 800 * scale;

        // Calculate the offset.
        offsetY = -(800 - scaledY)/2;
      }
    }

    // If the game is on the screen, then adjust the styling.
    if (document.getElementsByClassName("game").length > 0) {
      // If there is any y offset, set it (it may be zero which does nothing)
      document.getElementById("root").style.transform = "translateY("+offsetY+"px)"

      // Set the scale of the game so it fits in the viewport.
      document.getElementsByClassName("game")[0].style.transform = "scale("+scale+")";
    }
  }