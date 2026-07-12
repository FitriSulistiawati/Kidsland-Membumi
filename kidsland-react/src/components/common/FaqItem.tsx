import { useState } from "react";
import "./FaqItem.css";

export interface FaqItemProps {
  question: string;
  answer: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function FaqItem({
  question,
  answer,
  isOpen = false,
  onToggle,
}: FaqItemProps) {
  const [internalOpen, setInternalOpen] = useState(isOpen);
  const open = onToggle !== undefined ? isOpen : internalOpen;

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalOpen(!internalOpen);
    }
  };

  return (
    <div className={`faq-item ${open ? "faq-item--open" : ""}`}>
      <button
        type="button"
        className="faq-item__trigger"
        aria-expanded={open}
        onClick={handleToggle}
      >
        <span className="faq-item__question">{question}</span>
        <span className="faq-item__icon" aria-hidden="true">
          ▼
        </span>
      </button>
      {open && <p className="faq-item__answer">{answer}</p>}
    </div>
  );
}
