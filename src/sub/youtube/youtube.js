var enableClick = true;

var $nextBtn = $(".nextBtn");
var $prevBtn = $(".prevBtn");
var window_wid = $(window).outerWidth();
var $vid_wrap = $(".vidGallery").find(".wrap");
var $vid_article = $vid_wrap.children("article");
var $video2 = $(".video2");
var $video2_wrap = $video2.find(".wrap");
var article_ht;

$(window).resize(function(){
    var wid = $(this).outerWidth();
    
    resize(wid);
    
});

function resize(wid){
    article_ht = $video2_wrap.find("article").outerHeight(true);
    if(wid < 540){
        $video2
            .css({
                height: article_ht * 2 -1
            })
            .addClass("on")
        $(".vid_more_btn").css({display: "block"});
    } else {
        $video2.removeClass("on");
        $(".vid_more_btn").css({display: "none"});
    }
}

$(".vid_more_btn").on("click", function(e){
    e.preventDefault();
    $video2.css({height: "auto"}).removeClass("on");
    $(this).css({display: "none"});
})

$(window).on("load", function(){
    init();
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
    var article_wid = $vid_wrap.children("article").outerWidth(true);

    $vid_wrap.animate({marginLeft: -article_wid * 2}, 500, function(){
        $(this).children("article").first().appendTo($vid_wrap);
        $(this).css({marginLeft: -article_wid})
        enableClick = true;
    });
};

function prevScroll(){
    var article_wid = $vid_wrap.children("article").outerWidth(true);
    $vid_wrap.animate({marginLeft: 0}, 500, function(){
        $(this).children("article").last().prependTo($(".vidGallery").children(".gallery_list").children(".wrap"));
        $(this).css({marginLeft: -article_wid})
        enableClick = true;
    });
};

function init(){
    $(".vidGallery").children(".gallery_list").children(".wrap").children("article").last().prependTo($(".vidGallery").children(".gallery_list").children(".wrap"));

    resize(window_wid);
    
    if(window_wid < 540){
        $(".vidGallery").children(".gallery_list").children(".wrap").css({marginLeft: "-100%"});
    } else {
        $(".vidGallery").children(".gallery_list").children(".wrap").css({marginLeft: "-560px"})
    };
};

//video 더보기 아이콘 생성
$("body").on("mouseenter", ".artGallery article a", function(){
    createViewBtn(this);
});

$("body").on("mouseleave", ".artGallery article a", function(){
    delViewBtn();
});

function createViewBtn(el){
    var viewBtn_len = $(el).find(".viewBtn").length;

    if(!viewBtn_len){
        $(el)
            .append(
                $("<div class='viewBtn'>")
            )
    };
    $(el).children(".viewBtn").stop().delay(200).fadeIn(200);
};

function delViewBtn(){
    $(".viewBtn").stop().fadeOut(200, function(){
        $(this).remove();
    });
};   





