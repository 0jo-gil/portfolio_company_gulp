var container = document.querySelector('#map'); 
var branch_btns = document.querySelectorAll(".branch li");

var options = { 
	center: new kakao.maps.LatLng(37.53141430987779, 127.00875963496928 ),
	level: 3
};

var map = new kakao.maps.Map(container, options);

var mapTypeControl = new kakao.maps.MapTypeControl();

map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);


var markerOptions = [
    {
        title:"본점", 
        latlng: new kakao.maps.LatLng(37.53141430987779, 127.00875963496928 ),
        imgSrc : 'img/marker1.png', 
        imgSize: new kakao.maps.Size(28,37),
        imgPos : { offset: new kakao.maps.Point(14,37)},
        button: branch_btns[0]
    },
    {
        title:"지점1", 
        latlng: new kakao.maps.LatLng(37.40461299749137, 127.10588130914488),
        imgSrc : 'img/marker2.png', 
        imgSize: new kakao.maps.Size(28,37),
        imgPos : { offset: new kakao.maps.Point(14,37)},
        button: branch_btns[1]
    },
    {
        title:"지점2", 
        latlng: new kakao.maps.LatLng(33.45375837305883 ,126.57230791826461),
        imgSrc : 'img/marker3.png', 
        imgSize: new kakao.maps.Size(28,37),
        imgPos : { offset: new kakao.maps.Point(14,37)},
        button: branch_btns[2]
    }
]; 

for(var i=0; i< markerOptions.length; i++){
    new kakao.maps.Marker({
        map:map,
        position:markerOptions[i].latlng,
        title: markerOptions[i].title, 
        image: new kakao.maps.MarkerImage(markerOptions[i].imgSrc, markerOptions[i].imgSize, markerOptions[i].imgPos)
    });


    (function(index){
        markerOptions[index].button.onclick = function(e){         
             e.preventDefault(); 
                        
            for(var k=0; k<markerOptions.length; k++){
                markerOptions[k].button.classList.remove("on"); 
            }
            markerOptions[index].button.classList.add("on"); 
            moveTo(markerOptions[index].latlng); 
        }
    })(i);   
};

window.onresize = function(){
    var active_btn = document.querySelector(".branch li"); 
    var active_index = active_btn.getAttribute("data-index"); 
    console.log(active_index); 
    map.setCenter(markerOptions[active_index].latlng);
};

function moveTo(target){
    var moveLatLon = target; 
    map.setCenter(moveLatLon); 
};

setDraggable(false);
function setDraggable(draggable) {
    map.setDraggable(draggable);    
};


setZoomable(false); //false 
function setZoomable(zoomable) {
    map.setZoomable(zoomable);    
};

var $naviBtn = $(".locationNavi").find("li");
var $naviBtn_a = $naviBtn.children("a");

$naviBtn_a.on("click focusin", function(e){
    e.preventDefault();
    var target = $(this).attr("href");
    
    naviTab(this, target);
});

function naviTab(el, target){
    $naviBtn.removeClass("on");
    $(el).parent("li").addClass("on");


    $(".locationList").children(".wrap").find("article").hide();
    $(el).parent("li").parent(".locationNavi").siblings(".wrap").children(target).show();
};