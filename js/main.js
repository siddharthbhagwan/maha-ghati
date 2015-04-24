$(document).ready(function() {

  var last_played = undefined;
  var total_songs = $('.list-element').length;
  var current_song = $('.list-element').first().attr('id');


  $('.list-element').click(function(){
    last_played = current_song;
    current_song = $(this).attr('id')
    var embed_html = '<iframe id="player_' + current_song + '" width="700" height="400" src="http://www.youtube.com/embed/' + current_song + '?enablejsapi=1&autoplay=1&autohide=1&showinfo=0" frameborder="0" allowfullscreen></iframe>';
    $('.video-container').html(embed_html);
    new YT.Player('player_'+current_song, {
      events: {
        'onStateChange': onPlayerStateChange
      }
    });
  });


  $('.next').click(function(){
  ($('.shuffle').attr('data-shuffle') == 'true')?
      ($('.list-element:eq(' + ((Math.floor(Math.random()*parseInt(total_songs)))-1) + ')').click()):
        $('#'+current_song).next().length?
          $('#'+current_song).next().click():
            $('.list-element').first().click();
  });


  $('.previous').click(function(){
    ($('.shuffle').attr('data-shuffle') == 'true')?
      ($('.list-element:eq(' + ((Math.floor(Math.random()*parseInt(total_songs)))-1) + ')').click()):
        $('#'+current_song).prev().length? 
          $('#'+current_song).prev().click():
            $('.list-element').last().click(); 
  });


  $('.player_nav').hover(function(){
    $(this).css('color','gray');
  }, function(){
    $(this).css('color','black');
  });


  $('.list-element').hover(function(){
    $(this).css('cursor','pointer');
    $(this).stop().animate({ fontSize : '15px' });
  }, function(){
    $(this).css('cursor','auto');
    $(this).stop().animate({ fontSize : '14px' });
  });


  $('.shuffle').click(function(e, from){
    if(from == null){
      if($(this).attr('data-shuffle') == 'false'){
        $(this).addClass('ripple');
        $(this).attr('data-shuffle','true');
        $(this).css('color','white');
        $(this).addClass('shuffle_on');
        $(this).addClass('fa-4x');
        shuffle_start = setInterval(function () {
          $('.shuffle').trigger('click', ['Trigger'])
          }, 700);
      } else {
        $(this).removeClass('ripple');
        $(this).attr('data-shuffle','false');
        $(this).css('color','black');
        $(this).removeClass('shuffle_on');
        $(this).removeClass('fa-4x');
        clearInterval(shuffle_start);
      } 
    }
  });


  function onPlayerStateChange(event) {
    switch(event.data) {
      case YT.PlayerState.ENDED:
        $('.shuffle').data('shuffle')?
          ($('.list-element:eq(' + ((Math.floor(Math.random()*parseInt(total_songs)))-1) + ')').click()):
            $('#'+last_played).next().length? 
              $('#'+last_played).next().click():
                $('.list-element').first().click();
      break;
      case YT.PlayerState.PLAYING:
      // console.log('Video is playing.');
      break;
      case YT.PlayerState.PAUSED:
      // console.log('Video is paused.');
      break;
      case YT.PlayerState.BUFFERING:
      // console.log('Video is buffering.');
      break;
      case YT.PlayerState.CUED:
      // console.log('Video is cued.');
      break;
    }
  }
});

var start = function(){
  $('.list-element').first().click();
};

// Ripple

(function (window, $) {
  
  $(function() {
    
    
    $('.ripple').on('click', function (event) {
      event.preventDefault();
      
      var $div = $('<div/>'),
          btnOffset = $(this).offset(),
          xPos = event.pageX - btnOffset.left,
          yPos = event.pageY - btnOffset.top;
      

      
      $div.addClass('ripple-effect');
      var $ripple = $(".ripple-effect");
      
      $ripple.css("height", $(this).height());
      $ripple.css("width", $(this).height());
      $div
        .css({
          top: yPos - ($ripple.height()/2),
          left: xPos - ($ripple.width()/2),
          background: $(this).data("ripple-color")
        }) 
        .appendTo($(this));

      window.setTimeout(function(){
        $div.remove();
      }, 2000);
    });
    
  });
  
})(window, jQuery);

$(document).ready(function() {
  start();
});
