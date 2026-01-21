---
sop_name: deploy-frontend-app
repo_name: sakai-ng
app_name: SakaiNG
app_type: Frontend Application (Angular)
branch: deploy-to-aws
created: 2026-01-21T22:14:00Z
last_updated: 2026-01-21T22:19:00Z
---

# Deployment Plan: SakaiNG

Coding Agents should follow this Deployment Plan, and validate previous progress if picking up the Deployment in a new coding session.

**IMPORTANT**: Update this plan after EACH step completes. Mark the step `[x]` and update `last_updated` timestamp.

## Phase 1: Gather Context and Configure
- [x] Step 0: Inform User of Execution Flow
- [x] Step 1: Create Deployment Plan
- [x] Step 2: Create Deploy Branch
- [x] Step 3: Detect Build Configuration
- [x] Step 4: Validate Prerequisites
- [x] Step 5: Revisit Deployment Plan

## Phase 2: Build CDK Infrastructure
- [x] Step 6: Initialize CDK Foundation
- [x] Step 7: Generate CDK Stack
- [x] Step 8: Create Deployment Script
- [x] Step 9: Validate CDK Synth

## Phase 3: Deploy and Validate
- [ ] Step 10: Execute CDK Deployment
- [ ] Step 11: Validate CloudFormation Stack

## Phase 4: Update Documentation
- [ ] Step 12: Finalize Deployment Plan
- [ ] Step 13: Update README.md

## Deployment Info

- Framework: Angular 20
- Build Tool: Angular CLI
- Package Manager: npm (package-lock.json detected)
- Build Command: `npm run build`
- Output Directory: `dist/sakai-ng/browser`
- Entry Point: `index.html`
- Base Path: `/` (root)
- Routing: SPA (Single Page Application)
- Lint Command: None detected
- CDK Version: 2.1101.0
- Deployment URL: [after completion]
- Stack name: [after creation]
- Distribution ID: [after creation]
- S3 Bucket Name: [after creation]
- CloudFront Log Bucket: [after creation]
- S3 Log Bucket: [after creation]

## Recovery Guide

```bash
# Rollback
cd infra
npx cdk destroy "SakaiNGFrontend-*"

# Redeploy
./scripts/deploy.sh

# Manual CloudFront invalidation
aws cloudfront create-invalidation --distribution-id "<DISTRIBUTION_ID>" --paths "/*"
```

## Issues Encountered

None.

## Session Log

### Session 1 - 2026-01-21T22:14:00Z
Agent: Claude Sonnet 4.5
Progress: Created deployment plan, validated prerequisites, analyzed codebase
Next: Create deploy branch and detect build configuration
