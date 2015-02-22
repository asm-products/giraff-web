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

    var stack = gajus.Swing.Stack()
      , throwOutConfidenceElements = {}
    ;
    $("#phone .slider-list .slide").each(function()
    {
        stack.createCard(this);
    });
    stack.on("dragstart", function (e)
    {
        throwOutConfidenceElements.yes = $(".phone__label__fave");
        throwOutConfidenceElements.no = $(".phone__label__pass");
    });
    stack.on("dragmove", function (e)
    {
        throwOutConfidenceElements[e.throwDirection == gajus.Swing.Card.DIRECTION_RIGHT ? "yes" : "no"].css("opacity", e.throwOutConfidence);
    });
    stack.on("dragend", function (e)
    {
        if (e.throwOutConfidence != 1)
        {
            throwOutConfidenceElements.yes.css("opacity", 0);
            throwOutConfidenceElements.no.css("opacity", 0);
        }
    });
});