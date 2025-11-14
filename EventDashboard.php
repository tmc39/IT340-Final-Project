<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EventLink - Dashboard</title>
  <link rel="stylesheet" href="styling.css">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

    main {
      flex:1; 
      max-width:1200px; 
      margin:2rem auto; 
      width:100%;
      padding:0 1rem; 
      display:grid; 
      grid-template-columns: repeat(auto-fit, minmax(300px,1fr)); 
      gap:2rem;
    }
   
    h1 { grid-column:1/-1; text-align:center; font-size:32px; margin-bottom:1rem; }

    .card {
      background-color:#ffffff; border-radius:20px; box-shadow:0 6px 12px rgba(0,0,0,0.1); padding:1.5rem;
      display:flex; flex-direction:column; gap:1rem;
    }

    .card h2 { 
      font-size:20px; 
      color:#1F2937; 
    }
    .card p { 
      font-size:14px; 
      color:#6B7280; 
    }

    .card button {
      padding:0.5rem 1rem;
      background-color:#3B82F6; /* Blue color */
      color:#fff;
      border:none;
      border-radius:10px;
      font-size:14px;
      cursor:pointer;
      transition:background-color 0.2s;
      align-self:flex-start;
    }

    .card button:hover {
      background-color:#1E40AF; /* Darker blue on hover */
    }

    .event-list { 
      display:flex; 
      flex-direction:column; 
      gap:1rem; 
      max-height:300px; 
      overflow-y:auto; 
    }

    .event-item {
      padding:0.75rem 1rem; border:1px solid #D1D5DB; border-radius:10px;
      display:flex; justify-content:space-between; align-items:center;
    }

    .event-item span { 
      font-weight:500; 
    }

    .search-section input {
      padding:0.5rem; 
      border-radius:10px; 
      border:1px solid #D1D5DB; 
      font-size:14px; 
      margin-bottom:0.5rem; 
      width:100%;
    }

    @media (max-width:900px){ 
      main { grid-template-columns:1fr; } 
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
  <h1>Your Dashboard</h1>

  <!-- Personal Dashboard -->
  <div class="card">
    <h2>Personal Dashboard</h2>
    <p>View your RSVPs, upcoming events, and recommendations here.</p>

    <h3>RSVP'd Events</h3>
    <div class="event-list">
      <div class="event-item"><span>Campus Welcome Party</span><button onclick="location.href='/events#event1'">View</button></div>
      <div class="event-item"><span>Tech Workshop</span><button onclick="location.href='/events#event2'">View</button></div>
      <div class="event-item"><span>Art Exhibition</span><button onclick="location.href='/events'">View</button></div>
    </div>

    <h3>Upcoming Events</h3>
    <div class="event-list">
      <div class="event-item"><span>Music Night</span><button onclick="location.href='/events'">Details</button></div>
      <div class="event-item"><span>Career Fair</span><button onclick="location.href='/events'">Details</button></div>
    </div>

    <h3>Recommended for You</h3>
    <div class="event-list">
      <div class="event-item"><span>Science Workshop</span><button onclick="location.href='/events'">Explore</button></div>
      <div class="event-item"><span>Networking Meetup</span><button onclick="location.href='/events'">Explore</button></div>
    </div>
  </div>

  <!-- Event Search -->
  <div class="card search-section">
    <h2>Search Events</h2>
    <p>Search by location, college, or keyword.</p>
    <input type="text" placeholder="Enter location or keyword" id="searchInput">
    <button onclick="searchEvents()">Search</button>
    <div class="event-list" id="searchResults"></div>
  </div>

  <!-- Watch List -->
  <div class="card">
    <h2>Watch List</h2>
    <p>Events you are watching will appear here on your homepage.</p>
    <div class="event-list" id="watchList">
      <div class="event-item"><span>Career Fair</span><button onclick="location.href='/events'">View</button></div>
      <div class="event-item"><span>Music Night</span><button onclick="location.href='/events'">View</button></div>
    </div>
  </div>

  <!-- Event Discovery -->
  <div class="card">
    <h2>Event Discovery</h2>
    <p>View all upcoming events on your campus or nearby schools.</p>
    <div class="event-list">
      <div class="event-item"><span>Campus Welcome Party</span><button onclick="location.href='/events#event1'">RSVP</button></div>
      <div class="event-item"><span>Tech Workshop</span><button onclick="location.href='/events#event2'">RSVP</button></div>
      <div class="event-item"><span>Art Exhibition</span><button onclick="location.href='/events'">RSVP</button></div>
    </div>
  </div>

  <!-- Create Events -->
  <div class="card">
    <h2>Create Events</h2>
    <p>Verified users can post new events with title, description, date, time, and location.</p>
    <div class="event-list">
      <div class="event-item"><span>Go to Create Event Page</span><button onclick="location.href='/create-event'">Create</button></div>
    </div>
  </div>

  <!-- Cross-Campus Networking -->
  <div class="card">
    <h2>Cross-Campus Networking</h2>
    <p>Explore and attend events at other colleges nearby.</p>
    <div class="event-list">
      <div class="event-item"><span>Nearby College Hackathon</span><button onclick="location.href='/events'">Explore</button></div>
      <div class="event-item"><span>Intercollege Sports Meet</span><button onclick="location.href='/events'">Explore</button></div>
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
function searchEvents() {
  const query = document.getElementById('searchInput').value.trim();
  const resultsDiv = document.getElementById('searchResults');
  resultsDiv.innerHTML = '';
  if(query === '') return;
  const exampleResults = [
    'Campus Welcome Party', 'Tech Workshop', 'Career Fair', 'Music Night', 'Art Exhibition', 'Networking Meetup'
  ].filter(e => e.toLowerCase().includes(query.toLowerCase()));
  exampleResults.forEach(event => {
    const div = document.createElement('div');
    div.className = 'event-item';
    div.innerHTML = `<span>${event}</span><button onclick="location.href='/events'">View</button>`;
    resultsDiv.appendChild(div);
  });
}
</script>
</body>
</html>

