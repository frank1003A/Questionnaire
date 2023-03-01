import AntSwitch from "./AntSwitch";
import Checkbox from "./Checkbox";

interface Props {
  question: string;
  variant: "with-flag" | "no-flag";
  extra?: string;
  checkboxValue?: boolean;
  switchValue?: boolean;
  changeFnInternal?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeFnShow?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Question = ({
  question,
  variant,
  extra,
  changeFnInternal,
  changeFnShow,
  switchValue,
  checkboxValue,
}: Props) => {
  return (
    <div className="question">
      <p>{question}</p>
      <p id="ext">{`${extra ? `(${extra})` : ""}`}</p>
      {variant === "with-flag" && (
        <div className="flags">
          <Checkbox
            label="internal"
            changeFn={changeFnInternal}
            value={checkboxValue}
          />
          <AntSwitch label="show" changeFn={changeFnShow} value={switchValue} />
        </div>
      )}
    </div>
  );
};

export default Question;
