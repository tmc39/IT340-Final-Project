<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EventLink - Register</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

    .container { 
        max-width:450px; 
        width:100%; 
    }

    .register-card { 
        background-color:#fff; 
        padding:2.5rem; 
        border-radius:20px; 
        box-shadow:0 10px 20px rgba(0,0,0,0.1); 
    }

    .register-card h2 { 
        font-size:28px; 
        margin-bottom:0.5rem; 
        text-align:center; 
        color:#1F2937; 
    }

    .register-card p { 
        text-align:center; 
        color:#6B7280; 
        margin-bottom:2rem; 
        font-size:15px; 
    }
    
    .form-group { 
        margin-bottom:1.2rem; 
    }

    .register-card label { 
        display:block; 
        margin-bottom:0.5rem; 
        font-size:14px; 
        font-weight:500; 
        color:#374151; 
    }
    .register-card input[type="text"],
    .register-card input[type="email"], 
    .register-card input[type="password"] { 
      width:100%; 
      padding:0.75rem 1rem; 
      border-radius:10px; 
      border:1px solid #D1D5DB; 
      font-size:14px; 
      background-color:#F9FAFB; 
      transition:all 0.2s; 
    }
    
    .register-card input:focus { 
        outline:none; 
        border-color:#3B82F6; 
        box-shadow:0 0 0 2px rgba(59,130,246,0.2); 
        background-color:#fff; 
    }
    
    .error-message { 
      color:#DC2626; 
      font-size:13px; 
      margin-top:0.25rem; 
      display:none; 
    }

    .error-message.show { 
        display:block; 
    }
    
    .password-requirements {
      font-size:12px;
      color:#6B7280;
      margin-top:0.5rem;
      padding-left:0.5rem;
    }

    .password-requirements li {
      margin-bottom:0.25rem;
    }

    .password-requirements li.valid {
      color:#10B981;
    }
    
    .register-card button { 
      width:100%; 
      padding:0.75rem; 
      background-color:#3B82F6; 
      color:#fff; 
      border:none; 
      border-radius:10px; 
      font-size:16px; 
      font-weight:500; 
      cursor:pointer; 
      transition: background-color 0.2s; 
      margin-top:0.5rem;
    }

    .register-card button:hover { 
        background-color:#1E40AF; 
    }
    .register-card button:disabled {
      background-color:#9CA3AF;
      cursor:not-allowed;
    }

    .login-link {
      text-align:center;
      margin-top:1.5rem;
      font-size:14px;
      color:#6B7280;
    }

    .login-link a {
      color:#3B82F6;
      text-decoration:none;
      font-weight:500;
    }

    .login-link a:hover {
      text-decoration:underline;
    }

    @media (max-width:500px) { 
      .register-card { padding:1.5rem; }
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
    <div class="register-card">
      <h2>Create Account</h2>
      <p>Join EventLink to discover campus events</p>
<form (ngSubmit)="onSubmit()">
  <div class="form-group">
    <label for="fullname">Full Name</label>
    <input type="text" id="fullname" [(ngModel)]="fullname" name="fullname" placeholder="Enter your full name" required>
  </div>

  <div class="form-group">
    <label for="email">University Email</label>
    <input type="email" id="email" [(ngModel)]="email" name="email" placeholder="your.email@university.edu" required>
  </div>

  <div class="form-group">
    <label for="password">Password</label>
    <input type="password" id="password" [(ngModel)]="password" name="password" placeholder="Create a strong password" required>
  </div>

  <div class="form-group">
    <label for="confirmPassword">Confirm Password</label>
    <input type="password" id="confirmPassword" [(ngModel)]="confirmPassword" name="confirmPassword" placeholder="Re-enter your password" required>
  </div>

  <div *ngIf="errorMessage" style="color: red; margin-bottom: 1rem; text-align: center; font-weight: 500;">
    {{ errorMessage }}
  </div>

  <button type="submit">Create Account</button>
</form>

      <div class="login-link">
        Already have an account? <a href="/">Sign in</a>
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
</body>
</html>
