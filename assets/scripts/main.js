var API_ENDPOINT = "http://fun-api.herokuapp.com/shortcode/";

jQuery(function($)
{
    var hash = window.location.hash;
    if (hash) 
    {
        $.ajax(
        {
            url: ENDPOINT + hash.substr(1) + ".json",
            type: "get",
            error: function()
            {
                console.log("Error: gif not found.");
            },
            success: function(data)
            {
                $("#main").remove();
                $(".spinner").remove();
                $("#image-share-link").text(window.location);
                $("#image-caption").text(data.name);
                $("#image-view").attr("src", data.original_source);
                $("#shortcode").show();
            }
        });
    }
});