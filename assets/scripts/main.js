ENDPOINT = "http://fun-api.herokuapp.com/shortcode/"
$(document).ready(function(){
  var hash = window.location.hash;
  if (hash) {
    hash = hash.substr(1)
    $.ajax({
      url: ENDPOINT + hash + '.json',
      type: 'get',
      error: function(XMLHttpRequest, textStatus, errorThrown){
        console.log("error");
      },
      success: function(data){
        $('#main').remove();
        $('.spinner').remove();
        $('#image-share-link').text(window.location);
        $('#image-caption').text(data.name);
        $('#image-view').attr('src', data.original_source);
        $('#shortcode').show();
      }
    });
  };

  // phone slider JS
  var ui_colors = {
    left: 'transparent',
    right: 'transparent',
    default: "transparent",
    discard: "transparent"
  }

  var el = $(".slider-list")[0];

  //we start from the bottom because the CSS reverses the order
  var cardDir;
  var cardIndex = $(".slider-list").children().length;
  var card= $(".slider-list").children(":nth-child(" + cardIndex + ")");

  function handleHammer(event) {
    // Prevent the browser from scrolling on mobile
    event.gesture.preventDefault();
    var offset =  $(".slider-list").offset();
    switch (event.type) { 
      case 'swipe':
      case 'drag':
      var zero;
      // Calculate where left=0 in relation to the parent        
      zero = offset.left;
      card.offset({
        left: zero + event.gesture.deltaX
      });
      if (event.gesture.deltaX < 0) {
        card.css('background', ui_colors.left);
        cardDir = -1;
      } else {
        card.css('background', ui_colors.right);
        cardDir = 1;
      };
      //event.gesture.stopDetect();
      break;
     
      var zero;

      // Calculate where left=0 in relation to the parent
      zero = offset.top;

      card.offset({
        top: zero + event.gesture.deltaY
      });
      if (event.gesture.deltaY > 0) {
        card.css('background', ui_colors.discard);
        cardDir = 0;
      }
      break;
      case 'release':
      if ((Math.abs(event.gesture.deltaX) > 50) && (Math.abs(cardDir) > 0)) {
        //horizontal swipe
        cardSwipe(cardDir,0);            
      }     
      //   else if (event.gesture.deltaY > 50) {
      //     //vertical swipe
      //     cardSwipe(cardDir,1);
      // } 
      else {
        //return card to original position if moved less than 50 pixels
        card.animate({
          left: 0,
          top: 0,
          backgroundColor: none
        }, 200);
      }
      event.gesture.stopDetect();
      break;
    }
  }

  var options = {
    dragLockToAxis: true,
    dragBlockHorizontal: true,
    dragMinDistance: 5
  };
  var hammertime = new Hammer(el, options);

  function cardSwipe(cardDir,skipFlag) {
    if(cardIndex>0){
      hrzDir=0;
      vertDir="-=40px";
      cardColor=ui_colors.discard;

      if (skipFlag==0){
        hrzDir = (cardDir == 1) ? "+=100px" : "-=100px";
        cardColor=(cardDir == 1) ? ui_colors.right :  ui_colors.left;    
        hrdDir=(cardDir == 1) ?  $(".agree-icon").fadeToggle('slow').fadeToggle('slow'):$(".disagree-icon").fadeToggle('slow').fadeToggle('slow');        
      }else{
        vertDir="+=200px";
      };

      //console.log(cardColor);
      card.animate({
        left: hrzDir,
        top: vertDir,
        backgroundColor:cardColor
      }, {
        duration: 200,
        specialEasing: {
          top: 'easeInCirc',
          left: 'easeInCirc'
        },
        complete: function () {
          $(this).css('display', 'none');
        }
      });
      cardIndex--;
      card= $(".slider-list").children(":nth-child(" + cardIndex + ")");
    }
  }

  document.onkeydown = function(evt) {
    evt = evt || window.event;

    switch (evt.keyCode) {
      case 37:
      cardSwipe(0,0);
      break;
      case 39:
      cardSwipe(1,0);
      break;
    }
  };

  hammertime.on("release drag swipe dragdown swipedown", handleHammer);
  $(".resetCards a").click(function(){resetCards()});
  $(".disagree").on('click',function(e){
    cardSwipe(-1,0);         
  });
  $(".agree").click(function(){
    cardSwipe(1,0);        
  });
});