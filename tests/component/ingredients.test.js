import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
chai.expect();
chai.should();

const apiURL = "http://localhost:8080"

let testIngredientId;
let ingredientPOST = { nombre: "test", creado_por: "test", marca: "test" }
let ingredientPUT = { nombre: "test_PUT", creado_por: "test_PUT", marca: "test_PUT" }

describe('Ingredients', () => {

  before(() => {
    // Wait for the service to start
    let delay = new Promise(resolve => setTimeout(resolve, 3000))
    return delay
  })

  // Test the GET route
  describe('/GET ingredients', () => {
    it('it should GET all the ingredients', (done) => {
      chai.request(apiURL)
        .get('/api/v1/ingredients')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          console.log("Result length: " + res.body.result.length)
          chai.expect(res.body.result).to.have.length.greaterThan(0);
          done();
        });
    });
  });

  // Test the POST route
  describe('/POST ingredients', () => {
    it('it should POST an ingredient ', (done) => {
      chai.request(apiURL)
        .post('/api/v1/ingredients')
        .send(ingredientPOST)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Ingredient created successfully!');
          res.body.should.have.property('nombre');
          res.body.should.have.property('creado_por');
          res.body.should.have.property('marca');
          done();

          testIngredientId = res.body._id;
        });
    });
  });

  // Test the GET(id) route
  describe('/GET/:id ingredient', () => {
    it('it should GET a ingredient by the given id', (done) => {
      chai.request(apiURL)
      .get('/api/v1/ingredients/' + testIngredientId)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('nombre').eql(ingredientPOST.nombre);
        res.body.should.have.property('creado_por').eql(ingredientPOST.creado_por);
        res.body.should.have.property('marca').eql(ingredientPOST.marca);
        res.body.should.have.property('_id').eql(testIngredientId);
        done();
      });
    });
  });

  // Test the PUT route
  describe('/PUT/:id ingredient', () => {
    it('it should UPDATE a ingredient given the id', (done) => {
      chai.request(apiURL)
      .put('/api/v1/ingredients/' + testIngredientId)
      .send(ingredientPUT)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql(`Ingredient with id '${testIngredientId}' updated successfully!`);
        done();
      });
    });
  });

  // Test the DELETE route
  describe('/DELETE/:id ingredient', () => {
    it('it should DELETE an ingredient given the id', (done) => {
      chai.request(apiURL)
      .delete('/api/v1/ingredients/' + testIngredientId)
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
    });
  });
});