const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');

const dog = {
  name: "Pug",
  weight: "ss",
  height: "123",
  life_span: "123",
};

describe('Dog model', () => {
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: false }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it("shouldn't work when its only name", () => {
        Dog.create({ name: 'Pug' })
          .then(res => done())
          .catch(res => done())
      });
      it("should work when its complete", () => {
        Dog.create(dog)
          .then(res => done())
          .catch(res => done())
      });
    });
  });
});
