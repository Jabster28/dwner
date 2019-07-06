const testhelper = require("./helper");
const app = testhelper.init();
console.log(testhelper);
const chaiAsPromised = require("chai-as-promised");
const chai = require("chai");
chai.should();
chai.use(chaiAsPromised);

before(function() {
  console.log(0);
  chaiAsPromised.transferPromiseness = app.transferPromiseness;
  console.log(1);
  return app.start();
});

after(function() {
  console.log(4);
  return app.stop();
});
describe("Main", function() {
  it("open window", function() {
    console.log(2);
    return app.client
      .waitUntilWindowLoaded()
      .getWindowCount()
      .should.eventually.equal(1);
  });
  it("JS runs", function() {
    console.log(3);
    return app.client.getText("#greet").then(text => {
      chai.expect(text).to.equal("Hii!!!");
    });
  });
});
