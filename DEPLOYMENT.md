---
sop_name: deploy-frontend-app
repo_name: PawRush/sakai-ng
app_name: sakai-ng
app_type: Frontend Application (Angular)
branch: deploy-to-aws-20260130_032535-sergeyka
framework: Angular 20
package_manager: npm
build_command: npm run build
output_directory: dist/sakai-ng/browser
base_path: /
cloudfront_config: SPA with error responses
created: 2026-01-30T05:25:35Z
last_updated: 2026-01-30T05:37:00Z
---

# Deployment Summary

Your app is deployed to AWS with automated CI/CD!

**Production URL**: https://d11r2zxi2cfca4.cloudfront.net (preview environment)
**Pipeline**: https://us-east-1.console.aws.amazon.com/codesuite/codepipeline/pipelines/SakaiNGPipeline/view

**Automated Deployments Enabled**: Push to branch `deploy-to-aws-20260130_032535-sergeyka` triggers automatic deployment to production.

Services used: CodePipeline, CodeBuild, CodeConnections, CloudFront, S3, CloudFormation, IAM

Questions? Ask your Coding Agent:
 - What resources were deployed to AWS?
 - How do I update my deployment?

## Quick Commands

```bash
# View pipeline status
aws codepipeline get-pipeline-state --name "SakaiNGPipeline" --query 'stageStates[*].[stageName,latestExecution.status]' --output table

# View build logs
aws logs tail "/aws/codebuild/SakaiNGPipelineStack-Synth" --follow

# Trigger pipeline manually
aws codepipeline start-pipeline-execution --name "SakaiNGPipeline"

# View production deployment status
aws cloudformation describe-stacks --stack-name "SakaiNGFrontend-prod" --query 'Stacks[0].StackStatus' --output text

# View preview deployment status
aws cloudformation describe-stacks --stack-name "SakaiNGFrontend-preview-sergeyka" --query 'Stacks[0].StackStatus' --output text

# Manual redeploy (preview only)
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

# Deployment Plan: sakai-ng

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
- [x] Step 10: Execute CDK Deployment
- [x] Step 11: Validate CloudFormation Stack

## Phase 4: Update Documentation
- [x] Step 12: Finalize Deployment Plan
- [x] Step 13: Update README.md

## Deployment Info

- Deployment URL: https://d11r2zxi2cfca4.cloudfront.net
- Stack name: SakaiNGFrontend-preview-sergeyka
- Distribution ID: ELB2MWAFR9VMG
- S3 bucket name: sakaingfrontend-preview-ser-cftos3s3bucketcae9f2be-fawzkbr1wvdg
- S3 log bucket: sakaingfrontend-preview-s-cftos3s3loggingbucket64b-j7f7eq3d0jpg
- CloudFront log bucket: sakaingfrontend-preview-s-cftos3cloudfrontloggingb-2ag4o8wifqca
- Deployment timestamp: 2026-01-30T05:36:49Z

## Recovery Guide

```bash
# Rollback
cd infra && cdk destroy "SakaiNGFrontend-preview-$(whoami)"

# Redeploy
./scripts/deploy.sh
```

## Issues Encountered

None.

## Session Log

### Session 1 - 2026-01-30T05:25:35Z
Agent: Claude Sonnet 4.5
Progress: Completed all phases - Angular 20 app deployed to AWS CloudFront + S3
Next: Set up CI/CD pipeline

### Session 2 - 2026-01-30T05:38:00Z
Agent: Claude Sonnet 4.5
Progress: Completed pipeline setup - CodePipeline deployed with automated deployments
Next: N/A - Full CI/CD complete

---

# Pipeline Deployment Plan

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
- [x] Step 3: Create CDK Pipeline Stack
- [x] Step 4: CDK Bootstrap
- [x] Step 5: Deploy Pipeline
  - [x] 5.1: Push to remote
  - [x] 5.2: Verify CodeConnection authorization
  - [x] 5.3: Deploy pipeline stack
  - [x] 5.4: Trigger pipeline
- [x] Step 6: Monitor Pipeline

## Phase 3: Documentation
- [x] Step 7: Finalize Deployment Plan
- [x] Step 8: Update README.md

## Pipeline Info

- Pipeline name: SakaiNGPipeline
- Pipeline URL: https://us-east-1.console.aws.amazon.com/codesuite/codepipeline/pipelines/SakaiNGPipeline/view
- CodeConnection ARN: arn:aws:codeconnections:us-east-1:126593893432:connection/c140aa0c-7407-42c9-aa4b-7c81f5faf40b
- CodeConnection status: AVAILABLE
- Repository: PawRush/sakai-ng
- Branch: deploy-to-aws-20260130_032535-sergeyka
- Production stack: SakaiNGFrontend-prod
- Quality checks: None (no lint script, unit tests skipped)

## Pipeline Recovery Guide

```bash
# Destroy pipeline
cd infra && npm run destroy:pipeline

# Redeploy pipeline
cd infra && npm run deploy:pipeline
```
