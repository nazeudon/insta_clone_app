import React, { useState } from "react";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Core.module.css";
import { File } from "../types";
import { AppDispatch } from "../../app/store";

import {
  editNickname,
  selectProfile,
  selectOpenProfile,
  resetOpenProfile,
  fetchCredStart,
  fetchCredEnd,
  fetchAsyncUpdateProf,
} from "../auth/authSlice";
import { TextField, Button, IconButton } from "@material-ui/core";
import { MdAddAPhoto } from "react-icons/md";

const customStyles = {
  content: {
    top: "55%",
    left: "50%",
    width: 200,
    height: 220,
    padding: "50px",
    transform: "translate(-50%, -50%)",
  },
};

const EditProfile: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const openProfile = useSelector(selectOpenProfile);
  const profile = useSelector(selectProfile);
  const [image, setImage] = useState<File | null>(null);

  const updateProfile = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const packet = {
      id: profile.id,
      nickName: profile.nickName,
      img: image,
    };

    await dispatch(fetchCredStart());
    await dispatch(fetchAsyncUpdateProf(packet));
    await dispatch(fetchCredEnd());
    await dispatch(resetOpenProfile());
  };

  const handlerEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput?.click();
  };

  return (
    <>
      <Modal
        isOpen={openProfile}
        onRequestClose={async () => {
          await dispatch(resetOpenProfile());
        }}
        style={customStyles}
      >
        <form className={styles.core_signUp}>
          <h1 className={styles.core_title}>SNS clone</h1>

          <br />
          <TextField
            placeholder="nick name"
            type="text"
            value={profile?.nickName}
            onChange={(e) => dispatch(editNickname(e.target.value))}
          />

          <input
            type="file"
            id="imageInput"
            hidden={true}
            onChange={(e) => setImage(e.target.files![0])}
          />
          <br />
          <IconButton onClick={handlerEditPicture}>
            <MdAddAPhoto />
          </IconButton>
          <br />
          <Button
            disabled={!profile?.nickName}
            variant="contained"
            color="primary"
            type="submit"
            onClick={updateProfile}
          >
            Update
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default EditProfile;
