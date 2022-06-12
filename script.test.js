const checkCashRegister = require('./script');

const emptyRegister = [["PENNY", 0], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]];

const variedRegister = [["PENNY", 1.01], ["NICKEL", 1.05], ["DIME", .7], ["QUARTER", 3.75], ["ONE", 15], ["FIVE", 20], ["TEN", 20], ["TWENTY", 49], ["ONE HUNDRED", 200]];



test("Insufficient Funds", () => {
  expect(checkCashRegister(20, 50, emptyRegister)).toMatchObject({change: [], status: 'INSUFFICIENT_FUNDS'});
});

test("Exact Change empty register", () => {
  expect(checkCashRegister(20, 20, emptyRegister)).toMatchObject({change: emptyRegister, status: "Closed"});
});

test("50c back", () => {
  expect(checkCashRegister(20.5, 21, variedRegister)).toMatchObject({change: [["Quarter", .5]], status: "Open"});
});
