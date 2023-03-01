import Button from '@mui/material/Button/Button';
import React from 'react'

interface Prop {
  startIcon?: JSX.Element
  onClick?: () => void;
  compVariant: "icon" | "no-icon";
  text: string;
}
const ButtonComponent = ({startIcon, onClick, compVariant, text}: Prop) => {
  return (
    <Button
        className="text-button"
        variant={compVariant === "icon" ? "text" : "contained"}
        startIcon={startIcon}
        onClick={onClick}
      >
        {text}
      </Button>
  )
}

export default ButtonComponent