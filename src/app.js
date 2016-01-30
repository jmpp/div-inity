(function(ctx){

	var app = {

		config: {
			map: { width:7, height:7 }
		},

		init: function () {
			// Initialisation du jeu
			app.input.init();
			app.player.init();
			app.map.init().set(level1);

			app.update(); // 1er appel de la boucle
		},

		// Boucle de refresh (~60fps)
		update: function() {
			requestAnimationFrame(app.update);
			app.player.update();

			app.input.resetInputs(); // Remise à 0 de tous les inputs après l'exécution de cette frame
		}
	};

	ctx.app = app;
	
})(window);