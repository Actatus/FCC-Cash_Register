//Design a register drawer function that takes a purchase price arg, cash given arg, and a Cash In Drawer argument.
//Return an object with either 'Status: Open', Closed, or Insufficient_Funds

const emptyDrawer = [
  ["PENNY", 0],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 0],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0]
];


function checkCashRegister(price, cash, cid = emptyDrawer) {
  let registerStatus = {
    'status': "Closed",
    'change': []
  };

  function checkPriceCash(price, cash){
    let balance = price-cash;
    if (balance == 0){
      registerStatus.status = "Closed";
      registerStatus.change = cid;
    } else if (balance < 0){
      registerStatus.status = "INSUFFICIENT_FUNDS";
    } else {
      console.log("Drawer_Operation");
    }
  }

  checkPriceCash(price, cash);
  return registerStatus;
}






module.exports = checkCashRegister;
