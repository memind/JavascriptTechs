import React, { useState } from "react";
import { Principal } from "../../../../node_modules/@dfinity/principal/lib/cjs/index";
import { CryptoMeminToken_backend as cmt, canisterId, createActor } from "../../../declarations/CryptoMeminToken_backend/index";
import { AuthClient } from '@dfinity/auth-client';

function Transfer(props) {
  const [recipientId, setId] = useState("");
  const [amount, setAmount] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [hidden, setHidden] = useState(true);
  
  async function handleClick() {
    setHidden(true);
    setDisabled(true);

    const recipient = Principal.fromText(recipientId);
    const amountToTransfer = Number(amount);

    const authClient = await AuthClient.Create();
    const identity = await authClient.getIdentity();

    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity
      }
    });

    var result = await authenticatedCanister.transfer(recipient, amountToTransfer);

    setDisabled(false);
    setFeedback(result);
    setHidden(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recipientId}
                onChange={(e) => setId(e.target.value)}
                disabled={disabled}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={disabled}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={disabled} >
            Transfer
          </button>
        </p>
        <p hidden={hidden}>{feedback}</p>
      </div>
    </div>
  );
}

export default Transfer;
