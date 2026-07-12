import "./HighlightCard.css";

type HighlightCardProps = {
  title: string;
  description: string;
};

export default function HighlightCard({
  title,
  description,
}: HighlightCardProps) {
  return (
    <article className="highlight-card">
      <div className="highlight-card__badge">
        Pilihan utama
      </div>
      <h2 className="highlight-card__title">{title}</h2>
      <p className="highlight-card__description">{description}</p>
    </article>
  );
}
