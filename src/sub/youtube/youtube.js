
var enableClick = true;

var $nextBtn = $(".nextBtn");
var $prevBtn = $(".prevBtn");
var window_wid = $(window).outerWidth();
var $vid_wrap = $(".vidGallery").find(".wrap");
var $vid_article = $vid_wrap.children("article");

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
    if(window_wid < 540){
        $(".vidGallery").children(".gallery_list").children(".wrap").css({marginLeft: "-100%"})
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





