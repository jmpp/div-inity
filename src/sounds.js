(function(ctx){
  
  var sounds = {

    filenames : [
      // Thème principal
      {
        id: 'theme',
        params: { urls:['sounds/theme.mp3', 'sounds/theme.wav'], loop:true, volume: 0.3 } // Objet de configuration 'Howler'
      },

      // Brique
      {
        id: 'brick',
        params: { urls:['sounds/brick.mp3', 'sounds/brick.wav'] } // Objet de configuration 'Howler'
      },

      // Son de collision sur les bords de la map
      {
        id: 'bump',
        params: { urls:['sounds/bump.mp3', 'sounds/bump.wav'] } // Objet de configuration 'Howler'
      },

      // Adoration
      {
        id: 'adoration',
        params: { urls:['sounds/passage_niveau_1.mp3', 'sounds/passage_niveau_1.wav'] } // Objet de configuration 'Howler'
      },
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