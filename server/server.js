const express = require("express");
const app = express();
const stores = require("./data/stores");
const _ = require('lodash');


app.get('/api/stores', (req,res) => {
    var response = [];
    if(typeof req.query.nsfw != 'undefined'){
      response = stores.filter(
        store => Object.entries(req.query).every(
          ([key, value]) => {
            return store[key].toString() === value
          }
      ))
    }
       // de-duplication:
       response = _.uniqBy(response, 'id');
     // in case no filtering has been applied, respond with all stores
     if(Object.keys(req.query).length === 0){
        response = stores;
      }
    res.json(response)
})

app.listen(3000, () => console.log('Listening on port 3000'))