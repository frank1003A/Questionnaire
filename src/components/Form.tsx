import {
  FormControl,
  FormGroup,
  TextField,
} from "@mui/material";
import ButtonComponent from "./Button";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import ChoiceForm from "./ChoiceForm";
import CheckboxComponent from "./Checkbox";
import ApplicationForm, { Question } from "model/ApplicationForm";
import { useDispatch } from "react-redux";
import {
  updateCustomisedQuestion,
  updatePersonalQuestions,
  updateProfileQuestions,
} from "redux/applicationFormSlice";
import TypeDropdown from "./TypeDropdown";

interface Props {
  cardName?: keyof ApplicationForm;
  addCallbackFn?: (bool: boolean) => void;
}
const Form = ({ cardName, addCallbackFn}: Props) => {
  const dispatch = useDispatch();

  let defaultQuestion = {
    id: "",
    type: "",
    question: "",
    choice: [""],
    maxChoice: 0,
    disqualify: false,
    other: false,
  }
  const [question, setQuestion] = useState<Question>({
    id: "",
    type: "",
    question: "",
    choice: [""],
    maxChoice: 0,
    disqualify: false,
    other: false,
  });

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

  const updatePersonalQuest = () => {
    if (cardName === "personalInformation") {
      dispatch(
        updatePersonalQuestions({
          arrValue: question,
        })
      );
    } else {
      return;
    }
  };

  const updateProfileQuest = () => {
    if (cardName === "profile") {
      dispatch(
        updateProfileQuestions({
          arrValue: question,
        })
      );
    } else {
      return;
    }
  };

  const updateCustomisedQuest = () => {
    if (cardName === "customisedQuestions") {
      dispatch(
        updateCustomisedQuestion({
          arrValue: question,
        })
      );
    } else {
      return;
    }
  };

  const updateSlice = () => {
    updatePersonalQuest();
    updateProfileQuest();
    updateCustomisedQuest();
    if (addCallbackFn !== undefined) {
      addCallbackFn(false);
    }
  };

  const clearInputs = () => {
    let temp = {...defaultQuestion}
    setQuestion({...temp})
  }

  return (
    <div className="addnewtype">
      <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
        <TypeDropdown 
        value={question.type}
        handleChange={(e) => handleChange(e.target.value, "type")}
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
        {["multiple choice", "dropdown"].includes(question.type.toLowerCase()) && (
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
            onClick={() => clearInputs()}
          />
          <ButtonComponent
            text="Save"
            compVariant="no-icon"
            onClick={() => updateSlice()}
          />
        </div>
      </FormControl>
    </div>
  );
};

export default Form;
