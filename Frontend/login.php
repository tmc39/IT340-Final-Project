<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EventLink - Login to Campus Events</title>
  <link rel="stylesheet" href="styling.css">
  <style>
    /* Fonts */
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

    .container {
      max-width: 400px;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    /* Login Card */
    .login-card {
      background-color: #ffffff;
      padding: 2rem;
      border-radius: 20px;
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    }

    .login-card h2 {
      font-size: 24px;
      margin-bottom: 0.5rem;
      text-align: center;
    }

    .login-card p {
      text-align: center;
      color: #6B7280;
      margin-bottom: 1.5rem;
    }

    .login-card input[type="email"],
    .login-card input[type="password"] {
      width: 100%;
      padding: 0.75rem 1rem;
      margin-bottom: 1rem;
      border-radius: 10px;
      border: 1px solid #D1D5DB;
      font-size: 14px;
    }

    .login-card input:focus {
      outline: none;
      border-color: #3B82F6;
      box-shadow: 0 0 0 2px rgba(59,130,246,0.2);
    }

    .login-card label {
      display: block;
      margin-bottom: 0.5rem;
      font-size: 14px;
      font-weight: 500;
    }

    .login-card .checkbox-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      font-size: 14px;
    }

    .login-card button {
      width: 100%;
      padding: 0.75rem;
      background-color: #3B82F6;
      color: #ffffff;
      border: none;
      border-radius: 10px;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .login-card button:hover {
      background-color: #1E40AF;
    }

    /* Features */
    .features {
      background-color: #ffffff;
      padding: 1.5rem;
      border-radius: 20px;
      box-shadow: 0 6px 12px rgba(0,0,0,0.1);
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      text-align: center;
    }

    .features div {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .features i {
      font-size: 24px;
      margin-bottom: 0.5rem;
    }

    /* Responsive */
    @media (max-width: 500px) {
      .features {
        grid-template-columns: 1fr;
      }
    }

  </style>
  <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
</head>
<body>

<header>
<nav>
  <div class="logo">
    <div class="logo-icon"><i class="fas fa-calendar-alt"></i></div>
    <span>EventLink</span>
  </div>
  <div>
    <a href="/about">About</a>
  </div>
</nav>
</header>

<main>
  <div class="container">
    <div class="login-card">
      <h2>Welcome Back</h2>
      <p>Sign in to your EventLink account</p>
      <form (ngSubmit)="onSubmit()">
        <label for="email">University Email</label>
        <input type="email" id="email" [(ngModel)]="email" name="email" placeholder="your.email@university.edu" required>

        <label for="password">Password</label>
        <input type="password" id="password" [(ngModel)]="password" name="password" placeholder="Enter your password" required>
        
      <div *ngIf="errorMessage" style="color: red; margin-bottom: 1rem; text-align: center;">
        {{ errorMessage }}
      </div>

      <div class="checkbox-container">
        <label><input type="checkbox"> Remember me</label>
        <a href="#">Forgot password?</a>
      </div>

      <button type="submit">Sign In</button>
    </form>

    <div class="register-link">
      Don't have an account? <a href="/register">Sign up</a>
    </div>


    <div class="features">
      <div>
        <i class="fas fa-search" style="color:#3B82F6"></i>
        <p>Find Events</p>
      </div>
      <div>
        <i class="fas fa-calendar-plus" style="color:#F59E0B"></i>
        <p>RSVP Instantly</p>
      </div>
      <div>
        <i class="fas fa-bell" style="color:#8B5CF6"></i>
        <p>Get Reminders</p>
      </div>
      <div>
        <i class="fas fa-users" style="color:#10B981"></i>
        <p>Connect with Peers</p>
      </div>
    </div>
  </div>
</main>

<footer>
  <p>&copy; 2025 EventLink. Connecting students with campus events.</p>
  <p>
    <a href="#">Privacy</a> |
    <a href="#">Terms</a> |
    <a href="#">Contact</a>
  </p>
</footer>

<script>
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', function(e){
  e.preventDefault();
  window.location.href = "/dashboard";
});
</script>
</body>
</html>
