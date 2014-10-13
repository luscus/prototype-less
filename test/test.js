var pless = require('../lib/prototypeless'),
    raganwald = {
      firstName: 'Reginald',
      lastName: 'Braithwaite',
      alias: 'Raganwald'
    },
    person = {
      fullName: function () {
        return this.firstName + " " + this.lastName;
      },
      rename: function (first, last) {
        this.firstName = first;
        this.lastName = last;
        return this;
      }
    },
    hasCareer = {
      career: function () {
        return this.chosenCareer;
      },
      setCareer: function (career) {
        this.chosenCareer = career;
        return this;
      }
    };



pless.mixin(raganwald, person);
pless.privateMixin(raganwald, hasCareer).setCareer('programmer')

console.log('raganwald: ',raganwald);
console.log('raganwald.career(): ', raganwald.career());
