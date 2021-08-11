//location ajax 데이터 호출하여 출력

var $branch = $(".branch");
var $branch_btns = $branch.find("li");
var $branch_info = $branch.find(".branch_info");

$branch_btns.on("click focusin", function(){
    boxToggle(this);
});

function boxToggle(el){
    $branch_info.hide();
    $(el).next($branch_info).show();
};