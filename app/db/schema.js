var DB = require("./init.js");

DB.knex.schema.createTable('users', 
  function(table){
    table.increments('id').primary();
    table.string('uid');
    table.string('first_name');
    table.string('last_name');
    table.string('phone');
    table.string('name');
    table.timestamps();
  }).then(function(){
  console.log("User schema created successfully. Ctrl + C to quit.");
});