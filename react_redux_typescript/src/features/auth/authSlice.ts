import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import { PROPS_AUTHEN, PROPS_NICKNAME, PROPS_PROFILE } from "../types";
import { Tune } from "@material-ui/icons";

// .envファイルにパスを指定
// process.envにつなぐことでパスとして認識してくれる
const apiUrl = process.env.REACT_APP_DEV_API_URL;

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    openSignIn: true, //モーダル表示/非表示
    openSignUp: false, //モーダル表示/非表示
    openProfile: false, //モーダル表示/非表示
    isLoadingAuth: false, //apiにアクセス中か否か
    myprofile: {
      //backendのProfileモデルの内容
      nickName: "",
      userProfile: 0,
      created_on: "",
      img: "",
    },
    profiles: [
      //backend側でユーザ情報一覧を一括取得する際に用いる
      {
        id: 0,
        nickName: "",
        userProfile: 0,
        created_on: "",
        img: "",
      },
    ],
  },
  reducers: {
    //apiへのfetchを開始したとき
    fetchCredStart(state) {
      state.isLoadingAuth = true;
    },
    //apiへのfetchを終了したとき
    fetchCredEnd(state) {
      state.isLoadingAuth = false;
    },
    setOpenSignIn(state) {
      state.openSignIn = true;
    },
    resetOpenSignIn(state) {
      state.openSignIn = false;
    },
    setOpenSignUp(state) {
      state.openSignUp = true;
    },
    resetOpenSignUp(state) {
      state.openSignUp = false;
    },
    setOpenProfile(state) {
      state.openProfile = true;
    },
    resetOpenProfile(state) {
      state.openProfile = false;
    },
    editNickname(state, action) {
      state.myprofile.nickName = action.payload;
    },
  },
});

export const {
  fetchCredStart,
  fetchCredEnd,
  setOpenSignIn,
  resetOpenSignIn,
  setOpenSignUp,
  resetOpenSignUp,
  setOpenProfile,
  resetOpenProfile,
  editNickname,
} = authSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;

export default authSlice.reducer;
