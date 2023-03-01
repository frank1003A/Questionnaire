import ApplicationForm from "model/ApplicationForm";
import { ReactNode } from "react";
import AddQuestion from "./AddQuestion";

interface Prop {
  children: ReactNode;
  variant: "no-add" | "add";
  headerText: string;
  cardName: keyof ApplicationForm;
}
const Card = ({ children, headerText, variant, cardName}: Prop) => {
  return (
    <div className="card">
      <section className="top">{headerText}</section>
      <section className={variant === "add" ? "main" : "main bottom-rounded"}>
        {children}
      </section>
      {variant === "add" && (
        <section className="bottom">
          <AddQuestion cardName={cardName} />
        </section>
      )}
    </div>
  );
};

export default Card;
