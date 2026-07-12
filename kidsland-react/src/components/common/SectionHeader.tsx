import "./SectionHeader.css";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  titleAs?: "h1" | "h2";
  className?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  lead,
  titleAs = "h1",
  className,
}: SectionHeaderProps) {
  const TitleTag = titleAs;

  return (
    <div className={`section-header ${className ?? ""}`}>
      <p className="section-header__eyebrow">{eyebrow}</p>
      <TitleTag className="section-header__title">{title}</TitleTag>
      {lead && <p className="section-header__lead">{lead}</p>}
    </div>
  );
}
