import "./TrustMetricCard.css";

export interface TrustMetricCardProps {
  value: string;
  label: string;
}

export default function TrustMetricCard({
  value,
  label,
}: TrustMetricCardProps) {
  return (
    <div className="trust-metric-card">
      <p className="trust-metric-card__value">{value}</p>
      <p className="trust-metric-card__label">{label}</p>
    </div>
  );
}
