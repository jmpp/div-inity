(function(ctx){

  var $bull;
  var $symbols;
  
  var divinity = {

    init: function () {
      $bull = $('#bull');
      $symbols = $('#symbols');
    },

    say: function(message) {
      $bull
      .empty()
      .append(processMessage(message))
      .fadeIn('slow');

      // Plus de disparition de la bulle (laisse le temps au joueur d'analyser)
      // setTimeout(function() {
      //   $bull.empty().fadeOut('slow');
      // }, 5000)
    },

    dance: function(){

      var nb        = 16;
      var nb_image  = 3;

      $('div#inity').css('background-image', "url('img/devils_dance.png')");

      var si_handler = setInterval(function(){

        var i = Math.floor((Math.random() * nb_image))*772;
        $('div#inity').css('background-position' , "0 -"+i+"px");

        nb--;
        if(nb<1){
          window.clearInterval(si_handler);
          if(app.level_winner)  app.level_winner.disable_adoration();
          $('div#inity').css({
            'background-image': "url('img/divinite.png')",
            'background-position': '0  0'
          });
          app.state = 10;
          console.log('Devinity has finish !');
        }

      }, 300);
      console.log('Devinity do Win dance !');
    }
    
  };

  function processMessage(message) {
    return message
            .split('')
            .map(function(letter) {
              letter = Number(letter);
              if ([1,2,3,4,5,6,7].indexOf(letter) !== -1)
                return '<img src="img/'+(letter-1)+'.png">';
              return letter;
            })
            .join('');
  }

  ctx.divinity = divinity;

})(app);