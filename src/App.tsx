import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ImageUpload from "./components/imageUpload";
import { AppBar, Box, Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Wallet from "./components/connectors";
import { BLACK, BLUE, NEON, WHITE } from "./constants/colors";
import { Web3Modal } from "@web3modal/react";
import { EthereumClient } from "@web3modal/ethereum";
import { Web3Button } from "@web3modal/react";
import kudosphereLogoSQ from "./assets/kudosphere_sq.svg";
import kudosphereLogo from "./assets/kudosphere.svg";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import gift1 from "./assets/gift1.svg";
import gift2 from "./assets/gift2.svg";
import gift3 from "./assets/gift3.svg";
import gift4 from "./assets/gift4.png";
import gift5 from "./assets/gift5.png";

function App({
  ethereumClient,
  projectId,
}: {
  ethereumClient: EthereumClient;
  projectId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="App">
      <AppBar sx={{ backgroundColor: WHITE, boxShadow: "none", color: BLUE }}>
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          sx={{ padding: "1rem 2rem" }}>
          <img src={kudosphereLogoSQ} height="60px" width={"60px"} />
          <Web3Button />
        </Stack>
      </AppBar>
      <Box>
        <Grid container spacing={1}>
          <Grid xs={3} md={3}>
            <Stack
              className="StackLeft"
              sx={{
                backgroundImage: `url(${gift4})`,
                backgroundPositionY: "bottom",
              }}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <img src={kudosphereLogo} width={"400px"} />
            <Typography
              variant="body1"
              sx={{ color: BLUE, fontFamily: "Nunito Sans" }}>
              Celebrate Achievements, One NFT at a time
            </Typography>
            <ImageUpload />
            <Web3Modal
              projectId={projectId}
              ethereumClient={ethereumClient}
              themeVariables={{
                "--w3m-z-index": "1111",
                "--w3m-accent-color": BLUE,
                "--w3m-background-color": NEON,
                "--w3m-accent-fill-color": BLACK,
              }}
            />
          </Grid>
          <Grid xs={3} md={3} sx={{position: "relative"}}>
          <Stack
              className="StackRight"
              sx={{
                backgroundImage: `url(${gift5})`,
                backgroundPositionY: "top",
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
