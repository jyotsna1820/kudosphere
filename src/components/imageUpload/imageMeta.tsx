// component to take user input for image name and description

import { Stack, TextField } from "@mui/material";
import { useState } from "react";
import { GREEN } from "../../constants/colors";

const ImageMeta = () => {
  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  return (
    <Stack spacing={2} sx={{width: "30vw"}}>
      <TextField
        id="outlined-basic"
        label="Name your image"
        variant="outlined"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <TextField
        id="outlined-basic"
        label="Personalized message"
        variant="outlined"
        value={description}
        multiline
        rows={4}
        fullWidth
        onChange={(e) => setDescription(e.target.value)}
      />
    </Stack>
  );
};

export default ImageMeta;