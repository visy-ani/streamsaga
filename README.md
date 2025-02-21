# Next.js 15 Streaming Web Application

Welcome to the **Biggest and Fastest Streaming Platform** – a cutting-edge application built with **Next.js 15** following **SOLID principles** and powered by **TypeScript** for exceptional performance, scalability, and maintainability.

---

## Table of Contents

- **Overview**
- **Key Features**
- **Tech Stack**
- **Setup & Installation**
- **Movies Data Integration**
- **Future Enhancements**
- **Contributing**
- **License**
- **Contact**

---

## Overview

This platform offers a seamless and immersive streaming experience with industry-leading UI/UX, secure authentication, and robust backend support. Designed to scale effortlessly, the application is optimized for millions of users while maintaining blazing-fast performance.

---

## Key Features

- **Blazing Fast Streaming:** Experience smooth video streaming using the latest web technologies.
- **Modern UI/UX:** Enjoy a sleek, responsive, and intuitive user interface.
- **Secure Authentication:** Robust authentication mechanisms ensure user data is protected.
- **Scalability:** Built to support a growing user base with a modular and maintainable architecture.
- **Movies Data Integration:** Fetch and display movies data seamlessly using RapidApi for real-time information.

---

## Tech Stack

- **Frontend:** Next.js 15, React, TypeScript
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL with **Prisma ORM**
- **Authentication:** Secure authentication implemented with **bcrypt and NextAuth**
- **Networking:** Data fetching via **Axios**
- **Package Manager:** **pnpm** for efficient dependency management
- **Movies Data:** Integrated with **RapidApi** for comprehensive movies data

---

## Setup & Installation

Follow these steps to set up your development environment:

### 1. Clone the Repository

```sh
git clone https://github.com/visy-ani/streamsaga.git
cd streamsaga
```

### 2. Install Dependencies

Use `pnpm` for efficient and fast dependency management:

```sh
pnpm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/yourdatabase
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
RAPIDAPI_KEY=your-rapidapi-key
RAPIDAPI_HOST=your-rapidapi-host
```

> **Note:** Replace the placeholders with your actual credentials.

### 4. Run Database Migrations

Apply the initial database schema with Prisma:

```sh
pnpm prisma migrate dev --name init
```

### 5. Start the Development Server

Launch your app locally:

```sh
pnpm dev
```

Your application will be accessible at [http://localhost:3000](http://localhost:3000).

---

## Movies Data Integration

This application utilizes **RapidApi** to fetch real-time movies data. The integration is designed to offer users up-to-date information on movies, including details, reviews, and ratings. Ensure you have your RapidApi credentials configured in your environment variables as shown above. For more details on how to use and customize the API endpoints, please refer to the [RapidApi documentation](https://rapidapi.com/).

---

## Future Enhancements

- **Advanced Search & Filters:** Enhance user experience with robust search capabilities and personalized recommendations.
- **Live Chat Support:** Integrate a live support chat system for real-time user assistance.
- **Analytics Dashboard:** Develop an admin dashboard to monitor streaming performance and user engagement.
- **Mobile Optimization:** Further optimize the UI/UX for mobile devices and tablets.

<!-- ---

## Contributing

We welcome contributions to make this platform even better! If you’d like to contribute, please follow these guidelines:

1. **Fork the Repository:** Create your own branch from `main`.
2. **Make Changes:** Implement your improvements or bug fixes.
3. **Submit a Pull Request:** Provide clear details about your changes and the issue it resolves.

For detailed contribution guidelines, please see our [CONTRIBUTING.md](CONTRIBUTING.md) file.

---

## License

This project is open-source and available under the **MIT License**. Please see the [LICENSE](LICENSE) file for more details.

---

## Contact

For further inquiries or support, please contact:

- **Project Maintainer:** [Anish Yadav](mailto\:chocoboyanish566@gmail.com)
- **GitHub:** [visy-ani](https://github.com/visy-ani)

--- -->

Enjoy building and streaming with our Next.js 15 Streaming Web Application!

