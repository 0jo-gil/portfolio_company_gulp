
//버튼 클릭시 헤더이동
var $topBtn = $(".topBtn");

$topBtn.on("click", function(e){
    e.preventDefault();

    moveScreen($topBtn);
})

function moveScreen(){
    var targetPos = $("body").offset().top;
    $("html, body").animate({scrollTop: targetPos}, 500);
};