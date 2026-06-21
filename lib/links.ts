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
    id: "link-1",
    name: "GenYouTube",
    description: "Download YouTube videos in any format or quality — MP4, MP3, WebM, and more. Fast, no account needed.",
    href: "https://genyoutube.online",
    category: "downloader",
  },
  {
    id: "link-2",
    name: "Cobalt",
    description: "Paste a link from Instagram, TikTok, Twitter/X, Vimeo, SoundCloud and more — get the file, no ads, no tracking.",
    href: "https://cobalt.tools",
    category: "downloader",
  },
  {
    id: "link-3",
    name: "Claude",
    description: "Anthropic's AI assistant. Strong at writing, analysis, coding, and long-form reasoning. Free tier available.",
    href: "https://claude.ai",
    category: "ai",
  },
];
