function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
};

var Character = function (obj) {
    this.name = obj.name;
    this.attack = obj.attack;
    this.hitpoints = obj.hitpoints;//health
    this.totalHitpoint = this.hitpoints;
    this.block = false;
};
Character.prototype.getHitpoints = function() {
    return this.hitpoints;
};

Character.prototype.setHitpoints = function (value) {
    this.hitpoints -= value;
};

Character.prototype.getTotalHitpoints = function () {
    return this.totalHitpoint;
};

Character.prototype.setTotalHitpoints = function (value) {
    this.totalHitpoint += value;
};

Character.prototype.getAttack = function () {
    return this.attack;
};

Character.prototype.setAttack = function (value) {
    this.attack += value;
};

Character.prototype.fight = function (otherCharacter) {
    if(typeof otherCharacter === 'object' && otherCharacter.name !== this.name){
        otherCharacter.setHitpoints(this.attack);
        if (otherCharacter.getHitpoints() <= 0) {
            this.setAttack(1);
        }
    } else {
        console.log('you can`t fight with yourself');
    }
};

Character.prototype.isAlive = function () {
    return (this.getHitpoints()>0 );
};
//Champion class constructor ***********************************************************************
var Champion = function (obj) {
    Character.call(this, obj);
};

inherits(Champion, Character);
//**************************************************************************************************
Champion.prototype.rest = function () {
    this.setHitpoints(-5);
};

Champion.prototype.defence = function () {
    this.block = true;
};

//Monster class constructor ***********************************************************************
var Monster = function (obj) {
    Character.call(this, obj);
    this.countOfRageAttacks = 0;
};
inherits(Monster, Character);

Monster.prototype.enrage = function () {
    this.countOfRageAttacks = 2;
};

Monster.prototype.fight = function (otherCharacter) {
    if(typeof otherCharacter === 'object' && otherCharacter.name !== this.name && !otherCharacter.block){
        if(this.countOfRageAttacks > 0) {
            otherCharacter.setHitpoints(this.attack*2);
            this.countOfRageAttacks --;
        } else {
            otherCharacter.setHitpoints(this.attack);

        }
        if (otherCharacter.getHitpoints() <= 0) {
            this.setHitpoints(-Math.floor(otherCharacter.getTotalHitpoints()*0.25));
            this.setTotalHitpoints(Math.floor(otherCharacter.getTotalHitpoints()*0.1));

        }
    } else {
        console.log('Pls, fight appropriate challenger');
    }
    otherCharacter.block = false;
};
//**************************************************************************************************


var heracles = new Champion({name: 'Heracles', attack: 45, hitpoints: 50});
var boar = new Monster({name: 'Erymanthian Boar', attack: 5, hitpoints: 100});

console.log(heracles.name);
console.log(boar.name);

// heracles.fight(boar);
// console.log(boar.isAlive());
// heracles.fight(boar);
// console.log(boar.isAlive());
// heracles.fight(boar);
// console.log(boar.isAlive());
// console.log(heracles.attack);
//heracles.rest();
// boar.enrage();
// boar.fight(heracles);
//console.log('im hear ' +heracles.getTotalHitpoints());
//console.log(heracles.getHitpoints());
   heracles.defence();
   boar.fight(heracles);
   boar.fight(heracles);
   boar.fight(heracles);
// boar.fight(heracles);
// boar.fight(heracles);
// boar.fight(heracles);
// boar.fight(heracles);
// boar.fight(heracles);
// boar.fight('asd');
// console.log(heracles.isAlive());
// boar.fight(heracles);
// console.log(heracles.isAlive());
// console.log(heracles.getHitpoints());
// console.log(boar.getHitpoints());
// heracles.fight(boar);
// console.log(heracles.countOfAttacks);

module.exports = Character;
module.exports = Monster;
module.exports = Champion;
