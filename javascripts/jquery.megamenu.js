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
                              show_method: "slideDown",
                              hide_method: "simple",
                              justify: "right",
                              enable_js_shadow: true
                          }, options);
  var $megamenu_object = this;
  $megamenu_object.find("li").each(function(){
    jQuery(this).addClass("mm-item");
    jQuery(".mm-item").css({ 'float': options.justify });
    
    jQuery(this).find("div:first").addClass("mm-item-content");
    jQuery(this).find("a:first").addClass("mm-item-link");
    var $mm_item_content = jQuery(this).find(".mm-item-content");
    var $mm_item_link = jQuery(this).find(".mm-item-link");
    $mm_item_content.hide();
    
//    Activation Method Starts
    jQuery(this).bind(options.activate_action, function(e){
      e.stopPropagation();
      var mm_item_link_obj = jQuery(this).find("a.mm-item-link");
      mm_item_link_obj.addClass("mm-item-link-hover");
      var mm_item_content_obj = jQuery(this).find("div.mm-item-content");

        mm_item_content_obj.css({
          'top': ($mm_item_link.offset().top + $mm_item_link.outerHeight()) - 1 +"px",
          'left': ($mm_item_link.offset().left) - 5 + 'px'
        })

      if(options.justify == "left"){
        var mm_object_right_end = $megamenu_object.offset().left + $megamenu_object.outerWidth();
                                  // Coordinates of the right end of the megamenu object
        var mm_content_right_end = $mm_item_link.offset().left + $mm_item_content.outerWidth();
                                  // Coordinates of the right end of the megamenu content
        if( mm_content_right_end >= mm_object_right_end ) { // Menu content exceeding the outer box
          mm_item_content_obj.css({
            'left': ($mm_item_link.offset().left - (mm_content_right_end - mm_object_right_end)) - 2 + 'px'
          }); // Limit megamenu inside the outer box
        }
      } else if( options.justify == "right" ) {
        var mm_object_left_end = $megamenu_object.offset().left;
                                  // Coordinates of the left end of the megamenu object
        var mm_content_left_end = $mm_item_link.offset().left - mm_item_content_obj.outerWidth() + 
                                  $mm_item_link.outerWidth() + 5;
                                  // Coordinates of the left end of the megamenu content
        if( mm_content_left_end <= mm_object_left_end ) { // Menu content exceeding the outer box
          mm_item_content_obj.css({
            'left': mm_object_left_end + 2 + 'px'
          }); // Limit megamenu inside the outer box
        } else {
          mm_item_content_obj.css({
            'left': mm_content_left_end + 'px'
          }); // Limit megamenu inside the outer box
        }
      }
      switch(options.show_method) {
        case "simple":
              mm_item_content_obj.show();
              break;
        case "slideDown":
              mm_item_content_obj.slideDown('fast');
              break;
        case "fadeIn":
              mm_item_content_obj.fadeIn('fast');
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
              mm_item_content_obj.slideUp( 'fast',  function() {
                mm_item_link_obj.removeClass("mm-item-link-hover");
              });
              break;
        case "fadeOut":
              mm_item_content_obj.fadeOut( 'fast', function() {
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
