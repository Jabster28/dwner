const testhelper = require("./helper");
const app = testhelper.init();
console.log(testhelper);
const chaiAsPromised = require("chai-as-promised");
const chai = require("chai");
chai.should();
chai.use(chaiAsPromised);

before(function() {
  chaiAsPromised.transferPromiseness = app.transferPromiseness;
  return app.start();
});

after(function() {
  if (app && app.isRunning()) {
    return app.stop();
  }
});
describe("Main", function() {
  it("open window", function() {
    return app.client
      .waitUntilWindowLoaded()
      .getWindowCount()
      .should.eventually.equal(1);
  });
  it("JS runs", function() {
    return app.client.getText("#greet").then(text => {
      chai.expect(text).to.equal("Hii!!!");
    });
  });
});
