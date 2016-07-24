module.exports = function($) {

	let $carousel = $('.cms-carousel'),
		 $slides = $carousel.find('.cms-slide'),
		 $current = $slides.eq(0),
		 $next = $current.next();

	$next.addClass('next');

	$carousel.on('transitionend', (event)=>{
		let $slide = $(event.target);
		if ( $slide.hasClass('move-out') ) {

			$slide.removeClass('move-out current');

		} else if ( $slide.hasClass('move-in')) {

			$slide.removeClass('move-in next')
				.addClass('current');

			$current = $slide;
			$next = $slide.next().length ? $slide.next() : $slides.eq(0);
			$next.addClass('next');

			window.setTimeout(changeSlide, 5000);
		}
	});

	function changeSlide() {
		$current.addClass('move-out');
		$next.addClass('move-in');
	}

	window.setTimeout(changeSlide, 5000);

}