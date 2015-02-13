ENDPOINT = "http://fun-api.herokuapp.com//shortcode/"
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
          $('#image-share-link').text(window.location);
          $('#image-caption').text(data.name);
          $('#image-view').attr('src', data.original_source);
          $('#shortcode').show();
        }
    });
  }
});