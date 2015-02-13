/* jshint node:true */
/* jshint expr:true*/
/* global describe */
/* global before */
/* global it */
'use strict';
require('chai').should();

var pless = require('../lib/prototypeless'),
    raganwald = {
      firstName: 'Reginald',
      lastName: 'Braithwaite',
      alias: 'raganwald',
      pinBank1: 4586,
      pinBank2: 5555
    },
    bank1 = {
      balance: function (pin) {
        return this.accounts[pin];
      },
      depose: function (pin, amount) {
        this.accounts[pin] += amount;
      },
      accounts: {
        4586: 5000
      }
    },
    bank2 = {
      balance: function (pin) {
        return this.accounts[pin];
      },
      depose: function (pin, amount) {
        this.accounts[pin] += amount;
      },
      accounts: {
        5555: 3000
      }
    };



describe('Dynamic Forwarding:', function(){
  describe('uses Bank1:', function(){
    before(function(){
      pless.dynamicForward(raganwald, bank1, 'account');
    });

    it('raganwald should have an "account" property', function(){
      raganwald.should.have.property('account');
    });

    it('raganwald.account should not have bank properties', function(){
      raganwald.account.should.not.have.property('accounts');
    });

    it('raganwald.account should have properties "balance" and  "depose"', function(){
      raganwald.account.should.have.property('balance');
      raganwald.account.should.have.property('depose');
    });

    it('properties "balance" and "depose" should be methods', function(){
      (typeof raganwald.account.balance).should.equal('function');
      (typeof raganwald.account.depose).should.equal('function');
    });

    it('raganwald should have a 5000 deposit', function(){
      raganwald.account.balance(raganwald.pinBank1).should.equal(5000);
    });

    it('raganwald should now have a 7000 deposit', function(){
      raganwald.account.depose(raganwald.pinBank1, 2000);
      raganwald.account.balance(raganwald.pinBank1).should.equal(7000);
    });
  });

  describe('uses Bank2:', function(){
    before(function(){
      pless.dynamicForward(raganwald, bank2, 'account');
    });

    it('raganwald should have an "account" property', function(){
      raganwald.should.have.property('account');
    });

    it('raganwald.account should not have bank properties', function(){
      raganwald.account.should.not.have.property('accounts');
    });

    it('raganwald.account should have properties "balance" and  "depose"', function(){
      raganwald.account.should.have.property('balance');
      raganwald.account.should.have.property('depose');
    });

    it('properties "balance" and "depose" should be methods', function(){
      (typeof raganwald.account.balance).should.equal('function');
      (typeof raganwald.account.depose).should.equal('function');
    });

    it('raganwald should have a 3000 deposit', function(){
      raganwald.account.balance(raganwald.pinBank2).should.equal(3000);
    });

    it('raganwald should now have a 5000 deposit', function(){
      raganwald.account.depose(raganwald.pinBank2, 2000);
      raganwald.account.balance(raganwald.pinBank2).should.equal(5000);
    });
  });
});
