import EditIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { IconButton } from "@mui/material";
import { useAppDispatch } from "app/hooks";
import ApplicationForm, { Question } from "model/ApplicationForm";
import { useState } from "react";
import { getCurrentQuestion } from "redux/propsSlice";
import UpdateForm from "./UpdateForm";

interface Props {
  customQuestion: Question;
  indexOfQuestion: number;
  cardName: keyof ApplicationForm;
}
const CustomQuestions = ({customQuestion, indexOfQuestion, cardName}: Props) => {
  const [edit, setEdit] = useState<Boolean>(false)
  const dispatch = useAppDispatch();

  //
  const editCallback = (bool: boolean) => {
    setEdit(bool)
  }
  return (
    <>
      <div className="custom-questions">
        <span>{customQuestion?.type}</span>
        <div>
          <h1>{customQuestion?.question}</h1>
          <IconButton onClick={() => {
             dispatch(getCurrentQuestion({
                editing: customQuestion!,
                editIndex: indexOfQuestion
              }))
              setEdit(!edit)
          }}>
            <EditIcon />
          </IconButton>
        </div>
      </div>
      {edit  && (
        <div className="bottom">
          <UpdateForm state={customQuestion} cardName={cardName} editCallback={editCallback}/>
        </div>
      )}
    </>
  );
};

export default CustomQuestions;
