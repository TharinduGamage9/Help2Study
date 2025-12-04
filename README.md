# LMS Platform

A Learning Management System platform built with Next.js, MongoDB, and TypeScript. This platform allows admins to manage notes and drive links for OL (Ordinary Level) and AL (Advanced Level) students.

## Features

- **Student Portal**: Browse notes and drive links by level (OL/AL) and subject
- **Admin Dashboard**: Manage notes and drive links with full CRUD operations
- **Authentication**: Secure admin login system
- **Filtering**: Filter content by subject
- **Responsive Design**: Modern UI with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: bcryptjs for password hashing

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or Atlas)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Add your MongoDB connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/lms
   ```
   Or for MongoDB Atlas:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lms
   ```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Creating an Admin Account

To create an admin account, you'll need to use MongoDB directly or create a script. Here's a sample script you can run:

```javascript
// scripts/createAdmin.js
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    const admin = new Admin({
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123'
    });
    await admin.save();
    console.log('Admin created successfully');
    process.exit();
  });
```

## Project Structure

```
├── app/
│   ├── api/              # API routes
│   ├── admin/            # Admin dashboard
│   ├── ol/               # OL level page
│   ├── al/               # AL level page
│   └── page.tsx          # Home page
├── components/           # React components
├── lib/                  # Utility functions
├── models/               # MongoDB models
└── public/               # Static assets
```

## Usage

### Admin Dashboard

1. Navigate to `/admin`
2. Login with your admin credentials
3. Add, edit, or delete notes and drive links
4. Filter by level (OL/AL) and subject

### Student Portal

1. Visit the home page
2. Select OL or AL level
3. Browse notes and drive links
4. Filter by subject if needed

## Deployment to Vercel

### Prerequisites
- GitHub account (recommended) or Git repository
- MongoDB Atlas account with your database set up
- Vercel account (free tier available)

### Step 1: Prepare Your Project

1. **Ensure your code is committed to Git:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push to GitHub (recommended):**
   - Create a new repository on GitHub
   - Push your code:
     ```bash
     git remote add origin https://github.com/yourusername/your-repo.git
     git push -u origin main
     ```

### Step 2: Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel:**
   - Visit [https://vercel.com](https://vercel.com)
   - Sign up or log in (you can use your GitHub account)

2. **Import Your Project:**
   - Click "Add New..." → "Project"
   - Import your GitHub repository (or connect via Git)
   - Select your repository

3. **Configure Project Settings:**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)
   - **Install Command:** `npm install` (default)

4. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add your MongoDB connection string:
     - **Name:** `MONGODB_URI`
     - **Value:** Your MongoDB Atlas connection string
     - **Environment:** Production, Preview, Development (select all)
   - Click "Save"

5. **Deploy:**
   - Click "Deploy"
   - Wait for the build to complete (usually 1-2 minutes)

6. **Access Your Site:**
   - Once deployed, you'll get a URL like `your-project.vercel.app`
   - Your site is now live!

#### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   - Follow the prompts
   - When asked for environment variables, add `MONGODB_URI`

4. **Deploy to Production:**
   ```bash
   vercel --prod
   ```

### Step 3: Configure MongoDB Atlas for Production

1. **Whitelist Vercel IPs:**
   - Go to MongoDB Atlas → Network Access
   - Add IP Address: `0.0.0.0/0` (allows all IPs)
   - Or add specific Vercel IP ranges (check Vercel docs)

2. **Verify Database Connection:**
   - Your app should connect automatically
   - Check Vercel logs if there are connection issues

### Step 4: Create Admin Account (After Deployment)

After deploying, you need to create an admin account. You have two options:

**Option 1: Run script locally (recommended)**
```bash
npm run create-admin
```
Make sure your `.env.local` has the same `MONGODB_URI` as Vercel.

**Option 2: Use MongoDB Compass or Atlas UI**
- Connect to your MongoDB Atlas database
- Manually create an admin document in the `admins` collection

### Important Notes

- **Environment Variables:** Always add `MONGODB_URI` in Vercel dashboard
- **MongoDB Atlas:** Make sure to whitelist IPs (use `0.0.0.0/0` for development)
- **Build Time:** First build may take 2-3 minutes
- **Custom Domain:** You can add a custom domain in Vercel project settings
- **Automatic Deployments:** Vercel automatically deploys on every push to your main branch

### Troubleshooting

- **Build Fails:** Check build logs in Vercel dashboard
- **Database Connection Error:** Verify `MONGODB_URI` is set correctly and MongoDB Atlas IP whitelist includes Vercel
- **Admin Login Issues:** Make sure admin account exists in database

## License

MIT

