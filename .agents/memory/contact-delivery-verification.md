---
name: Contact delivery verification
description: Release standard for verifying the portfolio contact form beyond API acceptance.
---

Treat a contact-form release as verified only after confirming durable database storage, the provider's final delivery status, and receipt in the destination inbox.

**Why:** A provider can accept an email and return an ID before mailbox delivery is known. The Resend migration was only confirmed after the dashboard showed Delivered and the message appeared in the inbox.

**How to apply:** After contact delivery or sender-domain changes, send one clearly labeled test, verify non-sensitive delivery metadata in the database, check the provider event, and confirm inbox receipt.