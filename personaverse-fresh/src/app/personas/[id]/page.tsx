import PersonaChatClient from "./PersonaChatClient";
import { personasData } from "./data";

// Generate static params for all personas
export function generateStaticParams() {
  return Object.keys(personasData).map((id) => ({
    id,
  }));
}

export default function PersonaChatPage() {
  return <PersonaChatClient />;
}
