import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosRetry from "axios-retry";
import * as styles from "style.css";
import { Stack } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { MdUpload } from "react-icons/md";
import { BLACK, BLUE, CHARCOAL, NEON } from "../../constants/colors";
import * as keys from "../../../.vscode/keys.json";

//function component to return the image upload component
const JWT = `Bearer ${keys.pinata_jwt}`;

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

  const onSubmit = async() => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("file", selectedFile);

    const metadata = JSON.stringify({
      name: 'File',
    });
    formData.append('pinataMetadata', metadata);
    
    const options = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', options);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': `multipart/form-data`,
          Authorization: JWT
        }
      });
      console.log(res.data);
      console.log(formData, "form data");
      const ImgHash = `ipfs://${res.data.IpfsHash}`;
      console.log(ImgHash);
    } catch (error) {
      console.log(error);
    }
  };
  //   // @ts-ignore
  //   fetch(
  //     "https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5",
  //     {
  //       method: "POST",
  //       body: formData,
  //       mode: "no-cors",
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((result) => console.log(result));
  // };
  return (
    <Stack spacing={2} alignItems="center" sx={{ marginTop: "1rem" }}>
      <Stack
        sx={{
          width: "30vw",
          height: "40vh",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "6px",
          padding: "1rem",
          backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' rx='6' ry='6' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23B8B8B8' stroke-width='7' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
        }}>
        {!selectedFile && (
          <Button
            component="label"
            variant="contained"
            startIcon={<MdUpload />}
            sx={{
              marginRight: "1rem",
              color: BLACK,
              bgcolor: BLUE,
              borderColor: BLUE,
              boxShadow: "none",
            }}>
            <Typography
              variant="body1"
              sx={{
                color: CHARCOAL,
                fontFamily: "Mulish, sans-serif",
                fontWeight: 600,
                textTransform: "none",
              }}>
              Upload Image
            </Typography>
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
          <Button variant="contained" color="primary" onClick={onSubmit}>
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
