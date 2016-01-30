(function(ctx){

	var app = {

		config: {
			map: { width:7, height:7 }
		},	

		players: [],	

		init: function () {

			app.input.init();

			// création des 3 joueurs
			
			app.players.push(new Player('monk1', $('img#monk1'), {x:5,y:5}));
			app.players.push(new Player('monk2', $('img#monk2'), {x:6,y:6}));
			app.players.push(new Player('monk3', $('img#monk3'), {x:2,y:2}));

			// initialisation des controles pour les joueurs
			app.controls.init(app.players);

			// Initialisation de la premiere map
			
			app.map.init().set(level1);

			app.update(); // 1er appel de la boucle
		},

		// Boucle de refresh (~60fps)
		update: function() {

			requestAnimationFrame(app.update);
			
			// players
			
			for(var j=0; j<app.players.length; j++){
				app.players[j].update();
			}	

			// Remise à 0 de tous les inputs après l'exécution de cette frame
			for(var j=0; j<app.players.length; j++){
				app.players[j].resetInputs();
			}
		}
	};

	ctx.app = app;
	
})(window);