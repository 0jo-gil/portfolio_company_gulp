const $skipNavi = $("#skipNavi");
const $skipNavi_btn = $skipNavi.find("a");

//skipNavi 이벤트
$skipNavi_btn.on("click", function(e){
    let target = $(this).attr("href");
    let posY = $(target).offset().top;
    e.preventDefault();
    console.log(target);
    $("html, body").animate({scrollTop: posY}, 1000);
});

$skipNavi_btn.on("focusin", function(){
    $(this).css({top: 0});
});

$skipNavi_btn.on("focusout", function(){
    $skipNavi_btn.css({top: -30});
});