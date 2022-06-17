const checkCashRegister = require('./script');

const emptyRegister = [["PENNY", 0], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]];

const variedRegister = [["PENNY", 1.01], ["NICKEL", 1.05], ["DIME", .7], ["QUARTER", 3.75], ["ONE", 15], ["FIVE", 20], ["TEN", 20], ["TWENTY", 40], ["ONE HUNDRED", 200]];



test("Insufficient Funds", () => {
  expect(checkCashRegister(20, 50, emptyRegister)).toMatchObject({change: [], status: 'INSUFFICIENT_FUNDS'});
});

test("Exact Change empty register", () => {
  expect(checkCashRegister(20, 20, emptyRegister)).toMatchObject({change: emptyRegister, status: "CLOSED"});
});

test("Exact change, varied register", () =>{
  expect(checkCashRegister(20, 20, variedRegister)).toMatchObject({change: variedRegister, status: "CLOSED"});
});

test("50c back", () => {
  expect(checkCashRegister(20.5, 21, variedRegister)).toMatchObject({change: [["QUARTER", .5]], status: "OPEN"});
});

test("$20.50 back", () =>{
  expect(checkCashRegister(10, 30.50, variedRegister)).toMatchObject({change: [["TWENTY", 20], ["QUARTER", .5]], status: "OPEN"});
});

test("Open, change: 50c back", () =>{
  expect(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]))
    .toMatchObject({change: [["QUARTER", 0.5]], status: "OPEN"});
});

//checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], 
//["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) should return {status: "INSUFFICIENT_FUNDS", 
//change: []}

test("INSUFFICIENT_FUNDS, not enough cash", () =>{
  expect(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1],
    ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])).toMatchObject({change: [], status:
    "INSUFFICIENT_FUNDS"});
});

//checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], 
//["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) 
//should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], 
//["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}

test("Large cashback", () =>{
  expect(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25],
    ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])).toMatchObject({
      change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1],["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]],
      status: "OPEN"
    });
});


//checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], 
//["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) should return {status: "CLOSED", change: 
//[["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0],
// ["TWENTY", 0], ["ONE HUNDRED", 0]]}.

test("Expect exact change FCC Final Test", () => {
  expect(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0],
    ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])).toMatchObject({
      change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0],
        ["TWENTY", 0], ["ONE HUNDRED", 0]], status: "CLOSED"});
});