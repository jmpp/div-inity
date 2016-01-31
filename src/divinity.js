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