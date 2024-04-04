const { QueryInterface } = require("sequelize");

module.exports ={
  up: async (QueryInterface)=> {return QueryInterface.bulkInsert('Users', [
    {      

      username: 'Martin Ponce',
      password: '123456',
      avatar: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
      createdAt: new Date(),
      updatedAt: new Date()
    
    },
    {
      username: 'Tuckita',
      password: '123456',
      avatar: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
      createdAt: new Date(),
      updatedAt: new Date()
    
    },
    {
      username: 'Dingo',
      password: '123456',
      avatar: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Aylwin',
      password: '123456',
      avatar: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {username: 'Percebe',
    password: '123456',
    avatar: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {username: 'prieto',
    password: '123456',
    avatar: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
    createdAt: new Date(),
    updatedAt: new Date()
  },

  {username: 'Valladares',
  password: '123456',
  avatar: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
  createdAt: new Date(),
  updatedAt: new Date()
},
{ username: 'cambiazo',
  password: '123456',
  avatar: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
  createdAt: new Date(),
  updatedAt: new Date()
},
{username:'Papalba',
password: '123456',
avatar: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
createdAt: new Date(),
updatedAt: new Date()
},
{username:'Munita',
password: '123456',
avatar: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
createdAt: new Date(),
updatedAt: new Date()
}





  

  ]);},
  down: async (QueryInterface)=> {return QueryInterface.bulkDelete('Users', null, {})
}}