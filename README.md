
# Pedido Management System

This project is a comprehensive Pedido Management System that enables users to view and manage orders. The application features authentication, filtering, status change capabilities, and responsive, user-friendly interfaces.

## Features

- User authentication
- Order filtering by various fields
- Order status change functionality
- Separate table views based on status
- Friendly and responsive user interface

## Requirements

Before running the project, ensure you have the following installed:

- Node.js (v14.17.0 or later)
- npm (v6.14.13 or later)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ```

2. Install project dependencies:
   ```bash
   npm install
   ```

## Configuration

1. Create a `.env` file at the root of the project and add the following environment variables:
   ```env
   REACT_APP_API_URL=http://corte.fymmx.com
   ```

2. Ensure the API URL is correctly set.

## Running the Project

To run the project in development mode, use:
```bash
npm start
```

This will start the development server and open the application in your default browser.

## Building the Project

To create an optimized production build, use:
```bash
npm run build
```

The optimized files will be in the `build` folder.

Using Docker
Building the Docker Image
Make sure Docker is running on your system.
Build the Docker image by running the following command in the root of the project directory:
bash
Copiar código
docker build -t nombre-del-contenedor .
Running the Docker Container
Once the image is built, you can run it using the following command:

bash
Copiar código
docker run -p 3000:80 nombre-del-contenedor
Open your browser and navigate to http://localhost:3000 to access the application.

Usage
Register or log in to access the application.
Use the search bar to find specific orders.
Use the "Filter" button to filter orders by various fields.
Use the "View" button to change the table view by order status.
Project Structure
- `src/`: Main source code directory.
  - `components/`: Reusable components.
    - `Header.jsx`: Header component with search bar, filter, and view buttons.
    - `Table.jsx`: Component for rendering the orders table.
  - `pages/`: Main application pages.
    - `Login.jsx`: Login page.
    - `Register.jsx`: Registration page.
    - `Pedidos.jsx`: Main order management page.
  - `App.js`: Main application component.
  - `index.js`: Application entry point.
- `public/`: Public and static files.
- `README.md`: This file.



Contributing
Fork the repository.
Create a new branch (git checkout -b feature/new-feature).
Make your changes and commit them with descriptive messages (git commit -am 'Add new feature').
Push your changes to the remote repository (git push origin feature/new-feature).
Open a Pull Request.


1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make your changes and commit them with descriptive messages (`git commit -am 'Add new feature'`).
4. Push your changes to the remote repository (`git push origin feature/new-feature`).
5. Open a Pull Request.



