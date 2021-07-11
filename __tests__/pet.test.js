const Pet = require('../src/pet');

describe('constructor', () => {
  it('returns an object', () => {
    expect(new Pet('Gerald')).toBeInstanceOf(Object);
  });

  it('sets the name property', () => {
    const pet = new Pet('Gerald');

    expect(pet.name).toEqual('Gerald');
  });

  it('has an initial age of 0', () => {
    const pet = new Pet('Gerald');

    expect(pet.age).toEqual(0);
  });

  describe('growUp', () => {
    it('increments the age by 1', () => {
      const pet = new Pet('Gerald');
      pet.growUp();

      expect(pet.age).toEqual(1);
    });
  });
});
