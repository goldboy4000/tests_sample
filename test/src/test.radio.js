var expect = chai.expect;
var should = chai.should;
var assert = chai.assert;

describe('Radio', function () {

   describe('property:topics', function () {
       it('should be an object', function () {
           expect(radio.topics).to.be.an.instanceOf(Object);
       });
       it('should be empty', function () {
           expect(radio.topics).to.be.empty;
       });
   });

   describe('method:on', function () {

       beforeEach(function () {
           radio.topics = {};
       });

       it('should be an function', function () {
           expect(radio.on).to.be.an.instanceOf(Function);
       });

       it('should create new topic if topics is empty', function () {
           var test_topic = 'test_topic';
           var callback = function () {};
           radio.on(test_topic, callback);
           expect(radio.topics).to.have.property(test_topic);
       });

       it('should not create new topic if topics has one', function () {
           var test_topic = 'test_topic';
           var callback = function () {};
           var callback2 = function () {};
           radio.topics = {test_topic: [callback]};
           radio.on(test_topic, callback2);
           expect(radio.topics).to.deep.include({test_topic: [callback, callback2]});
       });
   });

    describe('method:once', function () {
        it('should called once', function () {
            var radioOfSpy = sinon.spy(radio, 'off');


            var test_topic = 'test_topic';
            var callback = function () {};
            radio.once(test_topic, callback);
            radio.trigger(test_topic);

            sinon.assert.calledOnce(radioOfSpy);
        });
    });
});