let vision_posY = $("#vision").offset().top - 200;
let brand_posY = $("#brand").offset().top - 300;
let news_posY = $("#news").offset().top;
let about_posY = $("#about").offset().top;
let brand_pic_index = 0;

const $skipNavi = $("#skipNavi");
const $skipNavi_btn = $skipNavi.find("a");

const $vision = $("#vision");
const $vision_content_wrap = $vision.find(".vision_content_wrap article");

const $brand = $("#brand");
const $main_contact = $("#main_contact");
const $main_contact_info = $main_contact.find(".main_contact_info");

const $vision_content_pic = $(".vision_content_pic");
const $content_pic1 = $vision_content_pic.find(".vision_content_pic1");
const $content_pic2 = $vision_content_pic.find(".vision_content_pic2");


let brand_timer;
let brand_scroll = false;
let window_wid = $(this).outerWidth();


//skipNavi 이벤트
$skipNavi_btn.on("click", function(e){
    let target = $(this).attr("href");
    let posY = $(target).offset().top;
    e.preventDefault();
    
    $("html, body").animate({scrollTop: posY}, 1000);
});

$skipNavi_btn.on("focusin", function(){
    $(this).css({top: 0});
});

$skipNavi_btn.on("focusout", function(){
    $skipNavi_btn.css({top: -30});
});


//메인페이지 스크롤 모션 
$(window).scroll(function(){
    let posY = $(this).scrollTop();
    scrollMotion(posY, vision_posY, about_posY, $vision);
    scrollMotion(posY, brand_posY, news_posY, $brand);
});

function scrollMotion(posY, pos1, pos2, el){
    if(posY > pos1 && posY < pos2){
        el.addClass("on");
    }else{
        el.removeClass("on");
    }
};

//vision 섹션 마우스 패스
$vision_content_pic.on("mousemove", function(e){
    let posX = e.offsetX / $(this).width() * 100;
    let posY = e.offsetY / $(this).height() * 100;
    visionPath(this, posX, posY);
});

function visionPath(el, x, y){
    $(el).find($content_pic2).css({
        "clip-path": "circle(30% at "+x+"%"+y+"%)",
        filter: "grayscale(0)"
    });
}

$vision_content_pic.on("mouseleave", function(){
    visionPathRemove(this);
});

function visionPathRemove(el){  
    $(el).find($content_pic2).css({
        "clip-path": "circle(0%)"
    });
}

//about section 탭메뉴
const $about_list_btn = $(".about_list_btn");
const $about_list_btn_li = $about_list_btn.find("li");
const $about_list_btn_a = $about_list_btn_li .find("a");

const $about_list_box = $(".about_list_box");
const $about_list_box_li = $about_list_box.find("li");
const $about_line_bg = $(".about_line_bg");

$about_list_btn_a.on("mouseenter focusin", function(){
    aboutTab(this);
});

function aboutTab(el){
    let target = $(el).attr("href");
    let posY = $(el).position().top;
    let posX = $(el).position().left;
    let isOn = $(target).hasClass("on");
    let wid = $(el).outerWidth();

    if(!isOn){
        $about_list_box_li.removeClass("on").hide();
        $(target).stop().fadeIn(100).addClass("on");
    };

    if(window_wid > 1179){
        $about_line_bg.css({
            top: posY,
        })    
    } else {
        $about_line_bg.css({
            width: wid,
            left: posX,
            top: 0
        });
    };
};

$about_list_btn_a.on("click", function(e){
    e.preventDefault();
});


//about btn line move
$(window).resize(function(){
    window_wid = $(this).outerWidth();

    if(window_wid > 1179){
        $about_line_bg.css({
            top: $about_list_btn_li.eq(0).children("a").position().top,
            width: 4,
            left: 0
        });
    } else {
        $about_line_bg.css({
            top: 0,
            width: 83.9
        });
    };
});

const $news = $("#news");
const $news_btn = $news.find(".news_btn");
const $news_btn_li = $news_btn.find("li");
const $news_btn_li_a = $news_btn_li.children("a");

const $news_slider = $news.find(".news_slider");
const $news_slider_inner = $news_slider.children(".news_slider_inner");

//news section
$news_btn_li_a.on("click", function(e){
    let target = $(this).attr("href");
    let isActive = $(target).hasClass("active");
    e.preventDefault();

    if(!isActive){
        $news_slider.fadeOut(50).removeClass("active");
        $(target).children($news_slider_inner).css({transform: "translateX(0)"})
        $(target).fadeIn(300).addClass("active");
    };

    $news_btn_li.removeClass("on");
    $(this).parent("li").addClass("on");
});

//main contact input motion
$main_contact_info.find("input[type=text]").on("keyup", function(){
    let val = $(this).val();
    classToggle(val, this);
});

function classToggle(con, el){
    if(!con){
        $(el).parent().removeClass("on");
    }else{
        $(el).parent().addClass("on");
    }
};

