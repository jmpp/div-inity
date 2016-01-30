function Input_gp(gamepad){
  
  /**
   * Classe de controle de Gamepad
   * @type {Object}
   */
  var input = {

    left   : false,
    up     : false,
    right  : false,
    bottom : false,

    handler: gamepad,

    init: function () {
      
      console.log('Gamepad ready');
    },

    /**
     * Calcul les mouvement à partir du joystick analogique
     */
    update: function(){

      var vertical = input.applyDeadzone(input.handler.axes[1], .8),
        horizontal = input.applyDeadzone(input.handler.axes[0], .8);

        if(vertical<0){
          input.up = true;
          input.down = false;
        }

        if(vertical>0){
          input.up = false;
          input.down = true;
        }

        if(horizontal<0){
          input.left = true;
          input.right = false;
        }

        if(horizontal>0){
          input.left = false;
          input.right = true;
        }
    },

    resetInputs: function () {

      input.left  = false;
      input.up    = false;
      input.right = false;
      input.down  = false;
    },

    /**
     * Supprime les valeurs centrales (dead zone) pour un controle plus stable
     * @param  float number    valeur
     * @param  float threshold deadzone 
     * @return float           resultat
     */
    applyDeadzone: function(number, threshold){
       percentage = (Math.abs(number) - threshold) / (1 - threshold);

       if(percentage < 0)
          percentage = 0;

       return percentage * (number > 0 ? 1 : -1);
    }
  };

  return input;
};