var should = require('should'),
    pless = require('../lib/prototypeless'),
    raganwald = {
      firstName: 'Reginald',
      lastName: 'Braithwaite',
      alias: 'raganwald',
      pin: 4586
    },
    bank = {
      balance: function (pin) {
        return this.accounts[pin];
      },
      depose: function (pin, amount) {
        this.accounts[pin] += amount;
      },
      accounts: {
        4586: 5000
      }
    };



describe('Forwarding:', function(){
  pless.forward(raganwald, bank);

  it('raganwald should not have bank properties', function(){
    raganwald.should.not.have.property('accounts');
  });

  it('raganwald should have properties "balance" and  "depose"', function(){
    raganwald.should.have.property('balance');
    raganwald.should.have.property('depose');
  });

  it('properties "balance" and "depose" should be methods', function(){
    (typeof raganwald.balance).should.equal('function');
    (typeof raganwald.depose).should.equal('function');
  });

  it('raganwald should have a 5000 deposit', function(){
    raganwald.balance(raganwald.pin).should.equal(5000);
  });

  it('raganwald should now have a 7000 deposit', function(){
    raganwald.depose(raganwald.pin, 2000);
    raganwald.balance(raganwald.pin).should.equal(7000);
  });
});
