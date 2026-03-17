# 🍽️ Restaurant POS System

A modern, full-stack **Point of Sale (POS) System** built for restaurants — manage tables, orders, payments, and staff all from one place.

## ✨ Features

- 🔐 **Authentication** — Secure login, registration & logout with role-based access
- 🪑 **Table Management** — Add, update, and track restaurant tables in real time
- 🛒 **Order Management** — Place and update orders with live status tracking
- 💳 **Payments** — Integrated with **Razorpay** for seamless order payments
- 🔑 **Forgot Password** — OTP-based password reset via mobile number
- 📦 **Item Management** — Add and manage menu items
- 🧑‍💼 **Role-Based Access** — Separate flows for Admin, Cashier, and Waiter

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js | UI Framework |
| Redux Toolkit | Global State Management |
| TanStack Query | Server State & API Mutations |
| Axios | HTTP Client |
| Tailwind CSS | Styling |
| React Router DOM | Client-Side Routing |
| Notistack | Toast Notifications |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API Server |
| MongoDB + Mongoose | Database |
| JWT | Authentication Tokens |
| Razorpay SDK | Payment Gateway |
| Twilio / MSG91 | OTP SMS Service |

---

## 📁 Project Structure

```
├── client/                   # React Frontend
│   ├── src/
│   │   ├── components/       # Reusable UI Components
│   │   ├── pages/            # Page-level Components
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── https/
│   │   │   ├── index.js      # All API endpoint functions
│   │   │   └── axiosWrapper.js
│   │   └── redux/
│   │       └── slices/
│   │           └── userSlice.js
│
├── server/                   # Express Backend
│   ├── routes/
│   │   ├── user.routes.js
│   │   ├── table.routes.js
│   │   ├── order.routes.js
│   │   ├── payment.routes.js
│   │   └── items.routes.js
│   ├── controllers/
│   ├── models/
│   └── index.js
│
└── README.md
```

---

## 🔌 API Endpoints

### 🔐 Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/user/login` | Login user |
| POST | `/api/user/register` | Register new user |
| GET | `/api/user` | Get logged-in user data |
| POST | `/api/user/logout` | Logout user |
| POST | `/api/user/send-otp` | Send OTP to mobile |
| POST | `/api/user/verify-otp` | Verify OTP |
| POST | `/api/user/reset-password` | Reset password |

### 🪑 Tables
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/table/` | Add new table |
| GET | `/api/table` | Get all tables |
| PUT | `/api/table/:tableId` | Update table |

### 🛒 Orders
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/order/` | Place new order |
| GET | `/api/order` | Get all orders |
| PUT | `/api/order/:orderId` | Update order status |

### 💳 Payments
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/payment/create-order` | Create Razorpay order |
| POST | `/api/payment/verify-payment` | Verify Razorpay payment |

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.x
- MongoDB (local or Atlas)
- Razorpay account
- SMS provider account (Twilio / MSG91)


Frontend: [http://localhost:5173](http://localhost:5173)  
Backend: [http://localhost:8000](http://localhost:8000)

---

## 🔐 Forgot Password Flow

```
User clicks "Forgot Password"
        ↓
Enter registered mobile number
        ↓
OTP sent via SMS
        ↓
Enter & verify OTP
        ↓
Set new password
        ↓
Redirected to Login
```

---

## 💳 Payment Flow (Razorpay)

```
Customer ready to pay
        ↓
Backend creates Razorpay Order → returns order_id
        ↓
Frontend opens Razorpay checkout modal
        ↓
Customer completes payment
        ↓
Backend verifies payment signature
        ↓
Order marked as PAID ✅
```

---

## 👥 User Roles

| Role | Access |
|---|---|
| **Admin** | Full access — manage staff, tables, menu, reports |
| **Cashier** | Handle payments and order billing |
| **Waiter** | Take orders and update order status |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 📬 Contact

Made with ❤️ by **Durgesh**  
📧 your.email@example.com  
🐙 [GitHub](https://github.com/your-username)
