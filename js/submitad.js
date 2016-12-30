var backgroundColor = 'white';
var backgroundImage = 'img/pattern-02.svg';
var backgroundPosition = 'left bottom';
var backgroundSize = 'contain';
var backgroundRepeat ='no-repeat';
var height = 50;
var linkURL = 'createad.html';
var textColor = '#4d3931';
var textSize = 14;
var textWeight = 400;
var linkColor = '#009146';
var linkSize = 14;
var linkWeight = 500;
var numberOfAds = 135; //Auto Generating
var numberOfVisits = 1553; //Auto Generating
var text =  'تا کنون ' + numberOfAds + ' آگهی در باربن ثبت شده است <br> که ' + numberOfVisits + ' بازدید داشته‌اند.' ;
var linkText = 'شما هم آگهی فروش محصول خشکبار خود را به رایگان ثبت کنید.';

$(document).ready(function(){
  $('.externalComponent.submitad').css({
    'background-color': backgroundColor,
    'background-image': 'url(' + backgroundImage + ')',
    'background-repeat': backgroundRepeat,
    'background-size': backgroundSize,
    'background-position' : backgroundPosition,
    'min-height' : height + 'px',
    'text-align': 'center',
    'position': 'relative',
    'padding' : '50px 5px'
  }).addClass('styled').html('<p>' + text + '</p>' + '<br>' + '<a href="' + linkURL + '" title="ثبت آگهی" >' +  linkText + '</a>')
  $('.externalComponent.submitad p').css({
    'color': textColor,
    'font-size': textSize + 'px',
    'font-weight' : textWeight,
    'line-height': textSize + 5 + 'px',
    'display': 'block'
  })
  $('.externalComponent.submitad a').css({
    'color': linkColor,
    'font-size': linkSize + 'px',
    'font-weight': linkWeight,
    'line-height': textSize + 5 + 'px',
    'display': 'block'
  })
})
