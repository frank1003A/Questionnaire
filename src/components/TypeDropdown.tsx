import { FormGroup, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import React from 'react'

interface Props {
    handleChange: (event: SelectChangeEvent<string>) => void;
    value: string;
}
const TypeDropdown = ({value, handleChange}:Props) => {
    const question_types = [
        "Paragraph",
        "Short answer",
        "Yes/No",
        "Dropdown",
        "Multiple choice",
        "Date",
        "Number",
        "File upload",
        "Video question",
      ];
      
  return (
    <FormGroup sx={{ marginBottom: "1rem" }}>
          <label className="top-label">Type</label>
          <Select
            onChange={handleChange}
            value={value}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            {question_types.map((q, i) => {
              return (
                <MenuItem value={q} key={i}>
                  {q}
                </MenuItem>
              );
            })}
          </Select>
        </FormGroup>
  )
}

export default TypeDropdown