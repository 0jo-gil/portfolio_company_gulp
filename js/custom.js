let banner_posY = $("#banner").offset().top - 200;
let brand_posY = $("#brand").offset().top - 500;
let news_posY = $("#news").offset().top;
let brand_pic_index = 0;
const $banner_content_pic = $(".banner_content_pic");
const $content_pic1 = $banner_content_pic.find(".banner_content_pic1");
const $content_pic2 = $banner_content_pic.find(".banner_content_pic2");

let dragSize = 150;
let slide_count = 0;
let isDown = false;
let dragX, scrollLeft;
let brand_timer;
let brand_scroll = false;


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
    })

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
        } 
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
        }
    };
});



$(window).scroll(function(){
    let posY = $(this).scrollTop();
    let banner_currentY = posY - banner_posY;
    let brand_currentY = posY - brand_posY;
    let banner_ht = $("#banner").outerHeight();
    let brand_ht = $("#brand").outerHeight();
    let brand_txt_ht = $(".brand_txt").outerHeight();
    let news_ht = $("#news").outerHeight();

    $(".this_page").text(posY);
    

    if(posY > banner_posY && posY < brand_posY){

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
        let brand_ht_perc = ((brand_ht - posY) / 5) / 100;
        let brand_opacity = ((posY) / 35) / 100;
        $("#brand").addClass("on");
        $(".brand_tit").find("h1").css({
            transform: `translateY(-50%) scale(${brand_ht_perc})`,
            opacity: brand_opacity
        });

        if(posY > $(".brand_inner_content").offset().top - 500){
            $(".brand_inner_content").addClass("on");
        }

        for(let i=0; i<$(".brand_content_wrap").length; i++){
            brand_content_num(posY, i);
        };

      
       
        // brand_counter($(".brand_num_count1"), 57, 1000, posY);
        // brand_counter($(".brand_num_count2"), 5, 2000, posY);
        // brand_counter($(".brand_num_count3"), 60, 1500, posY);
        
    

        if(posY > brand_posY + 500){
            $(".brand_tit").addClass("on");
            $(".brand_tit").find("h1").css({
                transform: `translateY(-50%) scale(1)`,
                opacity: 1
            });
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
    if(posY > $(".brand_content_wrap").eq(index).offset().top - 500){
        $(".brand_content_wrap").eq(index).addClass("on");

        if(!brand_scroll){
            brand_scroll = true
        $(".brand_num").each(function(){
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
/*
function brand_counter(el, num, time, posY){
    let item = el;
    let current_num = item.text();
    let counter_num = num - current_num;
    let interval = time / counter_num;
    
    if(posY >= el.offset().top - 500){
        brand_scroll = true;
        if(brand_scroll == true){
            
            brand_scroll = false;
            brand_timer = setInterval(function(){

                if(current_num == num){
                    clearInterval(brand_timer);
                } else {
                    current_num++;
                };
                item.text(current_num);
                
            }, interval);  
                        
            brand_scroll = true;
        }
    }
}
*/





function brand_scroll_pic(brand_currentY, brand_txt_ht){
    if(brand_currentY > brand_txt_ht / 6 * brand_pic_index + 1){
        $(".brand_pic").find("img").eq(brand_pic_index -1).css({zIndex: brand_pic_index });
        brand_pic_index++;
    } else {
        $(".brand_pic").find("img").eq(brand_pic_index -1).css({zIndex: -brand_pic_index});
        brand_pic_index--;
    }
};
