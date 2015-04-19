$(document).ready(function() {

  var last_played;

  $('.list-element').click(function(){
    var vidId = $(this).attr('id');
    last_played = vidId;
    embed_html = '<iframe id="player_'+vidId+'" width="700" height="400" src="http://www.youtube.com/embed/' + vidId + '?enablejsapi=1&autoplay=1&autohide=1&showinfo=0" frameborder="0" allowfullscreen></iframe>';
    console.log(embed_html);
    $('.player').html(embed_html);

    new YT.Player('player_'+vidId, {
      events: {
        'onStateChange': onPlayerStateChange
      }
    });
  });

  function onPlayerStateChange(event) {
    switch(event.data) {
      case YT.PlayerState.ENDED:
        $('#'+last_played).next().click();
      break;
      case YT.PlayerState.PLAYING:
      console.log('Video is playing.');
      break;
      case YT.PlayerState.PAUSED:
      console.log('Video is paused.');
      break;
      case YT.PlayerState.BUFFERING:
      console.log('Video is buffering.');
      break;
      case YT.PlayerState.CUED:
      console.log('Video is cued.');
      break;
    }
  }
});