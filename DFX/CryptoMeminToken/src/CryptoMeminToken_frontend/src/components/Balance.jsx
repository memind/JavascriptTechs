import React, { useState } from "react";
import {Principal} from '@dfinity/principal'
import { CryptoMeminToken_backend as cmt } from "../../../declarations/CryptoMeminToken_backend/index";

function Balance() {

  const [inputValue, setInput] = useState("");
  const [balanceResult, setBalanceResult] = useState("");
  const [symbol, setSymbol] = useState("");
  const [hidden, setHidden] = useState(true);
  
  async function handleClick() {
    const principal = Principal.fromText(inputValue);
    const balance = await cmt.balanceOf(principal);

    setBalanceResult(balance.toLocaleString());
    setSymbol(await cmt.getSymbol());
    setHidden(false);
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={(e) => setInput(e.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden={hidden}>This account has a balance of {balanceResult} {symbol}.</p>
    </div>
  );
}

export default Balance;
