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
import teamSolid from "./assets/teamSolid.svg";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import gift12 from "./assets/gift12.svg";
import gift13 from "./assets/gift13.svg";
import Footer from "./components/footer";
import LandingPage from "./components/landingPage";

function App({
  ethereumClient,
  projectId,
}: {
  ethereumClient: EthereumClient;
  projectId: string;
}) {
  return (
    <div className="App">
      <AppBar
        className="Appbar"
        sx={{ boxShadow: "none", color: BLUE, backgroundColor: WHITE }}>
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          sx={{ padding: "1rem 2rem" }}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: 600,
              color: BLACK,
            }}>
            kudosphere
          </Typography>
          <Web3Button />
        </Stack>
      </AppBar>
      <Box>
        <LandingPage />
        <Grid container spacing={1}>
          <Grid xs={12} md={12}>
            <ImageUpload />
            <Web3Modal
              projectId={projectId}
              ethereumClient={ethereumClient}
              themeVariables={{
                "--w3m-z-index": "1111",
                "--w3m-accent-color": BLUE,
                "--w3m-background-color": NEON,
                "--w3m-accent-fill-color": BLACK,
                "--w3m-font-family": "Mulish, sans-serif",
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Footer/>
    </div>
  );
}

export default App;
