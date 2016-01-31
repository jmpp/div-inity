function Player(id, name, $player, init_pos){

  var $grid;
  var $player;
  var name = name;

  var animationRunning = false; // flag animation
  var animRight = function() {};//function() { TweenMax.from($player, 0.15, {'x':'-100px',onComplete:function(){animationRunning=false},onStart:function(){animationRunning=true}}) };
  var animLeft = function() {};//function() { TweenMax.from($player, 0.15, {'x':'100px',onComplete:function(){animationRunning=false},onStart:function(){animationRunning=true}}) };
  var animUp = function() {};//function() { TweenMax.from($player, 0.15, {'y':'100px',onComplete:function(){animationRunning=false},onStart:function(){animationRunning=true}}) };
  var animDown = function() {};//function() { TweenMax.from($player, 0.15, {'y':'-100px',onComplete:function(){animationRunning=false},onStart:function(){animationRunning=true}}) };
  var animAction = function(){
    //TweenMax.from($player, 0.15, {'y':'-100px',onComplete:function(){animationRunning=false},onStart:function(){animationRunning=true}});
  }

  var player = {

    // Position sur la map en x (cells) et y (rows)
    pos: {
      x: init_pos.x,
      y: init_pos.y
    },

    score: 0,

    id: id,

    on_a_move: false,

    control: null,

    init: function () {
      $grid   = $('#grid');

      $player.show();
      player.applyMove();

      //var tween = TweenMax.to($player, 2, {scaleX:0.95,scaleY:0.98, yoyo:true, repeat:  10000, ease:Bounce.easeOut});

      console.log(name + ' inited && ready');
    },

    /**
     * [look description]
     * @param  {[type]} direction [description]
     * @return {[type]}           [description]
     */
    look: function(direction){

      // player1-down
      $player.attr('src', 'img/player'+this.id+'-'+direction+'.png');
    },

    update: function() {

      if(!player.control)   return;

      //player.control.update();
      player.on_a_move = player.control.update(player.on_a_move);

      // =====================
      // Déplacement du joueur
      // =====================

      if(player.on_a_move === true)  return;

      // A droite

      if (player.control.right && player.canGoto('right')) {
        player.look('right');
        player.pos.x += 1;
        player.applyMove(animRight);
      }
      // A gauche
      
      if (player.control.left && player.canGoto('left')) {
        player.look('left');
        player.pos.x -= 1;
        player.applyMove(animLeft);
      }
      // En bas
      
      if (player.control.down && player.canGoto('down')) {
        player.look('down');
        player.pos.y += 1;
        player.applyMove(animDown);
      }
      // En haut
      
      if (player.control.up && player.canGoto('up')) {
        player.look('up');
        player.pos.y -= 1;
        player.applyMove(animUp);
      }

      // Action
      
      if (player.control.action) {
        player.look('action');
        player.applyMove(animAction);
        console.log('Action!');
      }
    },

    // Applique la position du joueur dans le DOM
    applyMove : function(animFunction) {

      player.on_a_move = true;

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
          if (player.pos.x === app.config.map.width - 1 || 
              !app.map.player_can_move_to(player, {x:player.pos.x+1, y:player.pos.y})) {
            // !animationRunning && TweenMax.from($player, 0.15, {'x':'35px',onComplete:function(){animationRunning=false},onStart:function(){animationRunning=true}})
            app.sounds.bump.play();
            return false;
          }
          break;

        case 'left':
          if (player.pos.x === 0 || 
              !app.map.player_can_move_to(player, {x:player.pos.x-1, y:player.pos.y})) {
            // !animationRunning && TweenMax.from($player, 0.15, {'x':'-35px',onComplete:function(){animationRunning=false},onStart:function(){animationRunning=true}})
            app.sounds.bump.play();
            return false;
          }
          break;

        case 'down':
          if (player.pos.y === app.config.map.height - 1 || 
              !app.map.player_can_move_to(player, {x:player.pos.x, y:player.pos.y+1})) {
            // !animationRunning && TweenMax.from($player, 0.15, {'y':'35px',onComplete:function(){animationRunning=false},onStart:function(){animationRunning=true}})
            app.sounds.bump.play();
            return false;
          }
          break;

        case 'up':
          if (player.pos.y === 0 || 
              !app.map.player_can_move_to(player, {x:player.pos.x, y:player.pos.y-1})) {
            // !animationRunning && TweenMax.from($player, 0.15, {'y':'-35px',onComplete:function(){animationRunning=false},onStart:function(){animationRunning=true}})
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
    },

    do_the_shaker: function(){

      TweenMax.to($player, .8, {'scale':1.2, ease: Elastic.easeOut, onComplete:function(){
        TweenMax.to($player, .6, {'scale':1.1, ease: Elastic.easeOut});
      }});
    }
  };

  return {
    init:         player.init,
    update:       player.update, 
    pos:          player.pos,
    set_control:  player.set_control,
    resetInputs:  player.resetInputs, 
    name:         name,
    score:        player.score,
    do_the_shaker:player.do_the_shaker
  }
};