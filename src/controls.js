(function(ctx){

	const MENU = 0;
	const PLAY = 1;

	var enabled 	= false,
		mode 		= MENU,
		gp_handler, player1,
		controlable = [],
		controlled 	= [false,false,false,false],
		nb_pad 		= 0;	

	var controls = {

		init: function(player_list){

			enabled = !!navigator.getGamepads;

			if(!enabled){
				console.log('Gamepad API not ready :(');
			}else{

				controlable = player_list;

				// player 1 : clavier
				
				player1 = controlable.shift();
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

		run: function(){

			requestAnimationFrame(app.controls.run);

			switch(mode){

				case MENU:
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
	
	function select_player(){

		gp_handler = navigator.getGamepads();

		for(var j=0; j<3; j++){

			if(!controlled[j] && gp_handler[j] && gp_handler[j].buttons[0].value>0){
				

				var p 			= (nb_pad > 1) ? player1 : controlable.shift();
				controlled[j] 	= true;
				nb_pad		   +=  1;
				p.set_control(gp_handler[j]);

				console.log('Control '+j+'  is  assigned to player '+p.name);
			}
		}
	}

	function move_player(){

	}

	function assign(){

		gp_handler = navigator.getGamepads();
		console.log(gp_handler);
		for(var j=0; j<gp_handler.length; j++){

			if(gp_handler[j]){
				console.log(j, gp_handler[j].id, gp_handler[j]);
			}
		}

	}

	function on_new_pad_connect(e){

		assign();
		console.log('pad connected :)');
	}

	function on_pad_deconnect(e){

		assign();
		console.log('pad DEconnected :(');
	}

	//  ----- classes -----
	
	function gamepad(){

	    this.left 	= false;
	    this.up 	= false;
	    this.right 	= false;
	    this.bottom = false;

	    this.action = false;
	}
    // @todo: gamepad

    gamepad.prototype = {

	    init: function () {
	      document.addEventListener('keydown', this.onKeyDown, false);
	      document.addEventListener('keyup', this.onKeyUp, false);
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
	      this.left  = false;
	      this.up    = false;
	      this.right = false;
	      this.down  = false;
	    }
  };

})(app);