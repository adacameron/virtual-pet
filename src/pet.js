const START_AGE = 0;
const MAXIMUM_FITNESS = 10;
const MINIMUM_HUNGER = 0;
const CRITICAL_FITNESS = 3;
const CRITICAL_HUNGER = 5;
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
    return this.age < 30 && this.hunger < 10 && this.fitness >= 0;
  }
}

Pet.prototype.growUp = function () {
  if (!this.isAlive) {
    throw new Error(PET_DEAD_ERROR);
  }

  this.age += 1;
  this.hunger += 5;
  this.fitness -= 3;
};

Pet.prototype.walk = function () {
  if (!this.isAlive) {
    throw new Error(PET_DEAD_ERROR);
  }

  if (this.fitness <= CRITICAL_FITNESS) {
    this.fitness += 4;
  } else {
    this.fitness = MAXIMUM_FITNESS;
  };
};

Pet.prototype.feed = function () {
  if (!this.isAlive) {
    throw new Error(PET_DEAD_ERROR);
  }

  if (this.hunger >= CRITICAL_HUNGER) {
    this.hunger -= 3;
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
  }

  this.children.push(new Pet(child));

};

Pet.prototype.adoptChild = function (child) {
  if (!this.isAlive) {
    throw new Error(PET_DEAD_ERROR);
  }

  this.children.push(child);
};



module.exports = Pet;