
//////////////////////////////////////////////////////////////////////////////////
$(document).ready(function(){
	//IE
	isIE = /*@cc_on!@*/false || !!document.documentMode;
	if (isIE) {
		$( 'header, footer, main, aside' ).each(function(){
			$(this).replaceWith( '<div class="ie-' + $(this).prop("tagName").toLowerCase() + '">' + $( this ).html() + "</div>" );
		})
		$('.ie-main').addClass('clearfix')
	}


	//header
	//header - searchbox
	$('#headertools button[name=search]').click(function(){
		$('input.topbarSearch').focus();
	})
	$('input.topbarSearch').focus(function(){
		$('#headertools button[name=search]').hide();
		$('#headertools button[name=close]').show();
		$('#topbar .title').hide()
	});
	$('input.topbarSearch').focusout(function(){
		$('#headertools button[name=search]').show();
		$('#headertools button[name=close]').hide();
		setTimeout(function(){
			$('#topbar .title').fadeIn()
		},500);
	});
	// slider
	if ($('.slider').length) {
		sliderBuild();
		sliderRoll(1);
	}
	//order
	changeOrder()
	//pop menue
	$('.popmenu').not('.popmenu.active').click(function(){
		$('.popmenu').removeClass('active');
		$(this).addClass('active');
	})
	$(document).on('click', function (e) {
		if ($('.popmenu.active').length && $(e.target).closest('.popmenu.active').length === 0) {
			$('.popmenu').removeClass('active');
		}
	});
	// hash links
	if (window.location.hash.length) {
		setTimeout(function () {
			aHash(window.location.hash)
		}, 1000);
	}else {
		setTimeout(function () {
			aHash()
		}, 1000);
	}
	$("a[href^=#]").click(function( e ) {
		e.preventDefault();
		aHash($(this).attr('href'))
	})
	function aHash(hash) {
		if (hash) {
			hash = hash
		}else{
			hash = $('.director a[href^=#]').attr('href')
		}
		if (hash && hash.length> 1) {
			console.log(hash);
			$("a[href^=#]").removeClass('active');
			$('a[href=' + hash + ']').addClass('active');
			window.location.hash = hash;
			$('main > *.active').removeClass('active');
			var hash = $(hash).get(0)
			$(hash).addClass('active');
		}
	}
	//click Effect
	$('.cfx').click(function(e){
		var elm = $(this);
		var width = ($(this).width() * 1.5)
		var xPos = Math.floor(e.pageX - elm.offset().left);
		var yPos = Math.floor(e.pageY - elm.offset().top);
		pob =  ~~(Math.random() * 10000)
		$(this).append('<div id="bubble' + pob + '" class="bubbleWrap"></div>');
		$('#bubble' + pob).append('<div class="bubble"></div>');
		$('#bubble' + pob + ' .bubble').css({
			'left': xPos - (width / 2),
			'top': yPos - (width / 2),
			'width': width,
			'height': width,
			'-webkit-transform' : 'scale(0)',
			'-moz-transform'    : 'scale(0)',
			'-ms-transform'     : 'scale(0)',
			'-o-transform'      : 'scale(0)',
			'transform'         : 'scale(0)'
		})
		setTimeout(function () {
			$('#bubble' + pob + ' .bubble').addClass('active')
		}, 100);
		setTimeout(function(){
			// $('#bubble' + pob).remove()
		},1000)


	});
	// box scroll fix
	$('.scrlfix').bind('mousewheel DOMMouseScroll', function(e) {
		var scrollTo = null;
		if (e.type == 'mousewheel') {
			scrollTo = (e.originalEvent.wheelDelta * -.1);
		}
		else if (e.type == 'DOMMouseScroll') {
			scrollTo = .1 * e.originalEvent.detail;
		}
		if (scrollTo) {
			e.preventDefault();
			$(this).scrollTop(scrollTo + $(this).scrollTop());
		}
	});
	//Moble Mode
	if (window.innerWidth < 721) {mobileModeStart()};
	if (window.innerWidth > 720) {mobileModeEnd()};
	$(document).on('click', '#showmenu', function() {
		$("#menu , #hidemenu").addClass("active");
		$(this).removeClass("active");
		$("#menu").offset({left: 0});
		$("nav, #headertools").addClass("menu");
		$('#topbar').append('<div id="dimmer"></div>');
		$('html').css({'overflow':'hidden'});
		$('body').append('<div id="menucover"></div>');
		setTimeout(function () {
			$('#dimmer').addClass('active');
			$('#menucover').addClass('active');

		}, 500);
	})
	$(document).on('click', '#dimmer ', function() {
		$("#menu").removeClass("active");
		$("#menu").offset({left: -250});
		$("nav, #headertools").removeClass("menu");
		$('html').css({'overflow':'auto'});
		$("#showmenu").addClass("active");
		$('#hidemenu').removeClass("active");
		$(this).remove();
		$('#menucover').remove();

	});
	$(document).on('click', '#hidemenu ', function() {
		$("#dimmer").click();
	});
	// bazaar page
	$('#ads .ad section').click(function(e){
		if (e.target.nodeName != 'BUTTON') {
			var target = $(this).closest('section').children('a').attr('href')
			window.location.href = target
		}
	});
	// bazaar page - filter bar
	$('#filterbar button[name=list]').click(function(){
		$('#filterbar button[name=grid]').removeClass('active');
		$(this).addClass('active');
		$('#ads .ad').removeClass('l-third').removeClass('m-half');
		$('#ads .ad').addClass('l-full').addClass('m-full');
	})
	$('#filterbar button[name=grid]').click(function(){
		$('#filterbar button[name=list]').removeClass('active');
		$(this).addClass('active');
		$('#ads .ad').addClass('l-third').addClass('m-half');
		$('#ads .ad').removeClass('l-full').removeClass('m-full');
	})
	$('#filterbar button[name=filters]').click(function(){
		$(this).toggleClass('active');
		$('#filters').toggleClass('active');
	})
	$('#filterbar button[name=sort]').click(function(){
		$(this).toggleClass('active');
		$('#sort').toggleClass('active');
	})
	$('#sort, #filters').children('button[name=close]').click(function(){
		var name = $(this).closest('section').attr('id');
		$('#filterbar button[name=' + name + ']').click();
	})
	//ad page
	$('#adGalleryList .thumbnail').click(function(){
		$('#adGalleryList .thumbnail').removeClass('active');
		$(this).addClass('active');
		var src = $(this).attr('imgsrc')
		$('#adGallerySelected').css({'background':'url(' + src + ')'})
	})
	// bookmark button
	$('button[name=bookmark]').click(function(){
		alert('Bookmark Test')
	})
	//forms
	$('input[name=resetpassword]').click(function(){
		$('#password-reset').show()
		$(this).hide()
	})
	// image selectors
	$(document).on('change', 'input[type=file]', function() {
		if (this.files && this.files[0]) {
			var target = '.' + $(this).attr('t')
			var reader = new FileReader();
			reader.onload = function (e) {
				$(target).css({'background': 'url(' + e.target.result + ')'}).show();
			};
			reader.readAsDataURL(this.files[0]);
		}
	})
	//image add
	imgNum = $('.box.pics div').length + 1;
	$('input[name=addPicture]').click(function(){
		if (imgNum < 5) {
			var fieldset =  $(this).closest('fieldset').get(0)
			var box = $(fieldset).children('.box')
			$(fieldset).append('<input type="file" name="adp-' + imgNum + '" accept="image/*" t="adp-' + imgNum + '" >')
			$(box).removeClass('hidden').append('<div style="display:none;" class="adp-' + imgNum + '"><i >&#xE872;</i></div>')
			$('input[name=adp-' + imgNum + ']').click();
			imgNum = imgNum + 1;
		}else{
			alert('شما حداکثر مجاز به انتخاب چهار تصویر برای هر آگهی هستید!')
		}
	})
	// image remove
	$(document).on('click', '.box > div ', function() {
		$(this).remove()
		$('input[name=' + $(this).attr('class') + ']').remove();
		imgNum = imgNum - 1;
		$('input[name=addPicture]').prop('disabled', false);
		//
		var input = $('body input[name^=adp]');
		for (var i = 0; i < input.length; i++) {
			var element = input[i]
			$(element).attr('name', 'adp-' + (i+1)).attr('t' , 'adp-' + (i+1))
		}
		var image = $('body .box.pics div');
		for (var i = 0; i < image.length; i++) {
			var element = image[i]
			$(element).attr('class' , 'adp-' + (i+1))
		}


	});





});
//////////////////////////////////////////////////////////////////////////////////
$(window).resize(function(){
	if (window.innerWidth < 721) {mobileModeStart()};
	if (window.innerWidth > 720) {mobileModeEnd()};
	if ($('.slider').length) {
		sliderResize()
	}
	changeOrder()


});
//////////////////////////////////////////////////////////////////////////////////
menu = false

//Moble mode
function mobileModeStart() {
	if (menu !== true && $('body.msg').length < 1) {
		mobileMenuBuild();
		listHorizontaller()
		filterbarMobile()
	}
}
function mobileModeEnd() {
	if (menu) {
		mobileMenuremover();
		listVerticaller()
		filterbarNormal()
	}
}
function mobileMenuBuild() {
	$('#headertools').wrap( '<div class="clearfix" id="menu"></div>' );
	$('nav, #footersitemap, #footersocials').appendTo('#menu');
	$('body').append('<button id="showmenu" title="منو" type="button" class="icon cfx active" name="menu">&#xE5D2;</button>');
	$('body').append('<button id="hidemenu" title="بستن" type="button" class="icon cfx" name="menu">&#xE5CD;</button>');

	menu = true;
}
function mobileMenuremover() {
	$('nav, #headertools').unwrap();
	$('#showmenu, #hidemenu').remove();
	if (isIE) {
		$('#footersitemap, #footersocials').appendTo('.ie-footer');
	}else {
		$('#footersitemap, #footersocials').appendTo('footer');
	}
	menu = false;
}
function listHorizontaller() {
	$('#popularbazaar ul, #newbazaar ul').wrap( '<div  class="wrap"></div>' );
	$( "#popularbazaar .wrap, #newbazaar .wrap" ).each(function(){
		$(this).scrollLeft($(this).children('ul').width())
	})
	$( "#popularbazaar ul, #newbazaar ul" ).each(function(){
		$(this).width($(this).children('li').length * 155);
	})
}
function listVerticaller() {
	$( "#popularbazaar ul, #newbazaar ul" ).unwrap()
	$( "#popularbazaar ul, #newbazaar ul" ).each(function(){
		$(this).css({'width':'auto'});
	})
}
function filterbarMobile() {
	$('#filterbar button[name=grid]').removeClass('active');
	$('#filterbar button[name=list]').addClass('active');
	$('#ads .ad').removeClass('l-third').removeClass('m-half');
	$('#ads .ad').addClass('l-full').addClass('m-full');
}
function filterbarNormal() {
	$('#filterbar button[name=list]').removeClass('active');
	$('#filterbar button[name=grid]').addClass('active');
	$('#ads .ad').addClass('l-third').addClass('m-half');
	$('#ads .ad').removeClass('l-full').removeClass('m-full');
}
// slider
function sliderBuild() {
	numOfSlides = $('.slides .slide').length
	$('.slider').append('<ul class="handle"></ul>')
	for (var i = 1; i < numOfSlides + 1; i++) {
		$('.slider .handle').append('<li class="sl' + i + '"></li>')
	}
	$('.slider').append('<div class="slh handle-next">Next</div><div class="slh handle-prev">Prev</div>')
	$('.sl1').addClass('active');
	$('.handle').css({
		'top': ($('.slide').height() / 2)  - ($('.handle').height() / 2)
	})
}
function sliderResize() {
	setTimeout(function () {


		$('.handle').css({
			'top': ($('.slide').height() / 2)  - ($('.handle').height() / 2)
		})
		var num = parseInt($('.handle li.active').attr('class').split("sl")[1])
		if (num === numOfSlides) {
			num = 1
		}
		clearTimeout(timer);
		$('.slider .handle li').removeClass('active');
		$('.slider .sl' + num).addClass('active');
		sliderRoll(num)
	}, 700);
}
function sliderRoll(num) {
	var move =  (num - 1) * $('.slide')[0].getBoundingClientRect().height
	$('.slides').animate({scrollTop : move},'1000')

	$('.slider .handle li').removeClass('next').html('');
	$('.slider .handle li').removeClass('prev').html('');
	$('.slider .handle li.sl' + (num + 1)).addClass('next').html('&#xE409;');
	$('.slider .handle li.sl' + (num - 1)).addClass('prev').html('&#xE314;');
	timer = setTimeout(function(){
		if (num === numOfSlides) {
			num = 0
			$('.slider .handle li.sl' + (num + 1)).addClass('next').html('&#xE314;');
		}
		$('.slider .sl' + (num + 1)).click()
	},10000);
	num + 1
}
$(document).on('click', '.slider .handle li', function() {
	clearTimeout(timer);
	ThisSlide = parseInt($(this).attr('class').split("sl")[1])
	$('.slider .handle li').removeClass('active');
	$(this).addClass('active');
	sliderRoll(ThisSlide)
})
//scroll to element
function scrollToElement(element ,gap) {
	if (menu) {
		gap = gap + 48
	}
	var distance = $(element).offset().top - $("html, body").scrollTop() - gap
	$("html, body").animate({
		scrollTop :  distance
	},'500');

}
//change order
function changeOrder() {
	$('body .order').each(function(){
		var cl = $(this).attr('class')
		if (window.innerWidth > 961) {
			var order = cl[cl.search("o-l-") + 4];
			$(this).clone().insertAfter($('body> *:nth-child(' + order + ')'))
			$(this).remove()
		}
		if (window.innerWidth > 720 && window.innerWidth < 960) {
			var order = cl[cl.search("o-m-") + 4];
			$(this).clone().insertAfter($('body> *:nth-child(' + order + ')'))
			$(this).remove()
		}
		if (window.innerWidth < 721) {
			var order = cl[cl.search("o-s-") + 4];
			$(this).clone().insertAfter($('body> *:nth-child(' + order + ')'))
			$(this).remove()
		}

	})
}
//form Validator
$('form.validator label *').on('change blur', function(e) {
	formValidator(e);
})
function formValidator(e) {
	var input = e.currentTarget;
	var form = e.currentTarget.form;
	var massage = '<span class="errorMessage">پاسخ به این گزینه اجباری است.</span>'
	//
	for (var i = 0; i < form.length; i++) {
		var value = form[i].value;
		var required = $(form[i]).prop('required');
		var checked = form[i].checked;
		var type = form[i].type;
		if (required) {
			if (['text','email','phone','number','password', 'textarea'].indexOf(type) > -1) {
				if (value === '') {
					$(form[i]).attr('validate', false)
				}else {
					$(form[i]).attr('validate', true)
				}
			}
			if (['select'].indexOf(type) > -1) {
				if (value === '' || value === '---' || value === 'لطفا انتخاب فرمایید') {
					$(form[i]).attr('validate', false)
				}else {
					$(form[i]).attr('validate', true)
				}
			}
			if (['checkbox'].indexOf(type) > -1) {
				if (!checked) {
					$(form[i]).attr('validate', false)
				}else {
					$(form[i]).attr('validate', true)
				}
			}
		}
	}
	//
	if ($(input).attr('validate') === 'false') {
		$(input).closest('label').addClass('error');
		if ($(input).closest('label').children('.errorMessage').length < 1) {
			$(input).closest('label').append(massage)
		}
	}
	if ($(input).attr('validate') === 'true') {
		$(input).closest('label').removeClass('error');
		$(input).closest('label').children('.errorMessage').remove()
	}
	var errors = 0
	for (var i = 0; i < form.length; i++) {
		if ($(form[i]).attr('validate') === 'false') {
			errors =+ 1
		}
	}
	if (errors === 0) {
		$(form).find('input[type=submit]').prop('disabled', false);
	}else {
		$(form).find('input[type=submit]').prop('disabled', true);
	}
}
// currency field
$('input.currency').click(function(){
	$(this).val('')
});

$('input.currency').change(function(){
	var val = $(this).val().match(/\d+/)[0].replace(/\B(?=(\d{3})+(?!\d))/g, "٫");
	$(this).val(val + ' ریال')
})
//Stats
function stats() {
	maxH = "";
	$('#stats ul li .visit').each(function(){
		$(this).parent().append('<div class="bar"></div>');
		if (parseInt($(this).text()) > maxH) {
			maxH = parseInt($(this).text())
		}
	})
	$('#stats ul li .visit').each(function(){
		h = ((parseInt($(this).text()) / maxH)*100)  + '%'
		$(this).parent().children('.bar').height(h);
	})
	$('#stats ul li .bar').each(function(){
		$(this).height($(this).height() - 60);
		if (	$(this).height() < 1) {
			$(this).height(2)
		}
	})
}
stats();
