import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Question } from "model/ApplicationForm";
import { RootState } from "../app/store";

interface AppProps {
  editIndex?: number;
  editing?: Question;
}

const initialState: AppProps = {
  editIndex: 0,
  editing: {
    id: "",
    type: "",
    question: "",
    choice: [""],
    maxChoice: 0,
    disqualify: false,
    other: false,
  },
};

export const propSlice = createSlice({
  name: "props",
  initialState,
  reducers: {
    getCurrentQuestion: (state, action: PayloadAction<AppProps>) => {
        let question = action.payload.editing
        return {
            ...state,
            editing: question,
            editIndex: action.payload.editIndex
        }
    },
  },
});

export const {
    getCurrentQuestion,
} = propSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state: RootState) => state.props;

export default propSlice.reducer;
