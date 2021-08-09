let vision_posY = $("#vision").offset().top - 200;
let brand_posY = $("#brand").offset().top - 300;
let news_posY = $("#news").offset().top;
let about_posY = $("#about").offset().top;
let brand_pic_index = 0;

const $vision = $("#vision");
const $vision_content_wrap = $vision.find(".vision_content_wrap article");

const $brand = $("#brand");



const $vision_content_pic = $(".vision_content_pic");
const $content_pic1 = $vision_content_pic.find(".vision_content_pic1");
const $content_pic2 = $vision_content_pic.find(".vision_content_pic2");

let brand_timer;
let brand_scroll = false;
let window_wid = $(this).outerWidth();


$(window).scroll(function(){
    let posY = $(this).scrollTop();
    let vision_currentY = posY - vision_posY;
    let brand_currentY = posY - brand_posY;
    let vision_ht = $("#vision").outerHeight();
    let brand_ht = $("#brand").outerHeight();
    let news_ht = $("#news").outerHeight();

    $(".this_page").text(posY);
    

    if(posY > vision_posY && posY < about_posY){

        $vision.addClass("on");

    } else {
        $vision.removeClass("on");
    };

    if(posY > brand_posY && posY < news_posY - news_ht){
        $brand.addClass("on");
    } else {
        $brand.removeClass("on");
    };
});

$vision_content_pic.on("mousemove", function(e){
    let posX = e.offsetX / $(this).width() * 100;
    let posY = e.offsetY / $(this).height() * 100;

    $(this).find($content_pic2).css({
        "clip-path": "circle(30% at "+posX+"%"+posY+"%)",
        filter: "grayscale(0)"
    });
});

$vision_content_pic.on("mouseleave", function(){
    $(this).find($content_pic2).css({
        "clip-path": "circle(0%)"
    });
});


//about section 탭메뉴
const $about_list_btn = $(".about_list_btn");
const $about_list_btn_li = $about_list_btn.find("li");
const $about_list_btn_a = $about_list_btn_li .find("a");

const $about_list_box = $(".about_list_box");
const $about_list_box_li = $about_list_box.find("li");

$about_list_btn_a.on("mouseenter focusin", function(){
    let target = $(this).attr("href");
    let posY = $(this).position().top;
    let posX = $(this).position().left;
    let isOn = $(target).hasClass("on");
    let wid = $(this).outerWidth();

    if(!isOn){
        $about_list_box_li.removeClass("on").hide();
        $(target).stop().fadeIn(100).addClass("on");
    };

    if(window_wid > 1179){
        $(".about_line_bg").css({
            top: posY,
        })    
    } else {
        $(".about_line_bg").css({
            width: wid,
            left: posX,
            top: 0
        });
    };
});

$about_list_btn_a.on("click", function(e){
    e.preventDefault();
});


//about btn line move

$(window).resize(function(){
    window_wid = $(this).outerWidth();

    if(window_wid > 1179){
        $(".about_line_bg").css({
            top: $about_list_btn_li.eq(0).children("a").position().top,
            width: 4,
            left: 0
        });
    } else {
        $(".about_line_bg").css({
            top: 0,
            width: 83.9
        });
    };
});

// about_line();

// function about_line(){
//     if(window_wid > 1179){
//         $(".about_line_bg").css({
//             top: $about_list_btn_li.eq(0).children("a").position().top
//         });
//     } else if(window_wid < 1179){
//         $(".about_line_bg").css({
//             top: 0
//         });
//     };
// };

//main contact input class
$(".main_contact_info").find("input[type=text]").on("keyup", function(){
    let val = $(this).val();
    $(this).parent(".main_contact_info").addClass("on");
    if(!val){
        $(this).parent(".main_contact_info").removeClass("on");
    };
});

//news section
$(".news_btn").find("li a").on("click", function(e){
    let target = $(this).attr("href");
    let isOn = $(target).hasClass("active");
    e.preventDefault();

    if(!isOn){
        $(".news_slider").fadeOut(50).removeClass("active");
        $(target).children(".news_slider_inner").css({transform: "translateX(0)"})
        $(target).fadeIn(300).addClass("active");
    };

    $(".news_btn").find("li").removeClass("on");
    $(this).parent("li").addClass("on");
});