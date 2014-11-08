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
        return this.firstName + ' ' + this.lastName;
      },
      rename: function (first, last) {
        this.firstName = first || this.firstName;
        this.lastName = last || this.lastName;
        return this;
      },
      status: {
        work: 'unemployed'
      }
    },
    employee = {
      alias: 'Rag',
      status: {
        work: 'employed'
      }
    };



describe('Mixin:', function(){
  pless.mixin(raganwald, male);
  pless.mixin(raganwald, person);
  pless.mixin(raganwald, employee);

  it('raganwald should have property "gender" with value "Male"', function(){
    raganwald.should.have.property('gender');
    raganwald.should.have.property('gender', 'Male');
  });

  it('raganwald should have properties "fullName" and "rename"', function(){
    raganwald.should.have.property('fullName');
    raganwald.should.have.property('rename');
  });

  it('raganwald should have property "alias" overwritten', function(){
    raganwald.should.have.property('alias', 'Rag');
  });

  it('raganwald should have deep property "work" overwritten', function(){
    raganwald.status.should.have.property('work', 'employed');
  });

  it('properties "fullName" and "rename" should be methods' +
     'returning Object propertie values', function(){
    (typeof raganwald.fullName).should.equal('function');
    (typeof raganwald.rename).should.equal('function');

    raganwald.rename();
    raganwald.fullName().should.equal('Reginald Braithwaite');
  });
});
