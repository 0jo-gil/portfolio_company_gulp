let banner_posY = $("#banner").offset().top - 200;
let brand_posY = $("#brand").offset().top - 300;
let news_posY = $("#news").offset().top;
let about_posY = $("#about").offset().top;
let brand_pic_index = 0;
const $banner_content_pic = $(".banner_content_pic");
const $content_pic1 = $banner_content_pic.find(".banner_content_pic1");
const $content_pic2 = $banner_content_pic.find(".banner_content_pic2");

let brand_timer;
let brand_scroll = false;



/*
$(".news_slider_inner").css({transform: "translateX(0)"});

$(".news_slider_inner").on("mouseenter", function(){
    if($(".news_slider_cursor").length < 1){
    $(this).parent(".news_slider")
        .append(
            $("<div class='news_slider_cursor'>")
                .fadeIn(200)
                .append(
                    $("<span>").text("CLICK"),
                    $("<span>").text("DRAG")
                )
        )
    };
})
$(".news_slider").on("mousedown", function(e){
    isDown = true;
    e.preventDefault();
    dragX = e.pageX;
    $(this).addClass("on");
    $(".news_slider_cursor").addClass("on");
});

$(".news_slider").on("mouseleave", function(e){
    isDown = false;
    $(this).removeClass("on");
    $(".news_slider_cursor").fadeOut(100, function(){
        $(this).remove();
    });
});

$(".news_slider").on("mouseup", function(e){
    isDown = false;
    $(this).removeClass("on");
    $(".news_slider_cursor").removeClass("on");
});

$(".news_slider").on("mousemove", function(e){
    let items_wid = $(".news_slider_item").outerWidth();
    let wid = $(".news_slider_inner").outerWidth();
    let cursorY = e.pageY - $(".news_slider").offset().top;
    let cursorX = e.pageX - $(".news_slider").offset().left;
    startX = e.pageX;

    $(".news_slider_cursor").css({
        top: cursorY,
        left: cursorX
    });

    if(!isDown) return;

    let posX = $(".news_slider_inner").css("transform").split(",")[4];
    
    e.preventDefault();
    $(this).addClass("on");

    if(dragX + dragSize < startX){
        if(posX < 0){
            dragX = e.pageX;
            ++slide_count;
            
            if(slide_count >=0){
                slide_count = 0;
            }
            
            $(".news_slider_inner").css({
                transform: "translateX("+slide_count * items_wid+"px)"
            });
        };
    };

    if(dragX - dragSize > startX){
        if(posX >= -wid + (items_wid * 2)){
            dragX = e.pageX;
            --slide_count;

            if(slide_count <=-5){
                slide_count = -5;
            }
            $(".news_slider_inner").css({
                transform: "translateX("+slide_count * items_wid+"px)"
            });
        };
    };
});
*/


$(window).scroll(function(){
    let posY = $(this).scrollTop();
    let banner_currentY = posY - banner_posY;
    let brand_currentY = posY - brand_posY;
    let banner_ht = $("#banner").outerHeight();
    let brand_ht = $("#brand").outerHeight();
    let brand_txt_ht = $(".brand_txt").outerHeight();
    let news_ht = $("#news").outerHeight();

    $(".this_page").text(posY);
    

    if(posY > banner_posY && posY < about_posY){

        $("#banner").addClass("on");

        // if(banner_currentY > banner_ht / 3 * 2){
            
        //     let banner_ht_percent = ((banner_ht - posY) / 3 * 2) / 200;
        //     $("#banner").css({opacity: banner_ht_percent});
           
        // } else {
        //     $("#banner").css({opacity: 1});
        // };
        $(".banner_scroll_txt").css({marginLeft: -banner_currentY * 5});
    } else {
        $(".banner_scroll_txt").css({marginLeft: 0});
        $(".banner_content_wrap").find("article").removeClass("on");
        
        $("#banner").removeClass("on");
    };

    if(posY > brand_posY && posY < news_posY - news_ht){
        $("#brand").addClass("on");


        for(let i=0; i<$(".brand_txt").find("article").length; i++){
            brand_content_num(posY, i);
        };
       
        // brand_counter($(".brand_num1"), 50, 1000);
        // brand_counter($(".brand_num2"), 100, 1000);
        // brand_counter($(".brand_num3"), 57, 1000);

        brand_scroll_pic(brand_currentY, brand_ht);
        
        if(posY > brand_posY + 300){
            $(".brand_tit").addClass("on");
            // $(".brand_tit").find("h1").css({
            //     position: "absolute"
            // });
        } else{
            $(".brand_tit").removeClass("on");
        }
    } else {
        $("#brand").removeClass("on");
    };
});


$banner_content_pic.on("mousemove", function(e){
    let posX = e.offsetX / $(this).width() * 100;
    let posY = e.offsetY / $(this).height() * 100;

    $(this).find($content_pic2).css({
        "clip-path": "circle(30% at "+posX+"%"+posY+"%)",
        filter: "grayscale(0)"
    });
});

$banner_content_pic.on("mouseleave", function(){
    $(this).find($content_pic2).css({
        "clip-path": "circle(0%)"
    })
});

// function banner_box_move(banner_currentY, banner_ht, index){
//     if(banner_currentY > banner_ht / 10 * index){
//         $(".banner_content_wrap").children("article").eq(index).addClass("on");
//     } else {
//         $(".banner_content_wrap").children("article").eq(index).removeClass("on");
//         index--;
//     }
// };

function brand_content_num(posY, index){
    if(posY > $("#brand").offset().top - 300){
        $(".brand_txt").find("article").eq(index).children(".brand_inner_num").children("span").addClass("on");

        if(!brand_scroll){
            brand_scroll = true
        $(".brand_inner_num span").each(function(){
            if(brand_scroll){
            $(this)
                .prop("Counter", 0)
                .animate({
                    Counter: $(this).text()
                },
                {
                    duration: 3000,
                    easing: "swing",
                    step: function(now){
                        $(this).text(Math.ceil(now));
                    }
                })
            }    
        });
        }
    };  
}


// function brand_counter(el, num, time){
//     let item = el;
//     let current_num = item.text();
//     let counter_num = num - current_num;
//     let interval = time / counter_num;
//     console.log(counter_num);
        
//     brand_timer = setInterval(function(){
//         // current_num++;

//         if(current_num == num){
//             clearInterval(brand_timer);
//         };
//         item.text(current_num);
        
//     }, interval);  
                    
// }






function brand_scroll_pic(brand_currentY, brand_ht){
    if(brand_currentY > brand_ht / 16 * brand_pic_index + 1){
        $(".brand_bg").find("img").eq(brand_pic_index -1).css({zIndex: brand_pic_index });
        brand_pic_index++;
    } else {
        $(".brand_bg").find("img").eq(brand_pic_index -1).css({zIndex: -brand_pic_index});
        brand_pic_index--;
    }
};


//about section 탭메뉴

$(".about_list_btn").find("li a").on("mouseenter focusin", function(){
    let target = $(this).attr("href");
    let posY = $(this).position().top;
    let isOn = $(target).hasClass("on");
    
    if(!isOn){
        $(".about_list_box").find("li").removeClass("on").hide();
        $(target).stop().fadeIn(100).addClass("on");
    };
    $(".about_line_bg").css({
        top: posY
    })
});

$(".about_list_btn").find("li a").on("click", function(e){
    e.preventDefault();
});

//about buttom underline

about_underline();

function about_underline(){
    $(".about_line_bg").css({
        top: $(".about_list_btn").children("li").eq(0).children("a").position().top
    })
};

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
    console.log(target);

    if(!isOn){
        $(".news_slider").fadeOut(50).removeClass("active");
        $(target).children(".news_slider_inner").css({transform: "translateX(0)"})
        $(target).fadeIn(300).addClass("active");
    };

    $(".news_btn").find("li").removeClass("on");
    $(this).parent("li").addClass("on");
});