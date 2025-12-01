<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Create Event | EventLink</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    .create-container {
      background-color:#ffffff;
      padding:2rem 2.5rem;
      border-radius:20px;
      box-shadow:0 10px 20px rgba(0,0,0,0.1);
      max-width:700px;
      width:100%;
    }

    .create-container h2 { font-size:28px; text-align:center; margin-bottom:0.5rem; color:#1F2937; }
    .create-container p { text-align:center; color:#6B7280; margin-bottom:2rem; font-size:15px; }

    form { display:flex; flex-direction:column; gap:1.2rem; }

    label { font-weight:500; margin-bottom:0.3rem; display:block; color:#374151; }

    input[type="text"], input[type="date"], input[type="time"], textarea, select {
      width:100%; padding:0.75rem 1rem; border-radius:10px; border:1px solid #D1D5DB; font-size:14px; background-color:#F9FAFB; transition: all 0.2s;
    }
    input:focus, textarea:focus, select:focus { outline:none; border-color:#3B82F6; box-shadow:0 0 0 2px rgba(59,130,246,0.2); background-color:#fff; }
    textarea { resize:vertical; min-height:100px; }

    button {
      background-color:#3B82F6; color:white; font-size:16px; font-weight:500; padding:0.9rem; border:none; border-radius:10px; cursor:pointer; transition:background-color 0.2s; margin-top:1rem;
    }
    button:hover { background-color:#1E40AF; }

    .form-row { display:flex; gap:1rem; }
    .form-row > div { flex:1; }


    @media (max-width:600px){ 
      .create-container{padding:1.5rem;} 
      nav a{margin-left:1rem; font-size:14px;}
      .form-row { flex-direction:column; }
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
    <a href="/dashboard">Dashboard</a>
    <a href="/events">Events</a>
    <a href="/about">About</a>
    <a href="/">Logout</a>
  </div>
</nav>
</header>

<main>
  <div class="create-container">
    <h2>Create a New Event</h2>
    <p>Fill out the details below to post your event on EventLink.</p>

    <form id="createEventForm">
      <div>
        <label for="title">Event Title</label>
        <input type="text" id="title" placeholder="Enter event title" required>
      </div>

      <div>
        <label for="description">Description</label>
        <textarea id="description" placeholder="Write a short event description" required></textarea>
      </div>

      <div class="form-row">
        <div>
          <label for="date">Date</label>
          <input type="date" id="date" required>
        </div>
        <div>
          <label for="time">Time</label>
          <input type="time" id="time" required>
        </div>
      </div>

      <div>
        <label for="location">Location</label>
        <input type="text" id="location" placeholder="Enter event location" required>
      </div>

      <div>
        <label for="category">Category</label>
        <select id="category" required>
          <option value="">Select category</option>
          <option>Academic</option>
          <option>Sports</option>
          <option>Social</option>
          <option>Networking</option>
          <option>Community</option>
        </select>
      </div>

      <button type="submit">Post Event</button>
    </form>
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
  const createForm = document.getElementById("createEventForm");

  createForm.addEventListener("submit", function(e){
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const location = document.getElementById("location").value.trim();
    const category = document.getElementById("category").value;

    if(!title || !description || !date || !time || !location || !category){
      alert("Please fill all fields.");
      return;
    }

    alert("Event created successfully! Your event has been posted.");
    createForm.reset();
    
    // Optionally redirect to events page
    setTimeout(() => {
      window.location.href = "/events";
    }, 1000);
  });
</script>
</body>
</html>




