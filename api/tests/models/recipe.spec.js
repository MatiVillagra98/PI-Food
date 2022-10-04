const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true } ));
    describe('title', () => {
      it('should throw an error if title is null', (done) => {
        Recipe.create({}) 
          .then(() => done(new Error('It requires a valid title'))) 
          .catch(() => done());
      }); 
      it('should work when its a valid title', () => {
        Recipe.create({ title: 'Milanesa a la napolitana' })
          .then(() => done()) 
      });  
      it('should throw an error if title is a number', (done) => {
        Recipe.create({ title: 5}) 
        .then(() => done(new Error('Must be a string')))
        .catch(() => done());
      })
    });
    describe('summary', () => {
      it('should throw an error if summary is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid summary')))
          .catch(() => done());
      });
    })
    describe('health', () => {
      it('should throw an error if health is string', (done) => {
        Recipe.create({health: 'health'})
          .then(() => done(new Error('Should be a number')))
          .catch(() => done());
      });
      it('should work when its a valid value', () => {
        Recipe.create({ health: 5 })
          .then(() => done())
      });
    })
    describe('image', () => {
      it('should throw an error if image is a number', (done) => {
        Recipe.create({ image: 5 })
          .then(() => done(new Error('Should be a string'))) 
          .catch(() => done());
      });
      it('should work when its a valid value', () => {
        Recipe.create({ image: 'image' })
          .then(() => done())
      });
    })
  });
});
