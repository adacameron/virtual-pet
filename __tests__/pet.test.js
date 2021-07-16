const Pet = require('../src/pet');

describe('constructor', () => {
  let pet;

  beforeEach(() => {
    pet = new Pet('Gerald');
  });

  it('returns an object', () => {
    expect(new Pet('Gerald')).toBeInstanceOf(Object);
  });

  it('sets the name property', () => {
    expect(pet.name).toEqual('Gerald');
  });

  it('has an initial age of 0', () => {
    expect(pet.age).toEqual(0);
  });

  it('has an initial hunger of 0', () => {
    expect(pet.hunger).toEqual(0);
  });

  it('has an initial fitness of 10', () => {
    expect(pet.fitness).toEqual(10);
  });
});

describe('growUp', () => {

  beforeEach(() => {
    pet = new Pet('Gerald');
  });

  it('increments the age by 1', () => {
    pet.growUp();

    expect(pet.age).toEqual(1);
  });

  it('increments the hunger by 5', () => {
    pet.growUp();

    expect(pet.hunger).toEqual(5);
  });

  it('decreases the fitness by 3', () => {
    pet.growUp();

    expect(pet.fitness).toEqual(7);
  });

  it('throws an error message if the pet is no longer alive', () => {
    pet.age = 30;
    expect(() => pet.growUp()).toThrow('Your pet is no longer alive :(');
  });
});

describe('walk', () => {

  beforeEach(() => {
    pet = new Pet('Gerald');
  });

  it('increments the fitness by 4, to a maximum of 10', () => {
    pet.fitness = 8;
    pet.walk();

    expect(pet.fitness).toEqual(10);
  });

  it('throws an error message if the pet is no longer alive', () => {
    pet.age = 30;
    expect(() => pet.walk()).toThrow('Your pet is no longer alive :(');
  });
});

describe('feed', () => {

  beforeEach(() => {
    pet = new Pet('Gerald');
  });

  it('decreases the hunger level by 3', () => {
    pet.hunger = 6;
    pet.feed();

    expect(pet.hunger).toEqual(3);
  });

  it('decreases the hunger level to a minimum of 0', () => {
    pet.hunger = 2;
    pet.feed();

    expect(pet.hunger).toEqual(0);
  });

  it('throws an error message if the pet is no longer alive', () => {
    pet.age = 30;
    expect(() => pet.feed()).toThrow('Your pet is no longer alive :(');
  });
});

describe('checkUp', () => {
  
  beforeEach(() => {
    pet = new Pet('Gerald');
  });

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

    pet.fitness = 0;
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
  
  beforeEach(() => {
    pet = new Pet('Gerald');
  });

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

  it('returns false if fitness is 0 or less, AND hunger is 10 or more, AND age is 30 or more', () => {

    pet.fitness = 1;
    pet.hunger = 9;
    pet.age = 29;

    expect(pet.isAlive).toBe(true);
  });
});

describe('haveBaby', () => {
  it('creates a child object as a property of the parent', () => {
    let parent = new Pet('Dave');

    expect(parent.children).toEqual([]);

    parent.haveBaby('Amelia');

    expect(parent.children).toEqual([
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

    let parent = new Pet('Henry');

    expect(parent.children).toEqual([]);

    let child = new Pet('Marina');
    parent.adoptChild(child);

    expect(parent.children).toEqual([
      {
        name: 'Marina',
        age: 0,
        hunger: 0,
        fitness: 10,
        children: [],
      }
    ])
  });

  it('accesses the parent.children property to feed the child pet', () => {

    let parent = new Pet('Henry');
    let child = new Pet('Marina');
    
    parent.adoptChild(child);
    child.hunger = 6;
    parent.children[0].feed()

    expect(child.hunger).toEqual(3);
    expect(parent.children).toEqual([
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
    let parent = new Pet('Henry');
    let child = new Pet('Marina');
    parent.age = 30;
  
    expect(() => parent.adoptChild(child)).toThrow('Your pet is no longer alive :(');
  });
});




