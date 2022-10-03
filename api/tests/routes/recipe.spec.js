/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  id: 1,
  title: 'Milanea a la napolitana',
  summary: 'Descripcion de receta'
};

describe('Recipe routes', () => { 
  before(() => conn.authenticate() 
  .catch((err) => {  
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  // describe('GET /recipes', () => {
  //   xit('should get 202', () =>
  //     agent.get('/recipes').expect(202)  
  //   ); 
  // });
  // describe('GET /recipes/:id', () => {  
  //   xit('should get 200', () =>  
  //     agent.get('/recipes/1db').expect(202)
  //   );  
  // }); 
  describe('POST /recipes', () => {
    it('should get 200', () =>
      agent.post('/recipes').send({ title: 'me', summary: '123' }).expect(202)    
    ); 
  }); 
});   