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
              if (letter in [0,1,2,3,4,5,6] )
                return '<img src="img/'+letter+'.png">';
              return letter;
            })
            .join('');
  }

  ctx.divinity = divinity;

})(app);