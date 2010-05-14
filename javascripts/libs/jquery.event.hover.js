;(function(jQuery){
jQuery.fn._hover = jQuery.fn.hover;
jQuery.fn.hover = function( fn1, fn2, fn3 ) {
  if ( fn3 ) this.bind('hoverstart', fn1 );
  if ( fn2 ) this.bind('hoverend', fn3 ? fn3 : fn2 );
  return !fn1 ? this.trigger('hover') : this.bind('hover', fn3 ? fn2 : fn1 );
};
var hover = jQuery.event.special.hover = {
  delay: 100,
  speed: 100,
  setup: function( data ){
    data = jQuery.extend({ speed: hover.speed, delay: hover.delay, hovered:0 }, data||{} );
    jQuery.event.add( this, "mouseenter mouseleave", hoverHandler, data );
  },
  teardown: function(){
    jQuery.event.remove( this, "mouseenter mouseleave", hoverHandler );
  }
};
function hoverHandler( event ){
  var data = event.data || event;
  switch ( event.type ){
    case 'mouseenter':
      data.dist2 = 0; 
      data.event = event;
      event.type = "hoverstart";
      if ( jQuery.event.handle.call( this, event ) !== false ){
        data.elem = this;
        jQuery.event.add( this, "mousemove", hoverHandler, data );
        data.timer = setTimeout( compare, data.delay );
        }
      break;
    case 'mousemove':
      data.dist2 += Math.pow( event.pageX-data.event.pageX, 2 ) 
        + Math.pow( event.pageY-data.event.pageY, 2 ); 
      data.event = event;
      break;
    case 'mouseleave':
      clearTimeout( data.timer );
      if ( data.hovered ){ 
        event.type = "hoverend";
        jQuery.event.handle.call( this, event );
        data.hovered--;
        }
      else jQuery.event.remove( data.elem, "mousemove", hoverHandler );
      break;
    default:
      if ( data.dist2 <= Math.pow( data.speed*( data.delay/1e3 ), 2 ) ){
        jQuery.event.remove( data.elem, "mousemove", hoverHandler );
        data.event.type = "hover";
        if ( jQuery.event.handle.call( data.elem, data.event ) !== false )
          data.hovered++;
        }
      else data.timer = setTimeout( compare, data.delay );
      data.dist2 = 0;
      break;
    }
  function compare(){ hoverHandler( data ); };
  };
})(jQuery);
