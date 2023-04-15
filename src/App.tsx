import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ImageUpload from "./components/imageUpload";
import { AppBar, Box, Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Wallet from "./components/connectors";
import { BLACK, BLUE, GREEN, WHITE } from "./constants/colors";
import { Web3Modal } from "@web3modal/react";
import { EthereumClient } from "@web3modal/ethereum";
import { Web3Button } from "@web3modal/react";
import kudosphereLogoSQ from "./assets/kudosphere_sq.svg";
import kudosphereLogo from "./assets/kudosphere.svg";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import gift12 from "./assets/gift12.svg";
import gift13 from "./assets/gift13.svg";
import Footer from "./components/footer";

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
          {/* <img src={kudosphereLogo} height="60px" width={"200px"} /> */}
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
        <Grid container spacing={1}>
          <Grid xs={12} md={3}>
            <Stack
              sx={{
                backgroundColor: WHITE,
                height: "100%",
                justifyContent: "flex-start",
              }}>
              <object
                type="image/svg+xml"
                data={gift13}
                style={{ backgroundColor: WHITE }}
              />
            </Stack>
          </Grid>
          <Grid xs={12} md={6}>
            <Typography
              className="Typography"
              variant="h3"
              sx={{
                color: BLACK,
                fontWeight: 700,
                marginBottom: "0.5rem",
                marginTop: "2rem",
                fontFamily: "Mulish, sans-serif",
              }}>
              Celebrate Achievements
            </Typography>
            <Typography
              className="Typography"
              variant="h5"
              sx={{
                color: BLACK,
                fontWeight: 500,
                marginBottom: "2rem",
                fontFamily: "Mulish, sans-serif",
              }}>
              one NFT at a time.
            </Typography>
            <ImageUpload />
            <Web3Modal
              projectId={projectId}
              ethereumClient={ethereumClient}
              themeVariables={{
                "--w3m-z-index": "1111",
                "--w3m-accent-color": BLUE,
                "--w3m-background-color": GREEN,
                "--w3m-accent-fill-color": BLACK,
                "--w3m-font-family": "Mulish, sans-serif",
              }}
            />
          </Grid>
          <Grid xs={12} md={3}>
            <Stack
              sx={{
                backgroundColor: WHITE,
                height: "100%",
                justifyContent: "flex-end",
              }}>
              <object
                type="image/svg+xml"
                data={gift12}
                style={{ backgroundColor: WHITE }}
              />
            </Stack>
          </Grid>
        </Grid>
        
      </Box>
      <Footer/>
    </div>
  );
}

export default App;
