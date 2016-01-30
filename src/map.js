(function(ctx){

	var $el;

	var map = {

		init: function (){

			$el = $('#grid');
			return this;
		},

		// chargement d'un nouveau level
		
		set: function(json){

			var topo = json.topo,
				$line,
				n,
				elevation = ['down', '', 'up'];

			for(var x = 0; x<topo.length; x++){

				$line = $el.children('.row').eq(x);

				for(var y = 0; y<topo[x].length; y++){

					n 			= topo[x][y];
					css_class 	= "cell "+elevation[n];

					$line.children('.cell').eq(y).removeClass().addClass(css_class);
				}
			}
			app.sounds.brick.play();
			console.log('Map '+json.name+' loaded');
		}
	};

	ctx.map = map;

})(app);

/* niveaux de test */

var level1 = {
	name: 'level 1',
	topo: [
		[2,2,2,2,2,2,2],
		[2,0,1,1,1,0,2],
		[2,2,1,1,1,1,2],
		[2,2,1,1,1,0,2],
		[2,0,1,1,1,1,2],
		[2,0,1,1,1,0,2],
		[2,2,2,2,2,2,2]
	]
};

var level2 = {
	name: 'level 2',
	topo: [
		[2,0,0,0,0,0,2],
		[2,0,0,0,0,0,2],
		[2,0,0,0,0,0,2],
		[2,0,0,0,0,0,2],
		[2,0,0,0,0,0,2],
		[2,0,0,0,0,0,2],
		[2,0,0,0,0,0,2]
	]
};

var level3 = {
	name: 'level 3',
	topo: [
		[1,1,1,1,1,1,1],
		[2,0,0,0,0,0,2],
		[1,1,1,1,1,1,1],
		[2,0,0,0,0,0,2],
		[1,1,1,1,1,1,1],
		[2,0,0,0,0,0,2],
		[1,1,1,1,1,1,1]
	]
};