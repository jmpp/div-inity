(function(ctx){

	var enabled = false,
		handler;

	var gamepad = {

		init: function(){
			
			enabled = !!navigator.getGamepads;

			if(!enabled){
				console.log('Gamepad API not ready :(');
			}else{
				handler = navigator.getGamepads();	
				this.update();
				console.log('Gamepad API is ready :)');	
			}
			return this;
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