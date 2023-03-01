import { FormControl, FormGroup, TextField } from "@mui/material";
import ButtonComponent from "./Button";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect, useState } from "react";
import ChoiceForm from "./ChoiceForm";
import CheckboxComponent from "./Checkbox";
import ApplicationForm, { Question } from "model/ApplicationForm";
import { useAppDispatch, useAppSelector } from "app/hooks";
import TypeDropdown from "./TypeDropdown";
import {
  deleteArrayElementSlice,
  editCustomisedQuestion,
  editPersonalQuestion,
  editProfileQuestion,
} from "redux/applicationFormSlice";

interface Props {
  state: Question;
  cardName: keyof ApplicationForm;
  editCallback: (bool: boolean) => void;
}

const UpdateForm = ({ state, cardName, editCallback }: Props) => {
  const { editIndex } = useAppSelector((state) => state.props);
  const dispatch = useAppDispatch();
  const [question, setQuestion] = useState<Question>({
    id: "",
    type: "",
    question: "",
    choice: [""],
    maxChoice: 0,
    disqualify: false,
    other: false,
  });

  useEffect(() => {
    if (state !== undefined) {
      setQuestion(state);
    } else {
      return;
    }
  }, [state]);

  const handleChange = (value: any, name: keyof Question) => {
    let tempQuest: Question = { ...question };
    const randomId = Math.random();
    handleId(tempQuest, randomId);
    handleStringQuestion(name, tempQuest, value);
    handleMaxChoice(name, tempQuest, value);
    handleBoolean(name, tempQuest, value);
    setQuestion(tempQuest);
  };

  const handleId = (tempQuest: Question, randNum: number) => {
    if (tempQuest.id !== undefined) {
      tempQuest.id = randNum.toString();
    } else {
      return;
    }
  };

  const handleStringQuestion = (
    name: keyof Question,
    tempQuest: Question,
    value: any
  ) => {
    if (
      name !== "choice" &&
      name !== "maxChoice" &&
      name !== "disqualify" &&
      name !== "other"
    ) {
      tempQuest[name] = value as string;
    } else {
      return;
    }
  };

  const handleMaxChoice = (
    name: keyof Question,
    tempQuest: Question,
    value: any
  ) => {
    if (name === "maxChoice") {
      tempQuest[name] = value as number;
    } else {
      return;
    }
  };

  const handleBoolean = (
    name: keyof Question,
    tempQuest: Question,
    value: any
  ) => {
    if (name === "disqualify" || name === "other") {
      tempQuest[name] = value as boolean;
    } else {
      return;
    }
  };

  const handleChoice = (value: any, index: number) => {
    let tempQuest: Question = { ...question };
    const newChoice = [...tempQuest.choice];
    newChoice[index] = value;
    setQuestion({ ...question, choice: newChoice });
  };

  const addChoice = () => {
    let tempQuest: Question = { ...question };
    const newChoice = [...tempQuest.choice];
    newChoice.push("");
    setQuestion({ ...question, choice: newChoice });
  };

  const editCustomQuest = () => {
    if (cardName === "customisedQuestions") {
      dispatch(
        editCustomisedQuestion({
          customQuestion: question,
          index: editIndex as number,
        })
      );
    } else {
      return;
    }
  };

  const editPersonalQuest = () => {
    if (cardName === "personalInformation") {
      dispatch(
        editPersonalQuestion({
          customQuestion: question,
          index: editIndex as number,
        })
      );
    } else {
      return;
    }
  };

  const editProfileQuest = () => {
    if (cardName === "profile") {
      dispatch(
        editProfileQuestion({
          customQuestion: question,
          index: editIndex as number,
        })
      );
    } else {
      return;
    }
  };

  const editSlice = () => {
    editCustomQuest()
    editPersonalQuest()
    editProfileQuest()
    editCallback(false);
  };

  const deleteQuest = () => {
    dispatch(deleteArrayElementSlice({
      index: editIndex as number,
      key: cardName
    }))
    editCallback(false);
  }
  return (
    <div className="addnewtype">
      <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
        <TypeDropdown
          handleChange={(e) => handleChange(e.target.value, "type")}
          value={question.type}
        />
        <FormGroup sx={{ marginBottom: "1rem" }}>
          <label htmlFor="custom-question" className="top-label">
            Question
          </label>
          <TextField
            id="custom-question"
            variant="outlined"
            value={question.question}
            onChange={(e) => handleChange(e.target.value, "question")}
          />
        </FormGroup>
        {question.type.toLowerCase().includes("yes/no") && (
          <section>
            <CheckboxComponent
              label={`Disqualify candidate if the answer is no`}
              value={question.disqualify}
              changeFn={(e) => handleChange(e.target.checked, "disqualify")}
            />
          </section>
        )}
        {question.type.toLowerCase().includes("multiple choice") && (
          <section>
            <div className="choices">
              <label
                htmlFor="select-choice"
                className="top-label"
                aria-label="choice-group-header"
              >
                Choice
              </label>
              {question.choice.map((chc, index) => {
                return (
                  <ChoiceForm
                    index={index}
                    value={chc}
                    choiceLength={question.choice.length}
                    changeFn={(e) => handleChoice(e.target.value, index)}
                    addChoice={() => addChoice()}
                    key={index}
                  />
                );
              })}
            </div>
            <CheckboxComponent
              label={`Enable "Other" Option`}
              value={question.other}
              changeFn={(e) => handleChange(e.target.checked, "other")}
            />
            <FormGroup sx={{ marginBottom: "1rem" }}>
              <label htmlFor="max-choice" className="top-label">
                Max choice allowed
              </label>
              <TextField
                id="max-choice"
                variant="outlined"
                type="number"
                value={question.maxChoice}
                onChange={(e) => handleChange(e.target.value, "maxChoice")}
              />
            </FormGroup>
          </section>
        )}
        <div className="form-controls">
          <ButtonComponent
            startIcon={<ClearIcon />}
            text="Delete question"
            compVariant="icon"
            onClick={() => deleteQuest()}
          />
          <ButtonComponent
            text="Update"
            compVariant="no-icon"
            onClick={() => editSlice()}
          />
        </div>
      </FormControl>
    </div>
  );
};

export default UpdateForm;
