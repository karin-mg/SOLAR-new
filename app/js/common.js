
 $(document).ready(function() {
    $('[data-fancybox="gallery"]').fancybox({
      // Options will go here
    });

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
  });

/*модальное окно*/
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
