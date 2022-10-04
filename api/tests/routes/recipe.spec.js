/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  id: '123db',
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
    describe('GET /recipes', () => {
      it('should get 202', () =>
        agent.get('/recipes').expect(202)
      );
    });
    describe('GET /recipes/:id', () => {  
      it('should get 200', () =>  
        agent.get('/recipes/716426').then((res) => {
        expect(res.body[0].title).to.be.equal('Cauliflower, Brown Rice, and Vegetable Fried Rice')
        }) 
      );
    }); 
  describe('POST /recipes', () => { 
    it('should get 201 if recipe is created', () => 
      agent.post('/recipes').send({ 
        title: 'Receta de prueba', 
        summary: 'Receta para prueba' 
      }).expect(201)     
    ); 
  }); 
});   