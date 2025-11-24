# MERN Product Landing Page

A modern, fully responsive product landing page built with the MERN stack (MongoDB, Express, React, Node.js). Features include real-time search with autosuggest, product filtering, and a beautiful UI built with TailwindCSS.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with TailwindCSS
- **Real-time Search**: Autosuggest dropdown with up to 5 suggestions
- **Product Filtering**: Filter by category and price range
- **Product Grid**: Display 10-20 products with images, ratings, and prices
- **Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **RESTful API**: Clean backend API with Express and MongoDB

## 📁 Project Structure

```
product-landing-page/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js          # MongoDB connection
│   │   │   └── seed.js        # Database seeding script
│   │   ├── controllers/
│   │   │   └── productController.js
│   │   ├── models/
│   │   │   └── Product.js
│   │   ├── routes/
│   │   │   └── productRoutes.js
│   │   └── server.js          # Express server
│   ├── .env                   # Environment variables
│   ├── .gitignore
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx     # Header with search
│   │   │   ├── Hero.jsx       # Hero section
│   │   │   ├── FilterSection.jsx
│   │   │   └── ProductsGrid.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** or **yarn**

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd mern-product-landing-page
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (or use the provided template)
# Add the following:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-product-landing-page

# Start MongoDB (if running locally)
# On Windows: Make sure MongoDB service is running
# On Mac/Linux: mongod

# Seed the database with sample products
npm run seed

# Start the backend server
npm start
# Or for development with auto-reload:
npm run dev
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📡 API Endpoints

### Get All Products
```
GET /api/products
```
Returns all products from the database.

**Response:**
```json
{
  "success": true,
  "count": 20,
  "data": [
    {
      "_id": "...",
      "name": "iPhone 15 Pro",
      "category": "Electronics",
      "price": 999,
      "rating": 4.8,
      "image": "https://...",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

### Search Products
```
GET /api/search?q=phone
```
Searches products by name (case-insensitive, partial match). Returns maximum 5 results.

**Query Parameters:**
- `q` (required): Search term

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "...",
      "name": "iPhone 15 Pro",
      "category": "Electronics",
      "price": 999,
      "rating": 4.8,
      "image": "https://..."
    }
  ]
}
```

## 🎨 Features in Detail

### Search with Autosuggest
- Real-time search as you type
- Shows up to 5 suggestions in a dropdown
- Clicking a suggestion fills the input field
- Smooth animations and transitions

### Product Filtering
- **Category Filter**: Dropdown to filter by product category
- **Price Range Filter**: Slider to filter products by price range
- Filters update the product grid in real-time (client-side)

### Product Display
- Product image with hover effects
- Product name and category
- Price display
- Star rating (0-5 stars)
- Responsive grid layout (1 column on mobile, 4 columns on desktop)

### Responsive Design
- **Mobile**: Single column layout, collapsible filters
- **Tablet**: 2-3 column grid
- **Desktop**: 4 column grid with full filter panel

## 🖼️ Screenshots

### Desktop View
![Desktop View](screenshots/desktop1.jpg)
![Desktop View](screenshots/desktop2.jpg)

### Mobile View
![Mobile View](screenshots/mobile1.jpg)
![Mobile View](screenshots/mobile2.jpg)

### Search Autosuggest
![Search Autosuggest](screenshots/search.jpg)


## 🚦 Running the Application

1. **Start MongoDB** (if using local installation)
2. **Start Backend**: `cd backend && npm start`
3. **Start Frontend**: `cd frontend && npm run dev`
4. Open `http://localhost:3000` in your browser

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-product-landing-page
```

For MongoDB Atlas (cloud), use:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-product-landing-page
```

## 🧪 Testing

### Test Backend API
```bash
# Get all products
curl http://localhost:5000/api/products

# Search products
curl http://localhost:5000/api/search?q=phone
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally, or
- Update `MONGODB_URI` in `.env` to your MongoDB Atlas connection string

### CORS Errors
- The backend is configured with CORS to allow requests from `http://localhost:3000`
- If using a different port, update CORS settings in `backend/src/server.js`

### Port Already in Use
- Backend default port: 5000
- Frontend default port: 3000
- Change ports in `.env` (backend) or `vite.config.js` (frontend)

## 📦 Build for Production

### Frontend
```bash
cd frontend
npm run build
```
The built files will be in the `dist/` directory.

### Backend
The backend is ready for production. Consider using:
- PM2 for process management
- Environment variables for configuration
- MongoDB Atlas for cloud database

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Created as part of a MERN stack project assignment.

---

**Happy Coding! 🚀**

