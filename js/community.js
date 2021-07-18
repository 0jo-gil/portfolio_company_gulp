
init();

var enableClick = true;
var timer; 
var window_wid = $(window).outerWidth();
console.log(window_wid);

timer = setInterval(noticeUp, 4000);


$(".btn_up").on("click", function(e){
    e.preventDefault();
    if(enableClick){
        noticeUp();
        enableClick = false;
    };
});

$(".btn_down").on("click", function(e){
    e.preventDefault();
    if(enableClick){
        noticeDown();
        enableClick = false;
    };
});

$(".pause_btn").on("click", function(e){
    e.preventDefault();

    $(this).addClass("on");
    $(".start_btn").removeClass("on");
    clearInterval(timer);

});

$(".start_btn").on("click", function(e){
    e.preventDefault();
    
    $(".pause_btn").removeClass("on");
    $(".start_btn").addClass("on");
    timer = setInterval(function(){noticeUp();}, 4000);
    return timer;
});

function noticeUp(){
    $(".notice_slide").animate({marginTop: "-140px"}, 500, function(){
        $(".notice_slide").css({marginTop: "-70px"});
        $(".notice_slide").children("li").first().appendTo(".notice_slide");
        enableClick = true;
    });
};

function noticeDown(){
    $(".notice_slide").animate({marginTop: "0"}, 500, function(){
        $(".notice_slide").css({marginTop: "-70px"});
        $(".notice_slide").children("li").last().prependTo(".notice_slide");
        enableClick = true;
    });
};

function init(){
    var len = $(".notice_slide").children("li").length;
    
    $(".notice_slide").css({
        height: 100 * len + "%",
        marginTop: "-70px"
    });
    $(".notice_slide").children("li").css({
        height: 100 / len + "%"
    });
    $(".notice_slide").children("li").last().prependTo(".notice_slide");
};



//community board 내용 비동기 호출

var frame = $(".community_box");
var faq = $(".faq_menu").find(".wrap");
var url = "data/community.json";
var arr = [];

callData(url);


function callData(url){
    $.ajax({
        url: url,
        data: "json"
    })
    .success(function(data){
        console.log(data);
        createTable(frame, data);
        createFaq(faq, data);
    })
    .error(function(err){
        console.log(err);
    })
};

function createTable(target, data){
    console.log(data);
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
}

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
    })

    // target.find("dt").eq(0).attr("class", "on");
}

//faq toggle event
// var $faq_frame = $(".faq_menu").children(".wrap");
// var $btns = $faq_frame.find("dt");
// var $boxes = $btns.find("dd");

// $("body").on("click", ".faq_menu dt", function(e){
//     e.preventDefault();
//     activation(this);
// });

// function activation(el){
//     var isOn = $(el).hasClass("on");


//     $(".faq_menu").find("dt").removeClass("on");
//     $(".faq_menu").find("dd").slideUp();

//     if(isOn){
//         $(el).addClass("on");
//         $(el).next().slideUp();
//     };

//     $(el).addClass("on");
//     $(el).next().slideDown();
  
// };
