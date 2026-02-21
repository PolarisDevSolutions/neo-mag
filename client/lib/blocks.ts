// client/lib/blocks.ts
export type ContentBlock =
  | { type: "hero"; title: string; subtitle?: string; backgroundImage?: string; showCTA?: boolean }
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "paragraph"; content: string }
  | { type: "bullets"; items: string[] }
  | { type: "cta"; text: string; phone: string; variant?: "primary" | "outline" | "solid" }
  | { type: "image"; src: string; alt?: string }
  | { type: "map"; address: string }
  | { type: "two-column"; left: ContentBlock[]; right: ContentBlock[] };
