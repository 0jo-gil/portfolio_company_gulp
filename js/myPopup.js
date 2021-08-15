(function($){

    $.defaults = {
        data_url : undefined,
        isMask : true,
        isCk : true,
        custom_css : {
            position: "fixed",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 12
        }
    }

    $.fn.myPopup = function(opt){
        opt = $.extend({}, $.defaults, opt);
        new MyPopup(this, opt);
        return this;
    }

    function MyPopup(el, opt){
        if(opt.data_url == undefined){
            console.error("data_url값은 필수 입력사항입니다.");
        }else{
            this.init(el, opt);
            this.bindingEvent();
        }        
    }

    MyPopup.prototype.init = function(el, opt){
        this.el = el;       
        this.selector = this.el.selector; 
        this.name = this.selector.split("#")[1];   
        this.data_url = opt.data_url;
        this.isMask = opt.isMask;
        this.isCk = opt.isCk;          
        this.isCookie;         
        this.popCSS = opt.custom_css;
    }

    MyPopup.prototype.setCookie = function(cookieName, cookieVal, time){
        var today =  new Date();
        var date = today.getDate();
        today.setDate(date+time);
        var duedate = today.toGMTString();
        document.cookie = cookieName+"="+cookieVal+"; path=/; expires="+duedate;
    }

    MyPopup.prototype.bindingEvent = function(){
        //처음 로딩시 쿠키 유무에 따른 팝업 생성후 보이기
        this.isCookie = document.cookie.indexOf(this.name+"=done");        
        
        if(this.isCookie == -1){
            this.createPop();
            console.log("쿠키없음");
            this.el.show();
            $(".mask").show();
        }else{
            console.log("쿠키 있음");
            this.el.hide();
            $(".mask").hide();
        }   

        
        //쿠키 팝업 닫기버튼 클릭 시
        $("body").on("click", this.selector+" .close", function(e){
            e.preventDefault();
            this.removePop(e.currentTarget);
        }.bind(this));
    }

    MyPopup.prototype.createPop = function(){

        //isMask= ture일때 뒤에 마스크 생성
        if(this.isMask){
            $("body")
                .append(
                    $("<div class='pop_mask'>")
                        .css({
                            width: '100%', 
                            height: '100%',
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            zIndex: 11, 
                            display: 'none'
                        })
                        .fadeIn()
                )
        }

        //동적팝업 생성
        $("body")
            .append(
                $("<aside>")
                    .attr("id", this.name)
                    .css(this.popCSS)
                    .append(
                        $("<div class='pop_content'>"),
                        $("<div class='wrap'>")
                            .append(
                                $("<input type='checkbox'>"),
                                $("<label>").text("오늘 하루 그만보기.")
                            ),
                        $("<a href='#'>")
                                .addClass("close")
                                .text("CLOSE")
                    )
                    .fadeIn()
            );

        //만약 isCk=false면 체크박스 숨기기
        if(!this.isCk) this.el.find(".wrap").hide();

        //팝업 안에 콘텐츠 ajax로 호출
        $.ajax({
            url : this.data_url
        })
        .success(function(data){       
            this.el.find(".pop_content").html(data);
        }.bind(this))
        .error(function(err){
            console.error(err);
        })
    }

    MyPopup.prototype.removePop = function(el){
        var isChecked = $(el).prev().find("input[type=checkbox]").is(":checked");
        var id_name = $(el).parent().attr("id"); 

        if(isChecked) this.setCookie(id_name, "done", 1);

        $(el).parent().fadeOut(500, function(){
            $(el).parent().remove();
        });

        $(".pop_mask").fadeOut(500, function(){
            $(".pop_mask").remove();
        })
    }
})(jQuery);