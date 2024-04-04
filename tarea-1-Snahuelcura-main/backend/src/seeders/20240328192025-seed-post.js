const { QueryInterface } = require("sequelize");

module.exports ={
  up: async (QueryInterface) => { return QueryInterface.bulkInsert('Posts', [

    {
      title: 'Mi primera chamba',
      content: 'Estoy muy emocionado por mi primer trabajo',
      image: 'https://www.losandes.com.ar/resizer/ng5pMehp32z9Rh_H0699xh8lZzo=/0x0:0x0/980x640/filters:quality(80):format(webp)/cloudfront-us-east-1.images.arcpublishing.com/grupoclarin/UHBEIRUU6ZEWHF4BCBIFIWVJAY.png',
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Full monas",
      content: "Chico puconazo",
      image: "https://scontent.fscl9-1.fna.fbcdn.net/v/t1.18169-9/429882_210285625745675_949185810_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=iFH8gdHv-goAX_-n4QC&_nc_ht=scontent.fscl9-1.fna&oh=00_AfC2vis7tiSt2h2Ge_COaxOpRqSYixMYHL5Qlq_IuX1esQ&oe=6632D08F",
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Cuidado con el ringo",
      content: "El perro es bravo",
      image: "https://content.elmueble.com/medio/2023/09/28/perro-de-raza-spitz-japones_cc311565_230928195338_1995x1451.jpg",
      userId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Cuidado con el gato",
      content: "El gato es bravo",
      image: "https://s1.eestatic.com/2020/05/18/como/gatos-mascotas-trucos_490961518_152142875_1706x960.jpg",
      userId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Cuidado con el loro",
      content: "El loro es bravo",
      image: "https://cdn.download.ams.birds.cornell.edu/api/v1/asset/95481341/1800" ,
      userId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    





  

  ]);},
  down: async (QueryInterface)=> {return QueryInterface.bulkDelete('Posts', null, {})
}}