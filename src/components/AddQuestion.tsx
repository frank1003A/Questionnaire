import { AddOutlined } from "@mui/icons-material";
import { useState } from "react";
import Form from "./Form";
import {
  Button,
} from "@mui/material";
import ApplicationForm from "model/ApplicationForm";


interface Props {
  cardName: keyof ApplicationForm;
}

const AddQuestion = ({cardName}: Props) => {
  const [add, setAdd] = useState<boolean>(false);

  const toggle = () => {
    setAdd(!add);
  };

  const handleAddCallback = (bool: boolean) => {
    setAdd(bool)
  }
  return (
    <>
      {add && (
       <Form cardName={cardName} addCallbackFn={handleAddCallback}/>
      )}
      <Button
        className="text-button"
        variant="text"
        startIcon={<AddOutlined />}
        onClick={toggle}
      >
        Add a question
      </Button>
    </>
  );
};

export default AddQuestion;
