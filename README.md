# Project Overview
This project is a Next.js application built specifically to leverage Static Site Generation (SSG) for delivering article content. Articles are generated as static pages during the build process to ensure optimal performance and scalability. The deployment process is automated, triggered by a webhook from an admin page whenever content updates are made.

## Development Workflow
The application fetches article content from a backend service via an API endpoint. Articles are pre-rendered during the build process using the Next.js Static Site Generation (SSG) feature.
### Fetching Articles from Backend API

### Implementing getStaticProps and getStaticPaths
The Next.js pages for articles are pre-rendered using the getStaticPaths and getStaticProps methods to retrieve data from the backend service.
- getStaticPaths: Fetches a list of article slugs from the backend service and defines paths for SSG.
- getStaticProps: Fetches article details for each static page at build time.

##  Deployment Workflow
### Webhook and Deployment Process
Deployment is automated using GitHub Actions. When changes are pushed to the main branch or content updates are triggered from the admin page, GitHub Actions execute the CI/CD pipeline.

### Webhook Trigger
The webhook is set up in the admin page to trigger a GitHub Actions workflow that redeploys the Next.js application.

### GitHub Actions Workflow
The GitHub Actions workflow listens for the content-update event and runs the deployment pipeline.

### CI/CD Workflow Overview
1. Content Update: When content is updated from the admin dashboard, a webhook triggers a repository_dispatch event in GitHub Actions.
2. Build & Deploy: The workflow:
    - Fetches the latest code.
    - Installs dependencies.
    - Builds the Next.js project with updated article content.
    - Deploys the application to the hosting platform (e.g., Vercel).