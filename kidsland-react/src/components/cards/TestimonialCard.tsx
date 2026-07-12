import "./TestimonialCard.css";

type TestimonialCardProps = {
  quote: string;
  name: string;
};

export default function TestimonialCard({ quote, name }: TestimonialCardProps) {
  return (
    <blockquote className="testimonial-card">
      <p className="testimonial-card__quote">"{quote}"</p>
      <footer className="testimonial-card__author">
        {name}
      </footer>
    </blockquote>
  );
}
