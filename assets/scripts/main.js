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

    var stack = gajus.Swing.Stack(
        {
            "throwOutConfidence": function(offset, element)
            {
                return Math.min(Math.abs(offset) / (element.offsetWidth / 3.0), 1);
            },
            "throwOutDistance": function()
            {
                return 250;
            }
        })
      , throwOutConfidenceElements = {}
    ;
    $(".slider-list .slide").each(function(i, e)
    {
        var card = stack.createCard(this);
        (function(card, e)
        {
            setTimeout(function()
            {
                card.throwIn(0, 200);
                $(e).addClass("in-deck");
            }
            , i * 100);
        }
        )(card, e);
    });
    stack.on("dragstart", function (e)
    {
        throwOutConfidenceElements.yes = $(".phone__label__fave").stop();
        throwOutConfidenceElements.no = $(".phone__label__pass").stop();
    });
    stack.on("dragmove", function (e)
    {
        throwOutConfidenceElements[e.throwDirection == gajus.Swing.Card.DIRECTION_RIGHT ? "yes" : "no"].css("opacity", e.throwOutConfidence);
    });
    stack.on("throwout", function (e)
    {
        $(e.target).removeClass("in-deck");
    });
    stack.on("dragend", function (e)
    {
        if (e.throwOutConfidence != 1)
        {
            throwOutConfidenceElements.yes.animate({ "opacity": 0 }, 300);
            throwOutConfidenceElements.no.animate({ "opacity": 0 }, 300);
        }
    });

    $(".phone__controls .phone__controls__btn.pass").on("click", function()
    {
        var card = stack.getCard($(".slider-list .slide.in-deck:last")[0]);
        if (card)
        {
            $(".phone__label__pass").css("opacity", 1.0).animate({ "opacity": 0 }, 900);
            card.throwOut(gajus.Swing.Card.DIRECTION_LEFT, 0);
        }
        return false;
    });
    $(".phone__controls .phone__controls__btn.fave").on("click", function()
    {
        var card = stack.getCard($(".slider-list .slide.in-deck:last")[0]);
        if (card)
        {
            $(".phone__label__fave").css("opacity", 1.0).animate({ "opacity": 0 }, 900);
            card.throwOut(gajus.Swing.Card.DIRECTION_RIGHT, 0);
        }
        return false;
    });
});