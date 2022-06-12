//Design a register drawer function that takes a purchase price arg, cash given arg, and a Cash In Drawer argument.
//Return an object with either 'Status: Open', Closed, or Insufficient_Funds



function checkCashRegister(price, cash, cid) {
  let registerStatus = {
    'status': "Closed",
    'change': []
  };

  function checkPriceCash(price, cash){
    let balance = price-cash;
    if (balance == 0){
      registerStatus.status = "Closed";
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
