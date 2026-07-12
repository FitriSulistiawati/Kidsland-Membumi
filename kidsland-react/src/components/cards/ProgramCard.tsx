import { Link } from "react-router-dom";
import { WhatsAppButton } from "../common";
import "./ProgramCard.css";

type ProgramCardProps = {
  offering: {
    category: string;
    title: string;
    price: string;
    description: string;
    benefits: string[];
  };
};

export default function ProgramCard({ offering }: ProgramCardProps) {
  return (
    <article className="program-card">
      <div className="program-card__category">{offering.category}</div>
      <h2 className="program-card__title">{offering.title}</h2>
      <p className="program-card__price">{offering.price}</p>
      <p className="program-card__description">{offering.description}</p>

      <ul className="program-card__benefits">
        {offering.benefits.map((benefit) => (
          <li key={benefit} className="program-card__benefit-item">
            <span className="program-card__benefit-dot" />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>

      <div className="program-card__actions">
        <WhatsAppButton
          message={`Halo Kidsland Membumi, saya ingin tanya tentang ${offering.title}.`}
          label="Beli / Tanya via WhatsApp"
          className="program-card__action-btn program-card__action-btn--primary"
        />
        <Link
          to="/"
          className="program-card__action-btn program-card__action-btn--secondary"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </article>
  );
}
