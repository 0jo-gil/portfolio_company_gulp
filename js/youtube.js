
var enableClick = true;

var $nextBtn = $(".nextBtn");
var $prevBtn = $(".prevBtn");
var window_wid = $(window).outerWidth();
console.log(window_wid);

$(window).on("load", function(){

    init(window_wid);
});

$nextBtn.on("click", function(e){
    e.preventDefault();
    if(enableClick){
        nextScroll();
        enableClick = false;
    };
});

$prevBtn.on("click", function(e){
    e.preventDefault();
    if(enableClick){
        prevScroll();
        enableClick = false;
    };
})

function nextScroll(){
    
        var article_wid = $(".vidGallery").children(".gallery_list").children(".wrap").children("article").outerWidth(true);
        $(".vidGallery").children(".gallery_list").children(".wrap").animate({marginLeft: -article_wid * 2}, 500, function(){
            $(this).children("article").first().appendTo($(".vidGallery").children(".gallery_list").children(".wrap"));
            $(this).css({marginLeft: -article_wid})
            enableClick = true;
        });
};

function prevScroll(){
    var article_wid = $(".vidGallery").children(".gallery_list").children(".wrap").children("article").outerWidth(true);
    $(".vidGallery").children(".gallery_list").children(".wrap").animate({marginLeft: 0}, 500, function(){
        $(this).children("article").last().prependTo($(".vidGallery").children(".gallery_list").children(".wrap"));
        $(this).css({marginLeft: -article_wid})
        enableClick = true;
    });
    // if(window_wid < 540){
    //     var article_wid = $(".vidGallery").children(".gallery_list").children(".wrap").children("article").outerWidth(true);
    //     $(".vidGallery").children(".gallery_list").children(".wrap").animate({marginLeft: 0}, 500, function(){
    //         $(this).children("article").last().prependTo($(".vidGallery").children(".gallery_list").children(".wrap"));
    //         $(this).css({marginLeft: -article_wid});
    //         enableClick = true;
    //     });
    // } else {
    //     $(".vidGallery").children(".gallery_list").animate({scrollLeft: "-=560px"}, 500, function(){
    //         enableClick = true;
    //     });
    // }
};

function init(wid){


    // $(window).resize(function(){
    //     var window_wid = $(this).outerWidth();
    //     return window_wid;
    // });

    $(".vidGallery").children(".gallery_list").children(".wrap").children("article").last().prependTo($(".vidGallery").children(".gallery_list").children(".wrap"));
    if(window_wid < 540){
        $(".vidGallery").children(".gallery_list").children(".wrap").css({marginLeft: "-100%"})
    } else {
        $(".vidGallery").children(".gallery_list").children(".wrap").css({marginLeft: "-560px"})
    };
};

$("body").on("mouseenter", ".artGallery article a", function(){
    var viewBtn_len = $(this).find(".viewBtn").length;

    if(!viewBtn_len){
        $(this)
            .append(
                $("<div class='viewBtn'>")
            )
    };
    $(this).children(".viewBtn").stop().delay(200).fadeIn(200);
});

$("body").on("mouseleave", ".artGallery article a", function(){
    $(".viewBtn").stop().fadeOut(200, function(){
        $(this).remove();
    });
});
