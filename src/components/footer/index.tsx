import { Box, Typography } from "@mui/material"
import { BLACK, BLUE, PINK, WHITE } from "../../constants/colors"

// footer component
const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: BLUE,
        color: WHITE,
        padding: "2rem 0rem",
        textAlign: "center",
        marginBottom: "0px",
        flexShrink: 0,
      }}>
      <Typography
        variant="body1"
        sx={{
          fontFamily: "Mulish, sans-serif",
          fontWeight: 600,
          color: WHITE,
        }}>
        Made with ❤️ by Jyotsna Arora
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: "Mulish, sans-serif",
            fontWeight: 600,
            color: WHITE,
          }}>
          © 2023
        </Typography>
        <Typography>

        </Typography>
    </Box>
  )
}

export default Footer;