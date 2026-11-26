jQuery(document).ready(function($){


	jQuery.fn.exists = function(){
		return this.length>0;
	}

	if(navigator.userAgent.indexOf('MSIE') > -1) { var $browser = 'is_explorer'; }
	if(!!navigator.userAgent.match(/Trident.*rv[ :]*11\./)){ var $browser = 'is_explorer'; }
	if(navigator.userAgent.indexOf('Firefox') > -1) { var $browser = 'is_firefox'; }
	if(navigator.userAgent.indexOf("Safari") > -1) { var $browser = 'is_safari'; }
	if(navigator.userAgent.indexOf("Presto") > -1) { var $browser = 'is_Opera'; }
	if(navigator.userAgent.indexOf('Chrome') > -1) { var $browser = 'is_chrome'; }

	$('html').addClass($browser);

	function $_GET(param) {
		var vars = {};
		window.location.href.replace( location.hash, '' ).replace(
			/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
			function( m, key, value ) { // callback
				vars[key] = value !== undefined ? value : '';
			}
		);

		if ( param ) {
			return vars[param] ? vars[param] : '';
		}
		return vars;
	}

	function isValidEmailAddress(emailAddress) {
		var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
		return pattern.test(emailAddress);
	};


	/*------------------------------------------------------------------------------
		Search form
	------------------------------------------------------------------------------*/


	if($('#header_form #header_form_submit').exists()) {

		$('#header_form #header_form_submit').click(function(e){

			e.preventDefault();
			var $input = $('#header_form #header_form_input');

			if($input.hasClass('show')) {

				console.log('has class show');
				var $value_length = $input.val().length;

				if($value_length == 0) {
					console.log('value is 0');
					$input.removeClass('show');
				} else {
					console.log('value isnt 0');
					$('#header_form').submit();
				}

			} else {
				console.log('not class show');
				$input.addClass('show').focus();
			}

		});

		/*
		$('#menu_header #menu_search_form #search-submit').click(function(e) {

			e.preventDefault();
			var $value_length = $('#menu_header #menu_search_form #s').val().length;

			if($value_length == 0) {
				$('#menu_header #menu_search_form').hide();
				$('#menu_header #menu_search i').show();
			} else {
				$('#menu_header #menu_search_form form').submit();
			}

		});
		*/

	}

	$('#top_banner label').click(function() {

		if($(window).width() < 767) {

			var input = $(this).next('input, .category');
			if(input.is(":visible")) {
				input.hide();
				$('.daterangepicker').hide();
			} else {
				input.show();
			}

		}		

	});


	$(document).on('click', '.daterangepicker .applyBtn', function() {
		console.log('click');
		if($(window).width() < 767) {
			$('.daterangepicker').hide();
			$('#top_banner #search_by_date').hide();
		}
	});


/*------------------------------------------------------------------------------
		Tabs
	------------------------------------------------------------------------------*/

	if($('.tabs').exists()) {

		$('.tabs_header .tab').click(function() {

			var $parent = $(this).parents('.tabs');

			$parent.find('.tabs_header .tab').removeClass('active');
			$(this).addClass('active');

			var $tab = $(this).attr('data-tab');

			$parent.find('.tabs_content .tab_content').removeClass('tab_active');
			$('.tabs_content .tab_content#'+$tab).addClass('tab_active');

			same_height();

		});


	}

	if($('.faq .faq_cat .faq_title').exists()) {

		$('.faq .faq_cat .faq_title').click(function() {
			
			var $value = $(this).attr('data-tab');		
			$('.faq .faq_cat .faq_content'+$value).slideToggle();

			if($(this).hasClass('active')) {
				$(this).removeClass('active');
			} else {
				$(this).addClass('active');
			}

		});
	}

	/*
	if($('.accordion_title').exists()) {

		$('.accordion_title').click(function(event) {
			
			event.preventDefault();
			//var $value = $(this).attr('href');		
			//$('.accordion_content'+$value).slideToggle();
			$('.accordion_content').slideToggle();

			if($(this).hasClass('active')) {
				$(this).removeClass('active');
			} else {
				$(this).addClass('active');
			}

		});
	}

	/*------------------------------------------------------------------------------
		Gallery
	------------------------------------------------------------------------------*/

	if($('.filtering_system_gallery .collage').exists()) {

		$('.filtering_system_gallery .collage').photobox('a',{ time:0 });

	}

	if($('.filtering_system_gallery').exists()) {

		$('.filtering_system_gallery .filter').click(function() {

			$('.filtering_system_gallery .filter').addClass('btn_dark_blue');
			$(this).removeClass('btn_dark_blue');
			var $filter = $(this).attr('data-filter');

			if($filter == '*') {
				$('.collage_item').show();
			} else {
				$('.collage_item').hide();
				$($filter).show();
			}

		});


	}



	/*------------------------------------------------------------------------------
		Accordion
	------------------------------------------------------------------------------*/

	if($('.accordion').exists()) {

		$('.accordion_title').click(function() {
			var $parent = $(this).parent('.accordion_item');
			var $content = $(this).next('.accordion_content');

			if($(this).hasClass('display')) {
				$(this).removeClass('display');

			} else {
				$(this).addClass('display');
			}

			$content.slideToggle();

		});

	}

	/*------------------------------------------------------------------------------
		Festival programme
	------------------------------------------------------------------------------*/
	/*
	if($('#programme').exists()) {

		$('#programme .row').each(function() {

			$height = $(this).find('.m_col_lg_5').outerHeight();
			$(this).find('.m_col_lg_7').outerHeight($height);


		});

	}
	*/

	/*------------------------------------------------------------------------------
		Same height for items
	------------------------------------------------------------------------------*/

	function same_height() {

		//$('#archive_listing.same_height').each(function(index, value) {
		$('.same_height').each(function(index, value) {

			$(this).find('.same_height_item').css('min-height', 0);
			$(this).find('.ajust_line_height').css('line-height', 0);

			var $best_height = 0;

			$(this).find('.same_height_item').each(function(index, value) {

				if($(this).outerHeight() > $best_height) {

					$best_height = $(this).outerHeight();

				}

			});

			// use min-height set manually if higher
			//$min_height = $('#archive_listing').data('min-height');
			//console.log($min_height, $best_height);
			//if ($min_height > $best_height) $best_height = $min_height;

			$(this).find('.same_height_item').css('min-height', parseInt($best_height)+1);

		});

		ajust_line_height();
	}


	function same_height_btn() {
		var $best_height = 0;
		$('.btn.same_height_item').each(function(index, value) {
			if($(this).outerHeight() > $best_height) {
				$best_height = $(this).outerHeight();
			}
		});

		$('.btn.same_height_item').css('min-height', parseInt($best_height)+1);
		$('.btn.same_height_item').css('line-height', parseInt($best_height)-20+'px');

	}


	if($('.same_height').exists()) {

		$(window).load(same_height);
		$('.same_height_img').load(same_height);
		$(window).resize(same_height);

	}

	if($('.btn.same_height_item').exists()) {
		same_height_btn();
	}

	function ajust_line_height() {

		$('.ajust_line_height').each(function(index, value) {

			var $height = $(this).css('min-height');
			$(this).css('line-height', $height);

		});

	}

	if($('.ajust_line_height').exists()) {

		$(window).load(ajust_line_height);
		$('.same_height_img').load(ajust_line_height);
		$(window).resize(ajust_line_height);

	}


/*------------------------------------------------------------------------------
		Form style
	------------------------------------------------------------------------------*/

	if($('form').exists()) {

		$('select').select2({
			templateResult: function (data) {
			console.log(data);
				// We only really care if there is an element to pull classes from
				if (!data.element) {
					return data.text;
				}

				var $element = $(data.element);
				var $wrapper = $('<span></span>');
				$wrapper.addClass($element[0].className);
				$wrapper.text(data.text);
				return $wrapper;
			}
		});

		var today = new Date(); 
		var dd = today.getDate(); 
		var mm = today.getMonth()+1; //January is 0! 
		var yyyy = today.getFullYear(); 
		if(dd<10){ dd='0'+dd } 
		if(mm<10){ mm='0'+mm } 
		today = '"'+dd+'/'+mm+'/'+yyyy+'"';

		$('.datepicker').daterangepicker({
			presetRanges: [],
			// autoApply: true,
			singleDatePicker: true,
			// minDate: '"'+dd+'/'+mm+'/'+yyyy+'"',
			minDate: today,
			datepickerOptions: {
				
				maxDate: null,
				numberOfMonths : 1
			},
			autoFitCalendars: false,
			dateFormat: 'dd-mm-yy',
			altFormat: 'dd-mm-yy',
			locale: {
				format: 'DD/MM/Y',
				cancelLabel: 'Clear'
			}
		});


		$('.datepickerrange').daterangepicker({
			presetRanges: [],
			datepickerOptions: {
				minDate: 0,
				maxDate: null,
				numberOfMonths : 0
			},
			autoFitCalendars: false,
			dateFormat: 'dd-mm-yy',
			altFormat: 'dd-mm-yy',
			locale: {
				format: 'DD/MM/Y',
				cancelLabel: 'Clear'
			}
		});


		let searchParams = new URLSearchParams(window.location.search)
		if(searchParams.has('search_by_date')) {
			$('#search_by_date.datepicker').val(searchParams.get('search_by_date'));

		} else {
			$('.datepicker').val('');
		}

		$('.datepickerrange').attr('Placeholder', 'Select date range');

		var checkboxs = $('input[type=checkbox]');
		checkboxs.each(function(){

			$(this).wrap('<div class="customCheckbox"></div>');
			$(this).before('<span></span>');

			if($(this).is(':checked')){
				$(this).parent().addClass('customCheckboxChecked');
			} else {
				$(this).parent().removeClass('customCheckboxChecked');
			}
		});

		checkboxs.change(function(){

			if($(this).is(':checked')){
				$(this).parent().addClass('customCheckboxChecked');
			} else {
				$(this).parent().removeClass('customCheckboxChecked');
			}
		});
	}


	$('.bookassist_date').on('apply.daterangepicker', function(ev, picker) {

		var form = $(this).parents('form');
		form.find('.date_in').val(picker.startDate.format('YYYY-MM-DD'));
		form.find('.date_out').val(picker.endDate.format('YYYY-MM-DD'));

	});

	$('#bookassist_form #county_hotel_select').change(function() {

		var form = $(this).parents('form');
		var action = form.find('#action');

		if($(this).val() == 'All') {
			action.val('result');
		} else {
			action.val('c_1');
		}


	});




	/*------------------------------------------------------------------------------
		Carousel
	------------------------------------------------------------------------------*/

	function display_gig_dates_prices() {

		$('#form_results .display_gig_dates_prices .slider').owlCarousel({
			nav: true,
			dots: false,
			slideSpeed: 6000,
			autoplay: false,
			paginationSpeed: 400,
			margin: 0,
			loop: true,
			navText: ['<i class="fa fa-angle-left"></i>' , '<i class="fa fa-angle-right"></i>'],
			responsive: {
				   0: { items: 1 },
				 768: {	items: 1 },
				1024: {	items: 1 }
			}
		});
	}

	if($('.slider').exists()) {

		$('.sleep_items .slider').owlCarousel({
			nav: true,
			dots: false,
			slideSpeed: 6000,
			autoplay: false,
			paginationSpeed: 400,
			margin: 0,
			loop: true,
			responsive: {
				   0: { items: 1 },
				 768: {	items: 1 },
				1024: {	items: 1 }
			}
		});

		$('.dates_slider').owlCarousel({
			nav: true,
			dots: false,
			slideSpeed: 6000,
			autoplay: false,
			paginationSpeed: 400,
			margin: 0,
			loop: true,
			navText: ['<i class="fa fa-angle-left"></i>' , '<i class="fa fa-angle-right"></i>'],
			responsive: {
				   0: { items: 1 },
				 768: {	items: 1 },
				1024: {	items: 1 }
			}
		});

		$('#page_single_gig .display_gig_dates_prices .slider').owlCarousel({
			nav: true,
			dots: false,
			slideSpeed: 6000,
			autoplay: false,
			paginationSpeed: 400,
			margin: 40,
			loop: true,
			navText: ['<i class="fa fa-angle-left"></i>' , '<i class="fa fa-angle-right"></i>'],
			responsive: {
				   0: { items: 1 },
				 768: {	items: 2 },
				1024: {	items: 3 }
			}
		});

		$('.gallery').owlCarousel({
			nav: true,
			dots: false,
			slideSpeed: 2000,
			autoplay: true,
			paginationSpeed: 400,
			margin: 20,
			loop: true,
			navText: ['<i class="fa fa-angle-left"></i>' , '<i class="fa fa-angle-right"></i>'],
			responsive: {
				   0: { items: 1 },
				 768: {	items: 3 },
				1024: {	items: 4 }
			}
		});

		display_gig_dates_prices();

	}



	/*------------------------------------------------------------------------------
		Gigs Search
	------------------------------------------------------------------------------*/

	if($('form#gigs_search').exists()) {

		function gigs_search_ajax($args) {

			// console.log($args);
			console.log('gigs_search_ajax');

			var $date_from = $args.date_from;
			var $date_to = $args.date_to;
			var $offset = $args.offset;
			var $paged = $args.paged;
			var $order = $('#order').val();
			var $orderby = $('#orderby').val();

			var $ajax_file_url = $template_url+'/ajax/gigs_search.php';
			var $error = false;
			$('#form_results #display_error').html('').hide();

			// Get checked categories
			var $cats_ids = $('#form_events input:checkbox:checked').map(function(){
				// console.log($(this).attr('name'));
				return $(this).attr('name');
			}).get();
			// console.log($cats_ids);
			// console.log($cats_ids.length);
			// console.log('1 => '+$error);

			if($cats_ids.length == 0) {
				// console.log('length is 0');
				$error = '<p class="error">Please check at least one category</p>';
			} else {
				// console.log('length is not 0');
			}

			// console.log('1 => '+$error);

			if(!$paged) {
				var $paged = $('#load_more_results a').data('paged');
			}

			if(!$offset) {
				var $offset = $('#load_more_results a').data('offset');
			}

			if($error) {

				$('#form_results #display_error').html($error).show();
				$('#form_results #display_results').html('');
				$('#form_results #load_more_results').hide();

			} else {

				if($offset > 1) {
					$('#form_results').addClass('loading loading_more');
				} else {
					$('#form_results').addClass('loading');
				}	

				$.ajax({
					type: 'GET',
					data: {
						cat_ids: $cats_ids,
						date_from: $date_from,
						date_to: $date_to,
						offset: $offset,
						paged: $paged,
						order: $order,
						orderby: $orderby,
					},
					url: $ajax_file_url,
					dataType: 'json',
					success: function($return) {
						// Show results
						if($offset > 1) {
							$('#form_results').removeClass('loading loading_more');
							$('#form_results #display_results').append($return.gigs);
                            
                            
                            $.getJSON('https://ipinfo.io/json', function(data) {
                              if (data.ip == '37.228.241.233') {
                                  jQuery($return.gigs).each(function(i,item){
                                      var lastItem = $('#form_results #display_results .form_result').last();
                                      var lastItemPrice = lastItem.find('.display_gig_dates_prices .date').eq(0);
                                      var uniqueItemId = jQuery(item).attr('id');
                                      var parsedDate = Date.parse(lastItemPrice.attr('rel'))
                                      
                                      console.log(lastItemPrice.text());
                                      console.log(lastItemPrice.attr('rel'));
                                      console.log(parsedDate);
                                      
                                      $('#form_results #display_results').append(item);
                                      display_gig_dates_prices();
                                      
                                      //setTimeout(function() {
                                          
                                          //console.log((item));
                                          //console.log((uniqueItemId));
                                          //console.log(jQuery(item));
                                          console.log(jQuery('#'+uniqueItemId).find('.owl-next'));
                                          jQuery('#'+uniqueItemId).find('.owl-next').click();
                                          console.log('clicked');
                                      //}, 1000);
                                  })
                                  

                                  setTimeout(function() {
                                        same_height();
                                  }, 200);
                                  
                              }
                            })
                            

						} else {
							$('#form_results').removeClass('loading');
							$('#form_results #display_results').html($return.gigs);
						}

						if($return.show_more) {
							$('#form_results #load_more_results a').show();
							$('#form_results #load_more_results p').hide();
						} else {
							$('#form_results #load_more_results a').hide();
							$('#form_results #load_more_results p').show();
						}
						$('#form_results #load_more_results').show();

						// console.log($return.show_more);

						// Edit categories count
						if($return.cats_count != 'empty') {
							$.each($return.cats_count, function($cat_id, $cat_count) {

								$('label[for="cat_'+$cat_id+'"] .cat_count').text($cat_count);

							});
						}
						display_gig_dates_prices();
                        
                        $.getJSON('https://ipinfo.io/json', function(data) {
                          if (data.ip == '37.228.241.233') {
                              console.log($return.gigs);
                              
                              jQuery($return.gigs).each(function(i,item){
                                  var gigRes = $(item);
                                  var gigResPrices = $(item).find('.display_gig_dates_prices');
                                  
                                  console.log(gigRes);
                                  console.log(gigResPrices);
                                  
                              })
                          }
                        });
                        

						setTimeout(function() {
							same_height();
						}, 200);
					},
					error: function(a,msg){
						console.log('error');
						console.log(a);
						console.log(msg);
					}
				});
			}

		}

		function reset_paged_offset() {

			$('#form_results #load_more_results a').attr('data-offset', 0);
			$('#form_results #load_more_results a').attr('data-paged', 1);

		}


		$('form#gigs_search input[type="checkbox"]').change(function() {

			// Check or uncheck all children
			if($(this).hasClass('cat_parent')) {
				var $parent = $(this).parents('fieldset');
				var $cat_children = $parent.find('.cat_children');

				if($(this).is(':checked')) {
					$cat_children.prop('checked', true);
					$cat_children.parent().addClass('customCheckboxChecked');
				} else {
					$cat_children.prop('checked', false);
					$cat_children.parent().removeClass('customCheckboxChecked');
				}

			}

			// Check or uncheck parent is all children are checked or if one is unchecked
			if($(this).hasClass('cat_children')) {

				var $parent = $(this).parents('fieldset');
				var $cat_parent = $parent.find('.cat_parent');
				var $cat_children_group = $parent.find('.form_children_cats input');

				if($(this).is(':checked')) {

					$all_checked = true;

					// Check if all other items in the group are checked
					$cat_children_group.each(function() {
						if($(this).is(':checked')) { } else {
							$all_checked = false;
						}
					});

					if($all_checked) {
						$cat_parent.prop('checked', true);
						$cat_parent.parent().addClass('customCheckboxChecked');
					}


				} else {

					// Uncheck parent
					$cat_parent.prop('checked', false);
					$cat_parent.parent().removeClass('customCheckboxChecked');

				}
			}

			// Check if a date is selected
			var $date_from = $('#date_from').data('datepicker_value');
			var $date_to = $('#date_to').data('datepicker_value');
			reset_paged_offset();

			var $args = {
				date_from: $date_from,
				date_to: $date_to,
			};

			gigs_search_ajax($args);

		});

		// $('form#gigs_search .datepicker').change(function() {

		$('form#gigs_search .datepicker').on('apply.daterangepicker', function(ev, picker) {

			console.log('apply.daterangepicker');

			var $id = $(this).attr('id');
			var $date_from = '';
			var $date_to = '';

			if($('#date_from').val()) {
				$date_from = $('#date_from').val();
				$('#date_from').data('datepicker_value', $date_from);
			}
			if($('#date_from').data('datepicker_value')) { $date_from = $('#date_from').data('datepicker_value'); }


			if($('#date_to').val()) {
				$date_to = $('#date_to').val();
				$('#date_to').data('datepicker_value', $date_to);
			}
			if($('#date_to').data('datepicker_value')) { $date_to = $('#date_to').data('datepicker_value'); }

			//$(this).data('datepicker_value', picker.startDate.format('DD/MM/YYYY'));

			// console.log('date_from => '+$date_from);
			// console.log('date_to => '+$date_to);
			// console.log('---------------------------------------')


			// Make sure from isn't after to & to isn't before from

			var today = new Date(); 
			var dd = today.getDate(); 
			var mm = today.getMonth()+1; //January is 0! 
			var yyyy = today.getFullYear(); 
			if(dd<10){ dd='0'+dd } 
			if(mm<10){ mm='0'+mm } 
			var today = dd+'-'+mm+'-'+yyyy; 

			today = '"'+dd+'/'+mm+'/'+yyyy+'"';
			console.log(today);

			if($date_from) {

				console.log('Date To | Date min => '+'"'+$date_from+'"');
				console.log('Date To | Date max => no');

				$('#date_to').daterangepicker({
					presetRanges: [],
					// autoApply: true,
					singleDatePicker: true,
					// minDate: '"'+dd+'/'+mm+'/'+yyyy+'"',
					minDate: '"'+$date_from+'"',
					datepickerOptions: {
						maxDate: null,
						numberOfMonths : 1
					},
					autoFitCalendars: false,
					dateFormat: 'dd-mm-yy',
					altFormat: 'dd-mm-yy',
					locale: {
						format: 'DD/MM/Y',
						cancelLabel: 'Clear'
					}
				});

				if(!$date_to) {
					$('#date_to').val('');
				}

			}

			if($date_to) {

				console.log('Date From | Date min => '+today);
				console.log('Date From | Date max => '+'"'+$date_to+'"');

				$('#date_from').daterangepicker({
					presetRanges: [],
					// autoApply: true,
					singleDatePicker: true,
					// minDate: '"'+dd+'/'+mm+'/'+yyyy+'"',
					minDate: today,
					maxDate: '"'+$date_to+'"',
					datepickerOptions: {
						numberOfMonths : 1
					},
					autoFitCalendars: false,
					dateFormat: 'dd-mm-yy',
					altFormat: 'dd-mm-yy',
					locale: {
						format: 'DD/MM/Y',
						cancelLabel: 'Clear'
					}
				});

				if(!$date_from) {
					$('#date_from').val('');
				}
			}


			reset_paged_offset();

			var $args = {
				date_from: $date_from,
				date_to: $date_to,
			};

			// gigs_search_ajax($args);

		});

		$('#form_results #load_more_results a').on('click', function(e) {

			e.preventDefault();

			var $offset = parseInt($(this).attr('data-offset'))+10;
			var $paged = parseInt($(this).attr('data-paged'))+1;

			$(this).attr('data-offset', $offset);
			$(this).attr('data-paged', $paged);

			var $args = {
				offset: $offset,
				paged: $paged,
			};

			gigs_search_ajax($args);

		});

		$('.form_filters .filters i').on('click', function(e) {

			var $order = $(this).attr('data-order');
			var $orderby = $(this).attr('data-filter');

			$('#order').val($order);
			$('#orderby').val($orderby);

			var $args = {};

			gigs_search_ajax($args);

		});



		// gigs_search_ajax();

		// });


	}

	// RELATED POSTS
	$('.main-carousel').flickity({
		autoPlay: true,
		autoPlay: 1500,
		pauseAutoPlayOnHover: true,
		cellAlign: 'left',
		contain: true,
		pageDots: false,
		lazyLoad: true,
		wrapAround: true,
		groupCells: 2
	});

	if($('.social_btn').exists()) {
		console.log('test');

		var $inc = 1;

		$('.social_btn').each(function() {

			$(this).next('br').hide();
			if($inc%2 == 0) {
				$(this).addClass('even');
			}
			$inc++;

		});


	}


	/*------------------------------------------------------------------------------
		Posts Loading
	------------------------------------------------------------------------------*/


	if($('#page_news').exists()) {

		function posts_loading($args) {

			console.log($args);

			var $ajax_file_url = $template_url+'/ajax/posts_loading.php';
			$.ajax({
				type: 'GET',
				data: {
					args: $args,
				},
				url: $ajax_file_url,
				dataType: 'json',
				success: function($return) {

					console.log($return);

					// Show results
					if($return.offset > 1) {
						// $('#page_news').removeClass('loading loading_more');
						$('#page_news #new_items').append($return.posts);

					} else {
						// $('#page_news').removeClass('loading');
						$('#page_news #new_items').html($return.posts);
					}

					if($return.show_more) {
						$('#page_news #load_more a').show();
						$('#page_news #load_more p').hide();
					} else {
						$('#page_news #load_more a').hide();
						$('#page_news #load_more p').show();
					}

					console.log($return.show_more);
					
				},
				error: function(a,msg){
					console.log('error');
					console.log(a);
					console.log(msg);
				}
			});

		}

		function reset_paged_offset() {

			$('#load_more input[name="offset"]').val(0);
			$('#load_more input[name="offset"]').val(1);

		}

		$('.blog_filters .btn').click(function(e) {

			e.preventDefault();
			$('.blog_filters .btn').addClass('btn_dark_blue');
			$(this).removeClass('btn_dark_blue');

			var $cat = $(this).attr('data-id');

			var $args = {
				cat: $cat,
			};

			reset_paged_offset();
			posts_loading($args);

		});

		$('#load_more a').click(function(e) {

			e.preventDefault();

			var $offset = parseInt($('input[name="offset"]').val())+10;
			var $paged = parseInt($('input[name="paged"]').val())+1;

			$('input[name="offset"]').val($offset);
			$('input[name="paged"]').val($paged);

			var $args = {
				offset: $offset,
				paged: $paged,
			};

			posts_loading($args);

		});

	}
		

	if($('.click_show').exists()) {

		$('.click_show').click(function() {

			var $click_show = $(this).attr('data-show');
			$('.click_show_content:visible').slideUp('fast');

			if($($click_show).is(':visible')) {
				$($click_show).slideUp();	
			} else {
				$($click_show).slideToggle();
			}
			
			// $('.click_show_content').hide();			
			
			
		});

	}

	/*------------------------------------------------------------------------------
		Gig popup
	------------------------------------------------------------------------------*/


	if($('.gig_popup').exists()) {

		$('.gig_popup .close').click(function(e) {
			e.preventDefault();
			$(this).parents('.gig_popup').fadeOut();

		});

		$(window).on('scroll', function() {

			if(!$('.gig_popup').hasClass('opened')) {
				$('.gig_popup').fadeIn().addClass('opened');
			}			
		});


	}



});
