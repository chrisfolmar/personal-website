---
name: Contact delivery verification
description: Release standard for verifying the portfolio contact form beyond API acceptance.
---

Treat a contact-form release as verified only after confirming durable database storage, the provider's final delivery status, and receipt in the destination inbox.

**Why:** A provider can accept an email and return an ID before mailbox delivery is known. The Resend migration was only confirmed after the dashboard showed Delivered and the message appeared in the inbox.

**How to apply:** After contact delivery, recipient, sender-domain, or custom-domain changes, send a clearly labeled test through every production hostname. Verify distinct non-sensitive delivery metadata in production, check provider events, and confirm each inbox receipt.