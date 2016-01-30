(function(ctx){

  var $grid;
  var $el;
  
  var player = {

    // Position sur la map en x (cells) et y (rows)
    pos: {
      x: 0,
      y: 0
    },

    init: function () {
      $grid = $('#grid');   
      $el   = $('img#player');
    },

    update: function() {

      // =====================
      // Déplacement du joueur
      // =====================

      // A droite
      if (app.input.keyboard.right) {
        player.pos.x += 1;
        player.applyMove();
      }
      // A gauche
      if (app.input.keyboard.left) {
        player.pos.x -= 1;
        player.applyMove();
      }
      // En bas
      if (app.input.keyboard.down) {
        player.pos.y += 1;
        player.applyMove();
      }
      // En haut
      if (app.input.keyboard.up) {
        player.pos.y -= 1;
        player.applyMove();
      }
    },

    // Applique la position du joueur dans le DOM
    applyMove : function() {
      $el.detach();
      $grid
        .find('.row')
        .eq(player.pos.y)
        .find('.cell')
        .eq(player.pos.x)
        .append($el);
    }
  };

  ctx.player = player;

})(app);