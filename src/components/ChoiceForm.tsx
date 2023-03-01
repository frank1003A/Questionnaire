import React from "react";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AddIcon from "@mui/icons-material/Add";
import { TextField } from "@mui/material";
import IconButtonComponent from "./IconButton";

interface Props {
  choiceLength: number;
  value: string;
  changeFn: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  addChoice: () => void;
  index: number;
}
const ChoiceForm = ({
  value,
  choiceLength,
  changeFn,
  addChoice,
  index,
}: Props) => {
  return (
    <div className="choice-group" key={index}>
      <FormatListBulletedIcon />
      <TextField
        id="select-choice"
        type={"text"}
        variant="outlined"
        fullWidth
        value={value}
        onChange={changeFn}
        sx={{
          marginRight: index === choiceLength - 1 ? ".5rem" : "",
          marginLeft: ".5rem"
        }}
      />
      {index === choiceLength - 1 ? (
        <IconButtonComponent onclick={addChoice} icon={<AddIcon />} />
      ) : (
        ""
      )}
    </div>
  );
};

export default ChoiceForm;
