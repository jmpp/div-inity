(function(ctx){

	var app = {

		init: function(){

			this.map.set({
				name: 'level 1',
				topo: [
					[0,0,1,1,2,2,2]
				]
			});
		}
	};

	ctx.app = app;
	
})(window);