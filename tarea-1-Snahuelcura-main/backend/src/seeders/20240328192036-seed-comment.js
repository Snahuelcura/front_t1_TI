const { QueryInterface } = require("sequelize");

module.exports ={
  up: async (QueryInterface)=> { return QueryInterface.bulkInsert('Comments', [{
    content: '¡Excelente noticia! ¡Éxito en tu nuevo trabajo!',
    userId: 10,
    postId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: 'Felicidades por tu nuevo trabajo, Martin!',
    userId: 2,
    postId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: 'Qué emocionante, Martin. ¡Te deseo lo mejor!',
    userId: 3,
    postId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: 'Increíble, Martin. ¡Enhorabuena!',
    userId: 4,
    postId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: 'Genial, Martin. ¡Mucho éxito en tu nuevo empleo!',
    userId: 5,
    postId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Comentarios para el post 2
  {
    content: '¡Qué buena foto! ¡Se ve increíble!',
    userId: 1,
    postId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: 'Maravillosa vista, Tuckita. ¡Disfruta tu viaje!',
    userId: 9,
    postId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: 'Chico puconazo, realmente increíble.',
    userId: 3,
    postId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: '¡Qué hermoso lugar, Tuckita!',
    userId: 4,
    postId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: '¡Maravilloso, Tuckita! ¡Disfruta cada momento!',
    userId: 5,
    postId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Comentarios para el post 3
  {
    content: '¡Cuidado con Ringo! ¡Espero que estés bien!',
    userId: 1,
    postId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: 'Espero que no haya sido nada grave, Dingo.',
    userId: 2,
    postId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: '¡Cuidado, Dingo! ¡Espero que te recuperes pronto!',
    userId: 7,
    postId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: '¡Cuidado con Ringo, Dingo! ¡Que te mejores pronto!',
    userId: 4,
    postId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: '¡Que susto, Dingo! ¡Espero que estés bien!',
    userId: 5,
    postId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Comentarios para el post 4
  {
    content: '¡Cuidado con el gato! ¡Espero que no haya sido nada grave!',
    userId: 1,
    postId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: 'Espero que el susto haya sido lo único, Aylwin.',
    userId: 2,
    postId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: '¡Cuidado, Aylwin! ¡Espero que estés bien!',
    userId: 3,
    postId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: '¡Espero que estés bien, Aylwin!',
    userId: 6,
    postId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: '¡Qué susto, Aylwin! ¡Espero que todo esté bien!',
    userId: 5,
    postId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Comentarios para el post 5
  {
    content: '¡Cuidado con el loro! ¡Espero que estés bien!',
    userId: 1,
    postId: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: 'Espero que el susto haya sido lo único, Percebe.',
    userId: 2,
    postId: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: '¡Cuidado, Percebe! ¡Espero que estés bien!',
    userId: 3,
    postId: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    content: '¡Espero que estés bien, Percebe!',
    userId: 4,
    postId: 5,
    createdAt: new Date,
    updatedAt: new Date()
  },

  {
    content: '¡Espero que estés bien, Percebe!',
    userId: 10,
    postId: 5,
    createdAt: new Date,
    updatedAt: new Date()
  }
    
    





  

  ]);},
  down: async (QueryInterface)=> { return QueryInterface.bulkDelete('Comments', null, {})
}}