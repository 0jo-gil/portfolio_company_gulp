var $checkedAll = $('.checkedAll');
var $checked = $('.checked');
var memberJoin_top = $(".memberJoin").offset().top;
// console.log(footer_top);

$checked.on('click', function(){
    checked(this, 2);
});

$checkedAll.on('click', function(){
    checkAll(this);
    if($("input[class='checked']:checked").length == 2){
        $("html, body").stop().animate({scrollTop: memberJoin_top},1000);
    }
});

$("body").on("click", ".alertBtn", function(e){
    e.preventDefault();

    $(".checkBg").fadeOut(100, function(){
        $(this).remove();
    });
});



function checked(el, len){
    if($("input[class='checked']:checked").length == len){
        $checkedAll.prop('checked', true);
    } else {
        $checkedAll.prop('checked', false);
    };
};

function checkAll(el){
    $(el).next("label").removeClass("pass");
    if($(el).is(':checked')){
        $checked.prop('checked', true);
    } else {
        $checked.prop('checked', false);
    };
};

