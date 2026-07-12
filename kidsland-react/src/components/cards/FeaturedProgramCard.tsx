import { Link } from "react-router-dom";
import "./FeaturedProgramCard.css";

export interface FeaturedProgramCardProps {
  category: string;
  title: string;
  ageRange: string;
  benefit: string;
  ctaLabel: string;
}

export default function FeaturedProgramCard({
  category,
  title,
  ageRange,
  benefit,
  ctaLabel,
}: FeaturedProgramCardProps) {
  return (
    <div className="featured-program-card">
      <p className="featured-program-card__badge">{category}</p>
      <h3 className="featured-program-card__title">{title}</h3>
      <p className="featured-program-card__age-range">{ageRange}</p>
      <p className="featured-program-card__benefit">{benefit}</p>
      <Link to="/program" className="featured-program-card__cta">
        {ctaLabel} →
      </Link>
    </div>
  );
}
