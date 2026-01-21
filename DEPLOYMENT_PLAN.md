---
sop_name: setup-pipeline
repo_name: sakai-ng
app_name: SakaiNG
app_type: CI/CD Pipeline
branch: deploy-to-aws
created: 2026-01-21T22:28:00Z
last_updated: 2026-01-21T22:30:00Z
---

# Deployment Plan: SakaiNG Pipeline

Coding Agents should follow this Deployment Plan, and validate previous progress if picking up the Deployment in a new coding session.

**IMPORTANT**: Update this plan after EACH step completes. Mark the step `[x]` and update `last_updated` timestamp.

## Phase 1: Gather Context and Configure
- [x] Step 0: Inform User of Execution Flow
- [x] Step 1: Create Deployment Plan
- [x] Step 2: Detect Existing Infrastructure
  - [x] 2.1: Detect stacks and frontend
  - [x] 2.2: Detect app name and git repository
  - [x] 2.3: Determine quality checks
  - [x] 2.4: User confirmation
  - [x] 2.5: Use existing CodeConnection

## Phase 2: Build and Deploy Pipeline
- [ ] Step 3: Create CDK Pipeline Stack
- [ ] Step 4: CDK Bootstrap
- [ ] Step 5: Deploy Pipeline
  - [ ] 5.1: Push to remote
  - [ ] 5.2: Verify CodeConnection authorization
  - [ ] 5.3: Deploy pipeline stack
  - [ ] 5.4: Trigger pipeline
- [ ] Step 6: Monitor Pipeline

## Phase 3: Documentation
- [ ] Step 7: Finalize Deployment Plan
- [ ] Step 8: Update README.md

## Pipeline Info

- Package Manager: npm
- CodeConnection ARN: arn:aws:codeconnections:us-east-1:126593893432:connection/c140aa0c-7407-42c9-aa4b-7c81f5faf40b
- Repository: PawRush/sakai-ng
- Branch: deploy-to-aws
- Quality Checks: None (tests failing, no lint script)
- Build Output: dist/sakai-ng/browser
- Pipeline URL: [after creation]
- Pipeline ARN: [after creation]

## Recovery Guide

```bash
# Rollback
cd infra
npm run destroy:pipeline

# Manual trigger
aws codepipeline start-pipeline-execution --name "SakaiNGPipeline"
```

## Issues Encountered

None.

## Session Log

### Session 1 - 2026-01-21T22:28:00Z
Agent: Claude Sonnet 4.5
Progress: Starting pipeline setup
Next: Detect existing infrastructure
