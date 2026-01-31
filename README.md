# task-manager-fullstack

<p align="center">
  <b>Professional, secure, and modern fullstack task manager app</b><br>
  <i>Node.js, Express, MongoDB, React, TypeScript, JWT, and best security practices</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18.x-green" />
  <img src="https://img.shields.io/badge/React-18.x-blue" />
  <img src="https://img.shields.io/badge/MongoDB-ODM-brightgreen" />
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" />
</p>

---

## Table of Contents
- [Short Description](#short-description)
- [Project Overview](#project-overview)
- [Main Features](#main-features)
- [System Design (High Level)](#system-design-high-level)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
- [Project Status & Roadmap](#project-status--roadmap)
- [Documentation & Wiki](#documentation--wiki)
- [Contribution Guidelines](#contribution-guidelines)
- [Author](#author)
- [License](#license)

---

---

## Short Description

Efficient, secure, and modern fullstack app for personal and team task management. Built for productivity and professional use.

---

## Project Overview

task-manager-fullstack is a full-stack web application to manage daily tasks with secure authentication, prioritization, and a clean UI. Designed with modular architecture and agile practices.

---

## Main Features

- User authentication (JWT-based)
- Task CRUD (create, read, update, delete)
- Role-based access (user/admin)
- Filtering, status, and priority for tasks
- Responsive UI

---

## System Design (High Level)

- **Frontend:** React app for user interaction and task management
- **Backend:** Node.js/Express REST API for authentication, business logic, and data management
- **Database:** MongoDB for storing users and tasks
- **Authentication:** JWT for secure sessions
- **Architecture:** Separation of concerns (controllers, services, models, routes)

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** React, TypeScript
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT

---

## Installation & Setup

### Backend
1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env` and set your variables
4. `npm run dev`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm start`

---

## Project Status & Roadmap

- **Status:** MVP complete and production-ready
- **Next steps:**
  - Add advanced task filtering and analytics
  - Improve mobile experience
  - Integrate notifications
  - Expand documentation and wiki

---

## Documentation & Wiki

Full documentation, diagrams, API details, and guides are available in [WIKI.md](./task-manager-fullstack/WIKI.md) and the project wiki section.

---

## Contribution Guidelines

1. Fork this repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

For bugs or feature requests, open an issue.

---

## Author

**Tomás Posada**  
[LinkedIn](https://www.linkedin.com/in/tomasposada)  
[Email](mailto:tomasposada67@gmail.com)

---

## License

MIT License. See [LICENSE](./task-manager-fullstack/LICENSE).
