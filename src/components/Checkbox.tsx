import { FormControlLabel, Checkbox } from "@mui/material";

interface Prop {
  label: string;
  value?: boolean;
  changeFn?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const CheckboxComponent = ({ label, changeFn, value }: Prop) => {
  return (
      <FormControlLabel
        control={
          <Checkbox
            size="small"
            color="success"
            value={value}
            defaultChecked={value}
            onChange={changeFn}
          />
        }
        label={label}
      />
  );
};

export default CheckboxComponent;
