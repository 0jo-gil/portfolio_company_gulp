(function($){

   $.defaults = {
      btn: "dt",
      boxes: "dd",
      active: "on",
      speed: 500
   }

   $.fn.myToggle = function(opt){
      opt = $.extend({}, $.defaults, opt);

      new Toggle(this, opt);
      return this;
   };
   function Toggle(selector, opt){
      this.init(selector, opt);
      this.bindingEvent();
   };
   
   Toggle.prototype.init = function(selector, opt){
      this.$frame = selector; 
      this.$btns = this.$frame.find("dt"); 
      this.$boxes = this.$frame.find("dd"); 
      this.active = opt.active;
      this.speed = opt.speed;

   };
   
   Toggle.prototype.bindingEvent = function(){   
      $("body").on("click", ".faq_menu dt",function(e){
         e.preventDefault(); 
      
         this.activation(e.currentTarget);
      }.bind(this));
   };
   
   Toggle.prototype.activation = function(self){
      var isOn = $(self).hasClass(this.active); 
       
      this.$frame.find("dt").removeClass(this.active);
      this.$frame.find("dd").slideUp(this.speed); 
   
      if(isOn){
         // this.$frame.find("dt").removeClass(this.active); 
         this.$frame.find("dd").slideUp(this.speed); 
         return;
      }
      $(self).addClass(this.active); 
      $(self).next().slideDown(this.speed); 
   };
   
   
   
})(jQuery);


