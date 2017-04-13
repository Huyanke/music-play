var
    x,
	isPlay = false,
	progress = 0,
	val = 0,
    duration=0,
	max = 0,
    state,
	$scale = $('#scale'),
    $playMusic = $('#play'),

	$music=$('#music'),
	music = $music.get(0)



/*播放*/


$playMusic.on('click', function() {
   	if (isPlay == false) {
		iplay();
	}
});

/*播放状态*/

function iplay() {

    $('.state').on('click',function() {
		var _audio = $(this).find('audio');
		if($(this).hasClass('pause')) {
			$(this).removeClass('pause');
			if(!_audio.attr('src')) {
				_audio.attr('src',_audio.data('src'));
				$(this).removeClass('state');
			}
			    _audio = _audio[0];
                 $('.stop').show();
   	             $('.play').hide();
   	             $(".header").addClass("animation");
                 _audio.play();

		  } else {
			 $('.stop').hide();
   	         $('.play').show();
   	         clearInterval(x);
   	          $(".header").removeClass("animation");
			_audio = _audio[0];
			$(this).addClass('pause');
			_audio.pause();
		}
	});
	var audio = document.getElementById("music");
    audio.addEventListener('timeupdate', function() {

	$scale.attr('max', music.duration);

	max = music.duration;
	isPlay = true;
	x = setInterval(function() {
         if(audio.readyState == 4){
             clearInterval(state)
         }
		progress = music.currentTime;
        duration = music.duration;

        val = progress * max/duration;
	  	$scale.val(val);
         var progressValue = progress / duration * 560;
         var width = progressValue /20 - 0.15 + 'rem';

            /*已经播放进度*/
            $(".shadow").css("width",width);


	 if (val == max) {
          $(".header").removeClass("animation");
          $('.stop').hide();
	      $('.play').show();
          $(".shadow").css("width",0);
          $scale.val(0);
          music.pause();
	      isPlay = false;
          clearInterval(x);
	  }
	}, 500);
   });
};

$scale.on('change', function() {
     val =  $scale.val();
     progress = val;
     music.currentTime = progress ;


});
