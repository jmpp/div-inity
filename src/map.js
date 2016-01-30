(function(ctx){

	var $el,
		level;

	var map = {

		init: function (){

			$el = $('#grid');
			return this;
		},

		// chargement d'un nouveau level
		
		set: function(json){

			level = json;

			var topo = level.topo,
				items = level.items,
				$line,
				n,
				item,
				elevation = ['down', '', 'up'];

			for(var x = 0; x<topo.length; x++){

				$line = $el.children('.row').eq(x);

				for(var y = 0; y<topo[x].length; y++){

					n 			= topo[x][y];
					css_class 	= "cell "+elevation[n];
					item 		= items[x][y];
					if(item>0)	css_class += ' symbol_'+item;

					$line.children('.cell').eq(y).removeClass().addClass(css_class);
				}
			}
			app.sounds.brick.play();
			console.log('Map '+json.name+' loaded');
		},

		update: function(){
			if(level.update){
				level.update();
			}
		},

		/**
		 * Renvoie l'indice de l'item à la position donnée
		 * @param  int x 0-6
		 * @param  int y 0-6
		 * @return int   Le symbol
		 */
		get_item: function(x,y){
			return level.items[x][y];
		},

		/**
		 * Renvoie lq topologie à la position donnée
		 * @param  int x 0-6
		 * @param  int y 0-6
		 * @return int   La topo (0-1-2)
		 */
		get_topo: function(x,y){
			return level.topo[x][y];
		},

		/**
		 * Détermine si le player peu se déplacer vers pos(x,y)
		 * @param  Player player 			Joueur
		 * @param  Object{x:0, y:0} pos    	objet position
		 * @return Boolean        			réponse
		 */
		player_can_move_to: function(player, pos){

			var topo_player = this.get_topo(player.pos.x, player.pos.y),
				topo_dest 	= this.get_topo(pos.x, pos.y),
				can_move  	= (Math.abs(topo_player-topo_dest) < 2) ? true : false;

			return can_move;
		}
	};

	ctx.map = map;

})(app);