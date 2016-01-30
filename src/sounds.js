(function(ctx){
  
  var sounds = {

    filenames : [
      // Thème principal
      {
        id: 'theme',
        params: { urls:['sounds/theme.mp3', 'sounds/theme.wav'], loop:true } // Objet de configuration 'Howler'
      },
      
      // Son de collision sur les bords de la map
      {
        id: 'bump',
        params: { urls:['sounds/bump.mp3', 'sounds/bump.wav'] } // Objet de configuration 'Howler'
      }
    ],

    init: function () {
      // Chargement des sons
      for (var i = sounds.filenames.length - 1, s; i >= 0; i--) {
        s = sounds.filenames[i];
        sounds[s.id] = new Howl(s.params);
      };
    }
    
  };

  ctx.sounds = sounds;

})(app);