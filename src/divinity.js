(function(ctx){

  var $bull;
  
  var divinity = {

    init: function () {
      $bull = $('#bull');
    },

    say: function(message) {

      message = processMessage(message);

      $bull.empty().append(message);
    }
    
  };

  function processMessage(message) {
    message = message.split('');
    return message.map(function(letter, index) {
                    if (letter !== '%')
                      return letter;

                    message.splice(index, index+1);

                    return '<img src="img/'+index+'.png">';
                  })
                  .join('');
  }

  ctx.divinity = divinity;

})(app);