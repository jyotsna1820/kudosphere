import React, { useEffect, useState } from "react";
import axios from "axios";
import { Stack } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { MdUpload } from "react-icons/md";
import { BLACK, GREEN } from "../../constants/colors";
import {useQuery} from "react-query";
import ImageMeta from "./imageMeta";

//function component to return the image upload component
const JWT = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlYmRiZjk1Yy0xODU4LTQ2NmEtOTZlNi1lZGZlM2UzYzM4MWEiLCJlbWFpbCI6Imp5b3RzbmExODIwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJhZjFiMjc0N2NhMzc3M2MxODg3YyIsInNjb3BlZEtleVNlY3JldCI6ImY5ZmQ1N2M3ZjdjZDdiODA2NDFkMmRmNGNlM2VhMGIxZmU3MjE4Mjg1NmZmZWI4YTkwYTU4ODRlNzhjMjFmMGQiLCJpYXQiOjE2ODAyOTc4ODN9.59FKZD7xnbT7nNamhiHIfRmBuR7u6BfAnaWaQfymrc4`;

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState<string | undefined>();

  // use react query to upload image to pinata

  const {isLoading, error, data} = useQuery("imageUpload", () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("file", selectedFile);
    const metadata = JSON.stringify({
      name: "File",
      keyvalues: {
        customKey: "customValue",
        customKey2: "customValue2",
      },
    });
    formData.append("pinataMetadata", metadata);
    return axios
      .post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        headers: {
          "Content-Type": `multipart/form-data`,
          Authorization: JWT,
        },
      })
      .then((res) => res.data);
  });
  
          

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

  const onSubmit = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("file", selectedFile);

    const metadata = JSON.stringify({
      name: "File",
    });
    formData.append("pinataMetadata", metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", options);

    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          maxBodyLength: Infinity,
          headers: {
            "Content-Type": `multipart/form-data`,
            Authorization: JWT,
          },
        }
      );
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
    <Stack spacing={2} alignItems="center" sx={{ margin: "1rem 0rem" }}>
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
              bgcolor: GREEN,
              borderColor: GREEN,
              boxShadow: "none",
            }}>
            <Typography
              variant="body1"
              sx={{
                color: BLACK,
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
          <Button
            variant="contained"
            onClick={onSubmit}
            sx={{ color: BLACK, bgcolor: GREEN, boxShadow: "none" }}>
            <Typography
              variant="body1"
              sx={{
                color: BLACK,
                fontFamily: "Mulish, sans-serif",
                fontWeight: 600,
                textTransform: "none",
              }}>
              Upload
            </Typography>
          </Button>
          <Button
            variant="outlined"
            onClick={onCancel}
            sx={{ color: GREEN, borderColor: GREEN }}>
            <Typography
              variant="body1"
              sx={{
                color: BLACK,
                fontFamily: "Mulish, sans-serif",
                fontWeight: 600,
                textTransform: "none",
              }}>
              Cancel
            </Typography>
          </Button>
        </Stack>
      )}
      <ImageMeta/>
    </Stack>
  );
};

export default ImageUpload;
