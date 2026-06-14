// Design → Code agent driver (SCAFFOLD — verify SDK API + model IDs before first run).
// Reads a Claude Design handoff URL from the labeled issue (or workflow_dispatch),
// implements it against this repo, and opens a DRAFT PR. Never merges.
//
// Needs: ANTHROPIC_API_KEY (env), GITHUB_TOKEN (env, provided by Actions).
// Deps: @anthropic-ai/claude-agent-sdk  (see package.json)

import { execSync } from "node:child_process";

const {
  ANTHROPIC_API_KEY,
  GITHUB_TOKEN,
  REPO,
  ISSUE_NUMBER = "",
  ISSUE_BODY = "",
  DISPATCH_URL = "",
} = process.env;

if (!ANTHROPIC_API_KEY) { console.error("Missing ANTHROPIC_API_KEY"); process.exit(1); }

// 1) Extract the handoff URL (dispatch input wins; else first URL in the issue body)
const urlMatch = ISSUE_BODY.match(/https?:\/\/\S+/);
const handoffUrl = DISPATCH_URL || (urlMatch && urlMatch[0]);
if (!handoffUrl) { console.error("No handoff URL found"); process.exit(1); }

const branch = `design/issue-${ISSUE_NUMBER || Date.now()}`;
execSync(`git checkout -b ${branch}`, { stdio: "inherit" });
execSync(`git config user.name "design-to-code[bot]"`);
execSync(`git config user.email "actions@users.noreply.github.com"`);

// 2) Hand the job to the Claude Agent SDK. It can read/edit files in the repo.
//    NOTE: confirm the current Agent SDK entrypoint + a current model id
//    (e.g. a Sonnet-tier model) against the live Claude API docs before running.
const { query } = await import("@anthropic-ai/claude-agent-sdk");

const prompt = `
You are implementing a Claude Design handoff for a STATIC site (plain HTML/CSS/JS, no framework).
Honor this repo's CLAUDE.md conventions and existing design tokens (do not introduce a build step).
Handoff URL: ${handoffUrl}

Steps:
1. Fetch and read the handoff.
2. Implement it by editing the relevant HTML/CSS in this repo, matching the existing visual language
   (near-black #08090a, green→cyan→violet→coral, glass cards, Bricolage/Hanken/JetBrains).
3. Keep changes minimal and reviewable. Do not touch career-os/, secrets, or config.
4. Leave the working tree with your edits staged-ready (do not commit; the workflow commits).
`;

for await (const _msg of query({
  prompt,
  options: { permissionMode: "acceptEdits", allowedTools: ["Read", "Edit", "Write", "WebFetch", "Glob", "Grep"] },
})) { /* stream/log if desired */ }

// 3) Commit + push + open a DRAFT PR via the GitHub REST API.
execSync(`git add -A && git commit -m "Design→Code: implement handoff (issue #${ISSUE_NUMBER})" || echo "no changes"`, { stdio: "inherit" });
execSync(`git push -u origin ${branch}`, { stdio: "inherit" });

const [owner, repo] = REPO.split("/");
const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls`, {
  method: "POST",
  headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, Accept: "application/vnd.github+json" },
  body: JSON.stringify({
    title: `Design→Code: handoff for issue #${ISSUE_NUMBER}`,
    head: branch,
    base: "main",
    draft: true,
    body: `Automated draft from the Design→Code watcher.\nHandoff: ${handoffUrl}\nCloses #${ISSUE_NUMBER}\n\n⚠️ Review before merge — this is agent-authored.`,
  }),
});
console.log(res.ok ? "Draft PR opened." : `PR creation failed: ${res.status} ${await res.text()}`);
