(function($){
    $.fn.myTab = function(opt){
        new MyTab(this, opt);
        return this;
    };

    function MyTab(el){
        this.init(el);
        this.bindingEvent();
    };
    
    MyTab.prototype.init = function(el){
        this.$tab_box = el;
        this.$tab_box_dl = this.$tab_box.children("dl")
        this.$tab_btn = this.$tab_box_dl.children("dt");
        this.$tab = this.$tab_box_dl.children("dd");
    };
    
    MyTab.prototype.bindingEvent = function(){
        this.$tab_btn.on("click focusin", function(e){
            e.preventDefault();
            var target = $(e.currentTarget).children("a").attr("href");

            this.$tab_btn.removeClass("on");
            $(e.currentTarget).addClass("on");
    
            this.$tab.hide();
            $(target).show();
            
        }.bind(this));
    };

})(jQuery);



/*
(function($){
    $.fn.myTab = function(opt){
        new MyTab(this, opt);
        return this;
    };

    function MyTab(el){
        this.init(el);
        this.bindingEvent();
    };
    
    MyTab.prototype.init = function(el){
        this.$tab_box = el;
        this.$tab_btn = this.$tab_box.children("dt");
        this.$tab = this.$tab_box.children("dd");
    };
    
    MyTab.prototype.bindingEvent = function(){
        this.$tab_btn.on("click focusin", function(e){
            e.preventDefault();
            var target = $(e.currentTarget).children("a").attr("href");

            this.$tab_btn.removeClass("on");
            $(e.currentTarget).addClass("on");
    
            this.$tab.hide();
            $(target).show();
            
        }.bind(this));
    };

})(jQuery);
*/
