function Player(name, $player, init_pos){

  var $grid;
  var $player;
  var name = name;

  var animationRunning = false; // flag animation
  var animRight = function() { TweenMax.from($player, 0.15, {'x':'-100px',onComplete:function(){animationRunning=false},onStart:function(){animationRunning=true}}) };
  var animLeft = function() { TweenMax.from($player, 0.15, {'x':'100px',onComplete:function(){animationRunning=false},onStart:function(){animationRunning=true}}) };
  var animUp = function() { TweenMax.from($player, 0.15, {'y':'100px',onComplete:function(){animationRunning=false},onStart:function(){animationRunning=true}}) };
  var animDown = function() { TweenMax.from($player, 0.15, {'y':'-100px',onComplete:function(){animationRunning=false},onStart:function(){animationRunning=true}}) };
  
  var player = {

    // Position sur la map en x (cells) et y (rows)
    pos: {
      x: init_pos.x,
      y: init_pos.y
    },

    control: null,

    init: function () {
      $grid   = $('#grid');   
      //$player = $('img#player');

      $player.show();
      player.applyMove();

      console.log(name + ' initied && ready');
    },

    update: function() {

      if(!player.control)   return;

      player.control.update();

      // =====================
      // Déplacement du joueur
      // =====================

      // A droite

      if (player.control.right && player.canGoto('right')) {
        player.pos.x += 1;
        player.applyMove(animRight);
      }
      // A gauche
      if (player.control.left && player.canGoto('left')) {
        player.pos.x -= 1;
        player.applyMove(animLeft);
      }
      // En bas
      if (player.control.down && player.canGoto('down')) {
        player.pos.y += 1;
        player.applyMove(animDown);
      }
      // En haut
      if (player.control.up && player.canGoto('up')) {
        player.pos.y -= 1;
        player.applyMove(animUp);
      }
    },

    // Applique la position du joueur dans le DOM
    applyMove : function(animFunction) {
      $player.detach();
      $grid
        .children('.row')
        .eq(player.pos.y) // va chercher la ligne .row correspondant à la position Y du joueur
        .children('.cell')
        .eq(player.pos.x) // va chercher la cellule .cell correspondant à la position X du joueur
        .append($player);
      // Applique une animation avec le changement de position  
      if ('function' === typeof animFunction && !animationRunning)
        animFunction();
    },

    canGoto : function(destination) {

      if(animationRunning)  return false;

      switch (destination) {
        case 'right':
          if (player.pos.x === app.config.map.width - 1) {
            !animationRunning && TweenMax.from($player, 0.15, {'x':'35px',onComplete:function(){animationRunning=false},onStart:function(){animationRunning=true}})
            app.sounds.bump.play();
            return false;
          }
          break;

        case 'left':
          if (player.pos.x === 0) {
            !animationRunning && TweenMax.from($player, 0.15, {'x':'-35px',onComplete:function(){animationRunning=false},onStart:function(){animationRunning=true}})
            app.sounds.bump.play();
            return false;
          }
          break;

        case 'down':
          if (player.pos.y === app.config.map.height - 1) {
            !animationRunning && TweenMax.from($player, 0.15, {'y':'35px',onComplete:function(){animationRunning=false},onStart:function(){animationRunning=true}})
            app.sounds.bump.play();
            return false;
          }
          break;

        case 'up':
          if (player.pos.y === 0) {
            !animationRunning && TweenMax.from($player, 0.15, {'y':'-35px',onComplete:function(){animationRunning=false},onStart:function(){animationRunning=true}})
            app.sounds.bump.play();
            return false;
          }
          break;
      }

      return true;
    },

    //  ajoute un type de control au joueur (keyboard ou gamepad)
    set_control: function(input){
      console.log('set_control', input);  
      player.control = input;
      input.init();
    },

    //  reset les controls du joueur (fin de la boucle de jeux)
    resetInputs: function(){
      if(player.control){
        player.control.resetInputs();
      }
    }

  };

  return {
    init:         player.init,
    update:       player.update, 
    set_control:  player.set_control,
    resetInputs:  player.resetInputs, 
    name:         name
  }
};