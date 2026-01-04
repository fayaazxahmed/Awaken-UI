# Currently in progress 🚧

Check out the project [here](https://v0-reaction-website.vercel.app/)

## Overview

Next.js-based web application that converts design files (images, PDFs, Figma files) into clean, structured React/TypeScript code. The platform leverages advanced OCR and AI technologies to analyze design layouts and generate corresponding code components.

### Implemented Features

- **File Upload System**
  - Support for multiple file formats: `.png`, `.jpg`, `.jpeg`, `.fig`, `.svg`, `.pdf`
  - File preview for image uploads

- **Server-Side File Handling**
  - Automatic file storage in `uploads/` directory
  - File naming with timestamps to prevent conflicts
  - Processed output (Markdown, HTML, or JSON) is saved to the `output/` directory

- **OCR Processing Pipeline**
  - Integration with Chandra OCR model via API endpoints
  - Command execution: `chandra {filePath} ./output`