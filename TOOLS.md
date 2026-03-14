# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.

---

## Zay's OpenClaw Setup

### Enabled Skills
- **weather** - Get weather forecasts (no API key needed)
- **github** - GitHub CLI operations (requires `gh` CLI)
- **healthcheck** - System security checks
- **summarize** - Text summarization

### Tools Configuration
- **Web Search**: Enabled
- **Web Fetch**: Enabled
- **Browser**: Enabled (attach-only mode)
- **Canvas**: Enabled

### Channels
- **Telegram**: Enabled (bot token configured)
- **DM Policy**: Pairing required

### Models
- **Primary**: kimi-coding/k2p5
- **Provider**: Kimi (Anthropic-compatible API)

### Workspace Skills Location
`./skills/` (relative to workspace root)
