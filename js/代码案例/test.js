describe("pow", function () {
    before(() => alert("Testing started – before all tests"));
    after(() => alert("Testing finished – after all tests"));
    // 每个it之前触发
    beforeEach(() => alert("Before a test – enter a test"));
    afterEach(() => alert("After a test – exit a test"));

    function makeTest(x) {
        let expected = x * x * x;
        it(`${x} in the power 3 is ${expected}`, function () {
            assert.equal(pow(x, 3), expected);
        });
    }
    for (let x = 1; x <= 5; x++) {
        makeTest(x);
    }
    // it("raises to n-th power", function () {
    //     assert.equal(pow(2, 3), 8);
    //     // assert.equal(pow(3, 4), 81);
    // });
    // it("3 raised to power 4 is 81", function () {
    //     assert.equal(pow(3, 4), 81);
    // });

    // Mocha 将只运行这个代码块，用来隔离不同单元测试
    it.only("5 in the power of 2 equals 25", function () {
        assert.equal(pow(5, 2), 25);
    });
});