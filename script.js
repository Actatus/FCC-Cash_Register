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

const currencyValues = {
  "PENNY": .01,
  "NICKEL": .05,
  "DIME": .10,
  "QUARTER": .25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100
}


function checkCashRegister(price, cash, cid = emptyDrawer) {
  let registerStatus = {
    'status': "CLOSED",
    'change': []
  };

  function checkPriceCash(price, cash){
    let balance = cash-price;

    if (balance == 0){
      registerStatus.status = "CLOSED";
      registerStatus.change = cid;
    } else if (balance < 0 || balance > getDrawerTotal(cid)){
      registerStatus.status = "INSUFFICIENT_FUNDS";
    } else {
      registerFunction(balance, cid);
    }
  }

  function getDrawerTotal(cid){
    let total = 0;

    for (let i = 0; i < cid.length; i++){
      total += cid[i][1];
    }
    return total;
  }

  function registerFunction(balance, cid){
    let totalPrice = balance;
    let cashBack = [];

    for (let i = cid.length - 1; i >= 0; i--){
      let maxDivisions = Math.floor(totalPrice.toFixed(2)/currencyValues[cid[i][0]]);
      let returnedChangeAfterDivisions = maxDivisions * currencyValues[cid[i][0]];

      if (maxDivisions > 0 && totalPrice > 0){

        if (returnedChangeAfterDivisions <= cid[i][1]){
          totalPrice = totalPrice.toFixed(2) - returnedChangeAfterDivisions;
          cashBack.push([cid[i][0], returnedChangeAfterDivisions]);
        } else if (returnedChangeAfterDivisions > cid[i][1] && cid[i][1] > 0) {
          totalPrice = totalPrice.toFixed(2) - cid[i][1];
          cashBack.push([cid[i][0], cid[i][1]]);
        }

      }
    }
   
    if (totalPrice > 0){
      registerStatus.status = "INSUFFICIENT_FUNDS";
      registerStatus.change = [];
    } else {
      registerStatus.status = "OPEN";
      registerStatus.change = cashBack;
    }
    
  }
  
  checkPriceCash(price, cash);
  return registerStatus;
}






module.exports = checkCashRegister;
