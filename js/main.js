var last_played, total_songs, current_song;

function setSong(){
  var embed_html;
  last_played = current_song;
  current_song = $(this).attr('id')
  embed_html = '<iframe id="player_' + current_song + '" width="700" height="400" src="http://www.youtube.com/embed/' + current_song + '?enablejsapi=1&autoplay=1&autohide=1&showinfo=0" frameborder="0" allowfullscreen></iframe>';
  $('.video-container').html(embed_html);
  new YT.Player('player_'+current_song, {
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerStateChange(event) {
  switch(event.data) {
    case YT.PlayerState.ENDED: $('.next').click();
    break;
  }
}

function highlightPlayerNavs(){
  $(this).css('color','gray');
}

function downplayPlayerNavs(){
  $(this).css('color','black');
}

function nextSong(){
  console.log('clicked');
  ($('.shuffle').attr('data-shuffle') == 'true')?
    ($('.list-element:eq(' + ((Math.floor(Math.random()*parseInt(total_songs)))-1) + ')').click()):
      $('#'+current_song).next().length?
        $('#'+current_song).next().click():
          $('.list-element').first().click();
}

function previousSong(){
  ($('.shuffle').attr('data-shuffle') == 'true')?
    ($('.list-element:eq(' + ((Math.floor(Math.random()*parseInt(total_songs)))-1) + ')').click()):
      $('#'+current_song).prev().length? 
        $('#'+current_song).prev().click():
          $('.list-element').last().click(); 
}

function highlightList(){
  $(this).css('cursor','pointer');
  $(this).stop().animate({ fontSize : '15px' });
}

function downplayList(){
  $(this).css('cursor','auto');
  $(this).stop().animate({ fontSize : '14px' });
}

function toggleShuffle(event, from){
  if(from == null){
    if($(this).attr('data-shuffle') == 'false'){
      $(this).addClass('shuffle_on fa-4x');
      $(this).attr('data-shuffle','true');
      $(this).css('color','white');
      // $(this).addClass('ripple');
      // shuffle_start = setInterval(function () {
      //   $('.shuffle').trigger('click', ['Trigger'])
      //   }, 700);
    } else {
      $(this).removeClass('shuffle_on fa-4x');
      $(this).attr('data-shuffle','false');
      $(this).css('color','black');
      // $(this).removeClass('ripple');
      // clearInterval(shuffle_start);
    } 
  }
}

$(document).ready(function() {

  last_played = $('.list-element').first().attr('id');;
  total_songs = $('.list-element').length;
  current_song = $('.list-element').first().attr('id');

  $('.list-element').click(setSong);
  $('.player_nav').hover(highlightPlayerNavs, downplayPlayerNavs);
  $('.next').click(nextSong);
  $('.previous').click(previousSong);
  $('.list-element').hover(highlightList, downplayList);
  $('.shuffle').click(toggleShuffle);
  window.setTimeout(function(){
    $('.list-element').first().click();
  }, 1000);
});

// Ripple
// function createRipple(event) {
//   event.preventDefault();

//   var $div = $('<div/>'),
//       btnOffset = $(this).offset(),
//       xPos = event.pageX - btnOffset.left,
//       yPos = event.pageY - btnOffset.top;
  
//   $div.addClass('ripple-effect');
//   var $ripple = $(".ripple-effect");
  
//   $ripple.css("height", $(this).height());
//   $ripple.css("width", $(this).height());
//   $div
//     .css({
//       top: yPos - ($ripple.height()/2),
//       left: xPos - ($ripple.width()/2),
//       background: $(this).data("ripple-color")
//     }) 
//     .appendTo($(this));

//   window.setTimeout(function(){
//     $div.remove();
//   }, 2000);
// }
