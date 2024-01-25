import { MeminBank as bank } from "../../declarations/MeminBank"

window.addEventListener("load", async function () {
  update(await bank.checkBalance());
});

document.querySelector("form").addEventListener("submit", async function (event) {
  event.preventDefault();

  const receiveAmount = parseFloat(document.getElementById("receive-amount").value);
  const withdrawAmount = parseFloat(document.getElementById("withdrawal-amount").value);

  const button = event.target.querySelector("#submit-btn");

  await transaction("receive", receiveAmount, button);
  await transaction("withdraw", withdrawAmount, button);

  update(await bank.checkBalance());
  defaultInputs(button);
});

function update(currentAmount) {
  document.getElementById("value").innerText = Math.round(currentAmount * 100) / 100;
}

function defaultInputs(button){
  document.getElementById("receive-amount").value = null;
  document.getElementById("withdrawal-amount").value = null;
  button.removeAttribute("disabled");
}

async function transaction(transactionType, amount, button){
  button.setAttribute("disabled", true);

  if(amount){
    if(transactionType === "receive")
      await bank.receiveDollar(amount);
  
    if(transactionType === "withdraw") 
      await bank.withdrawDollar(amount);
  }
}