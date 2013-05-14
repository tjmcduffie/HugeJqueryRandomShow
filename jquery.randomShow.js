/**
 * Plugin that randomly selects a child and fades in between the currently
 * visible and the new selection
 *
 * @author Karl Stanton
 * @since 0.1
 *
 * Pass in a container. i.e.: $('#container').randomShow({interval: 1000});
 *
 * <div id="container"><div class="child"></div><div class="child"></div></div>
 *
 *
 */
 
(function ($) {

    $.fn.randomShow = function (options) {

        // Setup some defaults.
        var defaults = {
        	interval: 5000
        };

        // Extend our default options with those provided.
        var opts = $.extend(defaults, options);

        return this.each(function () {
			
			var oSelf		= $(this);
			var oCurrent	= oSelf.find(':first').addClass('visible');
			var iRandom		= 0, oNext;
			
			// Our cycle loop
			var oTimeout	= setInterval(function () {
			
				oCurrent	= $('.visible', oSelf);
				iCurrent	= oCurrent.index();
				
				// Don't pick the same one twice!
				while (iCurrent == iRandom) {
					iRandom		= Math.floor(Math.random() * (oCurrent.parent().children().length - 1));
				}
				
				oNext		= oCurrent.parent().children(':eq(' + iRandom + ')');
				
				if (oNext.length === 0) {
					oNext		= oCurrent.parent().find(':first');
				}
			
				// Fade out the last and fade in the new
				oCurrent.fadeOut();
				oNext.fadeIn(function () {
					oCurrent.removeClass('visible');
					oNext.addClass('visible');
				});

			
			}, opts.interval);
			
			return this;
	
		});
		
	};
	
})(jQuery);