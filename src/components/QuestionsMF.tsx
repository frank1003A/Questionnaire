import AntSwitch from "./AntSwitch";
import Checkbox from "./Checkbox";

interface Props {
  question: string;
  variant: "with-flag" | "no-flag";
  extra?: string;
  checkboxValue?: boolean;
  switchValue?: boolean;
  changeFnMandatory?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeFnShow?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const QuestionsMF = ({
  question,
  variant,
  extra,
  changeFnMandatory,
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
            label="Mandatory"
            changeFn={changeFnMandatory}
            value={checkboxValue}
          />
          <AntSwitch label="hide" changeFn={changeFnShow} value={switchValue} />
        </div>
      )}
    </div>
  );
};

export default QuestionsMF;
