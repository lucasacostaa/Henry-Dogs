/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Dog, conn } = require("../../src/db.js");

const agent = session(app);

const dog = {
  name: "Pug",
  weight: "ss",
  height: "123",
  life_span: "123",
};

describe("/dogs", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  before(() =>
    agent.get("/temperament").catch((err) => {
      console.error(err);
    })
  );
  describe("/dogs", () => {
    it("should return only 8 dogs", () =>
      agent.get("/dogs")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(function (res) {
        expect(res.body.dogsFound).to.have.lengthOf(8)})
    );
    
    it("should return pagination data", () => {
      agent // supertest nos permite hacer y testear requests HTTP
        .get("/dogs") // hacemos un request HTTP: GET a '/families'
        .expect(200) // el codigo de status del response
        .expect("Content-Type", /json/) // podemos testear los headers
        .expect(function (res) {
          expect(res.body).to.have.property('paginationData'); // testeamos la respuesta con el body
          expect(res.body.paginationData).to.have.all.keys('pages', 'pagesLeft', 'currentPage');
        })
    });

    it("should return dog's temperament", () => {
      agent // supertest nos permite hacer y testear requests HTTP
        .get("/dogs?page=1") // hacemos un request HTTP: GET a '/families'
        .expect(200) // el codigo de status del response
        .expect("Content-Type", /json/) // podemos testear los headers
        .expect(function (res) {
          expect(res.body.dogsFound[0]).to.have.property("asdasd"); // testeamos la respuesta con el body
        }) 
    });

    it("should only return the data needed for the main route", () => {
      agent // supertest nos permite hacer y testear requests HTTP
        .get("/dogs?page=1") // hacemos un request HTTP: GET a '/families'
        .expect(200) // el codigo de status del response
        .expect("Content-Type", /json/) // podemos testear los headers
        .expect(function (res) {
          expect(res.body.dogsFound[0]).to.have.all.keys("id", "name", "temperaments", "image", "weight_avg"); // testeamos la respuesta con el body
        })
    });

});
});

/* describe('/dogs', function() {
  it("should return only 8 dogs", function (done) {
    return agent // supertest nos permite hacer y testear requests HTTP
      .get("/dogs") // hacemos un request HTTP: GET a '/families'
      .expect(200) // el codigo de status del response
      .expect("Content-Type", /json/) // podemos testear los headers
      .expect(function (res) {
        expect(res.body.dogsFound).to.have.lengthOf(8); // testeamos la respuesta con el body
      })
  });
}); */

/* it("should return pagination data", function (done) {
    return agent // supertest nos permite hacer y testear requests HTTP
      .get("/dogs") // hacemos un request HTTP: GET a '/families'
      .expect(200) // el codigo de status del response
      .expect("Content-Type", /json/) // podemos testear los headers
      .expect(function (res) {
        expect(res.body).to.have.property('paginationData'); // testeamos la respuesta con el body
        expect(res.body.paginationData).to.have.all.keys('pages', 'pagesLeft', 'currentPage');
      })
  }); */

/* it("should return dog's temperament", function (done) {
    return agent // supertest nos permite hacer y testear requests HTTP
      .get("/dogs/?page=1") // hacemos un request HTTP: GET a '/families'
      .expect(200) // el codigo de status del response
      .expect("Content-Type", /json/) // podemos testear los headers
      .expect(function (res) {
        expect(res.body.dogsFound[0]).to.have.property("temperaments"); // testeamos la respuesta con el body
      }) 
  }); */

/* it("should only return the data needed for the main route", function (done) {
    return agent // supertest nos permite hacer y testear requests HTTP
      .get("/dogs/?page=1") // hacemos un request HTTP: GET a '/families'
      .expect(200) // el codigo de status del response
      .expect("Content-Type", /json/) // podemos testear los headers
      .expect(function (res) {
        expect(res.body.dogsFound[0]).to.have.all.keys("id", "name", "temperaments", "image", "weight_avg"); // testeamos la respuesta con el body
      })
  }); */
