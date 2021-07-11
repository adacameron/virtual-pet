const Pet = require('../src/pet');

describe('constructor', () => {
    it('returns an object', () => {
      expect(new Pet('Gerald')).toBeInstanceOf(Object);
    });

    it('sets the name property', () => {
      const pet = new Pet('Gerald');

      expect(pet.name).toEqual('Gerald');
    });
  });
