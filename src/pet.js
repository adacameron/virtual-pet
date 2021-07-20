const START_AGE = 0;
const AGE_INCREMENT = 1;
const MAXIMUM_AGE = 30;

const MINIMUM_FITNESS = 1;
const MAXIMUM_FITNESS = 10;
const CRITICAL_FITNESS = 3;
const FITNESS_INCREMENT = 4;
const FITNESS_DECREMENT = 3;

const MINIMUM_HUNGER = 0;
const MAXIMUM_HUNGER = 10;
const CRITICAL_HUNGER = 5;
const HUNGER_INCREMENT = 5;
const HUNGER_DECREMENT = 3;

const PET_DEAD_ERROR = 'Your pet is no longer alive :(';

function Pet(name) {
  this.name = name;
  this.age = START_AGE;
  this.hunger = MINIMUM_HUNGER;
  this.fitness = MAXIMUM_FITNESS;
  this.children = [];
};

Pet.prototype = {
  get isAlive() {
    return this.age < MAXIMUM_AGE && this.hunger < MAXIMUM_HUNGER && this.fitness >= MINIMUM_FITNESS;
  }
}; 

Pet.prototype.growUp = function () {
  if (!this.isAlive) {
    throw new Error(PET_DEAD_ERROR);
  };

  this.age += AGE_INCREMENT;
  this.hunger += HUNGER_INCREMENT;
  this.fitness -= FITNESS_DECREMENT;
};

Pet.prototype.walk = function () {
  if (!this.isAlive) {
    throw new Error(PET_DEAD_ERROR);
  };

  if (this.fitness <= CRITICAL_FITNESS) {
    this.fitness += FITNESS_INCREMENT;
  } else {
    this.fitness = MAXIMUM_FITNESS;
  };
};

Pet.prototype.feed = function () {
  if (!this.isAlive) {
    throw new Error(PET_DEAD_ERROR);
  }

  if (this.hunger >= CRITICAL_HUNGER) {
    this.hunger -= HUNGER_DECREMENT;
  } else {
    this.hunger = MINIMUM_HUNGER;
  };
};

Pet.prototype.checkUp = function () {
  if (!this.isAlive) {
    return PET_DEAD_ERROR;

  } else if (
    this.fitness <= CRITICAL_FITNESS &&
    this.hunger >= CRITICAL_HUNGER
  ) {
    return 'I am hungry AND I need a walk';

  } else if (this.fitness <= CRITICAL_FITNESS) {
    return 'I need a walk';

  } else if (this.hunger >= CRITICAL_HUNGER) {
    return 'I am hungry';

  } else {
    return 'I feel great!';
  };
};

Pet.prototype.haveBaby = function (child) {
  if (!this.isAlive) {
    throw new Error(PET_DEAD_ERROR);
  };

  this.children.push(new Pet(child));

};

Pet.prototype.adoptChild = function (child) {
  if (!this.isAlive) {
    throw new Error(PET_DEAD_ERROR);
  };

  this.children.push(child);
};

module.exports = Pet;