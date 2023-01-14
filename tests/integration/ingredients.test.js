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