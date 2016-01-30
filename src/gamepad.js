(function(ctx){

	var enabled = false,
		handler;

	var gamepad = {

		init: function(){
			
			enabled = !!navigator.getGamepads;

			if(!enabled){
				console.log('Gamepad API not ready :(');
			}else{

				window.addEventListener("gamepadconnected", this.on_new_pad_connect);
				window.addEventListener("gamepaddisconnected", this.on_pad_deconnect);

				handler = navigator.getGamepads();	
				this.update();
				console.log('Gamepad API is ready :)');	
			}
			return this;
		},

		on_new_pad_connect: function(e){
			console.log('pad connected :)');
		},

		on_pad_deconnect: function(e){
			console.log('pad DEconnected :(');
		},

		start: function(){
			this.update();
		},

		update: function(){

			
			requestAnimationFrame(app.gamepad.update);	

			console.log('x');		
		}
	};

	ctx.gamepad = gamepad;

})(app);