$(document).ready(function() {
    
  $('.review-carousel').slick({
    // setting-name: setting-value
    arrows: false,
    asNavFor: '.people-carousel'
  });
  $('.people-carousel').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: '.review-carousel',
    // dots: true,
    arrows: true,
    centerMode: true,
    focusOnSelect: true,
    infinite: false,
    rows: false
  });


  var wrap = $('#wrapper'),
       btn = $('.open-modal-btn'),
       modal = $('.cover, .modal, .content');
    
  btn.on('click', function() {
    modal.fadeIn();
  });
  
  $('.close, .cover').click(function (e) {
      e.preventDefault();
      $('.modal').fadeOut(500);
      modal.fadeOut(500);
  });
 
  
  $('.menu-btn').on('click', function(){
      $(this).toggleClass('is-open');
      $(this).siblings('.nav').slideToggle();
  });


  $('[data-fancybox="gallery"]').fancybox({
    // Options will go here
  });

});