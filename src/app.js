(function(ctx){

	var app = {

		config: {
			map: { width:7, height:7 }
		},	

		players: [],	

		init: function () {

			// Initialisation du jeu
			app.sounds.init();
			app.input.init();

			// Création des 3 joueurs
			app.players.push(new Player(1, 'monk1', $('img#monk1'), {x:5,y:5}));
			app.players.push(new Player(2, 'monk2', $('img#monk2'), {x:0,y:0}));
			app.players.push(new Player(3, 'monk3', $('img#monk3'), {x:0,y:1}));

			// Initialisation des controles pour les joueurs
			app.controls.init(app.players);

			// Initialisation de la divinité
			app.divinity.init();

			// Initialisation de la premiere map
			app.map.init().set(app.map.levels.get(1));

			setTimeout(function() {
				app.divinity.say('0UMP4 !!!')
			}, 0); // Dès que les briques sont placées

			// Lancement du thème principal
			app.sounds.theme.play();

			// 1er appel de la boucle
			app.update();
		},

		// Boucle de refresh (~60fps)
		update: function() {

			requestAnimationFrame(app.update);

			// map
			app.map.update();
			
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