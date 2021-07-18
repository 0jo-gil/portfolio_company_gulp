var frame = $(".departmentTab");
init();
callData();
function callData(){
    $.ajax({
        url: "data/department.json",
        dataType: "json"
    })
    .success(function(data){
        createList(frame, data);  
    })
    .error(function(err){
        console.log(err);
    })
};

function createList(target, data){
    var arr = [];
    var executive = data.executive;
    var design = data.design;
    var cs = data.cs;
    var purchase = data.purchase;
    var accounting = data.accounting;

    arr.push(executive, design, cs, purchase, accounting);

    console.log(arr);

    for(var i=0; i<arr.length; i++){
        $(arr[i]).each(function(index, data){
            var department = data.department;
            var name = data.name;
            var position = data.position;
            var src = data.src;
    
            target.children("dd").eq(i)
                .append(
                    $("<article>")
                        .append(
                            $("<a href='#'>")
                                .append(
                                    $("<div class='list_txt'>")
                                            .append(
                                                $("<strong>").text(department),
                                                $("<p>").text(name),
                                                $("<span>").text(position)
                                        ),
                                    $("<div class='pic'>").css({backgroundImage: "url("+src+")"})
                                )
                        )  
                )
        });
    };

    $(executive).each(function(index, data){
        var department = data.department;
        var name = data.name;
        var position = data.position;
        var src = data.src;
        $(".innerCon").children(".wrap")
            .append(
                $("<article>")
                    .append(
                        $("<div class='pic'>").css({backgroundImage: "url("+src+")"}),
                        $("<p>").text(name),
                        $("<strong>").text(department),
                        $("<span>").text(position)
                    )
            )
    });

    var dep2Arr= [];
    dep2Arr.push(design, cs, purchase, accounting);

    for(var i=0; i<dep2Arr.length; i++){
        $(dep2Arr[i]).each(function(index, data){
            var department = data.department;
            var name = data.name;
            var position = data.position;
            var src = data.src;
    
            $(".depth2").children(".wrap").children("div").eq(i)
                .append(
                    $("<article>")
                        .append(
                            $("<div class='pic'>").css({backgroundImage: "url("+src+")"}),
                            $("<div class='dep2_txt'>")
                                .append(
                                    $("<strong>").text(department),
                                    $("<p>").text(name),
                                    $("<span>").text(position)
                            )
                    ) 
                         
                )
        });
    };
};


frame.find("dt a").on("click focusin", function(e){
    e.preventDefault();

    var target = $(this).attr("href");
    var dd_height = $(this).parent().next("dd").outerHeight() + 160;

    frame.find("dt").removeClass("on");
    $(this).parent().addClass("on");
    
    frame.find("dd").hide();
    $(target).show();

    $(".departmentList").css({height: dd_height});
});


$("textarea[name=message]").on("keypress", function(){
    $(this).css({color: "#111"});
});


// $(window).resize(function(){
//     var dd_height = $(".departmentList").find("dd").outerHeight() + 160;
//     var window_wid = $(this).width();
//     console.log(window_wid);
//     if(window_wid < 1179){
//         $(".departmentList").css({height: dd_height});
//     }
// });

function init(){
    $(window).on("load resize", function(){

        var dd_height = $(".departmentList").find("dd").outerHeight() + 160;

        $(".departmentList").css({height: dd_height});
    })

}