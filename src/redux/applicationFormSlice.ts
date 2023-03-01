import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ApplicationForm, {
  PersonalInformation,
  Profile,
  Question,
} from "model/ApplicationForm";
import { RootState } from "../app/store";

interface PfPayLoad {
  key: keyof PersonalInformation;
  data: "internalUse" | "show";
  value: boolean;
}

interface PrPayLoad {
  key: keyof Profile;
  data: "mandatory" | "show";
  value: boolean;
}

interface ArrUpdatePayLoad {
  arrValue: Question;
}

const initialState: ApplicationForm = {
  coverImage: "",
  personalInformation: {
    firstName: { internalUse: false, show: true },
    lastName: { internalUse: false, show: true },
    emailId: { internalUse: false, show: true },
    phoneNumber: { internalUse: false, show: true },
    nationality: { internalUse: false, show: true },
    currentResidence: { internalUse: false, show: true },
    idNumber: { internalUse: false, show: true },
    dateOfBirth: { internalUse: false, show: true },
    gender: { internalUse: false, show: true },
    personalQuestions: [],
  },
  profile: {
    education: { mandatory: false, show: true },
    experience: { mandatory: false, show: true },
    resume: { mandatory: false, show: true },
    profileQuestions: [],
  },
  customisedQuestions: {
    customisedQuestions: [],
  },
};

export const applicationFormSlice = createSlice({
  name: "applicationForm",
  initialState,
  reducers: {
    updatePersonalInformation: (state, action: PayloadAction<PfPayLoad>) => {
      const { data, value, key } = action.payload;
      const updatedPersonalInformation = {
        ...state.personalInformation,
        [key]: {
          ...state.personalInformation[key],
          [data]: value,
        },
      };
      return { ...state, personalInformation: updatedPersonalInformation };
    },
    updateProfileInformation: (state, action: PayloadAction<PrPayLoad>) => {
      const { data, value, key } = action.payload;
      const updatedProfileInformation = {
        ...state.profile,
        [key]: {
          ...state.profile[key],
          [data]: value,
        },
      };
      return { ...state, profile: updatedProfileInformation };
    },
    updatePersonalQuestions: (
      state,
      action: PayloadAction<ArrUpdatePayLoad>
    ) => {
      const { arrValue } = action.payload;
      return {
        ...state,
        personalInformation: {
          ...state.personalInformation,
          personalQuestions: [
            ...state.personalInformation.personalQuestions,
            arrValue,
          ],
        },
      };
    },
    updateProfileQuestions: (
      state,
      action: PayloadAction<ArrUpdatePayLoad>
    ) => {
      const { arrValue } = action.payload;
      return {
        ...state,
        profile: {
          ...state.profile,
          profileQuestions: [...state.profile.profileQuestions, arrValue],
        },
      };
    },
    updateCustomisedQuestion: (
      state,
      action: PayloadAction<ArrUpdatePayLoad>
    ) => {
      const { arrValue } = action.payload;
      return {
        ...state,
        customisedQuestions: {
          ...state.customisedQuestions,
          customisedQuestions: [
            ...state.customisedQuestions.customisedQuestions,
            arrValue,
          ],
        },
      };
    },
    editCustomisedQuestion: (
      state,
      action: PayloadAction<{ index: number; customQuestion: Question }>
    ) => {
      let index = action.payload.index;
      let question = action.payload.customQuestion;
      let pq = [...state.customisedQuestions.customisedQuestions];
      pq[index] = question;
      return {
        ...state,
        customisedQuestions: {
          ...state.customisedQuestions,
          customisedQuestions: pq,
        },
      };
    },
    editPersonalQuestion: (
      state,
      action: PayloadAction<{ index: number; customQuestion: Question }>
    ) => {
      let index = action.payload.index;
      let question = action.payload.customQuestion;
      let pq = [...state.personalInformation.personalQuestions];
      pq[index] = question;
      return {
        ...state,
        personalInformation: {
          ...state.personalInformation,
          personalQuestions: pq,
        },
      };
    },
    editProfileQuestion: (
      state,
      action: PayloadAction<{ index: number; customQuestion: Question }>
    ) => {
      let index = action.payload.index;
      let question = action.payload.customQuestion;
      let pq = [...state.profile.profileQuestions];
      pq[index] = question;
      return {
        ...state,
        profile: {
          ...state.profile,
          profileQuestions: pq,
        },
      };
    },
    deleteArrayElementSlice: (
      state,
      action: PayloadAction<{ key: keyof ApplicationForm; index: number }>
    ) => {
      let key = action.payload.key;
      let index = action.payload.index;
      switch (key) {
        case "personalInformation":
          return {
            ...state,
            personalInformation: {
              ...state.personalInformation,
              personalQuestions: [
                ...state.personalInformation.personalQuestions
              ].filter((q,i) => i !== index),
            },
          };
        case "profile":
          return {
            ...state,
            profile: {
              ...state.profile,
              profileQuestions: [
                ...state.profile.profileQuestions
              ].filter((q,i) => i !== index),
            },
          };
        case "customisedQuestions":
          return {
            ...state,
            customisedQuestions: {
              ...state.customisedQuestions,
              customisedQuestions: [
                ...state.customisedQuestions.customisedQuestions
              ].filter((q,i) => i !== index),
            },
          };
        default:
          break;
      }
    },
    handleCoverImage:  (state, action: PayloadAction<{url: string}>) => {
      return {
        ...state,
        coverImage: action.payload.url
      }
    }
  },
});

export const {
  updatePersonalInformation,
  updateProfileInformation,
  updatePersonalQuestions,
  updateProfileQuestions,
  updateCustomisedQuestion,
  editCustomisedQuestion,
  editPersonalQuestion,
  editProfileQuestion,
  deleteArrayElementSlice,
  handleCoverImage
} = applicationFormSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state: RootState) => state.applicationForm;

export default applicationFormSlice.reducer;
