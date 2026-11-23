# CineBook: CI/CD Pipeline with GitHub Actions + AWS S3 + EC2

A small cinema ticket booking web app, shipped to production on every push to `main`.

## Pipeline

```
Code change -> git push -> GitHub Actions
   -> Security Scan (Gitleaks secrets, npm audit, Semgrep SAST)   [DevSecOps bonus]
   -> Unit Tests (Jest, pipeline stops if any test fails)
   -> Build (build-v1.0.<run>.zip with build-info.json)
   -> Upload to S3 (builds/build-v1.0.<run>.zip + builds/latest.zip)
   -> Deploy (EC2 downloads latest.zip from S3 and serves it with Nginx)
   -> Verify production (curl checks the live version matches)
```

Workflow file: `.github/workflows/cicd.yml`

## Project layout

| Path | Purpose |
|---|---|
| `src/` | The web app (HTML, CSS, JS) |
| `src/pricing.js` | Ticket pricing logic (unit tested) |
| `tests/pricing.test.js` | Jest unit tests |
| `scripts/build.sh` | Packages the app into a versioned zip |
| `.github/workflows/cicd.yml` | The CI/CD pipeline |

## Required GitHub secrets

| Secret | Example |
|---|---|
| `AWS_ACCESS_KEY_ID` | from IAM user |
| `AWS_SECRET_ACCESS_KEY` | from IAM user |
| `AWS_REGION` | `eu-north-1` |
| `S3_BUCKET` | `cinebook-builds-alisha-2026` |
| `EC2_HOST` | public IPv4 of the EC2 instance |
| `EC2_USER` | `ubuntu` |
| `EC2_INSTANCE_ID` | EC2 instance ID (deploy uses EC2 Instance Connect, no stored SSH key) |

## Run locally

```
npm install
npm test
VERSION=1.0.0 npm run build
```
