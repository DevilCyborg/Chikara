//FreshWidget.init("", {"queryString": "&widgetType=popup&attachFile=no&searchArea=no", "widgetType": "popup", "buttonType": "text", "buttonText": "Support", "buttonColor": "black", "buttonBg": "#66ccff", "alignment": "2", "offset": "300px", "formHeight": "500px", "url": "https://chikarapro.freshdesk.com"} );
(function($){
	if ($('body').hasClass('page-events') || $('body').hasClass('node-type-match') || $('body').hasClass('node-type-event')) {
		$('.event-menu-dd-base').addClass('active');
		var season = $('.breadcrumb a.season-breadcrumb').data('season');
		$('.event-menu-season-' + season).addClass('active');
	}
	if ($('body').hasClass('page-blog')) {
		$('.blog-menu-dd-base').addClass('active');
	}
	if ($('body').hasClass('page-wrestler') || $('body').hasClass('node-type-wrestler')) {
		$('.roster-menu-dd-base').addClass('active');
	}
	$(document).ready(function(){
		if (!$('#block-chikaratopia-chikaratopia-now-available').length == 0) {
			//console.log('found owl carousel');
			//var owl = $('#owl-carousel-subscription-vids');
			$('.owl-carousel').each(function(){
				$(this).owlCarousel({
				  margin:10,
				  navigation: false,
				  //lazyLoad : true,
				  //navigationText : false,
				  stagePadding: 5,
				  
				  itemsCustom: [
				  	[0, 3],
				  	[450, 4],
				  	[768, 5],
				  	[996, 6]
				  ]
				});
			});
		}
		/*
		$('.owl-item a').each(function(){
			ittip = $(this).find('img:first');
			ittip.attr('title', $(this).attr('title'));
			ittip.attr('data-html', 'true');
			$(this).removeClass('ttip');
		});
		*/
		if ($('.view-upcoming-matches-in-event').length > 0) {
			var numUpcoming = $('.view-upcoming-matches-in-event .views-row').length;
			console.log('numUpcoming: ' + numUpcoming);
			if (numUpcoming % 2) {
				$('.view-upcoming-matches-in-event .views-row:last-child').addClass('col-md-offset-3');
			}
		}
		if (!$('.user-account-info').length == 0) {
			$('.user-account-info a').addClass('btn btn-info');
		}
		if (!$('#now_playing_button').length == 0) {
			get_current_channel_vid();
			setInterval(function() {				
				get_current_channel_vid();
			}, 30000);
		}
		if ($('.view-season-events .view-content').length > 0) {
			//console.log('viewing-season');
			/*
			var chikaratopia_events;
			$.get('/chikaratopia-now-available', function(data){
				$.each(data.events, function(i, v) {
					var videoicon = '<span class="fa-stack fa-lg"><i class="fa fa-square fa-stack-2x"></i><i class="fa fa-play-circle-o fa-stack-1x fa-inverse"></i></span>';
					var watchtitle = 'Watch ' + v.subscription_data.subscription_title + ' with your CHIKARAtopia Subscription';
					var link = '<a class="subscriber-video-listing-link ttip" href="' + v.subscription_data.url + '" title="' + watchtitle + '">' + videoicon + '</a>';
					//console.log('event_nid: ' + v.event_nid);
					$("a[rel='" + v.event_nid + "']").closest('.views-row').prepend(link).addClass('available-to-subscribers');
					$('.ttip').tooltip();
				});
			});
			*/
			//console.log(chikaratopia_events);
		}
	});

	if ($('body').hasClass('page-blog-archives')) {
		console.log('on blog archive');
		$('nav a.blog-menu-link').addClass('active active-trail');
		$('nav a.blog-menu-link').closest('li.leaf').addClass('active active-trail');
	}
	function get_current_channel_vid() {
		$.get('/now-playing-channel/chikaralivestream', function(data){
			//console.log(data);
			$('#now_playing_button').empty();
			$('#up_next_button').empty();
			if (data.type == 'event') {
				$('#now_playing_button').prepend('<a href="' + data.url + '" class="btn btn-success">Now Playing: ' + data.title + '</a>');
			} else {
				if (data.title != 'null' && data.title !== null) {
					$('#now_playing_button').prepend('<span class="btn btn-success">Now Playing: ' + data.title + '</span>');
				}
			} 
			if (data.next_up.type == 'event') {
				$('#up_next_button').prepend('<a href="' + data.next_up.url + '" class="btn btn-info">Up Next: ' + data.next_up.title + '</a>');
			} else {
				if (data.next_up.title !== null && data.next_up.title.length > 0) {
					$('#up_next_button').prepend('<span class="btn btn-info">Up Next: ' + data.next_up.title + '</span>');
				}
			}
		});
	}
	//$('.field-name-field-front-page-hero-image img').addClass('img-rounded');
	//$('.commerce-product-field-field-ticket-type').closest('.container-24').removeClass('container-24').removeClass('grid-8').removeClass('prefix-1').addClass('col-xs-7 ticket-cart-form');
	$('.node-type-roster-member a[href="/roster"]').parent('li').addClass('active');
	$('.node-type-season a.events-main-menu-link, .node-type-event a.events-main-menu-link').parent('li').addClass('active');
	$('.view-full-event-add-to-cart .btn').each(function(){
		if (!$(this).hasClass('streamlink-btn') && !$(this).hasClass('download-btn')) {
			$(this).removeClass('btn-sm').removeClass('btn-default');
		}
	});
	$('.event-btns .view-full-event-add-to-cart .btn-group').addClass('btn-group-justified');
	$('.view-season-events .views-row, .view-active-roster .views-row, .view-king-of-trios-events-sale .views-row, .view-physical-media-store .views-row').responsiveEqualHeightGrid();
	$('.view-upcoming-season-events .views-row').responsiveEqualHeightGrid();
	$('.region-fpblockrow .block p').responsiveEqualHeightGrid();
	$('#block-mailchimp-signup-subscribe .form-submit').removeClass('btn-default')
		.addClass('btn-md btn-danger pull-right');

	
	$('#block-menu-menu-social-connection a.facebook').empty().append('<span class="fa-stack fa-4x"><span class="fa fa-square fa-stack-2x"></span><span class="fa fa-facebook fa-stack-1x fa-inverse"></span></span>');
	$('#block-menu-menu-social-connection a.twitter').empty().append('<span class="fa-stack fa-4x"><span class="fa fa-square fa-stack-2x fa-inverse"></span><span class="fa fa-twitter fa-stack-1x"></span></span>');
	$('#block-menu-menu-social-connection a.youtube').empty().append('<span class="fa-stack fa-4x"><span class="fa fa-square fa-stack-2x"></span><span class="fa fa-youtube fa-stack-1x fa-inverse"></span></span>');
	$('#block-menu-menu-social-connection ul.menu.nav').removeClass('menu').removeClass('nav').addClass('list-inline');
	$(document).on('click', '#block-menu-menu-social-connection ul li a', function(e){
		e.preventDefault();
		window.open($(this).attr('href'));
	});
	$(document).on('click', '.node-gift-certificate-display .commerce-add-to-cart button', function(e){
		e.preventDefault();
		var recipientEmail = $('.form-item-line-item-fields-commerce-gc-mail-und-0-email input[name="line_item_fields[commerce_gc_mail][und][0][email]"').val();
		var emailReg = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
		if (emailReg.test(recipientEmail)) {
			$('.node-gift-certificate-display .commerce-add-to-cart button').closest('form').submit();
		} else {
			alert('Please provide a valid recipient email address.');
		}
	});
	$(document).ready(function(){
		$('.ttip').tooltip({ container: 'body' });
		pushFooter();
		fixSoldOut();
	});
	$(window).resize(function(){
		pushFooter();
		fixSoldOut();
	});
	$(function(){
		$('#fp-hero-carousel').carousel();
	});
	$('.carousel-control').click(function(e){
		e.preventDefault();
	    e.stopPropagation();
	    var goTo = $(this).data('slide');
	    if(goTo=="prev") {
	        $('#fp-hero-carousel').carousel('prev'); 
	    } else {
	        $('#fp-hero-carousel').carousel('next'); 
	    }
	});
	function pushFooter() {
		var footerH = $('#page-footer').outerHeight();
		//console.log(footerH);
		$('#wrap').css('margin-bottom', '-' + footerH + 'px');
		$('#wrap').css('padding-bottom', footerH + 'px');
	}
	function fixSoldOut() {
		if ($('.page-node.node-type-event .sold_out_overlay').length != 0) {
			var artworkWidth = $('.event-sidebar-poster').width();
			var artworkHeight = $('.event-sidebar-poster').height();
			var overlayWidth = $('img.sold_out_overlay').width();
			var overlayHeight = $('.sold_out_overlay').height();
			var top = (artworkHeight-overlayHeight)/2;
			var left = (artworkWidth-overlayWidth)/2;
			if (top > 0) {
				$('.sold_out_overlay').css('top', top);
			} else {
				$('.sold_out_overlay').css('top', 0);
			}
			if (left > 0) {
				$('.sold_out_overlay').css('left', left);
			} else {
				$('.sold_out_overlay').css('left', 0);
			}
		}
	}
	$(document).on('DOMNodeInserted', function(e) {
		if ($('.recurly-form-wrapper form.recurly.subscribe div.field.email input.form-text').length) {
			$('.recurly-form-wrapper form.recurly.subscribe div.field.email input.form-text').prop('readonly', 'true').addClass('disabled');
		}
	});
	Drupal.behaviors.correct_ampersand = {
    	attach: function(context, settings) {
      		/** Change &amp; back to & in select options **/
      		$('form.commerce-add-to-cart select option').each(function() {
        		var text = $(this).text();
        		if (text.indexOf('&amp;') >= 0) {
        	 	 	text = text.replace("&amp;", "&");          
        		}
        		if (text.indexOf('&#039;') >= 0) {
        			text = text.replace('&#039;', "'");
        		}
        		$(this).text(text);     
      		});
    	}
  	}
})(jQuery);