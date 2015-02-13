/* jshint node:true */
/* jshint expr:true*/
/* global describe */
/* global it */
'use strict';
require('chai').should();

var pless = require('../lib/prototypeless'),
    raganwald = {
      firstName: 'Reginald',
      lastName: 'Braithwaite',
      alias: 'Raganwald'
    },
    hasCareer = {
      career: function () {
        return this.chosenCareer;
      },
      setCareer: function (career) {
        this.chosenCareer = career;
        return this;
      },
      chosenCareer: 'unemployed'
    };



describe('Private Mixin:', function(){
  pless.privateMixin(raganwald, hasCareer);

  it('raganwald should not have property "chosenCareer"', function(){
    raganwald.should.not.have.property('chosenCareer');
  });

  it('raganwald should have properties "career" and  "setCareer"', function(){
    raganwald.should.have.property('career');
    raganwald.should.have.property('setCareer');
  });

  it('properties "career" and "setCareer" should be methods', function(){
    (typeof raganwald.career).should.equal('function');
    (typeof raganwald.setCareer).should.equal('function');
  });

  it('raganwald should be "unemployed" at first', function(){
    raganwald.career().should.equal('unemployed');
  });

  it('raganwald should be "developer"', function(){
    raganwald.setCareer('developer');

    raganwald.should.not.have.property('chosenCareer');
    raganwald.career().should.equal('developer');
  });
});
