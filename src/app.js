(function(ctx){

	var app = {

		config: {
			map: { width:7, height:7 }
		},

		level: 1,
		state: 0,	

		players: [],
		level_winner: null,	

		init: function () {

			// Initialisation du jeu
			app.sounds.init();
			app.input.init();

			// Création des 3 joueurs
			app.players.push(new Player(1, 'monk1', $('#monk1'), {x:5,y:5}));
			app.players.push(new Player(2, 'monk2', $('#monk2'), {x:5,y:1}));
			app.players.push(new Player(3, 'monk3', $('#monk3'), {x:1,y:5}));

			// Initialisation des controles pour les joueurs
			app.controls.init(app.players);

			// Initialisation de la divinité
			app.divinity.init();

			// Initialisation de la premiere map
			// app.map.init().set(app.map.levels.get(1));

			//setTimeout(function() {
				//app.divinity.say('0UMP4 !!!')
			//}, 0); // Dès que les briques sont placées

			// Lancement du thème principal
			app.sounds.theme.play();

			// 1er appel de la boucle
			app.update();
		},

		// Boucle de refresh (~60fps)
		update: function() {

			requestAnimationFrame(app.update);

			switch(app.state){

				// intro : apparitions
				case 0:
					var tween = new TimelineMax();
		            // tween.timeScale(4);
		            
					tween.from("#grid", 3, {ease:  Back.easeIn.config(1.7), opacity: 0, autoAlpha: 0, y: '+=80', onComplete: function(){
						app.map.init().set(app.map.levels.get(0));
					}});
					tween.from("#inity", 6, {ease:  Back.easeIn.config(1.7), opacity: 0, autoAlpha: 0, y: '+=300'}, '-=2');

					setTimeout(function(){ tween.play() }, 500);
					console.log(' --- STATE 0');
					app.state += 0.5;

					break;

				// start
				case 1:
					console.log('GAME START');				
					app.state = 10;
					break;

				// MAIN GAME LOOP : chargement de la map
				case 10:

					var new_level = Math.floor((Math.random() * app.map.levels.nb) + 1);
					if(app.level == new_level)	new_level++;
					app.level = new_level

					app.init_players_challenge();
					app.map.init().set(app.map.levels.get(app.level));
					setTimeout(function(){ app.state = 11 }, 3000);
					app.state +=.5;
					break;

				// annonce par la divinitée du challenge
				case 11:
					app.divinity.say(app.map.get_level().challenge);
					app.state++;
					break;

				// main  gameloop
				case 12:
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
					break;

				//  fin du level : nous avons un gagnant
				case 13:
					break;
			}
		},

		/**
		 * Initialise les win positions dans chaque joueur
		 */
		init_players_challenge: function(){

			var win_position = app.map.levels.get(app.level).win;

			for(var j=0; j<app.players.length; j++) {
				var wp = win_position.slice(0);
				if (wp)
					app.players[j].win_position = wp;
			}

			console.log('Joueurs: win position ready !');
		},

		//  Nous avons un gagnant pour ce niveau
		
		win_level: function(winner){
			
			app.level_winner = winner;
			winner.win();
			app.divinity.dance();

			app.state = 13;
			console.log('Player '+winner.id+' WIN this level!');
		}
	};

	ctx.app = app;
	
})(window);