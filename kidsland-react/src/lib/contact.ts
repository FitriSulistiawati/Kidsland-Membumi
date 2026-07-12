const rawWhatsAppNumber = "6285117568551";

export const WHATSAPP_DISPLAY = "+62 851-1756-8551";

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${rawWhatsAppNumber}?text=${encodeURIComponent(message)}`;
}