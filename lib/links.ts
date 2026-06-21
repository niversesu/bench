export interface HubLink {
  id: string;
  name: string;
  description: string;
  href: string;
  /** Short label shown in the card footer, e.g. "design", "dev", "community" */
  category: string;
}

export const hubLinks: HubLink[] = [
  {
    id: "genyoutube",
    name: "GenYouTube",
    description: "Download YouTube videos in any format or quality — MP4, MP3, WebM, and more. Fast, no account needed.",
    href: "https://genyoutube.online",
    category: "downloader",
  },
  {
    id: "cobalt",
    name: "Cobalt",
    description: "Paste a link from Instagram, TikTok, Twitter/X, Vimeo, SoundCloud and more — get the file, no ads, no tracking.",
    href: "https://cobalt.tools",
    category: "downloader",
  },
  {
    id: "claude",
    name: "Claude",
    description: "Anthropic's AI assistant. Strong at writing, analysis, coding, and long-form reasoning. Free tier available.",
    href: "https://claude.ai",
    category: "ai",
  },
  {
    id: "bitwarden",
    name: "Bitwarden",
    description: "Open source password manager. Free tier covers everything most people need — unlimited passwords, all devices, no catch.",
    href: "https://bitwarden.com",
    category: "privacy",
  },
  {
    id: "haveibeenpwned",
    name: "Have I Been Pwned",
    description: "Check if your email or password has appeared in a known data breach. Eye-opening and worth checking before you reuse any password.",
    href: "https://haveibeenpwned.com",
    category: "privacy",
  },
  {
    id: "wetransfer",
    name: "WeTransfer",
    description: "Send files up to 2GB for free with no account. Just upload, share a link, done. No signup required for the sender or receiver.",
    href: "https://wetransfer.com",
    category: "files",
  },
  {
    id: "canva",
    name: "Canva",
    description: "Design tool for non-designers. Social posts, presentations, posters, CVs — free tier is generous, drag-and-drop the whole way.",
    href: "https://canva.com",
    category: "design",
  },
  {
    id: "notion",
    name: "Notion",
    description: "Notes, docs, wikis, and databases all in one place. Overkill for some, indispensable for others — free tier is more than enough to start.",
    href: "https://notion.so",
    category: "productivity",
  },
  {
    id: "removebg",
    name: "remove.bg",
    description: "Remove image backgrounds automatically in seconds. Free tier gives you low-resolution results — decent for previewing, but you'll need to pay for full quality exports.",
    href: "https://remove.bg",
    category: "design",
  },
];
