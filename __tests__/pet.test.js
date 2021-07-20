const Pet = require('../src/pet');

let pet;

beforeEach(() => {
  pet = new Pet('Gerald');
});

describe('constructor', () => {
  it('returns an object', () => {
    expect(pet).toBeInstanceOf(Pet);
  });

  it('sets the name property', () => {
    expect(pet.name).toBe('Gerald');
  });

  it('has an initial age of 0', () => {
    expect(pet.age).toBe(0);
  }); 

  it('has an initial hunger of 0', () => {
    expect(pet.hunger).toBe(0);
  });

  it('has an initial fitness of 10', () => {
    expect(pet.fitness).toBe(10);
  });
});

describe('growUp', () => {
  it('increments the age by 1', () => {
    pet.growUp();

    expect(pet.age).toBe(1);
  });

  it('increments the hunger by 5', () => {
    pet.growUp();

    expect(pet.hunger).toBe(5);
  });

  it('decreases the fitness by 3', () => {
    pet.growUp();
    
    expect(pet.fitness).toBe(7);
  });

  it('throws an error message if the pet is no longer alive', () => {
    pet.age = 30;
    expect(() => pet.growUp()).toThrow('Your pet is no longer alive :(');
  });
});

describe('walk', () => {

  it('increments the fitness by 4, to a maximum of 10', () => {
    pet.fitness = 8;
    pet.walk();

    expect(pet.fitness).toBe(10);
  });

  it('throws an error message if the pet is no longer alive', () => {
    pet.fitness = -1;
    expect(() => pet.walk()).toThrow('Your pet is no longer alive :(');
  });
});

describe('feed', () => {
  it('decreases the hunger level by 3', () => {
    pet.hunger = 6;
    pet.feed();

    expect(pet.hunger).toBe(3);
  });

  it('decreases the hunger level to a minimum of 0', () => {
    pet.hunger = 2;
    pet.feed();

    expect(pet.hunger).toBe(0);
  });

  it('throws an error message if the pet is no longer alive', () => {
    pet.hunger = 11;
    expect(() => pet.feed()).toThrow('Your pet is no longer alive :(');
  });
});

describe('checkUp', () => {
  it('returns a message if fitness level is 3 or less', () => {

    pet.fitness = 3;
    pet.checkUp();

    expect(pet.checkUp()).toBe('I need a walk');

    pet.fitness = 2;
    pet.checkUp();

    expect(pet.checkUp()).toBe('I need a walk');

    pet.fitness = 1;
    pet.checkUp();

    expect(pet.checkUp()).toBe('I need a walk');
  });

  it('returns a message if hunger level is 5 or more', () => {

    pet.hunger = 5;
    pet.checkUp();

    expect(pet.checkUp()).toBe('I am hungry');

    pet.hunger = 6;
    pet.checkUp();

    expect(pet.checkUp()).toBe('I am hungry');
  });

  it('returns a message if hunger is 5 or more and fitness is 3 or less', () => {

    pet.hunger = 5;
    pet.fitness = 3;
    pet.checkUp();

    expect(pet.checkUp()).toBe('I am hungry AND I need a walk');

    pet.hunger = 6;
    pet.fitness = 2;
    pet.checkUp();

    expect(pet.checkUp()).toBe('I am hungry AND I need a walk');
  });

  it('returns a message if hunger is 4 or less and fitness is 4 or more', () => {

    pet.hunger = 4;
    pet.fitness = 4;
    pet.checkUp();

    expect(pet.checkUp()).toBe('I feel great!');

    pet.hunger = 3;
    pet.fitness = 5;
    pet.checkUp();

    expect(pet.checkUp()).toBe('I feel great!');
  });

  it('returns a message if the pet is no longer alive', () => {
    pet.age = 30;
    expect(pet.checkUp()).toBe('Your pet is no longer alive :(');
  });
});

describe('isAlive', () => {
  it('returns false if fitness is 0 or less, AND hunger is 10 or more, AND age is 30 or more', () => {

    pet.fitness = 0;
    pet.hunger = 10;
    pet.age = 30;

    expect(pet.isAlive).toBe(false);

    pet.fitness = -1;
    pet.hunger = 11;
    pet.age = 31;

    expect(pet.isAlive).toBe(false);
  });

  it('returns true if fitness is 0 or less, AND hunger is 10 or more, AND age is 30 or more', () => {

    pet.fitness = 1;
    pet.hunger = 9;
    pet.age = 29;

    expect(pet.isAlive).toBe(true);
  });
});

describe('haveBaby', () => {
  it('creates a child object as a property of the parent', () => {
    expect(pet.children).toEqual([]);

    pet.haveBaby('Amelia');

    expect(pet.children).toEqual([
      {
        name: 'Amelia',
        age: 0,
        hunger: 0,
        fitness: 10,
        children: [],
      }
    ])
  });
});

describe('adoptChild', () => {
  it('adds a child object to an array, which is the parent.children property', () => {
    expect(pet.children).toEqual([]);

    let child = new Pet('Marina');
    pet.adoptChild(child);

    expect(pet.children).toEqual([
      {
        name: 'Marina',
        age: 0,
        hunger: 0,
        fitness: 10,
        children: [],
      }
    ])
  });

  it('accesses the pet.children property to feed the child pet', () => {
    let child = new Pet('Marina');

    pet.adoptChild(child);
    child.hunger = 6;
    pet.children[0].feed()

    expect(child.hunger).toBe(3);
    expect(pet.children).toEqual([
      {
        name: 'Marina',
        age: 0,
        hunger: 3,
        fitness: 10,
        children: []
      }
    ]);
  });

  it('throws an error message if the parent pet is no longer alive', () => {
    let child = new Pet('Marina');
    pet.age = 30;

    expect(() => pet.adoptChild(child)).toThrow('Your pet is no longer alive :(');
  });
});




