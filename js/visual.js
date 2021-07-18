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

$main_menu_list.children("a").on("mouseenter", function(){
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

$main_menu_list.children("a").on("mouseleave", function(){
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


// 마우스 휠 동작시 프레임 회전
/*
$visual.on("mousewheel", function(e){
    const wheel = e.originalEvent.deltaY;

    if(isScroll) return;

    if(wheel > 0){
        wheelUp();
        isScroll = true;
    } else {
        wheelDown();
        isScroll = true;
    };
});

function wheelUp(){
    ++num;
    $frame.css({transform: `rotate(${deg*num}deg)`});
    setTimeout(function(){
        isScroll = false;
    }, 500);
    (active == 1) ? active = len : active--;

    $posters.removeClass("on");
    $posters.eq(active -1).addClass("on");
};

function wheelDown(){
    --num;
    $frame.css({transform: `rotate(${deg*num}deg)`});
    setTimeout(function(){
        isScroll = false;
    }, 500);
    
    (active ==len ) ? active =1 : active++;
    console.log(active);
    
    $posters.removeClass("on");
    $posters.eq(active -1).addClass("on");
}
*/

//button 클릭 회전
$next_btn.on("click", function(){
    next_btn_click();
    isScroll = true;
});

$prev_btn.on("click", function(){
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
}


$posters_inner.on("click", function(){
    var data_index = $(this).attr("data-index");
    var bg_data = $(this).attr("background-data");
    var isOn = $(this).parent().hasClass("on");

    if(isOn){
        $posters_inner.removeClass("on");
        $(this).addClass("on");
        $posters_inner.parent("article").css({zIndex: 1});
        $(this).parent("article").css({zIndex: 10});
        $(".main_wrap").addClass("hidden");
        

        setTimeout(function(){
            getData(data_index);
            $(".visual_content").css({background: bg_data});

        }, 1000);


        // $(this)
        //     .append(
        //         $("<div class='bg_done'>")
        //             // .css({background: bg_data})
        //             .fadeIn(100)
        //     )

        $("body")
            .append(
                $("<div class='popMask'>")
                    .append(
                        $("<div class='mask1'>").stop().delay().animate({left: 0}, 500),
                        $("<div class='mask2'>").stop().delay(200).animate({left: 0}, 500),
                        $("<div class='mask3'>").stop().delay(400).animate({left: 0}, 500),
                        $("<div class='mask4'>").stop().delay(600).animate({left: 0}, 500, function(){
                            $(".popMask").fadeOut();
                        }),
                    )
            )
    };    
    
});


// $("body").on("click", ".closeBtn", function(){
//     $(".content").fadeOut(200, function(){
//         $(this).remove();
//         $(".inner").removeClass("on");
//     });
//     var pos = $("#visual").offset().top;
//     console.log(pos);
//     // $("html, body").animate({scrollTop: });

//     setTimeout(function(){
//         $(".bg_done").fadeOut(1500, function(){
//             $(this).remove();
//         })
//     }, 1500)

//     // pic_timer = setInterval(pic_move, 20); 
//     clearInterval(timer);
// })


function getData(url){
    $.ajax({
        url: "data/"+url,
        async: false
    })
    .success(function(data){
        create(data);

        const $tit_span = $(".main_tit").find("span");
        const $content_pic_slide = $(".content_pic_slide");
        const $slide_bg_pic = $content_pic_slide.find(".slide_bg_pic");
        const $slide_small_pic = $content_pic_slide.find(".slide_small_pic");
        let this_num = 1;
        let isDone = false;
        let mainPos = $(".content_main").offset().left;
        let slidePos = $content_pic_slide.offset().left;
        let scrollPicPos = $(".content_scroll_pic").offset().left;
        let footerPos = $(".content_footer").offset().left;

        let circle_dashoffset = $(".close_circle").css("stroke-dashoffset");
        let scroll_pic_arr = [];
        
        init();            

     
        for(let i = 0; i<$(".content_scroll_pic").find("li").length; i++){
            var scroll_pic_x = parseInt($(".content_scroll_pic").find("li").eq(i).offset().left - 500);
            scroll_pic_arr.push(scroll_pic_x);
        };
        
        // console.log(scroll_pic_arr);
        //스크롤 모션
        $(window).scroll(function(e){
            var posY = $(this).scrollTop();
            let mainCurrent = parseInt(posY - scrollPicPos);
            $(".posNum").text(posY);
            // console.log(posY);
            // console.log($(".content_wrap").offset().left);
            console.log(footerPos);
            
            $(".content_wrap").css({marginLeft: -posY});

            
            
            if(posY < slidePos){
                $tit_span.css({transform: `translateX(${parseInt(posY / 3)}px)`});
                $tit_span.eq(1).css({transform: `translateX(${parseInt(-posY / 3)}px)`});
            };
            // console.log(scrollPicPos);
     
            if(posY > scrollPicPos - 300){
                
                $(".content_scroll_pic").addClass("on");

                $(scroll_pic_arr).each(function(index, data){
                    if(posY > scroll_pic_arr[index]){
                        $(".content_scroll_pic").find("li").eq(index).addClass("on");
                    }
                });
            }




            // var percent_svg = ((posY / ($("body").height())) * 12.3);
            
            // var $newUnit = parseInt(circle_dashoffset, 10);
            
            // var $offsetUnit = parseInt(percent_svg * ($newUnit / 72.2));
            // console.log($offsetUnit);
            
            // $(".close_circle").css("stroke-dashoffset", $newUnit - $offsetUnit);
            // console.log()
        
        })
        
        //클릭 슬라이드 모션
        $content_pic_slide.on("click", function(){
            if(isDone) return;

            $(".click_mouse").addClass("on");
            setTimeout(function(){
                $(".click_mouse").removeClass("on");
            }, 300);
            this_num++;
            
            (this_num < 10) ? this_num = "0"+this_num : this_num;
            (this_num > 3) ? this_num = "01" : this_num; 

            slide_move($slide_bg_pic, "-100%");
            slide_move($slide_small_pic, "100%");
            $(".slide_this_num").fadeOut(100, function(){
                $(this).fadeIn(400).text(this_num);
            });
    

            isDone = true;    
        });

        function slide_move(el, dis){
            el.children("ul").find("li").last().animate({marginLeft: dis}, 1000, function(){
                $(this).prependTo(el.children("ul"));
                $(this).css({marginLeft: 0})
                isDone = false;
            });
        
        }


        
        //슬라이드 마우스 모션
        $content_pic_slide.on("mousemove", function(e){
            let posX = e.clientX;
            let posY = e.clientY;
            // console.log(posX);
            $(".click_mouse").css({
                top: posY + 10,
                left: posX - $content_pic_slide.offset().left + 20
            })
        });
        
        $content_pic_slide.on("mouseleave", function(){
            $(".click_mouse").animate({
                top: "40%",
                left: "50%"
            }, 300)
        });

        $("body").on("click", ".close_btn", function(){
            $("html, body").animate({scrollTop: 0}, 1000);

            $(".visual_content").fadeOut(100, function(){
                $(this).remove();
                $(".inner").removeClass("on");
            });

            $("body").css({height: "auto"});

            $(".popMask")
                .fadeIn(0, function(){
                    $(".mask1").delay(1000).animate({left: "-100%"}, 500),
                    $(".mask2").delay(1200).animate({left: "-100%"}, 500),
                    $(".mask3").delay(1400).animate({left: "-100%"}, 500),
                    $(".mask4").delay(1600).animate({left: "-100%"}, 500, function(){
                        $(".popMask").fadeOut(100, function(){
                            $(this).remove();
                        });
                    })
                })
      
        
        })
        
        //body 스크롤 높이 초기화
        function init(){
            var wid = $(".content_wrap").outerWidth();
            console.log(wid);
            
            $("body").css({height: wid - $(".content_footer").outerWidth()});
            $(".content_inner")
                .append(
                    $("<span class='close_btn'>")
                )
        };
        
        //하단 부분 이동 애니메이션
        $(".arrow").on("click", function(e){
            e.preventDefault();
            var footerX = $(".content_footer").offset().left + $(".visual_content").outerHeight();
        
            $("html, body").animate({scrollTop: footerX}, 500);
        });


        
    })
    .error(function(err){
        console.log(err);
    })
}

function create(data){
    $("body")
        .append(
            $("<article class='visual_content'>").html(data).fadeIn(300)
        )
};



//news section txt 배치

$(window).load(function(){
    var news_txt1 = $(".news_wrap").find("article").eq(0).find(".news_bg").children("p").text().split("");
    var news_txt2 = $(".news_wrap").find("article").eq(1).find(".news_bg").children("p").text().split("");
    $(".news_bg").children("p").empty();
    
    news_txt(news_txt1, 0);
    news_txt(news_txt2, 1);
})
function news_txt(el, i){

    $(el).each(function(index, data){
        $(".news_wrap").find("article").eq(i).find(".news_bg").children("p")
            .append(
                $("<span>")
                    .text(data)
            )
    });
}

$(".news_wrap").find("article").on("mouseenter", function(){
    if(isRotate == 0){
        txt_rotate(this, 6, 40);
        $(this).find(".news_bg").children("p").addClass("on");
        $(this).find(".news_bg").children("p").delay(500).fadeIn(500);
    };
});

$(".news_wrap").find("article").on("mouseleave", function(){
    if(isRotate == 1){
        txt_rotate(this, 0, 0);
        isRotate = 0;
        k = 0;
        
        $(this).find(".news_bg").children("p").removeClass("on");
        $(this).find(".news_bg").children("p").fadeOut(200);
    }
})

function txt_rotate(el, deg, pos){
    var news_txt_inner = $(el).find(".news_bg").find("p").find("span");
    for(let el of news_txt_inner){
        $(el).css({transform: `rotate(${deg * k}deg) translateX(${pos * k}px`})
        k++;
    }
    
    isRotate = 1;
};