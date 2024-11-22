

# E-Cart

**E-Cart** is an online shopping platform that allows users to browse and purchase products, manage their shopping cart, and track orders. The system is built with modern web technologies and is designed to provide a seamless and intuitive shopping experience.

<img width="929" alt="Screenshot 2023-08-26 023306" src="https://github.com/harsh-9389/ecommerce/assets/99734334/d9fc2148-5f85-4dde-8c50-002f454d1bb7">

## Features

- **User Registration and Login**: Secure authentication system for users to create accounts and log in.
- **Product Catalog**: A wide range of products with detailed descriptions, images, and prices.
- **Shopping Cart**: Add products to the shopping cart, modify quantities, or remove items.
- **Order Management**: Place orders, view order history, and track order status.
- **Admin Dashboard**: Admin can add, edit, or delete products, and manage user orders.

## Technologies Used

- **Frontend**: React, HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Bootstrap, Custom CSS
- **Others**: Axios for API requests, Nodemailer for email notifications

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm
- MongoDB (locally or a cloud service like MongoDB Atlas)

### Steps to Run Locally

1. **Clone the repository**

    ```bash
    git clone https://github.com/harsh-9389/E-Cart.git
    cd E-Cart
    ```

2. **Install Dependencies**

    - For the **frontend**:
      
      ```bash
      cd client
      npm install
      ```

    - For the **backend**:

      ```bash
      npm install
      ```

3. **Configure Environment Variables**
   
   - Create a `.env` file in both the **server** and **client** directories with necessary configurations:
   
     - **Backend (`server/.env`)**:
       ```
       MONGO_URI=your_mongodb_connection_string
       JWT_SECRET=your_jwt_secret_key
       EMAIL_HOST=your_email_host
       EMAIL_PORT=your_email_port
       EMAIL_USERNAME=your_email_username
       EMAIL_PASSWORD=your_email_password
       ```
   
   - **Frontend (`client/.env`)**:
     ```
     REACT_APP_API_URL=http://localhost:5000/api
     ```

4. **Run the Application**

    - Start the **backend server**:
      
      ```bash
      npm start
      ```
      
    - Start the **frontend application**:
      
      ```bash
      cd client
      npm start
      ```

5. Open your browser and go to `http://localhost:3000` to view the application.

## Usage

- **User Interface**: Users can browse the products, add items to their cart, place orders, and track their order status.
- **Admin Dashboard**: Admins can log in to manage products and user orders.

## API Documentation

The backend exposes several API endpoints for user management, product catalog, and order handling.

### User Endpoints

- **POST** `/api/users/register`: Register a new user.
- **POST** `/api/users/login`: Login for an existing user.
- **GET** `/api/users/profile`: Get the current user's profile (requires authentication).

### Product Endpoints

- **GET** `/api/products`: Get a list of all products.
- **GET** `/api/products/:id`: Get a single product by ID.
- **POST** `/api/products`: Add a new product (admin only).
- **PUT** `/api/products/:id`: Edit a product (admin only).
- **DELETE** `/api/products/:id`: Delete a product (admin only).

### Order Endpoints

- **POST** `/api/orders`: Place a new order.
- **GET** `/api/orders/:id`: Get the details of a specific order.
- **GET** `/api/orders/user/:userId`: Get all orders for a user (requires authentication).

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
