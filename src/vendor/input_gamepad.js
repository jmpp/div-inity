(function(ctx){
  
  function gamepad_ = {

    keyboard : {
      left   : false,
      up     : false,
      right  : false,
      bottom : false
    },

    // @todo: gamepad

    init: function () {
      document.addEventListener('keydown', input.onKeyDown, false);
      document.addEventListener('keyup', input.onKeyUp, false);
    },

    onKeyDown: function (evt) {
      input.keyboard.left  = (evt.keyCode === 37) ? true : false;
      input.keyboard.up    = (evt.keyCode === 38) ? true : false;
      input.keyboard.right = (evt.keyCode === 39) ? true : false;
      input.keyboard.down  = (evt.keyCode === 40) ? true : false;
    },

    onKeyUp: function (evt) {
      input.keyboard.left  = (evt.keyCode === 37) ? false : input.keyboard.left;
      input.keyboard.up    = (evt.keyCode === 38) ? false : input.keyboard.up;
      input.keyboard.right = (evt.keyCode === 39) ? false : input.keyboard.right;
      input.keyboard.down  = (evt.keyCode === 40) ? false : input.keyboard.down;
    },

    resetInputs: function () {
      input.keyboard.left  = false;
      input.keyboard.up    = false;
      input.keyboard.right = false;
      input.keyboard.down  = false;
    }

    
  };

  ctx.input = input;

})(app.controls);