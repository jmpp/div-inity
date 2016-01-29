(function(ctx){

	var $el;
	
	var map = {

		init: function (){

		},

		set: function(json){

			var topo = json.topo;

			console.log('Map '+json.name+' loaded');
		}
	};

	ctx.map = map;

})(app);