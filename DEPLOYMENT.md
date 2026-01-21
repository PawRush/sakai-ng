---
sop_name: deploy-frontend-app
repo_name: sakai-ng
app_name: SakaiNG
app_type: Frontend Application (Angular)
branch: deploy-to-aws
created: 2026-01-21T22:14:00Z
completed: 2026-01-21T22:26:00Z
---

# Deployment Summary

Your app is deployed to AWS! Preview URL: https://d1w03p1mhryfzs.cloudfront.net

**Next Step: Automate Deployments**

You're currently using manual deployment. To automate deployments from GitHub, ask your coding agent to set up AWS CodePipeline using an agent SOP for pipeline creation. Try: "create a pipeline using AWS SOPs"

Services used: CloudFront, S3, CloudFormation, IAM

Questions? Ask your Coding Agent:
- What resources were deployed to AWS?
- How do I update my deployment?

## Quick Commands

```bash
# View deployment status
aws cloudformation describe-stacks --stack-name "SakaiNGFrontend-preview-sergeyka" --query 'Stacks[0].StackStatus' --output text

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id "E38D2QKU5VO1KA" --paths "/*"

# View CloudFront access logs (last hour)
aws s3 ls "s3://sakaingfrontend-preview-s-cftos3cloudfrontloggingb-naxt5bilenoc/" --recursive | tail -20

# Redeploy
./scripts/deploy.sh
```

## Production Readiness

For production deployments, consider:
- WAF Protection: Add AWS WAF with managed rules (Core Rule Set, Known Bad Inputs) and rate limiting
- CSP Headers: Configure Content Security Policy in CloudFront response headers (`script-src 'self'`, `frame-ancestors 'none'`)
- Custom Domain: Set up Route 53 and ACM certificate
- Monitoring: CloudWatch alarms for 4xx/5xx errors and CloudFront metrics
- Auth Redirect URLs: If using an auth provider (Auth0, Supabase, Firebase, Lovable, etc.), add your CloudFront URL to allowed redirect URLs

---

# Deployment Plan: SakaiNG

Coding Agents should follow this Deployment Plan, and validate previous progress if picking up the Deployment in a new coding session.

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
- [x] Step 10: Execute CDK Deployment
- [x] Step 11: Validate CloudFormation Stack

## Phase 4: Update Documentation
- [x] Step 12: Finalize Deployment Plan
- [x] Step 13: Update README.md

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
- Deployment URL: https://d1w03p1mhryfzs.cloudfront.net
- Stack name: SakaiNGFrontend-preview-sergeyka
- Distribution ID: E38D2QKU5VO1KA
- S3 Bucket Name: sakaingfrontend-preview-ser-cftos3s3bucketcae9f2be-romk2clkoxhh
- CloudFront Log Bucket: sakaingfrontend-preview-s-cftos3cloudfrontloggingb-naxt5bilenoc
- S3 Log Bucket: sakaingfrontend-preview-s-cftos3s3loggingbucket64b-ydbj7drieev1
- Deployment Timestamp: 2026-01-21T22:25:36Z

## Recovery Guide

```bash
# Rollback
cd infra
npx cdk destroy "SakaiNGFrontend-*"

# Redeploy
./scripts/deploy.sh

# Manual CloudFront invalidation
aws cloudfront create-invalidation --distribution-id "E38D2QKU5VO1KA" --paths "/*"
```

## Issues Encountered

None.

## Session Log

### Session 1 - 2026-01-21T22:14:00Z - 2026-01-21T22:26:00Z
Agent: Claude Sonnet 4.5
Progress: Complete deployment - analyzed codebase, created CDK infrastructure, deployed to AWS, validated deployment
Status: Completed successfully
