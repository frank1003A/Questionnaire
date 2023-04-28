import React, { useEffect, useRef, useState } from "react";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import ButtonComponent from "./Button";
import { useAppDispatch, useAppSelector } from "app/hooks";
import axios from "axios";
import { handleCoverImage } from "redux/applicationFormSlice";
import { BarLoader } from "react-spinners";
// Import the Cloudinary classes. 

interface Props {
  onFileInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadImage = ({ onFileInputChange }: Props) => {
  const dispatch = useAppDispatch()
  const { coverImage } = useAppSelector((state) => state.applicationForm);
  const [infocus, setInfocus] = useState<boolean>(false);
  const [mount, setMount] = useState<boolean>(false);
  let [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const uploadBox = useRef<HTMLDivElement | null>(null);
  const imageElement = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    setMount(true);
  }, []);

  const fileUpload = () => {
    let Input = inputRef.current! as HTMLInputElement;
    Input.click();
  };

  useEffect(() => {
    let box = uploadBox.current! as HTMLDivElement;
    box.addEventListener("mouseenter", function () {
      setInfocus(true);
    });
    box.addEventListener("mouseleave", function () {
      setInfocus(false);
    });

    return () => {
      box.removeEventListener("mouseenter", function () {
        setInfocus(true);
      });
      box.removeEventListener("mouseleave", function () {
        setInfocus(false);
      });
    };
  }, []);

  const onImageFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoading(true)
    if (
      event.target.files !== null &&
      event.target.files !== undefined &&
      mount
    ) {
      submitImage(event.target.files[0]);
    }
  };

  let props = {
    hidden: coverImage && imageElement !== null ? false : true,
  };

  const submitImage = (file: File) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ubiaycb3");
    data.append("folder", "capital-placement");
    axios
      .post("https://api.cloudinary.com/v1_1/dpmmixyvq/image/upload", data)
      .then((response) => {
        // handle loading
        setLoading(false)

        // redux handler cover image 
        dispatch(handleCoverImage({
          url: response.data.url
        }))
      });
  };

  return (
    <div className="imagebox" style={{ padding: coverImage ? "0" : "1rem" }}>
      <img src={coverImage} alt="cover" {...props} />
      {loading && <BarLoader color="#00635B"/> }
      {coverImage || loading ? (
        ""
      ) : (
        <div className="uploadimage" onClick={fileUpload} ref={uploadBox}>
          <FileDownloadOutlinedIcon />
          <h1>
            {!infocus ? "Upload cover Image" : "Click here to upload image"}
          </h1>
          <h2>16:9 ratio is recommended. Max image size 1mb</h2>
        </div>
      )}
      {coverImage && 
        <div className="imgcontrols">
          <ButtonComponent
            startIcon={<ClearIcon />}
            compVariant="icon"
            onClick={fileUpload}
            text="Delete & re-upload"
          />
        </div>}
      <input
        hidden
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={onImageFileInputChange}
      />
    </div>
  );
};

export default UploadImage;
