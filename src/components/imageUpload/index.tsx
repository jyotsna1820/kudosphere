import React, { useEffect, useState } from "react";
import axios from "axios";
import { Stack } from "@mui/system";
import { Button, TextField, Typography } from "@mui/material";
import { MdUpload } from "react-icons/md";
import { BLACK, NEON } from "../../constants/colors";
import { useMutation, useQuery } from "react-query";

//upload Image props
interface UploadImageProps {
  image: File;
  name: string;
  description: string;
}

const JWT = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlYmRiZjk1Yy0xODU4LTQ2NmEtOTZlNi1lZGZlM2UzYzM4MWEiLCJlbWFpbCI6Imp5b3RzbmExODIwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJhZjFiMjc0N2NhMzc3M2MxODg3YyIsInNjb3BlZEtleVNlY3JldCI6ImY5ZmQ1N2M3ZjdjZDdiODA2NDFkMmRmNGNlM2VhMGIxZmU3MjE4Mjg1NmZmZWI4YTkwYTU4ODRlNzhjMjFmMGQiLCJpYXQiOjE2ODAyOTc4ODN9.59FKZD7xnbT7nNamhiHIfRmBuR7u6BfAnaWaQfymrc4`;

const uploadImg = async ({ image, name, description }: UploadImageProps) => {
  if (!image) return;
  const formData = new FormData();
  formData.append("file", image);
  const metadata = JSON.stringify({
    name: name,
    keyvalues: {
      description: description,
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
};

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState<string | undefined>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // use react query to upload image to pinata

  const uploadImgMutation = useMutation(uploadImg, {
    onSuccess: () => {
      setSelectedFile(undefined);
      setName("");
      setDescription("");
  }});

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
    setName("");
    setDescription("");
  };

  const onUpload = () => {
    if(!selectedFile) return;
    uploadImgMutation.mutate({ image: selectedFile, name, description });
  };

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
              bgcolor: NEON,
              borderColor: NEON,
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
            onClick={onUpload}
            sx={{ color: BLACK, bgcolor: NEON, boxShadow: "none" }}>
            <Typography
              variant="body1"
              sx={{
                color: BLACK,
                fontFamily: "Mulish, sans-serif",
                fontWeight: 600,
                textTransform: "none",
              }}>
              {uploadImgMutation.isLoading ? "Uploading..." : "Upload"}
            </Typography>
          </Button>
          <Button
            variant="outlined"
            onClick={onCancel}
            sx={{ color: NEON, borderColor: NEON }}>
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
      <Stack spacing={2} sx={{ width: "30vw" }}>
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
    </Stack>
  );
};

export default ImageUpload;
