import { buildWhatsAppLink } from "../../lib/contact";

type WhatsAppButtonProps = {
  message: string;
  label: string;
  className: string;
};

export default function WhatsAppButton({
  message,
  label,
  className,
}: WhatsAppButtonProps) {
  return (
    <a
      href={buildWhatsAppLink(message)}
      target="_blank"
      rel="noreferrer"
      className={className}
    >
      {label}
    </a>
  );
}
