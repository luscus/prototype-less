var should = require('should'),
    pless = require('../lib/prototypeless'),
    raganwald = {
      firstName: 'Reginald',
      lastName: 'Braithwaite',
      alias: 'raganwald',
      money: 10
    },
    colleague = {
      buyBotdog: function () {
        this.money -= 5;
      },
      buySoda: function () {
        this.money -= 2;
      },
      someProperty: false
    };



describe('Delegate:', function(){
  pless.delegate(raganwald, colleague);

  it('raganwald should not have property "someProperty"', function(){
    raganwald.should.not.have.property('someProperty');
  });

  it('raganwald should have properties "buyBotdog" and  "buySoda"', function(){
    raganwald.should.have.property('buyBotdog');
    raganwald.should.have.property('buySoda');
  });

  it('properties "buyBotdog" and "buySoda" should be methods', function(){
    (typeof raganwald.buyBotdog).should.equal('function');
    (typeof raganwald.buySoda).should.equal('function');
  });

  it('raganwald\'s colleague buys a hotdog for him. money equals 5', function(){
    raganwald.buyBotdog();
    raganwald.money.should.equal(5);
  });

  it('raganwald\'s colleague buys a hotdog for him. money equals 3', function(){
    raganwald.buySoda();
    raganwald.money.should.equal(3);
  });
});
