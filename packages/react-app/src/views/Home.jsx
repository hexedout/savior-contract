import { Button, Input } from "antd";
import { useContractReader } from "eth-hooks";
import { ethers } from "ethers";
import React from "react";
import { Link } from "react-router-dom";

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 **/
function Home({ address, readContracts }) {
  const saviorContracts = useContractReader(readContracts, "SaviorFactory", "getSaviors") ?? [];
  const allowance = useContractReader(readContracts, "SaviorToken", "allowance");

  const spanStyle = { marginLeft: 4, marginRight: 4, padding: 4, borderRadius: 4, fontWeight: "bolder" };

  return (
    <div>
      <div style={{ margin: 32 }}>
        These savior contracts have been deployed:
        {saviorContracts.length > 0 ? (
          saviorContracts.map(sav => {
            return (
              <span className="highlight" style={spanStyle}>
                {sav}
              </span>
            );
          })
        ) : (
          <span className="highlight" style={spanStyle}>
            []
          </span>
        )}
      </div>

      <div>{allowance}</div>

      <div style={{ margin: 32 }}>
        Head to <Link to="/debug">debug contracts</Link> to deploy your own savior
      </div>
    </div>
  );
}

export default Home;
