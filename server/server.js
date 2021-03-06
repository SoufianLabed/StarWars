const Hapi = require('@hapi/hapi');
const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/StarWars"


mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true})


const init = async () => {

  const server = Hapi.server({
      port: 4242,
      host: "localhost",
      routes: {
        "cors": true
    }
  });

  await server.register({
    plugin: require('hapi-mongodb'),
    options: {
      url: uri,
      settings: {
          useUnifiedTopology: true
      },
      decorate: true
    }
});


// Route for peoples, Planets et starships

    server.route({  
        method: 'GET',
        path: '/people',
        handler: async (request, h) => {

          console.log("start")
          const people = await request.mongo.db.collection('peoples').find({ }).toArray()
          console.log(people)
           
          return people;

          
        }
      
      })

      server.route({  
        method: 'GET',
        path: '/planet',
        handler: async (request, h) => {

          console.log("start")

          // Selec * from planets
          const planet = await request.mongo.db.collection('planets').find({ }).toArray()
          console.log(planet)
           
          return planet;

          
        }
      
      })

      server.route({  
        method: 'GET',
        path: '/starship',
        handler: async (request, h) => {

          console.log("start")
          const starship = await request.mongo.db.collection('starships').find({ }).toArray()
          console.log(starship)
           
          return starship;
          
        }
      
      })


      // Route Detail Pages

      server.route({  
        method: 'GET',
        path: '/people/{id}',
        handler: async (request, h) => {
          console.log("start")
          const people = await request.mongo.db.collection('peoples').find({url : `http://swapi.dev/api/people/${request.params.id}/` }).toArray()
          console.log(people)    
          return people;    
        }
      
      })

      server.route({  
        method: 'GET',
        path: '/planet/{id}',
        handler: async (request, h) => {

          console.log("start")
          const planet = await request.mongo.db.collection('planets').find({url : `http://swapi.dev/api/planets/${request.params.id}/` }).toArray()
          console.log(planet)
           
          return planet;
          
        }
      
      })

      server.route({  
        method: 'GET',
        path: '/starship/{id}',
        handler: async (request, h) => {

          console.log("start")
          const starship = await request.mongo.db.collection('starships').find({url : `http://swapi.dev/api/starships/${request.params.id}/` }).toArray()
          console.log(request.params.id)
          console.log(starship)
           
          return starship; 
        }
      
      })

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();

