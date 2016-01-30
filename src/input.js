(function(ctx){
  
  /**
   * Controle uniaue au clavier
   * @type {Object}
   */
  var input = {

    left   : false,
    up     : false,
    right  : false,
    down   : false,
    action : false,

    keyuped: false,

    init: function () {
      document.addEventListener('keydown', input.onKeyDown, false);
      document.addEventListener('keyup', input.onKeyUp, false);
      console.log('Keyboard ready');
    },

    update: function(on_move){
      // place holder pour ressembler à un controleur de gamepad
      return (on_move == true && input.keyuped == true) ? false : on_move;
    },

    onKeyDown: function (evt) {

      input.left  = (evt.keyCode === 37) ? true : false;
      input.up    = (evt.keyCode === 38) ? true : false;
      input.right = (evt.keyCode === 39) ? true : false;
      input.down  = (evt.keyCode === 40) ? true : false;
      input.action = (evt.keyCode === 32) ? true : false;

      input.keyuped = false;
    },

    onKeyUp: function (evt) {
      input.left  = (evt.keyCode === 37) ? false : input.left;
      input.up    = (evt.keyCode === 38) ? false : input.up;
      input.right = (evt.keyCode === 39) ? false : input.right;
      input.down  = (evt.keyCode === 40) ? false : input.down;
      input.action  = (evt.keyCode === 32) ? false : input.action;

      input.keyuped = true;
    },

    resetInputs: function () {
      input.left  = false;
      input.up    = false;
      input.right = false;
      input.down  = false;
      input.action = false;
    }
  };

  ctx.input = input;

})(app);