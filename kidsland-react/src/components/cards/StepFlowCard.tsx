import "./StepFlowCard.css";

export interface StepFlowCardProps {
  number: number;
  title: string;
  description: string;
}

export default function StepFlowCard({
  number,
  title,
  description,
}: StepFlowCardProps) {
  return (
    <div className="step-flow-card">
      <div className="step-flow-card__number">{number}</div>
      <h3 className="step-flow-card__title">{title}</h3>
      <p className="step-flow-card__description">{description}</p>
    </div>
  );
}
