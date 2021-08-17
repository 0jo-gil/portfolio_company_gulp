(function($){
    $.defaults = {
        //key : 
        type: "interest",
        count : 10
    };
    
    $.fn.MyYoutube = function(option){
        
        var result_opt = $.extend({}, $.defaults, option);

        if(result_opt.key == undefined || result_opt.playList == undefined){
            console.error("key와 playList는 필수 입력사항입니다.");
        }

        new Youtube(this, result_opt);
        return this;
    };

    function Youtube(el, option){
        this.init(el, option);
        this.bindingEvent(option);
    };
    
    Youtube.prototype.init = function(el, opt){
        this.frame = el;
        this.key = opt.key;
        this.playList = opt.playList;
        this.count = opt.count;
        this.text = opt.text;
        this.type = opt.type;
    };

    Youtube.prototype.bindingEvent= function(opt){
        this.callData({
            type: opt.type
        });
    
        $("body").on("click", "article a.videoPic", function(e){
            e.preventDefault();
            var vidId = $(e.currentTarget).attr("href");
            this.createPop(vidId);
        }.bind(this));
    
        $("body").on("click", ".pop .close", function(e){
            e.preventDefault();
            this.removePop();
        }.bind(this));
    };

    Youtube.prototype.callData= function(opt){
        $.ajax({
            url: "https://www.googleapis.com/youtube/v3/playlistItems",
            dataType: "jsonp",
            async: false,
            data: {
                part: "snippet",
                key: this.key,
                playlistId: this.playList,
                maxResults: this.count
            }

            
        })
        .success(function(data){
            var items = data.items;  
            this.createList(items, opt);
        }.bind(this))
        .error(function(err){
            console.error(err);
        })
    };

    Youtube.prototype.createList= function(items, opt){
        if(opt.type == "playlist"){
            $(".videoTit")
                .append(
                    $("<ul>")
                        .append(
                            $("<div class='wrap'>")
                        ),
                    $("<strong class='thisNum'>").text("1 "),
                    $("<span class='totalNum'>")
                )
        };

        if(opt.type == "arc"){
            $(".arcTxt")
                .append(
                    $("<p>"),
                    $("<span>")
                )
        };

        $(items).each(function(index, data){  
            var tit = data.snippet.title;
            var txt = data.snippet.description;          
            var date = data.snippet.publishedAt.split("T")[0];
            var imgSrc = data.snippet.thumbnails.high.url;
            var vidId = data.snippet.resourceId.videoId;
            index = index + 1;

            date = date.replace( /-/gi, '.');
            if(txt.length>150) {
                txt= txt.substr(0,150)+"...";
            }   
            if(opt.type == "playlist"){
                this.frame
                    .append(
                        $("<article>")
                            .append(
                                $("<a class='videoPic'>")
                                    .attr({ href: vidId })
                                    .css({ backgroundImage: "url("+imgSrc+")" }),
                                    
                                $("<div class='videoTit'>")
                                    .append(
                                        $("<h2>").text(tit),
                                        $("<span>").text(date)
                                    )
                                    
                            )      
                    )
            };   

            if(opt.type == "art"){
                this.frame
                    .append(
                        $("<article>")
                            .append(
                                $("<a class='videoPic'>")
                                    .attr({ href: vidId })
                                    .append(
                                        $("<div class='pic'>")
                                            .append(
                                            $("<img>")
                                                .css({ backgroundImage: "url("+imgSrc+")" })
                                            ),
                                        $("<div class='con'>")
                                            .append(
                                                $("<h2>").text(tit),
                                                $("<p>").text(txt),
                                                $("<span>").text(date)
                                            )
                                    )
                                
                            )      
                    )
            }
        }.bind(this))

        var article_wid = $(".gallery_list").children(".wrap").children("article").outerWidth(true);
        var window_wid = $(window).outerWidth();

        $(".gallery_list").children(".wrap").css({width: article_wid * 10 + 60});
        if(window_wid < 540){
            $(".gallery_list").children(".wrap").css({width: "calc(100% * 10)"});
        }

        $(window).resize(function(){
            
            var window_wid = $(window).outerWidth();
            if(window_wid < 540){
                $(".gallery_list").children(".wrap").css({width: "calc(100% * 10)"});
            }
        });
        
    };

    Youtube.prototype.createPop = function(vidId){
        $("body")
            .append(
                $("<aside class='pop'>")
                    .css({
                        width: "100%",
                        height: "100%",
                        position: "fixed",
                        top: 0,
                        left: 0,
                        backgroundColor: "rgba(0,0,0,0.7)",
                        display: "none",
                        boxSizing: "border-box",
                        padding: 100, 
                        zIndex: 15
                    })
                    .append(
                        $("<img src='../img/loading.gif'>")
                            .css({
                                width: 400,
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)"
                            })
                    )
                    .append(
                        $("<div class='con'>")
                            .css({
                                width: "100%",
                                height: "100%",
                                position: "relative",
                                display: "none"
                            })
                            .append(
                                $("<iframe>")
                                    .attr({
                                        src: "https://www.youtube.com/embed/"+vidId,
                                        width: "100%",
                                        height: "100%",
                                        frameborder: 0,
                                        allowfullscreen: true
                                    })
                            )
                    )
                    .append(
                        $("<a href='#' class='close'>")
                            .text("close")
                            .css({
                                position: "absolute",
                                top: 20,
                                right: 20,
                                color: "#fff"
                            })
                    ).fadeIn(500)
            );
    
            setTimeout(function(){
                $(".pop .con").fadeIn(500, function(){
                    $(".pop > img").remove();
                });
            }, 2000);
    }
    Youtube.prototype.removePop = function(){
        $(".pop").fadeOut(500, function(){
            $(this).remove();
        });
    }
})(jQuery);
