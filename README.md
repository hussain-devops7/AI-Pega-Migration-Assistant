# AI-Powered Pega Migration Assistant

This is a hackathon POC that takes a Pega inventory file as input, analyzes it using AI, and generates migration recommendations, risk score, cost estimate, Terraform sample, and executive report.

## Workflow

User uploads inventory file → API Gateway → Lambda → Bedrock → S3/DynamoDB → Dashboard output.
