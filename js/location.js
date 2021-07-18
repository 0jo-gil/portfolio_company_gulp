//location ajax 데이터 호출하여 출력

var frame = $(".locationList");
callData();

function callData(){
    $.ajax({
        url: "data/location.json",
        data: "json"
    })
    .success(function(data){
        createLocation(data);
    })
    .error(function(err){
        console.error(err);
    })
};

function createLocation(data){
    var items = data.data;

    $(items).each(function(index, data){
        var tit = data.locationTit;
        var className = data.class;
        var name = data.locationName;
        var address = data.address;
        var phone = data.phone;
        var color = data.color;

        frame.children(".wrap")
            .append(
                $("<article>")
                    .attr("class", className)
                    .append(
                        $("<div class='mainTxt'>")
                            .append(
                                $("<div class='locationHead'>")
                                    .append(
                                        $("<p>")
                                            .text(tit)
                                            .css({color: color})
                                    ),
                                $("<div class='locationTxt'>")
                                        .append(
                                            $("<p>").text(name),
                                            $("<span>").text(address),
                                            $("<strong>").text(phone)
                                        )
                            )
                    )
                    
            )


    });
};

var $branch_btns = $(".branch").find("li");

$branch_btns.on("click focusin", function(){
    $(".branch_info").hide();
    $(this).next(".branch_info").show();
})