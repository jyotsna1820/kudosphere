import React, { useEffect, useState } from "react";
import * as styles from "style.css";
import { Stack } from "@mui/system";
import { Button } from "@mui/material";
import { MdUpload } from "react-icons/md";
import { BLACK, BLUE, NEON } from "../../constants/colors";

//function component to return the image upload component

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState<string | undefined>();

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    setPreview(URL.createObjectURL(selectedFile));

    // free memory when ever this component is unmounted
    return () => {
      // @ts-ignore
      URL.revokeObjectURL(preview);
    };
  }, [selectedFile]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    // choose first file
    setSelectedFile(e.target.files[0]);
  };

  const onCancel = () => {
    setSelectedFile(undefined);
  };

  const onSubmit = () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("file", selectedFile);
    // @ts-ignore
    fetch(
      "https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5",
      {
        method: "POST",
        body: formData,
        mode: "no-cors",
      }
    )
      .then((response) => response.json())
      .then((result) => console.log(result));
  };
  return (
    <Stack spacing={2} alignItems="center" sx={{marginTop: "1rem"}}>
      <Stack
        sx={{
          width: "30vw",
          height: "40vh",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%232CDECF' stroke-width='7' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
        }}>
        {!selectedFile && (
          <Button
            component="label"
            variant="outlined"
            startIcon={<MdUpload />}
            sx={{ marginRight: "1rem", color:BLUE, borderColor: BLUE }}>
            Upload Image
            <input
              accept="image/*"
              multiple
              type="file"
              onChange={onSelectFile}
              hidden
            />
          </Button>
        )}
        {selectedFile && (
          <Stack>
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                overflow: "hidden",
              }}
              src={preview}
            />
          </Stack>
        )}
      </Stack>

      {selectedFile && (
        <Stack direction={"row"} spacing={2} justifyContent="center">
          <Button variant="contained" color="primary">
            Upload
          </Button>
          <Button variant="outlined" color="primary" onClick={onCancel}>
            Cancel
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

export default ImageUpload;
