(function($){

    $.fn.myValidation = function(opt){

        new MyValidation(this, opt);
        return this;
    }

    function MyValidation(el, opt){
        this.init(el);
        this.bindingEvent(opt);
    }
    
    MyValidation.prototype.init = function(el){
        this.submit = el.find("input[type=submit]");
    }
    MyValidation.prototype.bindingEvent = function(opt){


        this.submit.on("click", function(e){    
            if(opt.isTxt){
                for(var i=0; i<opt.isTxt.length; i++){
                    if( !this.isTxt(opt.isTxt[i]) ) e.preventDefault();
                }
            };
            if(opt.isCheck){
                for(var i=0; i<opt.isCheck.length; i++){
                    if( !this.isCheck(opt.isCheck[i]) ) e.preventDefault();
                }
            };
            if(opt.isSelect){
                for(var i=0; i<opt.isSelect.length; i++){
                    if( !this.isSelect(opt.isSelect[i]) ) e.preventDefault();
                }
            };
            if(opt.isPwd){
                if( !this.isPwd(opt.isPwd[0], opt.isPwd[1]) ) e.preventDefault();    
                
            };

            var title = $(".error").parent("td").prev("th").children("label").text();
            if($(".joinInfo1").find(".error").length > 0){
                $("body").append(
                    $("<div class='checkJoin'>")
                        .append(
                            $("<div class='alertBox'>")
                                .append(
                                    $("<span>").text('필수 입력정보'),
                                    $("<p>").text(title+" 확인해주세요."),
                                    $("<a class='alertClose'>").text("확인")
                                )
                            
                        )
                )
            };
        }.bind(this));

        $("body").on("click", ".alertClose", function(e){
            e.preventDefault();
            $(".checkJoin").fadeOut(100, function(){
                $(this).remove();
            });
        });
        $("#pwd1").on("keyup", function(){
            var pwd_val = $("#pwd1").val();
            var pwd2_val = $("#pwd2").val();
            var num = /[0-9]/;
            var eng = /[a-zA-Z]/;
            var spc = /[~!@#$%^&*()_+]/;
            if(pwd_val.length >= 8){
                $(".check1").addClass("pass");
            }else{
                $(".check1").removeClass("pass");
            }
            if(num.test(pwd_val)){
                $(".check2").addClass("pass");
            }else{
                $(".check2").removeClass("pass");
            }
            if(eng.test(pwd_val)){
                $(".check3").addClass("pass");
            }else{
                $(".check3").removeClass("pass");
            }
            if(spc.test(pwd_val)){
                $(".check4").addClass("pass");
            }else{
                $(".check4").removeClass("pass");
            }
            if(pwd_val === pwd2_val){
                $(".pwdNot").hide();
                $(".pwdPass").show();
            } else {
                $(".pwdPass").hide();
                $(".pwdNot").show();
            };
            if(pwd2_val == ""){
                $(".pwdPass").hide();
                $(".pwdNot").hide();
            };
        });
        
        $("#pwd2").on("keyup", function(){
            var pwd_val = $("#pwd1").val();
            var pwd2_val = $("#pwd2").val();
            if(pwd_val === pwd2_val){
                $(".pwdNot").hide();
                $(".pwdPass").show();
            } else {
                $(".pwdPass").hide();
                $(".pwdNot").show();
            };
            if(pwd2_val == ""){
                $(".pwdPass").hide();
                $(".pwdNot").hide();
            };
        });
    }
    MyValidation.prototype.isTxt = function(name){
        var len = 8;
        var txt = $("[name="+name+"]").val();
        var msg = $("[name="+name+"]").attr("placeholder");
    
        if(txt==""){
            $("[name="+name+"]").addClass("error");
            return false;
        }else{
            if(txt.legnth < len){
                if(!name == "email1"){
                    $("[name="+name+"]").addClass("error");
                }
                return false;
            }else {
                $("[name="+name+"]").removeClass("error");
                return true;
            }
        }
    }
    MyValidation.prototype.isPwd = function(name1,name2){
        var $pwd1 = $("input[name="+name1+"]");
        var $pwd2 = $("input[name="+name2+"]");
        var pwd1 = $pwd1.val();
        var pwd2 = $pwd2.val();  
        var isConfirm = false;
        var i=0;
        var len = 8;
    
        var num = /[0-9]/;
        var eng = /[a-zA-Z]/;
        var spc = /[~!@#$%^&*()_+]/;

    
        if(pwd1 === pwd2){
    
            if(pwd1.length >= len){
                i++;
            }else{
                // alert("비밀번호는 5자리 이상 입력하세요.");
            }
    
            if( num.test(pwd1) ){
                i++;
            }else {
                // alert("비밀번호에 숫자를 포함하세요.");
            }
    
            if( eng.test(pwd1) ){
                i++;
            }else{
                // alert("비밀번호에 문자를 포함하세요.");
            }
    
            if( spc.test(pwd1) ){
                i++;
            }else{
                // alert("비밀번호에 특수문자를 포함하세요.");
            }
    
            if(i===4){
                $pwd1.removeClass("error");
                isConfirm = true;
                return isConfirm;
            }else{
                $pwd1.addClass("error");
                return isConfirm;
            }
    
            
        }else{
            $pwd1.addClass("error");
            return isConfirm;
        }
    
    }
    MyValidation.prototype.isCheck = function(name){
        var isCheck = $("input[name="+name+"]").is(':checked');   
    
        if(isCheck){
            $("input[name="+name+"]").parent().find("p").hide();
            return true;
        }else{
            $("input[name="+name+"]").parent().find("p").show();
            return false;
        }
    }
    MyValidation.prototype.isSelect = function(name){
        var sel = $("select[name="+name+"]").children("option:selected").val();
    
        if(sel == ""){
            $("select[name="+name+"]").addClass("error");
            return false;
        }else{
            $("select[name="+name+"]").removeClass("error");
            return true;
        }
    };    
})(jQuery);

