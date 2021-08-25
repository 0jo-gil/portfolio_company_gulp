var $slide_btn = $(".slide_btn");
var $btn_up = $slide_btn.find(".btn_up");
var $btn_down = $slide_btn.find(".btn_down");
var $pause_btn = $slide_btn.find(".pause_btn");
var $start_btn = $slide_btn.find(".start_btn");

var $notice_slide = $(".notice_slide");
var $notice_slide_li = $notice_slide.find("li");

var enableClick = true;
var timer; 
var window_wid = $(window).outerWidth();

//community notice slide motion
init();

timer = setInterval(noticeUp, 4000);

$btn_up.on("click", function(e){
    e.preventDefault();
    clearInterval(timer);
    btnToggle($start_btn, $pause_btn);
    if(enableClick){
        noticeUp();
        enableClick = false;
    };
});

$btn_down.on("click", function(e){
    e.preventDefault();
    clearInterval(timer);
    btnToggle($start_btn, $pause_btn);
    if(enableClick){
        noticeDown();
        enableClick = false;
    };
});

$pause_btn.on("click", function(e){
    e.preventDefault();
    btnToggle($start_btn, $(this));
    clearInterval(timer);
});

$start_btn.on("click", function(e){
    e.preventDefault();
    btnToggle($pause_btn, $(this));
    timer = setInterval(function(){noticeUp();}, 4000);
    return timer;
});

function btnToggle(el1, el2){
    el1.removeClass("on");
    el2.addClass("on");
}

function noticeUp(){
    $notice_slide.animate({marginTop: "-140px"}, 500, function(){
        $notice_slide.css({marginTop: "-70px"});
        $notice_slide.children("li").first().appendTo($notice_slide);
        enableClick = true;
    });
};

function noticeDown(){
    $notice_slide.animate({marginTop: "0"}, 500, function(){
        $notice_slide.css({marginTop: "-70px"});
        $notice_slide.children("li").last().prependTo($notice_slide);
        enableClick = true;
    });
};

function init(){
    var len = $notice_slide_li.length;
    
    $notice_slide.css({
        height: 100 * len + "%",
        marginTop: "-70px"
    });
    $notice_slide_li.css({
        height: 100 / len + "%"
    });
    $notice_slide.children("li").last().prependTo($notice_slide);
};

//community board 내용 비동기 호출
var frame = $(".community_box");
var faq = $(".faq_menu").find(".wrap");
var url = "static/community.json";
var arr = [];

callData(url);

function callData(url){
    $.ajax({
        url: url,
        data: "json"
    })
    .success(function(data){
        createTable(frame, data);
        createFaq(faq, data);
    })
    .error(function(err){
        console.log(err);
    })
};

function createTable(target, data){
    var items = data.board;

    target.children("table")
        .append(
            $("<thead class='h'>")
                .append(
                    $("<tr>")
                        .append(
                            $("<th scope='col'>").text("번호"),
                            $("<th scope='col'>").text("내용"),
                            $("<th scope='col'>").text("작성자"),
                            $("<th scope='col'>").text("작성일")
                        )
                ),
            $("<tbody>")
        )

    var $tbody = frame.find("tbody");

    $(items).each(function(index, data){
        var link = data.link;
        var title = data.title;
        var text = data.text;
        var writer = data.writer;
        var date = data.date;

        var count = ++index;

        $tbody.prepend(
            $("<tr>")
                .append(
                    $("<td>").text(count),
                    $("<td>")
                        .append(
                            $("<a>").attr("href", link)
                                .append(
                                    $("<h3>").text(title),
                                    $("<p>").text(text)
                                )
                        ),
                    $("<td>").text(writer),
                    $("<td>").text(date)
                )
        )
    })
};

function createFaq(target, data){
    var items = data.faq;

    target 
        .append(
            $("<dl>")
        )
    
    var $faq_dl = target.find("dl");

    $(items).each(function(index, data){
        var title = data.title;
        var text = data.text;

        $faq_dl.append(
            $("<dt>")
                .text(title)
                .prepend(
                    $("<span>")
                        .append(
                            $("<i class='fab fa-quora'></i>")
                        )
                ),
            $("<dd>").text(text)
        )
    });
};