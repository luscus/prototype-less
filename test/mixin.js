var should = require('should'),
    pless = require('../lib/prototypeless'),
    raganwald = {
      firstName: 'Reginald',
      lastName: 'Braithwaite',
      alias: 'Raganwald'
    },
    male = {
      gender: 'Male'
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
    };



describe('Mixin:', function(){
  pless.mixin(raganwald, male, person);

  it('raganwald should have property "gender" with value "Male"', function(){
    raganwald.should.have.property('gender');
    raganwald.should.have.property('gender', 'Male');
  });

  it('raganwald should have properties "fullName" and "rename"', function(){
    raganwald.should.have.property('fullName');
    raganwald.should.have.property('rename');
  });

  it('properties "fullName" and "rename" should be methods', function(){
    (typeof raganwald.fullName).should.equal('function');
    (typeof raganwald.rename).should.equal('function');
  });
});
