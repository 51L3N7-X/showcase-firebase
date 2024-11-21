# **Web Application with Dashboard**

## **Project Description**

This project is a web application built using **Next.js** and integrates a **dashboard** for managing items and swiper images. The key features include a **static landing page** with a swiper component, a fully functioning authentication system using **NextAuth**, and a secured dashboard for CRUD operations. The application uses **lowdb** for data management and secured API routes with JWT tokens. The frontend is styled with **TailwindCSS** and components from **shadcn/ui** for a modern, accessible, and responsive UI.

---

### **Live Preview**

Test the application live here: [Live Preview URL](https://showcase-five-khaki.vercel.app/)  
**Temporary Login Credentials**:  
- **Username**: `admin`  
- **Password**: `password`

---

### 1. **Landing Page**

The landing page is designed to provide a visual overview of the application. It includes the following features:

#### **Swiper Component**
- Built with **Swiper.js** to display a carousel of images.
- Provides an engaging visual introduction to the application.

#### **Item Gallery**
- Below the swiper, a responsive grid layout (designed with **TailwindCSS**) displays item thumbnails.
- Each item links to a **detail page** where more information is displayed.

#### **Item Detail Page**
- Each item has its dedicated page that includes:
  - A larger version of the item image.
  - Details such as the item's name, description, and ID.
  - Styled with **shadcn/ui** components for consistency and accessibility.

---

### 2. **Navigation Bar**

The navigation bar appears consistently at the top of the application and includes the following features:
1. **Dark/Light Mode Switcher**
   - Built with **shadcn/ui** to toggle between light and dark themes.
   - Integrated with TailwindCSS’s `dark` mode to ensure theme consistency.
   
2. **Authentication Controls**
   - **Login Button**:
     - Redirects to the **NextAuth** login page.
     - Upon successful login, the navbar updates dynamically to show a **Logout Button**.
   - **Logout Button**:
     - Clears the JWT token and logs the user out via NextAuth.

---

### 3. **Login Page**

The login page includes:
- A **shadcn/ui card** component for the login form, styled with TailwindCSS.
- Fields for username and password.
- A submit button that triggers the **NextAuth** sign-in flow.
- Authentication errors are displayed using **shadcn/ui toast notifications**.

---

### 4. **Dashboard**

The dashboard is accessible only to authenticated users. It is designed with a clean, responsive UI using TailwindCSS and **shadcn/ui** components.

#### **Add Item Section**
- **"Add Item" Button**:
  - Opens a **shadcn/ui dialog** containing:
    - An **image uploader** using `uploadthing`.
    - A form with fields for:
      - Name
      - Description
      - ID
    - Image preview updates dynamically within the form.
  - Submitting the form sends the data to the backend and refreshes the UI using **React Query**.

#### **Item Table**
- A responsive table listing all items, styled with **shadcn/ui table components**.
- Columns include:
  - Item Image
  - Name
  - Description
  - ID
  - **Action Buttons**:
    - **Update**: Opens a **pre-filled dialog** with the current item details.
    - **Delete**: Opens a confirmation **shadcn/ui alert dialog** before deleting the item.
- The table dynamically updates after any CRUD action via **React Query**.

#### **Swiper Image Management**
- At the bottom of the dashboard, an **"Add Image" Button** allows users to upload new swiper images.
- The image uploader integrates seamlessly with the existing **shadcn/ui modal** components.

---

### 5. **Backend and Data Management**

- **Next.js API Routes**:
  - Handle CRUD operations for items and swiper images.
  - Secured with JWT tokens managed by **NextAuth**.
- **Lowdb**:
  - A lightweight database for storing items and images.

---

### 6. **Authentication with NextAuth**

- **NextAuth** is used for user authentication and session management:
  - Provides JWT tokens for securing API routes.
  - Integrates with custom login forms and logout flows.
  - Supports token validation for enhanced security.

---

### 7. **UI Design and Styling**

The application uses a modern, responsive design powered by **TailwindCSS** and **shadcn/ui**. Key styling features include:
- **Dark Mode**: Easily toggled via a switcher in the navbar.
- **Responsive Layouts**: Ensures optimal display across devices.
- **Reusable Components**:
  - All dialogs, modals, buttons, tables, and alerts are built with **shadcn/ui**, offering a consistent design system.

---

### **Technical Stack**

1. **Frontend**:
   - Framework: Next.js with the App directory structure.
   - State Management: React Query for efficient data fetching.
   - UI: TailwindCSS and **shadcn/ui** for modern and accessible components.

2. **Backend**:
   - Lowdb for lightweight data persistence.
   - Next.js API routes for CRUD operations.

3. **Authentication**:
   - **NextAuth** for managing login, logout, and JWT-based authentication.

4. **Additional Libraries**:
   - Swiper.js for the image carousel.
   - Uploadthing for image uploads.
   - React Query for state synchronization.

---

### **Workflow**

1. Users land on the homepage and interact with the swiper and item gallery.
2. Users log in via **NextAuth** to access the dashboard.
3. Authenticated users can add, update, or delete items and manage swiper images.
4. Every action dynamically updates the UI using React Query.
5. The application provides a seamless, responsive experience tailored with TailwindCSS and **shadcn/ui**.

This project combines modern technologies, secure practices, and a user-friendly interface to deliver a powerful and flexible web application.
