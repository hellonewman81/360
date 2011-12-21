/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 * 
 * Requires: 1.2.2+
 */

(function($) {

var types = ['DOMMouseScroll', 'mousewheel'];

if ($.event.fixHooks) {
    for ( var i=types.length; i; ) {
        $.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
    }
}

$.event.special.mousewheel = {
    setup: function() {
        if ( this.addEventListener ) {
            for ( var i=types.length; i; ) {
                this.addEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = handler;
        }
    },
    
    teardown: function() {
        if ( this.removeEventListener ) {
            for ( var i=types.length; i; ) {
                this.removeEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = null;
        }
    }
};

$.fn.extend({
    mousewheel: function(fn) {
        return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
    },
    
    unmousewheel: function(fn) {
        return this.unbind("mousewheel", fn);
    }
});


function handler(event) {
    var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
    event = $.event.fix(orgEvent);
    event.type = "mousewheel";
    
    // Old school scrollwheel delta
    if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta/120; }
    if ( orgEvent.detail     ) { delta = -orgEvent.detail/3; }
    
    // New school multidimensional scroll (touchpads) deltas
    deltaY = delta;
    
    // Gecko
    if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
        deltaY = 0;
        deltaX = -1*delta;
    }
    
    // Webkit
    if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
    if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }
    
    // Add event and delta to the front of the arguments
    args.unshift(event, delta, deltaX, deltaY);
    
    return ($.event.dispatch || $.event.handle).apply(this, args);
}

})(jQuery);


// 360 rotat
$.fn.hnrotator = function(options) {
		var
		defaults = {
			load_class: 'ajax-loader'

		},
		settings = $.extend({}, defaults, options);

		$('#media-box').prepend('<div id="rotate-wrapper"><div id="rotate-box"></div><div id="rt-control-bar" class="cnr"><span class="instruction">Drag slider to rotate</span><div id="slider-box"><div id="slider"></div><a title="View video" class="play-reel" href="#"><span>Play</span></a></div></div></div>');
		var bg_image = $("#rotator-link").attr('href');
		var rotate_wrapper = $("#rotate-wrapper");
		var rotate_box = $("#rotate-box");
		var scroll_bar = $("#slider");
		var stop_reel = $('.stop-reel');
		var play_reel = $('.play-reel');
		var load_class = settings.load_class;

		// set the scrollbar - jquery ui
		var scrollbar = scroll_bar.slider({
			value:0,
			min: 0,
			max: 35,
			step: 1,
			animate: false,
			slide: function(event, ui) {
				position_slider(ui.value);
			}
		});


		rotate_box.css({ cursor: 'ew-resize'});
		rotate_box.addClass(load_class);
		scroll_bar.css({ cursor: 'default' });

		// load the background image
		load_bg_image(bg_image, load_class);

		// load background function
		function load_bg_image(bg_image, load_class){
			var img = new Image();
			$(img).load(function(){
				rotate_box.removeClass(load_class);
				rotate_box.css("background-image", "url("+bg_image+")");
				//play_reel = setTimeout(function(){playWheel(1)},90);
				//playWheel(1);
			}).error(function(){
				//alert('error');
			}).attr('src', bg_image);
		}

		// position background function
		function position_slider(value){
			var width = rotate_box.width();
			var height = rotate_box.height();
			var fraction = value;
			var column = (fraction+1)/6;
			var col = Math.ceil(column);
			var col_width = width*6;
			var col_pos = col - 1;
			if (col_pos < 0){ col_pos = 0; }

			var rw_wdth = col_width*col_pos;
			var left = (fraction*width) - rw_wdth;
			var top = col_pos*height;
			rotate_box.css("background-position", "-"+left+"px "+ "-"+top+"px");
		}

		function get_value(delta){
			var value = scrollbar.slider('option', 'value');
			if (delta > 0) { value -= 1; }
			else if (delta < 0) { value += 1; }
			stopWheel();

			value = Math.max(-1, Math.min(36, value));

			if(value == 36){ value = 0; }
			if(value == -1){ value = 35; }

			scrollbar.slider('option', 'value', value);
			position_slider(value);
		}
		
		// scroll bar mouse wheel
		scroll_bar.mousewheel(function(event, delta) {
			get_value(delta)
			event.preventDefault();
		});

		// image mouse wheel
		rotate_box.mousewheel(function(event, delta) {
			get_value(delta)
			event.preventDefault();
		});
	 

		function rotateReel(value){
			if(value == 36){ value = 1; }
			if(value == -1){ value = 35; }

			if(typeof value == 'undefined'){ value = 0; }
			value++;

			scrollbar.slider('option', 'value', value);
			position_slider(value);
			playWheel(value);

		}

		function playWheel(value){
			play_reel = setTimeout(function(){rotateReel(value);},95);
		}

		function stopWheel(){
			clearTimeout( play_reel );
		}
 		
	};	
	
	
;(function($){


	
// INITIATE THE 3D ROTATION IMAGE	


//$("#rotator-link").hide();

$('#rotator-link').bind('click', function(e){
	$("#media-box").addClass('loading');
	$("#rotator-link").hnrotator();	
	e.preventDefault();
});


})(jQuery);






