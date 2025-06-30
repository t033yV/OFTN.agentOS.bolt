# OFTN: AgentOS 🟢⚡

**Transform WhatsApp chats into professional identity cards and microsites for workers and young adults. Built for the BOLT One-Shot Challenge.**

---

## 🔍 Overview

**OFTN: AgentOS** is a WhatsApp-native chatbot that helps informal workers, freelancers, students, and microbusinesses create trusted professional identity cards and mini portfolios. Instead of messy, unverified posts on Facebook or WhatsApp groups, users can now create polished digital cards and microsites in under 5 minutes.

Built with 🇲🇾 Malaysia and similar chat-driven markets in mind.

---

## 🌐 Live Demo

👉 [Start WhatsApp Demo](https://starlit-chaja-55dc17.netlify.app/chat)  
👉 [Visit Example Creating cards](https://starlit-chaja-55dc17.netlify.app/card)

---

## 💡 Features

- 📲 WhatsApp-friendly bot flow (via Twilio)
- 🪪 Instant digital ID cards (text-based, < 500 characters)
- 🔗 Auto-generated microsite links (e.g., `siti.agentos.my.id`)
- 🎨 Upload optional media (e.g., photos, listings, portfolio)
- 🌏 Multilingual (via Lingo – Malay, English, Tagalog)
- 📈 Pro upgrades with video intros (via Tavus + RevenueCat)

---

## 🧱 Tech Stack

| Tool        | Purpose                        |
|-------------|---------------------------------|
| Vite + React + Tailwind CSS | Frontend UI             |
| Netlify     | Hosting + Serverless Functions |
| Twilio API  | WhatsApp Bot                   |
| Pica        | Agent orchestration (validation, bio edits) |
| Lingo       | Localization                   |
| Tavus       | AI video intros (Pro)         |
| RevenueCat  | Subscription management        |

---

## 🔄 Example Flow (User)

1. User messages the WhatsApp bot.
2. Bot asks for name, role, location, bio, contact, and skills.
3. User optionally uploads 3 media files.
4. Bot outputs:
   - A clean text-based card ready to share on WhatsApp/Facebook.
   - A microsite with the card + gallery.

---

## 📦 Folder Structure


