import { Stack, Paper, Grid, Button, Typography } from "@mui/material";
import teamSolid from "../../assets/team_solid.svg";
import step1 from "../../assets/upload.svg";
import step2 from "../../assets/message.svg";
import step3 from "../../assets/receiver.svg";
import { styled } from "@mui/material/styles";
import "./styles.css";
import { BLUE } from "../../constants/colors";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const LandingPage = () => {
  return (
    <Stack sx={{alignItems:"center"}}>
      <Typography variant="h3">
        Celebrate Achievements
        <br /> one NFT at a time.
      </Typography>
      <br />
      <Typography variant="h6">
        Send tokens of appreciation on chain
        <br />
        to let people know you care.
      </Typography>
      <br />
      <Button
        variant="contained"
        sx={{
          width: "fit-content",
          alignSelf: "center",
          backgroundColor: BLUE,
        }}
      >
        Get Started
      </Button>
      <img src={teamSolid} alt="gift" width={"80%"} />
      <h2>3 simple steps to get started</h2>
      <Grid container md={12}>
        <Grid
          item
          md={4}
          sx={{
            padding: "1rem",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img src={step1} alt="gift" className="steps" />
          <h4>Upload your image</h4>
        </Grid>
        <Grid
          item
          md={4}
          sx={{
            padding: "1rem",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img src={step2} alt="gift" className="steps" />
          <h4>Write a message</h4>
        </Grid>
        <Grid
          item
          md={4}
          sx={{
            padding: "1rem",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img src={step3} alt="gift" className="steps" />
          <h4>Send to a friend</h4>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default LandingPage;
