const $visual = $("#visual");
const $frame = $(".frame");
const $posters = $frame.find("article");
const $posters_inner = $posters.children(".inner");
const len = $posters.length;
const $next_btn = $(".next_btn");
const $prev_btn = $(".prev_btn");
const $main_menu_mo = $(".main_menu_mo");
const $menu_btn = $main_menu_mo.find(".main_menu_btn");
const $close_btn = $main_menu_mo.find(".main_close_btn");
const $main_gnb = $("#main_gnb");
const $main_menu_list = $main_gnb.children("li");

let i = 0;
let k = 0;
let num = 0;
let active = 1;
let isRotate = 0;

const deg = 45;
var timer;
var pic_timer;
var wheel_time;
var isScroll = false;


//main visual script
// 각 article  회전배치
for(let el of $posters){
    $(el).css({transform: `rotate(${45*i}deg)  translateY(-110vh)`})
    i++;
}

for(let i=0; i<$main_menu_list.length; i++){ 
    letter($main_menu_list, 0.1, i);
}

$menu_btn.on("click", function(e){
    e.preventDefault();

    $(this).parent($main_menu_mo).addClass("on");

    $(".main_menu").addClass("on");
    $main_menu_list.addClass("on");
    $("body").addClass("on");
});

$close_btn.on("click", function(e){
    e.preventDefault();
    $(this).parent($main_menu_mo).removeClass("on");
    $(".main_menu").removeClass("on");
    
    $main_menu_list.removeClass("on");
    
    $("body").removeClass("on");

});

$main_menu_list.children("a").on("mouseenter focusin", function(){
    let img_data = $(this).attr("img-data");

    if($(".main_menu_pic").length < 1){
        $(".main_menu")
            .append(
                $("<div class='main_menu_pic'>")
                    .append(
                        $("<img>")
                    )
            )    
    }

    $(".main_menu_pic").show();
    setTimeout(function(){
        $(".main_menu_pic").addClass("on");
    }, 200);
    $(".main_menu_pic").children("img").attr({src: img_data});
});

$main_menu_list.children("a").on("mouseleave focusout", function(){
    $(".main_menu_pic").hide();
    $(".main_menu_pic").removeClass("on");
})

$main_menu_list.children("a").on("mousemove", function(e){
    let posX = e.clientX ;
    let posY = e.offsetY;

    $(".main_menu_pic").css({
        transform: "translate("+posX / 8+"px, "+posY / 3+"px)"       
    })
})

function letter(el ,interval, index){
    if(el === undefined) {
        console.error("첫번째 인수로 선택자를 지정해주세요.")
        return;
    }
    
    const txt = $main_menu_list.eq(index).children("a").text();

    if(interval === undefined) interval = 0;
    
    el.eq(index).children("a").text("");
    
    let num = 0;

    for(let letter of txt){
        el.eq(index).children("a")
            .append(
                $("<span>")
                    .text(letter)
                    .css({
                        transitionDelay: `${0.5+num*interval}s`,
                        display: "inline-block"
                    })
            )
        num++;
    };
};

//button 클릭 회전
$next_btn.on("click", function(e){
    e.preventDefault();
    next_btn_click();
    isScroll = true;
});

$prev_btn.on("click", function(e){
    e.preventDefault();
    prev_btn_click();
    isScroll = true;
})

function next_btn_click(){
    --num;
    $frame.css({transform: `rotate(${deg*num}deg)`});
    setTimeout(function(){
        isScroll = false;
    }, 500);
    
    (active ==len ) ? active =1 : active++;
    
    $posters.removeClass("on");
    $posters.eq(active -1).addClass("on");
};

function prev_btn_click(){
    ++num;
    $frame.css({transform: `rotate(${deg*num}deg)`});
    setTimeout(function(){
        isScroll = false;
    }, 500);
    (active == 1) ? active = len : active--;

    $posters.removeClass("on");
    $posters.eq(active -1).addClass("on");
};