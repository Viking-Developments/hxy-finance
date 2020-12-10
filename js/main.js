/*var refShare = 1000;//min 0.1%

var refElem = document.getElementById("currentRef");
if (window.location.href.includes("r=0x")) { //new ref
  referralAddress = getAllUrlParams(window.location.href).r;
  document.cookie = "r=" + referralAddress + "; expires=Monday, 01 Jan 2120 12:00:00 UTC; path=/";
  refElem.innerHTML = "Referrer: <b>" + referralAddress + "</b>";
  console.log("new ref cookie: " + referralAddress);
} else { //get cookie
  var cookie = getCookie("r");
  if (cookie != "" && cookie.includes("0x")) { //cookie found
    referralAddress = cookie;
    refElem.innerHTML = "Referrer: <b>" + referralAddress + "</b>";
    console.log("cookie ref: " + referralAddress);
  } else { //cookie nor url ref found 
    referralAddress = "0x0000000000000000000000000000000000000000";
    console.log("ref: " + referralAddress);
  }
}*/


setInterval(function(){
  Populate();
}, 60000);

async function ApproveAll() {
  var value = "999999999999999999999999999999999999999999999";
    hxyfLpContract.methods.approve(hxyfContractAddress, web3.utils.toHex(value)).send({
      from: activeAccount
    })
    .on('receipt', function (receipt) {
      // receipt example
      console.log("Approve confirmed for UNI-V2-HXYF/ETH-LP");
      successMessage("Successfully approved UNI-V2-HXYF/ETH-LP");
      console.log(receipt);
    })
    .on('error', function () {
      console.error;
      errorMessage("Approve failed, please try again...");
    });
    hxyLpContract.methods.approve(hxyfContractAddress, web3.utils.toHex(value)).send({
      from: activeAccount
    })
    .on('receipt', function (receipt) {
      // receipt example
      console.log("Approve confirmed for UNI-V2-HXY/ETH-LP");
      successMessage("Successfully approved UNI-V2-HXY/ETH-LP");
      console.log(receipt);
    })
    .on('error', function () {
      console.error;
      errorMessage("Approve failed, please try again...");
    });
    hxbLpContract.methods.approve(hxyfContractAddress, web3.utils.toHex(value)).send({
      from: activeAccount
    })
    .on('receipt', function (receipt) {
      // receipt example
      console.log("Approve confirmed for UNI-V2-HXB/HEX-LP");
      successMessage("Successfully approved UNI-V2-HXB/HEX-LP");
      console.log(receipt);
    })
    .on('error', function () {
      console.error;
      errorMessage("Approve failed, please try again...");
    });
    hxpLpContract.methods.approve(hxyfContractAddress, web3.utils.toHex(value)).send({
      from: activeAccount
    })
    .on('receipt', function (receipt) {
      // receipt example
      console.log("Approve confirmed for UNI-V2-HXP/ETH-LP");
      successMessage("Successfully approved UNI-V2-HXP/ETH-LP");
      console.log(receipt);
    })
    .on('error', function () {
      console.error;
      errorMessage("Approve failed, please try again...");
    });
}

async function ApproveHxyf() {
  var value = "999999999999999999999999999999999999999999999";
    hxyfLpContract.methods.approve(hxyfContractAddress, web3.utils.toHex(value)).send({
      from: activeAccount
    })
    .on('receipt', function (receipt) {
      // receipt example
      console.log("Approve confirmed for UNI-V2-ETH/HXYF-LP");
      successMessage("Successfully approved UNI-V2-ETH/HXYF-LP");
      console.log(receipt);
    })
    .on('error', function () {
      console.error;
      errorMessage("Approve failed, please try again...");
    });
}

async function ApproveHxy() {
  var value = "999999999999999999999999999999999999999999999";
  hxyLpContract.methods.approve(hxyfContractAddress, web3.utils.toHex(value)).send({
    from: activeAccount
  })
  .on('receipt', function (receipt) {
    // receipt example
    console.log("Approve confirmed for UNI-V2-ETH/HXY-LP");
    successMessage("Successfully approved UNI-V2-ETH/HXY-LP");
    console.log(receipt);
  })
  .on('error', function () {
    console.error;
    errorMessage("Approve failed, please try again...");
  });
}

async function ApproveHxb() {
  var value = "999999999999999999999999999999999999999999999";
  
  hxbLpContract.methods.approve(hxyfContractAddress, web3.utils.toHex(value)).send({
    from: activeAccount
  })
  .on('receipt', function (receipt) {
    // receipt example
    console.log("Approve confirmed for UNI-V2-HEX/HXB-LP");
    successMessage("Successfully approved UNI-V2-HEX/HXB-LP");
    console.log(receipt);
  })
  .on('error', function () {
    console.error;
    errorMessage("Approve failed, please try again...");
  });
}

async function ApproveHxp() {
  var value = "999999999999999999999999999999999999999999999";
  
  hxpLpContract.methods.approve(hxyfContractAddress, web3.utils.toHex(value)).send({
    from: activeAccount
  })
  .on('receipt', function (receipt) {
    // receipt example
    console.log("Approve confirmed for UNI-V2-ETH/HXP-LP");
    successMessage("Successfully approved UNI-V2-ETH/HXP-LP");
    console.log(receipt);
  })
  .on('error', function () {
    console.error;
    errorMessage("Approve failed, please try again...");
  });
}


async function LockLp(token) {
  if (!sendok) {
    errorMessage("Cannot send tx, please check connection");
    return;
  }
  if (typeof web3 !== "undefined") {
    if(token == "hxyf"){
      var value = document.getElementById("lockAmountHxyf").value;
      var balance = await hxyfLpContract.methods.balanceOf(activeAccount).call();
      if (value == null || value <= 0 || value == "") {
        errorMessage("Value must be greater than 0");
        return;
      }
      var val = web3.utils.toWei(value.toString());
      var allow = await hxyfLpContract.methods.allowance(activeAccount, hxyfContractAddress).call();
      console.log(allow);
      if(balance > allow){
        errorMessage('You must approve Metamask');
        return;
      }
      if ((balance - val) < 0) {
        errorMessage("Insufficient available UNI-V2-ETH/HXYF-LP balance");
        return;
      }
      hxyfContract.methods.FreezeEthHxyfLP(web3.utils.toHex(val)).send({
        from: activeAccount
      })
      .on('receipt', function (receipt) {
        successMessage("UNI-V2-ETH/HXYF-LP frozen successfully!");
        console.log(receipt);
      })
      .on('error', function (error){
        errorMessage('Freeze failed, try again');
        console.log(error);
      });
    }
    else if(token == "hxy"){
      var value = document.getElementById("lockAmountHxy").value;
      var balance = await hxyLpContract.methods.balanceOf(activeAccount).call();
      if (value == null || value <= 0 || value == "") {
        errorMessage("Value must be greater than 0");
        return;
      }
      var val = web3.utils.toWei(value.toString());
      var allow = await hxyLpContract.methods.allowance(activeAccount, hxyfContractAddress).call();
      console.log(allow);
      if(balance > allow){
        errorMessage('You must approve Metamask');
        return;
      }
      if ((balance - val) < 0) {
        errorMessage("Insufficient available UNI-V2-ETH/HXYF-LP balance");
        return;
      }
      hxyfContract.methods.FreezeEthHxyLP(web3.utils.toHex(val)).send({
        from: activeAccount
      })
      .on('receipt', function (receipt) {
        successMessage("UNI-V2-ETH/HXY-LP frozen successfully!");
        console.log(receipt);
      })
      .on('error', function (error){
        errorMessage('Freeze failed, try again');
        console.log(error);
      });
    }
    else if(token == "hxb"){
      var value = document.getElementById("lockAmountHxb").value;
      var balance = await hxbLpContract.methods.balanceOf(activeAccount).call();
      if (value == null || value <= 0 || value == "") {
        errorMessage("Value must be greater than 0");
        return;
      }

      var val = web3.utils.toWei(value.toString());
      var allow = await hxbLpContract.methods.allowance(activeAccount, hxyfContractAddress).call();
      console.log(allow);
      if(balance > allow){
        errorMessage('You must approve Metamask');
        return;
      }
      if ((balance - val) < 0) {
        errorMessage("Insufficient available UNI-V2-ETH/HXYF-LP balance");
        return;
      }
      hxyfContract.methods.FreezeHexHxbLP(web3.utils.toHex(val)).send({
        from: activeAccount
      })
      .on('receipt', function (receipt) {
        successMessage("UNI-V2-HEX/HXB-LP frozen successfully!");
        console.log(receipt);
      })
      .on('error', function (error){
        errorMessage('Freeze failed, try again');
        console.log(error);
      });
    }
    else if (token == "hxp"){
      var value = document.getElementById("lockAmountHxp").value;
      var balance = await hxpLpContract.methods.balanceOf(activeAccount).call();
      if (value == null || value <= 0 || value == "") {
        errorMessage("Value must be greater than 0");
        return;
      }
      var val = web3.utils.toWei(value.toString());
      var allow = await hxpLpContract.methods.allowance(activeAccount, hxyfContractAddress).call();
      console.log(allow);
      if(balance > allow){
        errorMessage('You must approve Metamask');
        return;
      }
      if ((balance - val) < 0) {
        errorMessage("Insufficient available UNI-V2-ETH/HXYF-LP balance");
        return;
      }
      hxyfContract.methods.FreezeEthHxpLP(web3.utils.toHex(val)).send({
        from: activeAccount
      })
      .on('receipt', function (receipt) {
        successMessage("UNI-V2-ETH/HXP-LP frozen successfully!");
        console.log(receipt);
      })
      .on('error', function (error){
        errorMessage('Freeze failed, try again');
        console.log(error);
      });
    }
    else{
      return;
    }
  }
}



async function UnlockLp(token) {
  var frozenLp;
  switch(token){
    case "hxyf": 
    frozenLp = await hxyfContract.methods.hxyfLpFrozenBalances(activeAccount).call();
    if(frozenLp == 0){
      errorMessage("Nothing to unfreeze");
      return;
    }
    hxyfContract.methods.UnfreezeEthHxyfLP().send({
        from: activeAccount
      })
    .on('receipt', function (receipt) {
      successMessage("Successfully unfroze UNI-V2-ETH/HXYF-LP and harvested rewards");
      console.log(receipt);
    })
    .on('error', function () {
      console.error;
      errorMessage("unfreeze failed, please try again...");
    }); 
    break;
    case "hxy": 
    frozenLp = await hxyfContract.methods.hxyLpFrozenBalances(activeAccount).call();
    if(frozenLp == 0){
      errorMessage("Nothing to unfreeze");
      return;
    }
    hxyfContract.methods.UnfreezeEthHxyLP().send({
        from: activeAccount
      })
    .on('receipt', function (receipt) {
      successMessage("Successfully unfroze UNI-V2-ETH/HXY-LP and harvested rewards");
      console.log(receipt);
    })
    .on('error', function () {
      console.error;
      errorMessage("unfreeze failed, please try again...");
    }); 
    break;
    case "hxb": 
    frozenLp = await hxyfContract.methods.hxbLpFrozenBalances(activeAccount).call();
    if(frozenLp == 0){
      errorMessage("Nothing to unfreeze");
      return;
    }
    hxyfContract.methods.UnfreezeHexHxbLP().send({
        from: activeAccount
      })
    .on('receipt', function (receipt) {
      successMessage("Successfully unfroze UNI-V2-HEX/HXB-LP and harvested rewards");
      console.log(receipt);
    })
    .on('error', function () {
      console.error;
      errorMessage("unfreeze failed, please try again...");
    }); 
    break;
    case "hxp":
    frozenLp = await hxyfContract.methods.hxpLpFrozenBalances(activeAccount).call();
    if(frozenLp == 0){
      errorMessage("Nothing to unfreeze");
      return;
    }
    hxyfContract.methods.UnfreezeEthHxpLP().send({
        from: activeAccount
      })
    .on('receipt', function (receipt) {
      successMessage("Successfully unfroze UNI-V2-ETH/HXP-LP and harvested rewards");
      console.log(receipt);
    })
    .on('error', function () {
      console.error;
      errorMessage("unfreeze failed, please try again...");
    }); 
    break;
    default:
      return
  }

}


async function Harvest(token) {
  var frozenLp;
  switch(token){
    case "hxyf": 
    frozenLp = await hxyfContract.methods.hxyfLpFrozenBalances(activeAccount).call();
    if(frozenLp == 0){
      errorMessage("Nothing to harvest");
      return;
    }
    hxyfContract.methods.HarvestHxyfLp().send({
        from: activeAccount
      })
    .on('receipt', function (receipt) {
      successMessage("Successfully harvested HXYF rewards");
      console.log(receipt);
    })
    .on('error', function () {
      console.error;
      errorMessage("harvest failed, please try again later...");
    }); 
    break;
    case "hxy": 
    frozenLp = await hxyfContract.methods.hxyLpFrozenBalances(activeAccount).call();
    if(frozenLp == 0){
      errorMessage("Nothing to harvest");
      return;
    }
    hxyfContract.methods.HarvestHxyLp().send({
        from: activeAccount
      })
    .on('receipt', function (receipt) {
      successMessage("Successfully harvested HXYF rewards");
      console.log(receipt);
    })
    .on('error', function () {
      console.error;
      errorMessage("harvest failed, please try again later...");
    }); 
    break;
    case "hxb": 
    frozenLp = await hxyfContract.methods.hxbLpFrozenBalances(activeAccount).call();
    if(frozenLp == 0){
      errorMessage("Nothing to harvest");
      return;
    }
    hxyfContract.methods.HarvestHxbLp().send({
        from: activeAccount
      })
    .on('receipt', function (receipt) {
      successMessage("Successfully harvested HXYF rewards");
      console.log(receipt);
    })
    .on('error', function () {
      console.error;
      errorMessage("harvest failed, please try again later...");
    }); 
    break;
    case "hxp":
    frozenLp = await hxyfContract.methods.hxpLpFrozenBalances(activeAccount).call();
    if(frozenLp == 0){
      errorMessage("Nothing to harvest");
      return;
    }
    hxyfContract.methods.HarvestHxpLp().send({
        from: activeAccount
      })
    .on('receipt', function (receipt) {
      successMessage("Successfully harvested HXYF rewards");
      console.log(receipt);
    })
    .on('error', function () {
      console.error;
      errorMessage("harvets failed, please try again later...");
    }); 
    break;
    default:
      return
  }
}

async function Populate()
{
  document.getElementById("activeDepositHxyf").innerHTML = web3.utils.fromWei(await hxyfContract.methods.hxyfLpFrozenBalances(activeAccount).call()) + " ETH/HXYF-LP";
  document.getElementById("activeDepositHxy").innerHTML = web3.utils.fromWei(await hxyfContract.methods.hxyLpFrozenBalances(activeAccount).call()) + " ETH/HXY-LP";
  document.getElementById("activeDepositHxb").innerHTML = web3.utils.fromWei(await hxyfContract.methods.hxbLpFrozenBalances(activeAccount).call()) + " HEX/HXB-LP";
  document.getElementById("activeDepositHxp").innerHTML = web3.utils.fromWei(await hxyfContract.methods.hxpLpFrozenBalances(activeAccount).call()) + " ETH/HXP-LP";
  document.getElementById("claimableHxyfHxyf").innerHTML = web3.utils.fromWei(await hxyfContract.methods.calcHarvestRewards(activeAccount, uniETHHXYF).call()) + " HXYF";
  document.getElementById("claimableHxyfHxy").innerHTML = web3.utils.fromWei(await hxyfContract.methods.calcHarvestRewards(activeAccount, uniETHHXY).call()) + " HXYF";
  document.getElementById("claimableHxyfHxb").innerHTML = web3.utils.fromWei(await hxyfContract.methods.calcHarvestRewards(activeAccount, uniHEXHXB).call()) + " HXYF";
  document.getElementById("claimableHxyfHxp").innerHTML = web3.utils.fromWei(await hxyfContract.methods.calcHarvestRewards(activeAccount, uniETHHXP).call()) + " HXYF";
  document.getElementById("hxyfEthLpBalance").innerHTML = web3.utils.fromWei(await hxyfLpContract.methods.balanceOf(activeAccount).call());
  document.getElementById("hxyEthLpBalance").innerHTML = web3.utils.fromWei(await hxyLpContract.methods.balanceOf(activeAccount).call());
  document.getElementById("hexHxbLpBalance").innerHTML = web3.utils.fromWei(await hxbLpContract.methods.balanceOf(activeAccount).call());
  document.getElementById("hxpEthLpBalance").innerHTML = web3.utils.fromWei(await hxpLpContract.methods.balanceOf(activeAccount).call());
  var halvening = await hxyfContract.methods.halvening().call();
  document.getElementById("hxyfApy").innerHTML = (16850 / halvening) + "%";
  document.getElementById("hxyApy").innerHTML = (1412 / halvening) + "%";
  document.getElementById("hxbApy").innerHTML = (1250 / halvening) + "%";
  document.getElementById("hxpApy").innerHTML = (1000 / halvening) + "%";
  

}

async function ShowBalance(){
  hxyfContract.methods.balanceOf(activeAccount).call().then(function(balance){
    document.getElementById("walletBalance").innerHTML = parseInt(balance / 10 ** decimals) + " HXYF";
  });
}


/*----------HELPER FUNCTIONS------------ */

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function getAllUrlParams(url) {

  // get query string from url (optional) or window
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // we'll store the parameters here
  var obj = {};

  // if query string exists
  if (queryString) {

    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // split our query string into its component parts
    var arr = queryString.split('&');

    for (var i = 0; i < arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split('=');

      // set parameter name and value (use 'true' if empty)
      var paramName = a[0];
      var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

      // (optional) keep case consistent
      paramName = paramName.toLowerCase();
      if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

      // if the paramName ends with square brackets, e.g. colors[] or colors[2]
      if (paramName.match(/\[(\d+)?\]$/)) {

        // create key if it doesn't exist
        var key = paramName.replace(/\[(\d+)?\]/, '');
        if (!obj[key]) obj[key] = [];

        // if it's an indexed array e.g. colors[2]
        if (paramName.match(/\[\d+\]$/)) {
          // get the index value and add the entry at the appropriate position
          var index = /\[(\d+)\]/.exec(paramName)[1];
          obj[key][index] = paramValue;
        } else {
          // otherwise add the value to the end of the array
          obj[key].push(paramValue);
        }
      } else {
        // we're dealing with a string
        if (!obj[paramName]) {
          // if it doesn't exist, create property
          obj[paramName] = paramValue;
        } else if (obj[paramName] && typeof obj[paramName] === 'string') {
          // if property does exist and it's a string, convert it to an array
          obj[paramName] = [obj[paramName]];
          obj[paramName].push(paramValue);
        } else {
          // otherwise add the property
          obj[paramName].push(paramValue);
        }
      }
    }
  }

  return obj;
}

function doSort(ascending) {
	ascending = typeof ascending == 'undefined' || ascending == true;
	return function (a, b) {
		var ret = a[1] - b[1];
		return ascending ? ret : -ret;
	};
}

function numStringToBytes32(num) {
  var bn = new web3.utils.BN(num).toTwos(256);
  return padToBytes32(bn.toString(16));
}

function bytes32ToNumString(bytes32str) {
  bytes32str = bytes32str.replace(/^0x/, '');
  var bn = new web3.utils.BN(bytes32str, 16).fromTwos(256);
  return bn.toString();
}

function bytes32ToInt(bytes32str) {
  bytes32str = bytes32str.replace(/^0x/, '');
  var bn = new web3.utils.BN(bytes32str, 16).fromTwos(256);
  return bn;
}

function padToBytes32(n) {
  while (n.length < 64) {
    n = "0" + n;
  }
  return "0x" + n;
}

function toFixedMax(value, dp) {
  return +parseFloat(value).toFixed(dp);
}