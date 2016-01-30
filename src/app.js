(function(ctx){

	var app = {

		init: function () {

			var players = [
				{
					name: 'one',
					set_control: function(){}
				},
				{name: 'two',
				set_control: function(){}
				},
				{name: 'tree',
				set_control: function(){}
				},
				{name: 'four',
				set_control: function(){}
				}
			];
			app.controls.init(players);
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