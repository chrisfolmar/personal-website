---
name: Social preview verification
description: How to distinguish automated crawler checks from authenticated social-platform preview confirmation.
---

Facebook's Sharing Debugger and LinkedIn's Post Inspector require authenticated sessions, and LinkedIn may reject automated browsers. X no longer provides the old standalone Card Validator.

**Why:** An automated audit can prove that platform crawler user agents receive complete Open Graph/Twitter tags and reachable images, but it cannot honestly claim that a signed-in platform UI rendered the final card.

**How to apply:** Test production with Facebook, LinkedIn, and Twitter/X crawler user agents first. Treat successful status, metadata, and image fetches as the public contract, then leave signed-in UI confirmation as an explicit manual check when required.