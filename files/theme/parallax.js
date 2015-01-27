/**
 * Parallax Scrolling Tutorial
 * For Smashing Magazine
 * July 2011
 *
 * Author: Richard Shepherd
 *         www.richardshepherd.com
 *         @richardshepherd
 */

// On your marks, get set...
$(document).ready(function(){

	// Cache the Window object
	$window = $(window);

	// Background-attachment property is buggy on mobile WEB views, disable parallax if so.
	var isTouch = 'ontouchstart' in document.documentElement;
	if (isTouch){
		jQuery('.top-background').css('background-attachment', 'scroll');
	}


	// Cache the Y offset and the speed of each sprite
	$('[data-type]').each(function() {
		$(this).data('offsetY', parseInt($(this).attr('data-offsetY')));
		$(this).data('Xposition', $(this).attr('data-Xposition'));
		$(this).data('speed', $(this).attr('data-speed'));
	});

	// For each element that has a data-type attribute
	$('div[data-type="background"]').each(function(){


		// Store some variables based on where we are
		var $self = $(this),
			offsetCoords = $self.offset(),
			topOffset = offsetCoords.top;

		var originalBgPosition = $self.css('background-position').split(' ');
		var xPos = originalBgPosition[0];
		var yPos1 = originalBgPosition[1];

		yPosUnits = yPos1.replace(/\d/g, '');
		yPos1 = parseInt(yPos1, 10);

		// When the window is scrolled...
		$window.scroll(function() {

			// If this section is in view
			if ( ($window.scrollTop() + $window.height()) > (topOffset) &&
				( (topOffset + $self.height()) > $window.scrollTop() ) ) {

				// Scroll the background at var speed
				// the yPos is a negative value because we're scrolling it UP!
				var yPos = ($window.scrollTop() / $self.data('speed'));

				yPos = yPosUnits === '%' ? yPos1 + yPos : yPos1 - yPos;

				// If this element has a Y offset then add it on
				if ($self.data('offsetY')) {
					yPos += $self.data('offsetY');
				}

				// Put together our final background position
				var coords = xPos + ' '+ yPos + yPosUnits;

				// Move the background

				// manipulate style tag because jquery can't set !important
				$self.attr('style', function(i, val) {
					var style = 'background-position: ' + coords + ' !important;';

					if (val && val.match(/background-position/i)) {
						return val.replace(/background-position:\s*[^;]*(;|$)/i, style);
					} else {
						return style;
					}
				});

				//$self.css({ backgroundPosition: coords + ' !important;' });

				// Check for other sprites in this section
				$('[data-type="sprite"]', $self).each(function() {

					// Cache the sprite
					var $sprite = $(this);

					// Use the same calculation to work out how far to scroll the sprite
					var yPos = -($window.scrollTop() / $sprite.data('speed'));
					var coords = $sprite.data('Xposition') + ' ' + (yPos + $sprite.data('offsetY')) + 'px';

					$sprite.css({ backgroundPosition: coords });

				}); // sprites

				// Check for any Videos that need scrolling
				$('[data-type="video"]', $self).each(function() {

					// Cache the video
					var $video = $(this);

					// There's some repetition going on here, so
					// feel free to tidy this section up.
					var yPos = -($window.scrollTop() / $video.data('speed'));
					var coords = (yPos + $video.data('offsetY')) + 'px';

					$video.css({ top: coords });

				}); // video

			}; // in view

		}); // window scroll

	});	// each data-type

}); // document ready