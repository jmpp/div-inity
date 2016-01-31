const MENU = 0;
const PLAY = 1;

(function(ctx){
	

	var enabled 	= false,
		mode 		= MENU,
		gp_handler, player1,
		controlable = [],
		controlled 	= [true,false,false,false],
		nb_pad 		= 0;	

	var controls = {

	 
		/**
		 * initialisation des controles
		 * @param  Array[Player] player_list List des joueurs controlables
		 * @return control (this)
		 */
		init: function(player_list){

			enabled = !!navigator.getGamepads;

			if(!enabled){
				console.log('Gamepad API not ready :(');
			}else{

				// gamepad API ok
				
				controlable = player_list;

				// player 1 : clavier par defaut
				
				player1 = controlable[0];
				player1.init();
				player1.set_control(app.input);

				// connection des pads
				
				window.addEventListener("gamepadconnected", on_new_pad_connect);
				window.addEventListener("gamepaddisconnected", on_pad_deconnect);

				gp_handler = navigator.getGamepads();

				this.run();

				console.log(gp_handler, 'Gamepad API is ready :)');	
			}
			return this;
		},

		// change le mode de control :
		// MENU : choix du joueur
		// PLAY : jeu
		
		set_mode: function(value){
			mode  = value;
			console.log('control MODE : '+value)
		},

		// processus continu
		
		run: function(){

			requestAnimationFrame(app.controls.run);

			switch(mode){

				case MENU:
					is_game_start();
					select_player();
					break;

				case PLAY:
				move_player();
					break;
			}
		}
	};

	self 			= controls;
	ctx.controls 	= controls;

	// ----- private methods -----
	
	/**
	 * A l'appuie d'un bouton start, on change de mode et on passe en PLAY
	 * @return undefined
	 */
	function is_game_start(){

		if(gp_handler[0] && gp_handler[0].buttons[9] && gp_handler[0].buttons[9].value>0 ||
			gp_handler[1] && gp_handler[1].buttons[9] && gp_handler[1].buttons[9].value>0 ||
				gp_handler[2] && gp_handler[2].buttons[9] && gp_handler[2].buttons[9].value>0){
					controls.set_mode(PLAY);
				app.state = 1;
			}
				
	}

	// Phase menu : les joueurs appuient sur A pour selectionner leur joueur
	
	function select_player(){

		gp_handler = navigator.getGamepads();

		for(var j=0; j<3; j++){

			if(!controlled[j] && gp_handler[j] && gp_handler[j].buttons[0].value>0){
				

				var p 			= (nb_pad > 1) ? player1 : controlable[j];
				controlled[j] 	= true;
				nb_pad		   +=  1;
				p.init();
				var gp = new Input_gp(gp_handler[j]);
				p.set_control(gp);

				console.log('Control '+j+'  is  assigned to player '+p.name);
			}
		}
	}

	//  phase de jeu : on update  les controles gamepad
	
	function move_player(){

		gp_handler = navigator.getGamepads();
	}
	
	/**
	 * Nouveau pad connecté
	 */
	function on_new_pad_connect(e){
		console.log('pad connected :)');
	}

	/**
	 * Pad déconnecté
	 */
	function on_pad_deconnect(e){
		console.log('pad DEconnected :(');
	}

})(app);