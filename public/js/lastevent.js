$(function() {
	if ($('#dashboard').length) {
		updateLastEvent();
		setInterval('updateLastEvent()', 1000);
	}
});

function updateLastEvent()
{
	$.get('track/stats', function (response) {
		$('.eventbutton-feed').find('.badge').html(response.feed.time);
		$('.eventbutton-pump').find('.badge').html(response.pump.time);
		$('.eventbutton-diaper').find('.badge').html(response.diaper.time);

		if (response.sleep.type == 'start') {
			if ($('.sleep-items').hasClass('hide')) {
				$('.sleep-items').removeClass('hide');
			}
		} else {
			if (!$('.sleep-items').hasClass('hide')) {
				$('.sleep-items').addClass('hide');
			}
		}
	});
}