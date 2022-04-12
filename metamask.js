var web3 = new Web3(window.ethereum);

window.ethereum.on('accountsChanged',() => 
{
  document.getElementById("status").innerText="Disconnected"
  document.getElementById("submitbtn").value="Connect Metamask"
  document.getElementById("tranotify").innerText = "HASH"
  // alert("Activity is detected from wallet's side so you need to reconnect again")
  ConnectMetamaskWallet()
})

// console.log(solanaWeb3);

// var web3 = new Web3(window.solana);
// var web3 = solanaWeb3;
var sender = {
  pubKey:null

}

async function ConnectMetamaskWallet()
{
    if (typeof window.ethereum !== 'undefined') {
      console.log(window.ethereum.isMetaMask);
      console.log('MetaMask is installed!');
      // var public_key = document.getElementById("address_p").innerText = "Address: " + address;
      // var money = document.getElementById("balance").innerText = (balance/1000000000000000000 + " ETH");

      // var status = document.getElementById("status").innerText="Connected"
    } 
    else if (typeof window.ethereum === 'undefined')
    {
      var status = document.getElementById("status").innerText="Install Metamask First"
      alert("You need to install the Metamask from here first:                           https://metamask.io/download/")
      window.open("https://metamask.io/")
    }

    var address = await ethereum.request({ method: 'eth_requestAccounts' });

    console.log(address);

    var web3 = new Web3(window.ethereum);
    
    var balance = await web3.eth.getBalance(address[0]);

    console.log("Current Connected Network Balance ---> ", balance/1000000000000000000);
    if (balance !== 'undefined')
    {
        document.getElementById("submitbtn").value = "Switch Network";
        var status = document.getElementById("status").innerText="Connected";
    }
    
    var money = document.getElementById("balance").innerText = (balance/1000000000000000000 + " ETH");
    var public_key = document.getElementById("address_p").innerText = "Address: " + address;
    document.getElementById("details").style.visibility = "visible";
    document.getElementById("address_p").style.visibility = "visible";
    document.getElementById("balance").style.visibility = "visible";
    document.getElementById("balance_p").style.visibility = "visible";
    document.getElementById("tranotify").style.visibility = "visible";
    document.getElementById("tranotify_p").style.visibility = "visible";
    document.getElementById("sendEther").style.visibility = "visible";
    document.getElementById("recaddress").style.visibility = "visible";
    document.getElementById("ethvalue").style.visibility = "visible";
    document.getElementById("network").style.visibility = "visible";
    // document.getElementById("meme").style.visibility = "hidden";
    document.getElementById("buffer").style.visibility = "hidden";
    document.getElementById("enter").style.visibility = "visible";    


    var networkId = await web3.eth.net.getId();

    console.log("Current Network ---> ", networkId);
    
    if (networkId !== 'undefined')
    {
      if(networkId == 1)
      {
        var currnet = document.getElementById("currnet").innerText = ("You are on Mainnet")
      }
      else if(networkId == 3)
      {
        var currnet = document.getElementById("currnet").innerText = ("You are on Ropsten")
      }
      else if(networkId == 4)
      {
        var currnet = document.getElementById("currnet").innerText = ("You are on Rinkeby")
      }
      else if(networkId == 42)
      {
        var currnet = document.getElementById("currnet").innerText = ("You are on Kovan")
      }
      else if(networkId == 56)
      {
        var currnet = document.getElementById("currnet").innerText = ("You are on BSC Smart Chain")
      }
      else if(networkId == 137)
      {
        var currnet = document.getElementById("currnet").innerText = ("You are on Polygon")
      }
      else
      {
        var currnet = document.getElementById("currnet").innerText = ("New Network Added!")
      }
    }
    var ChainId = document.getElementById("network");

    console.log(web3.utils.toHex(ChainId.value));
    console.log("New Connected Network is --->", ChainId.value);

    try {

            console.log("Network after change ==> ",ChainId.value);
            await window.ethereum.request({

            method: 'wallet_switchEthereumChain',

            params: [{chainId: web3.utils.toHex(ChainId.value)}]

            })

            if(ChainId.value == 1)
            {
              var currnet = document.getElementById("currnet").innerText = ("You are on Mainnet")
            }
             if(ChainId.value == 3)
            {
              var currnet = document.getElementById("currnet").innerText = ("You are on Ropsten")
            }
             if(ChainId.value == 4)
            {
              var currnet = document.getElementById("currnet").innerText = ("You are on Rinkeby")
            }
             if(ChainId.value == 42)
            {
              var currnet = document.getElementById("currnet").innerText = ("You are on Kovan")
            }
             if(ChainId.value == 56)
            {
              var currnet = document.getElementById("currnet").innerText = ("You are on BSC Smart Chain")
            }
             if(ChainId.value == 137)
            {
              var currnet = document.getElementById("currnet").innerText = ("You are on Polygon")
            }
            document.getElementById("submitbtn").value = "Switch network"
            balance = await web3.eth.getBalance(address[0]);  
            console.log("New Connected Network Balance ---> ", balance/1000000000000000000);

            var money = document.getElementById("balance").innerText = (balance/1000000000000000000 + " ETH");
            var public_key = document.getElementById("address").innerText = address;

        } catch(e) {
                console.log(e);
            }
}

// var networkId = await web3.eth.net.getId();

// window.ethereum.on('chainChanged', () => {
//   // alert("Activity is detected from wallet's side so you need to reconnect again")
//   document.getElementById("currnet").innerText = ("You are on " + networkId + "network ID")
// });


async function SendEther()
{   
    var ethereum = window.ethereum;
    // Request account access if needed
    var web3 = new Web3(window.ethereum);

    await ethereum.enable();
    var address = await ethereum.request({ method: 'eth_requestAccounts' });
    var provider = new ethers.providers.Web3Provider(ethereum);
    try {
        var sender = address[0];
        var receiver = document.getElementById("recaddress");
        var ethvalue = document.getElementById("ethvalue");
        var finalReceiver = receiver.value
        var eth = ethvalue.value
        console.log("Receiver's Address ---> "+ receiver.value);
        console.log("ETH value to be sent ---> ",ethvalue.value);

        console.log("Address of Sender --->  ",address[0]);
        web3.eth.sendTransaction({
        to:finalReceiver,
        from:address[0], 
        value: web3.utils.toWei(eth, "ether")}
        ,function (err, res){
            console.log('err', err);
            console.log('res', res);
            if (res)
            {
              document.getElementById("tranotify").innerText = ("HASH " + res)
              alert("Transaction Successful")
            }
            else
            {
              document.getElementById("tranotify").innerText = ("Error" + err.message)
              alert("Transaction was cancelled")
            }
        });
          } catch(e) {
        console.log('Error --->> ', e);
        alert("Transaction was cancelled")
        }
}

// if (ethvalue.value > balance)
//         {
//           var tranotify = document.getElementById("tranotify").innerText = ("Insufficient Funds!!!")
//         }
//         else if (ethvalue.value === balance)
//         {
//           var tranotify = document.getElementById("tranotify").innerText = ("GAS Fees kaun dega!!!")          
//         }
//         else 
//         {
//           var tranotify = document.getElementById("tranotify").innerText = (res)
//         }

