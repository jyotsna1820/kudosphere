import {
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  Stack,
} from "@mui/material";
import { minHeight } from "@mui/system";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import { CoinbaseWallet, Injected, WalletConnect } from "./helpers";
import coinbaseLogo from "../../assets/coinbase.svg";
import walletConnectLogo from "../../assets/walletConnect.svg";
import metamaskLogo from "../../assets/metamask.svg";
import {NEON, CHARCOAL} from "../../constants/colors";

//function component to activate/deactivate the wallet
//return a MUI dialog with the wallet options

type WalletProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Wallet = ({isOpen, onClose}:WalletProps) => {
  const { active, activate, deactivate } = useWeb3React();

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={onClose}
        PaperProps={{ sx: { width: "30%", padding: "1rem 2rem 2rem 2rem", backgroundColor: CHARCOAL, color: NEON } }}>
        <DialogTitle sx={{ textAlign: "center" }}>Connect Wallet</DialogTitle>
        <Stack spacing={3}>
          <Button
            variant="outlined"
            autoFocus
            onClick={() => activate(CoinbaseWallet)}
            sx={{borderColor:NEON, color: NEON}}>
            <div
              style={{
                width: "50px",
                height: "50px",
                margin: "0rem 0.5rem",
                alignItems: "center",
                display: "flex",
              }}>
              <img
                src={coinbaseLogo}
                alt="coinbase"
                style={{ objectFit: "contain", overflow: "hidden" }}
              />
            </div>
            Coinbase
          </Button>

          <Button
            variant="outlined"
            autoFocus
            onClick={() => activate(WalletConnect)}
            sx={{borderColor:NEON, color: NEON}}>
            <div
              style={{
                width: "50px",
                height: "50px",
                margin: "0rem 0.5rem",
                alignItems: "center",
                display: "flex",
              }}>
              <img
                src={walletConnectLogo}
                alt="walletConnect"
                style={{ objectFit: "contain", overflow: "hidden" }}
              />
            </div>
            WalletConnect
          </Button>

          <Button
            variant="outlined"
            autoFocus
            onClick={() => activate(Injected)}
            sx={{borderColor:NEON, color: NEON}}>
            <div
              style={{
                width: "50px",
                height: "50px",
                margin: "0rem 0.5rem",
                alignItems: "center",
                display: "flex",
              }}>
              <img
                src={metamaskLogo}
                alt="metamask"
                style={{ objectFit: "contain", overflow: "hidden" }}
              />
            </div>
            Metamask
          </Button>

          <Button variant="outlined" autoFocus onClick={() => deactivate()} sx={{borderColor:NEON, color: NEON}}>
            Disconnect
          </Button>
        </Stack>
      </Dialog>
    </>
  );
};

export default Wallet;
