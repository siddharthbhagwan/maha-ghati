$(document).ready(function() {

  var last_played = $('.list-element').first().attr('id');
  var total_songs = $('.list-element').length;
  var current_song = $('.list-element').first().attr('id');

  $('.list-element').click(function(){
    var vidId = $(this).attr('id');
    last_played = vidId;
    var embed_html = '<iframe id="player_'+vidId+'" width="700" height="400" src="http://www.youtube.com/embed/' + vidId + '?enablejsapi=1&autoplay=1&autohide=1&showinfo=0" frameborder="0" allowfullscreen></iframe>';
    $('.video-container').html(embed_html);
    new YT.Player('player_'+vidId, {
      events: {
        'onStateChange': onPlayerStateChange
      }
    });
  });

  $('.next').click(function(){
    $('.shuffle').data('shuffle')? ($('.list-element:eq(' + ((Math.floor(Math.random()*parseInt(total_songs)))-1) + ')').click()):
      $('#'+last_played).next().length? 
        $('#'+last_played).next().click() : $('.list-element').first().click(); 
  });

  $('.previous').click(function(){
    $('#'+last_played).prev().length? $('#'+last_played).prev().click() : $('.list-element').last().click(); 
  });

  // $('.player_nav').hover(function(){
  //   $(this).css('color','gray');
  // }, function(){
  //   $(this).css('color','black');
  // });

  $('.list-element').hover(function(){
    $(this).css('cursor','pointer');
    $(this).stop().animate({ fontSize : '15px' });
  }, function(){
    $(this).css('cursor','auto');
    $(this).stop().animate({ fontSize : '14px' });
  });

  $('.shuffle').click(function(){
    if($(this).attr('data-shuffle') == 'false'){
      console.log('cahnge to true');
      $(this).attr('data-shuffle','true');
      $(this).css('color','red');
    } else {
      $(this).attr('data-shuffle','false');
      $(this).css('color','black');
    }
  });

  function onPlayerStateChange(event) {
    switch(event.data) {
      case YT.PlayerState.ENDED:
        $('#'+last_played).next().click();
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

  (function(){$('.list-element').first().click();}())
});
