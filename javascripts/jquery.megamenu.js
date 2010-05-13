/*
  jQuery MegaMenu Plugin
  Author: GeekTantra
  Author URI: http://www.geektantra.com
*/
jQuery.fn.megamenu = function(options) {
  options = jQuery.extend({
                              width: "auto",
                              justify: "left",
                              activate_action: "hover",
                              deactivate_action: "mouseleave",
                              show_method: "simple",
                              hide_method: "simple",
                              justify: "left",
                              enable_js_shadow: true
                          }, options);
  this.find("li").each(function(){
    jQuery(this).addClass("mm-item");
    jQuery(".mm-item").css({ 'float': options.justify });
    
    jQuery(this).find("div:first").addClass("mm-item-content");
    var mm_item_content = {
      'element': jQuery(this).find(".mm-item-content"),
      'width': jQuery(this).find(".mm-item-content").outerWidth(),
      'height': jQuery(this).find(".mm-item-content").outerHeight(),
      'left': jQuery(this).find(".mm-item-content").position().left,
      'top': jQuery(this).find(".mm-item-content").position().top,
    }
    jQuery(this).find(".mm-item-content").hide();
    
    jQuery(this).find("a:first").addClass("mm-item-link");
//    if( (jQuery('body').outerWidth() - mm_item_content.left) < mm_item_content.width ) {
//      mm_item_content.element.position().right = 
//    }
    
    
//    Activation Method Starts
    jQuery(this).bind(options.activate_action, function(e){
      e.stopPropagation();
      var mm_item_link_obj = jQuery(this).find("a.mm-item-link");
      mm_item_link_obj.addClass("mm-item-link-hover");
      var mm_item_content_obj = jQuery(this).find("div.mm-item-content");
      switch(options.show_method) {
        case "simple":
              mm_item_content_obj.show();
              break;
        case "slideDown":
              mm_item_content_obj.slideDown();
              break;
        case "fadeIn":
              mm_item_content_obj.fadeIn();
              break;
        default:
              mm_item_content_obj.each( options.show_method );
              break;
      }
    });
//    Activation Method Ends
//    Deactivation Method Starts
    jQuery(this).bind(options.deactivate_action, function(e){
      e.stopPropagation();
      var mm_item_link_obj = jQuery(this).find("a.mm-item-link");
      var mm_item_content_obj = jQuery(this).find("div.mm-item-content");
      switch(options.hide_method) {
        case "simple":
              mm_item_content_obj.hide();
              mm_item_link_obj.removeClass("mm-item-link-hover");
              break;
        case "slideUp":
              mm_item_content_obj.slideUp( function() {
                mm_item_link_obj.removeClass("mm-item-link-hover");
              });
              break;
        case "fadeOut":
              mm_item_content_obj.fadeOut( function() {
                mm_item_link_obj.removeClass("mm-item-link-hover");
              });
              break;
        default:
              mm_item_content_obj.each( options.hide_method );
              mm_item_link_obj.removeClass("mm-item-link-hover");
              break;
      }
    });
//    Deactivation Method Ends
  });
  this.find("li:last").after('<li class="clear-fix"></li>');
};
