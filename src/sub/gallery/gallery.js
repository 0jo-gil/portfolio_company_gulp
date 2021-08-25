

var window_wid = $(window).outerWidth();
var gallery_con_ht;

$(window).resize(function(){
    var wid = $(this).outerWidth();
    
    resize(wid);
});


function resize(wid){
    gallery_con_ht = $(".gallery_box").find("li").outerHeight();

    if(wid < 540){
        $(".gallery_box")
            .css({
                height: gallery_con_ht * 5 -1
            })
            .addClass("active")
        $(".gallery_more_btn").css({display: "block"});
    } else {
        $(".gallery_box").removeClass("active");
        $(".gallery_more_btn").css({display: "none"});
    }
};



$(".gallery_more_btn").on("click", function(e){
    e.preventDefault();
    $(".gallery_box").css({height: "auto"}).removeClass("active");
    $(this).css({display: "none"});
})

$(window).load(function(){

    resize(window_wid);
});

