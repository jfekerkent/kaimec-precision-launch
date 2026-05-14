import { Calendar } from "lucide-react";

interface Props {
  url: string;
}

export default function ConsultCTA({ url }: Props) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-2 inline-flex items-center gap-2 rounded-md bg-[#F5A623] px-4 py-2.5 text-sm font-semibold text-[#1a1a1a] shadow-md transition-transform hover:scale-[1.02] hover:bg-[#f4b347]"
    >
      <Calendar className="h-4 w-4" />
      📅 Book a 20-min consult
    </a>
  );
}