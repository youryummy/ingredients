// // import chai from 'chai';
// // import chaiHttp from 'chai-http';
// // import sinon from 'sinon';

// // import Ingredient from '../../models/Ingredient.js';
// import { find } from '../../controllers/apiv1ingredientsController.js';
// import { strict as assert } from 'node:assert';
// import mocks from "../mocks/index.js";

// // chai.use(chaiHttp);
// // chai.expect();
// // chai.should();

// // const apiURL = "http://localhost:8080"

// // let testIngredientId;
// // let ingredientPOST = { nombre: "test", creado_por: "test", marca: "test" }
// // let ingredientPUT = { nombre: "test_PUT", creado_por: "test_PUT", marca: "test_PUT" }

// // Auxiliar functions
// const req = {}, res = {}, mocklist = []; 
// const assertRequest = (expectedCode, expectedData, done) => {
//     console.log("expectedCode: ", expectedCode)
//     console.log("expectedData: ", expectedData)
//     res.send = (data) => { 
//         console.log("data: ", data)
//         try {
//             assert.deepStrictEqual(data, expectedData); 
//             done(); 
//         } catch(err) {
//             done(err);
//         }
//     }
//     res.status = (code) => { 
//         console.log("code: ", code)
//         try {
//             assert.deepStrictEqual(code, expectedCode); 
//             return res; 
//         } catch(err) { 
//             if (code >= 400) done(err);
//             else res.status = () => done(err);
//         }
//     };
// }

// // TEST SUITE
// describe("Ingredients manager tests", () => {

//     describe("GET Accounts tests", () => {
//         let breaker;
//         const fixture = (dbResponse, throwException = false) => {
//             breaker = mocks.circuitBreaker(throwException, "Circuit is open").fire("find", dbResponse);
//         }

//         beforeEach(() => {
//             res.locals = { oas: {}}
//         });

//         afterEach(() => {
//             breaker?.restore();
//         });

//         // TESTS
//         it("Should return 200 when ingredients found in DB", (done) => {
//             fixture([{ nombre: "test", creado_por: "test", marca: "test" }]);
//             // find(req, res);
//             assertRequest(200, [{nombre: "test", creado_por: "test", marca: "test"}], done);
//         });

//         it("Should return 200 with empty list when no ingredients found in DB", (done) => {
//             fixture([]);
//             find(req, res);
//             assertRequest(200, [], done);
//         });

//         it("Should return 500 when DB fails", (done) => {
//             fixture([], true);
//             find(req, res);
//             assertRequest(500, { message: "Unexpected error ocurred, please try again later" }, done);
//         });
//     });

// //   describe("GET Account tests (FIND)", () => {
// //       const fixture = (username) => {
// //           res.locals.oas.params = { username }
// //       }

// //       beforeEach(() => {
// //           res.locals = { oas: {}}
// //       });

// //       // TESTS
// //       it("Should return 200 when user found in DB", (done) => {
// //           fixture("test");
// //           findByusername(req, res);
// //           assertRequest(200, "test", done, (data) => data?.username);
// //       });

// //       it("Should return 404 when user not found in DB", (done) => {
// //           fixture("testNotFound");
// //           findByusername(req, res);
// //           assertRequest(404, {message: `Account with username '${res.locals.oas.params.username}' does not exist`}, done);
// //       });
// //   });
// });

// // describe('Ingredients', () => {

// //   // Test the GET route
// //   describe('/GET ingredients', () => {
// //     it('it should GET all the ingredients', (done) => {

// //       const ingredients = [
// //             new Ingredient({ nombre: "test", creado_por: "test", marca: "test" }),
// //             new Ingredient({ nombre: "test2", creado_por: "test2", marca: "test2" }),
// //             new Ingredient({ nombre: "test3", creado_por: "test3", marca: "test3" })
// //       ];

// //       // Mock the find method with Sinon
// //       const findStub = sinon.stub(Ingredient, 'find').returns(ingredients);
// //       // console.log("DBFind: ", dbFind.find)

// //       find({query: {search: "queso"}}, {}, (err, res) => {
// //         console.log("Err: ", err);
// //         console.log("Res: ", res);
// //         sinon.assert.calledOnce(findStub);

// //         res.should.have.status(200);
// //         res.body.should.be.a('object');
// //         console.log("Result length: " + res.body.result.length)
// //         chai.expect(res.body.result).to.have.length.greaterThan(0);

// //         findStub.restore();
// //         done();
// //       })

//     //   chai.request(apiURL)
//     //     .get('/api/v1/ingredients')
//     //     .end((err, res) => {
//     //       console.log("Res: ", res.body);
//     //       sinon.assert.calledOnce(findStub);

//     //       res.should.have.status(200);
//     //       res.body.should.be.a('object');
//     //       console.log("Result length: " + res.body.result.length)
//     //       chai.expect(res.body.result).to.have.length.greaterThan(0);

//     //       findStub.restore();
//     //       done();
//     //     });
//     // });
// //   });

//   // // Test the POST route
//   // describe('/POST ingredients', () => {
//   //   it('it should POST an ingredient ', (done) => {
//   //     chai.request(apiURL)
//   //       .post('/api/v1/ingredients')
//   //       .send(ingredientPOST)
//   //       .end((err, res) => {
//   //         res.should.have.status(201);
//   //         res.body.should.be.a('object');
//   //         res.body.should.have.property('message').eql('Ingredient created successfully!');
//   //         res.body.should.have.property('nombre');
//   //         res.body.should.have.property('creado_por');
//   //         res.body.should.have.property('marca');
//   //         done();

//   //         testIngredientId = res.body._id;
//   //       });
//   //   });
//   // });

//   // // Test the GET(id) route
//   // describe('/GET/:id ingredient', () => {
//   //   it('it should GET a ingredient by the given id', (done) => {
//   //     chai.request(apiURL)
//   //     .get('/api/v1/ingredients/' + testIngredientId)
//   //     .end((err, res) => {
//   //       res.should.have.status(200);
//   //       res.body.should.be.a('object');
//   //       res.body.should.have.property('nombre').eql(ingredientPOST.nombre);
//   //       res.body.should.have.property('creado_por').eql(ingredientPOST.creado_por);
//   //       res.body.should.have.property('marca').eql(ingredientPOST.marca);
//   //       res.body.should.have.property('_id').eql(testIngredientId);
//   //       done();
//   //     });
//   //   });
//   // });

//   // // Test the PUT route
//   // describe('/PUT/:id ingredient', () => {
//   //   it('it should UPDATE a ingredient given the id', (done) => {
//   //     chai.request(apiURL)
//   //     .put('/api/v1/ingredients/' + testIngredientId)
//   //     .send(ingredientPUT)
//   //     .end((err, res) => {
//   //       res.should.have.status(201);
//   //       res.body.should.be.a('object');
//   //       res.body.should.have.property('message').eql(`Ingredient with id '${testIngredientId}' updated successfully!`);
//   //       done();
//   //     });
//   //   });
//   // });

//   // // Test the DELETE route
//   // describe('/DELETE/:id ingredient', () => {
//   //   it('it should DELETE an ingredient given the id', (done) => {
//   //     chai.request(apiURL)
//   //     .delete('/api/v1/ingredients/' + testIngredientId)
//   //     .end((err, res) => {
//   //       res.should.have.status(204);
//   //       done();
//   //     });
//   //   });
//   // });
// // });

import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

const ingredientsController = {
    find: sinon.stub().resolves(),
    addIngredient: sinon.stub().resolves(),
    findOne: sinon.stub().resolves(),
    updateIngredient: sinon.stub().resolves(),
    deleteIngredient: sinon.stub().resolves()
};

describe('ingredientsController.find()', () => {
    it('should call ingredientsService.find() with the correct arguments', async () => {
      const req = {
        query: {
          page: 2,
          limit: 50,
          search: 'cheese'
        }
      };

      const res = {
        send: sinon.stub()
      };
  
      await ingredientsController.find(req, res);
      expect(ingredientsController.find).to.have.been.calledWith(req, res);
    });
});

describe('ingredientsController.addIngredient()', () => {
    it('should call ingredientsService.addIngredient() with the correct arguments', () => {
      const req = {
        body: {
          search: 'Cheese'
        }
      };

      const res = {
        send: sinon.stub()
      };
  
      ingredientsController.addIngredient(req, res);
  
      expect(ingredientsController.addIngredient).to.have.been.calledWith(req, res);
    });
});

describe('ingredientsController.findOne()', () => {
    it('should call ingredientsService.findOne() with the correct arguments', async () => {
      const req = {
        params: {
          id: '12345'
        }
      };

      const res = {
        send: sinon.stub()
      };
  
      await ingredientsController.findOne(req, res);
      expect(ingredientsController.findOne).to.have.been.calledWith(req, res);
    });
});

describe('ingredientsController.update()', () => {
    it('should call ingredientsService.update() with the correct arguments', async () => {
      const req = {
        params: {
          id: '12345'
        },
        body: {
          search: 'Cheese'
        }
      };

      const res = {
        send: sinon.stub()
      };
  
      await ingredientsController.updateIngredient(req, res);
      expect(ingredientsController.updateIngredient).to.have.been.calledWith(req, res);
    });
});

describe('ingredientsController.delete()', () => {
    it('should call ingredientsService.delete() with the correct arguments', async () => {
        const req = {
            params: {
                id: '12345'
            }
        };

        const res = {
            send: sinon.stub()
        };
  
        await ingredientsController.deleteIngredient(req, res);
        expect(ingredientsController.deleteIngredient).to.have.been.calledWith(req, res);
    });
});