(function($){
    $.fn.mySkip = function(opt){
        new MySkip(this, opt);
        return this;
    }

    function MySkip(el){
        this.init(el);
        this.bindingEvent();
    };

    MySkip.prototype.init = function(el){
        this.skipNavi = el;
        this.navi_btn = el.find("li");
        this.navi_link = this.navi_btn.find("a");
        this.speed = 1000;
    };
    
    MySkip.prototype.bindingEvent = function(){
        this.navi_link.on("click", function(e){
            e.preventDefault();

            let target = $(e.currentTarget).attr("href");
            let posY = $(target).offset().top;

            $("html, body").animate({scrollTop:  posY}, this.speed);
        }.bind(this));

        this.navi_link.on("focusin", function(e){
            $(e.currentTarget).css({top: 0});
        });

        this.navi_link.on("focusout", function(e){
            this.navi_link.css({top: -30});
        }.bind(this));

    };
})(jQuery)