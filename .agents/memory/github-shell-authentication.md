---
name: GitHub shell authentication
description: Replit GitHub OAuth and command-line Git can use separate authentication paths.
---

Do not assume a working GitHub connector authenticates `git push`. Verify write access against GitHub's Git receive endpoint or with a dry-run push.

**Why:** In this workspace, GitHub OAuth successfully accessed the REST API while HTTPS Git pushes still failed. A classic personal access token with `repo` scope stored in Replit Secrets restored command-line pushes.

**How to apply:** Keep the token out of remotes and files. Let a repository-local credential helper read it from the secret environment at runtime, and ensure shell-function helpers forward Git's operation arguments with `"$@"`.
