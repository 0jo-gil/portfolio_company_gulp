(function($){
    $.fn.myDrag = function(opt){
        new MyDrag(this, opt);
        return this;
    }

    function MyDrag(el){
        this.init(el);
        this.bindingEvent();
    };

    MyDrag.prototype.init = function(el){
        this.$slide = el;
        this.$slide_inner = this.$slide.find(".news_slider_inner");
        this.$slide_item = this.$slide_inner.find(".news_slider_item");
        this.$slide_cursor = this.$slide_inner.find(".news_slider_cursor");
        this.isDown = false;
        this.slide_count = 0;
        this.dragSize = 100;
        this.dragX;
    };
    
    MyDrag.prototype.bindingEvent = function(){
        this.$slide_inner.css({transform: "translateX(0)"});

        this.$slide_inner.on("mouseenter", function(e){
            if($(".news_slider_cursor").length < 1){
            $(e.currentTarget).parent(this.$slide)
                .append(
                    $("<div class='news_slider_cursor'>")
                        .fadeIn(200)
                        .append(
                            $("<span>").text("CLICK"),
                            $("<span>").text("DRAG")
                        )
                )
            };
        }.bind(this));

        this.$slide.on("mousedown", function(e){
            this.isDown = true;
            e.preventDefault();
            this.dragX = e.pageX;
            $(e.currentTarget).addClass("on");
            $(".news_slider_cursor").addClass("on");
        }.bind(this));

        this.$slide.on("mouseleave", function(e){
            this.isDown = false;
            $(e.currentTarget).removeClass("on");
            $(".news_slider_cursor").fadeOut(100, function(){
                $(this).remove();
            });
        }.bind(this));

        this.$slide.on("mouseup", function(e){
            this.isDown = false;
            $(e.currentTarget).removeClass("on");
            $(".news_slider_cursor").removeClass("on");
        }.bind(this));

        this.$slide.on("mousemove", function(e){
            let items_wid = this.$slide_item.outerWidth();
            let wid = this.$slide_inner.outerWidth();
            let cursorY = e.pageY - this.$slide.offset().top;
            let cursorX = e.pageX - this.$slide.offset().left;
            startX = e.pageX;
        
            $(".news_slider_cursor").css({
                top: cursorY,
                left: cursorX
            });
        
            if(!this.isDown) return;
        
            let posX = this.$slide_inner.css("transform").split(",")[4];

            $(e.currentTarget).addClass("on");
        
            if(this.dragX + this.dragSize < startX){
                if(posX < 0){
                    this.dragX = e.pageX;
                    ++this.slide_count;
                    
                    if(this.slide_count >=0){
                        this.slide_count = 0;
                    }
                    
                    this.$slide_inner.css({
                        transform: "translateX("+this.slide_count * items_wid+"px)"
                    });
                };
            };
        
            if(this.dragX - this.dragSize > startX){
                if(posX >= -wid + (items_wid * 2)){
                    this.dragX = e.pageX;
                    --this.slide_count;
                    console.log(this.slide_count);
                    if(this.slide_count <=-4){
                        this.slide_count = -4;
                    }
                    this.$slide_inner.css({
                        transform: "translateX("+this.slide_count * items_wid+"px)"
                    });
                };
            };
        }.bind(this));
    };

})(jQuery);















