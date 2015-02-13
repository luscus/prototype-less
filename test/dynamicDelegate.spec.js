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
      money: 10
    },
    colleague1 = {
      buyBotdog: function () {
        this.money -= 5;
      },
      buySoda: function () {
        this.money -= 2;
      }
    },
    colleague2 = {
      buyDessert: function () {
        this.money -= 3;
      }
    };



describe('Dynamic Delegate:', function(){
  describe('colleague1:', function(){
    before(function(){
      pless.dynamicDelegate(raganwald, colleague1, 'colleague');
    });

    it('raganwald should have an "colleague" property', function(){
      raganwald.should.have.property('colleague');
    });

    it('raganwald.colleague should have properties "buyBotdog" and  "buySoda"', function(){
      raganwald.colleague.should.have.property('buyBotdog');
      raganwald.colleague.should.have.property('buySoda');
    });

    it('properties "buyBotdog" and "buySoda" should be methods', function(){
      (typeof raganwald.colleague.buyBotdog).should.equal('function');
      (typeof raganwald.colleague.buySoda).should.equal('function');
    });

    it('raganwald\'s colleague buys a hotdog for him. money equals 5', function(){
      raganwald.colleague.buyBotdog();
      raganwald.money.should.equal(5);
    });

    it('raganwald\'s colleague buys a soda for him. money equals 3', function(){
      raganwald.colleague.buySoda();
      raganwald.money.should.equal(3);
    });
  });

  describe('colleague2:', function(){
    before(function(){
      pless.dynamicDelegate(raganwald, colleague2, 'colleague');
    });

    it('raganwald should have an "colleague" property', function(){
      raganwald.should.have.property('colleague');
    });

    it('raganwald.colleague should not have properties "buyBotdog" and  "buySoda"', function(){
      raganwald.colleague.should.not.have.property('buyBotdog');
      raganwald.colleague.should.not.have.property('buySoda');
    });

    it('raganwald.colleague should have property "buyDessert"', function(){
      raganwald.colleague.should.have.property('buyDessert');
    });

    it('property "buyDessert" should be a method', function(){
      (typeof raganwald.colleague.buyDessert).should.equal('function');
    });

    it('raganwald\'s colleague buys a dessert for him. money equals 0', function(){
      raganwald.colleague.buyDessert();
      raganwald.money.should.equal(0);
    });
  });
});
