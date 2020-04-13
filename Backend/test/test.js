var assert = require('chai').assert;
var app = require('../index');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);

describe('Canvas App', function(){

    it('GET /products',function(){
        agent.get('/products')
            .then(function(res){
                expect(res.body.result[0].CourseId).to.equal("CMPE273");
            });
    });
})