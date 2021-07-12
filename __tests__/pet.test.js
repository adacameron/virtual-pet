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

  it('has an initial hunger of 0', () => {
    const pet = new Pet('Gerald');

    expect(pet.hunger).toEqual(0);
  });

  it('has an initial fitness of 10', () => {
    const pet = new Pet('Gerald');

    expect(pet.fitness).toEqual(10);
  });
});

describe('growUp', () => {
  it('increments the age by 1', () => {
    const pet = new Pet('Gerald');
    pet.growUp();

    expect(pet.age).toEqual(1);
  });

  it('increments the hunger by 5', () => {
    const pet = new Pet('Gerald');
    pet.growUp();

    expect(pet.hunger).toEqual(5);
  });

  it('decreases the fitness by 3', () => {
    const pet = new Pet('Gerald');
    pet.growUp();

    expect(pet.fitness).toEqual(7);
  });
});

describe('walk', () => {
  it('increments the fitness by 4, to a maximum of 10', () => {
    const pet = new Pet('Gerald');

    pet.fitness = 8;
    pet.walk();

    expect(pet.fitness).toEqual(10);
  });
});

describe('feed', () => {
  it('decreases the hunger level by 3', () => {
    const pet = new Pet('Gerald');

    pet.hunger = 6;
    pet.feed();

    expect(pet.hunger).toEqual(3);
  });

  it('decreases the hunger level to a minimum of 0', () => {
    const pet = new Pet('Gerald');

    pet.hunger = 2;
    pet.feed();

    expect(pet.hunger).toEqual(0);
  })
})