import React, { useState } from "react";
import { CryptoMeminToken_backend as cmt, canisterId, createActor } from "../../../declarations/CryptoMeminToken_backend/index";
import { AuthClient } from '@dfinity/auth-client';

function Faucet(props) {

  const [disabled, setDisabled] = useState(false);
  const [buttonText, setText] = useState("Gimme Gimme!");

  async function handleClick(event) {
    setDisabled(true);

    const authClient = await AuthClient.Create();
    const identity = await authClient.getIdentity();

    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity
      }
    });

    const result = await authenticatedCanister.payOut();

    if(result == "success") {
      setText("Success");
      setDisabled(false);
    }

    else {
      setText("Already Claimed...");
    };
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free Crypto Memin Tokens here! Claim 10,000 CMT to {props.userPrincipal}.</label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={disabled}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
