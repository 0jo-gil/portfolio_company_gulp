//search toggle
var $header_hi = $("#header").outerHeight();
var slide_timer;

$(".btnCall").on("click", function(e){
    e.preventDefault();
    var isOn = $(this).hasClass("on");
    if(!isOn){
        $(this).addClass("on");
        $(".menuMo").show(0, function(){
            $(this).animate({left: 0}, 500);
        });
    } else {
        $(this).removeClass("on");
        $(".menuMo").animate({left: "-100%"}, 500, function(){
            $(this).hide();
        });
    };

    
});

$(".search_btn").on("click", function(e){
    e.preventDefault();
    var search_wrap_legnth = $(".search_wrap").length;
    $("body").addClass("hidden");

    if(!search_wrap_legnth){
    $("body")
        .append(
            $("<div class='search_wrap'>")
                .css({height: $header_hi})
                .append(
                    $("<div class='search_box'>")
                        .append(
                            $("<input type='text' placeholder='검색어를 입력해주세요.' class='search'>"),
                            $("<a class='search_btn'>")
                                .append(
                                    $("<i class='fas fa-search'>")
                                )
                        ),
                    $("<button class='search_close'>")
                ),
            $("<div class='search_bg'>")
        )
    };
});


$("body").on("click", ".search_close", function(e){
    e.preventDefault();
    $(".search_wrap").remove();
    $(".search_bg").remove();
    $("body").removeClass("hidden");
});


$(".content_box>.wrap").children("article").on("mouseenter", function(){
    $(".content_box>.wrap").children("article").css({opacity: 0.3});
    $(this).css({opacity: 1});
});
$(".content_box>.wrap").children("article").on("mouseleave", function(){
    $(".content_box>.wrap").children("article").css({opacity: 1});
});


//버튼 클릭시 헤더이동
var $topBtn = $(".topBtn");
// var headerPos = $("#header").offset().top;

$(".topBtn").on("click", function(e){
    e.preventDefault();

    moveScreen($topBtn);
})

function moveScreen(){
    var targetPos = $("body").offset().top;
    $("html, body").animate({scrollTop: targetPos}, 500);
};


//gnb sub menu 

var gnbSub_hi = $("#gnb").children("li").children("ul").outerHeight();
var bgGnb_hi = $(".bgGnb").outerHeight();
var $menuWeb  = $(".menuWeb");

$(window).resize(widResize);

$(".menuWeb").on("mouseenter focusin", function(){
    openSub();
});

$(".menuWeb").on("mouseleave focusout", function(){
    closeSub();

    clearInterval(slide_timer);
});

$("#gnb").children("li").on("mouseenter", function(){
    $(this).addClass("on");

    var x = $(this).offset().left;
    var target = $(this).children("a").attr("data-menu");
 
    createTit();
    gnbBg(x);
    callBanner(target);

    clearInterval(slide_timer);
        
});

$("#gnb").children("li").eq(0).on("mouseenter", function(){
    slide_timer = setInterval(dep2_slide, 3000);
})

function dep2_slide(){
    $(".dep2_slide_wrap").animate({marginLeft: "-100%"}, 500, function(){
        $(this).children("li").first().appendTo($(this));
        $(this).css({marginLeft: 0});
    });

}

$("#gnb").children("li").on("focusin", function(){

    var target = $(this).children("a").attr("data-menu");
    createTit();

    callBanner(target);

});

$("#gnb").children("li").on("mouseleave focusout", function(){
    $(this).removeClass("on");
});

$("#gnb").children("li").on("mouseleave", function(){
    $(".gnbBg").css({opacity: 0});
});

$("#gnb").children("li").on("mouseenter", function(){
    $(".gnbBg").css({opacity: 1});

});

function gnbBg(x){
    var gnb_li_ul_wid = $("#gnb").children("li").children("ul").outerWidth();
    var isGnbBg = $(".gnbBg").length;
    if(!isGnbBg){
        $("#gnb")
            .append(
                $("<div class='gnbBg'>")
                    .css({
                        width: gnb_li_ul_wid,
                        height: gnbSub_hi,
                        position: "fixed",
                        top: $header_hi,
                        left: x,
                        backgroundColor: "#304d78",
                        display: "none",
                        zIndex: 10
                    })
            )
    };

    $(".gnbBg").slideDown(300, function(){

    $(".gnbBg").animate({left: x}, 150); 
    });

};


function widResize(){
    var gnb_li_ul_wid = $("#gnb").children("li").children("ul").outerWidth();
    $(".gnbBg").animate({width: gnb_li_ul_wid}, 0);
    console.log(gnb_li_ul_wid);
};


function createTit(txt){
    var isgnbSub_wrap = $(".gnbSub_wrap").length;
    if(!isgnbSub_wrap){
        $(".menuWeb")
            .append(
                $("<div class='gnbSub_wrap'>")
                .css({
                    position: "fixed",
                    width: "100%",
                    height: gnbSub_hi,
                    top: 117,
                    left: 0,
                    display: "none",
                    zIndex: 7
                })
                .append(     
                $("<div class='gnbSub_con'>")
                    .css({
                        width: 1180,
                        height: "100%",
                        margin: "0 auto",
                        position: "relative"
                    })
                    .append(
                        $("<div class='dep2_banner'>")
                    )
                )
            )
        };
}

function openSub(){
    var isbgGnb = $(".bgGnb").length;
    var isgnbSubBg = $(".gnbSubBg").length;

    if(!isgnbSubBg){
        $("body")
            .append(
                $("<div class='gnbSubBg'>")
                    .css({
                        width: "100%",
                        height: "calc(100vh)",
                        position: "fixed",
                        top: $header_hi + bgGnb_hi + "px",
                        left: 0,
                        backgroundColor: "rgba(0,0,0,0.8)",
                        display: "none",
                        zIndex: 5
                    })
            )
    };

    if(!isbgGnb){
        $(".menuWeb")
            .prepend(
                $("<div class='bgGnb'>")
                    .css({
                        width: "100%",
                        height: gnbSub_hi,
                        position: "fixed",
                        top: $header_hi,
                        left: 0,
                        background: "#faf9f8",
                        display: "none",
                        zIndex: 6
                    }),

        )
    
    };

    $(".gnbSubBg").stop().fadeIn(300);
    $(".bgGnb").stop().slideDown(300);
    $("#gnb li ul").stop().slideDown(300);
    $(".gnbSub_wrap").stop().slideDown(300);

};

function closeSub(){
    $(".bgGnb").stop().slideUp(100, function(){
        $(this).remove();
    });
    $(".gnbSubBg").stop().fadeOut(100, function(){
        $(this).remove();
    });
    $(".gnbBg").stop().slideUp(100, function(){
        $(this).remove();
    });
    
    $('.gnbSub_wrap').stop().slideUp(100, function(){
        $(this).remove();
    });

    $("#gnb li ul").stop().slideUp(100);
};


// gnb 2depth 

function callBanner(target){
    $.ajax({
        url: target,
        async: false
    })
    .success(function(data){
        $(".gnbSub_con .dep2_banner").html(data);
    })
    .error(function(err){
        console.log(err);
    })
}

//2depth_slide

