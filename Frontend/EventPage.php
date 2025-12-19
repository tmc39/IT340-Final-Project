<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EventLink - Events</title>
  <link rel="stylesheet" href="styling.css">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

    h1 {
      text-align: center;
      font-size: 32px;
      margin-bottom: 1rem;
      color: #1F2937;
    }

    .event-card {
      background-color: #ffffff;
      border-radius: 20px;
      box-shadow: 0 6px 12px rgba(0,0,0,0.1);
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      transition: transform 0.2s;
    }

    .event-card:hover {
      transform: translateY(-5px);
    }

    .event-card h2 {
      font-size: 24px;
      color: #1F2937;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .event-details {
      font-size: 14px;
      color: #6B7280;
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .event-details span {
      font-weight: 500;
    }

    .event-description {
      margin-top: 0.5rem;
      font-size: 15px;
      color: #374151;
    }

    .rsvp-section {
      margin-top: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .rsvp-section button {
      padding: 0.5rem 1rem;
      background-color: #3B82F6;
      color: #fff;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.2s;
      align-self: flex-start;
    }

    .rsvp-section button:hover {
      background-color: #1E40AF;
    }

    .attendees {
      font-size: 14px;
      color: #6B7280;
      margin-top: 0.25rem;
    }

    /* Comments Section */
    .comments-section {
      background-color: #ffffff;
      border-radius: 20px;
      box-shadow: 0 6px 12px rgba(0,0,0,0.1);
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .comments-section h2 {
      font-size: 24px;
      color: #1F2937;
    }

    .comment {
      border-top: 1px solid #E5E7EB;
      padding: 0.75rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .comment:first-child {
      border-top: none;
    }

    .comment p {
      font-size: 14px;
      color: #374151;
    }

    .comment-actions button {
      margin-left: 0.5rem;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 14px;
      color: #6B7280;
      transition: color 0.2s;
    }

    .comment-actions button:hover {
      color: #3B82F6;
    }

    .comment-form {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-top: 1rem;
    }

    .comment-form textarea {
      padding: 0.75rem;
      border-radius: 10px;
      border: 1px solid #D1D5DB;
      font-size: 14px;
      width: 100%;
      resize: vertical;
      min-height: 80px;
    }

    .comment-form button {
      padding: 0.75rem;
      background-color: #3B82F6;
      color: #ffffff;
      border: none;
      border-radius: 10px;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.2s;
      align-self: flex-start;
    }

    .comment-form button:hover {
      background-color: #1E40AF;
    }

    @media (max-width: 900px) {
      .event-details {
        flex-direction: column;
        gap: 0.25rem;
      }
      .comment {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.25rem;
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
    <a href="/dashboard">Dashboard</a>
    <a href="/events">Events</a>
    <a href="/about">About</a>
    <a href="/">Logout</a>
  </div>
</nav>
</header>

<main>
  <h1>Campus Events</h1>

  <div class="event-card" id="event1">
    <h2>Campus Welcome Party</h2>
    <div class="event-details">
      <span>📅 Date: Sept 15, 2025</span>
      <span>🕒 Time: 6:00 PM</span>
      <span>📍 Location: Student Union Hall</span>
    </div>
    <p class="event-description">Join us for the annual campus welcome party with music, food, and games. Meet new friends and start the semester right!</p>
    <div class="rsvp-section">
      <button onclick="rsvpEvent('event1')">RSVP</button>
      <p class="attendees" id="attendees-event1">Attendees: 0</p>
    </div>
  </div>

  <div class="event-card" id="event2">
    <h2>Tech Workshop</h2>
    <div class="event-details">
      <span>📅 Date: Sept 20, 2025</span>
      <span>🕒 Time: 3:00 PM</span>
      <span>📍 Location: Engineering Building, Room 101</span>
    </div>
    <p class="event-description">Learn about the latest technology trends and get hands-on experience with exciting projects. Open to all students.</p>
    <div class="rsvp-section">
      <button onclick="rsvpEvent('event2')">RSVP</button>
      <p class="attendees" id="attendees-event2">Attendees: 0</p>
    </div>
  </div>

  <!-- Comments Section -->
  <div class="comments-section">
    <h2>Comments & Discussion</h2>
    <div class="comment">
      <p><strong>Jane D.</strong>: Looking forward to the Welcome Party!</p>
      <div class="comment-actions">
        <button onclick="likeComment(this)">👍 0</button>
        <button onclick="dislikeComment(this)">👎 0</button>
      </div>
    </div>
    <div class="comment">
      <p><strong>Mark T.</strong>: Is the Tech Workshop beginner-friendly?</p>
      <div class="comment-actions">
        <button onclick="likeComment(this)">👍 0</button>
        <button onclick="dislikeComment(this)">👎 0</button>
      </div>
    </div>

    <form class="comment-form" onsubmit="addComment(event)">
      <textarea placeholder="Add your comment..." required></textarea>
      <button type="submit">Post Comment</button>
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
  // RSVP counts
  const rsvpCounts = { event1:0, event2:0 };
  function rsvpEvent(eventId){
    rsvpCounts[eventId]++;
    document.getElementById(`attendees-${eventId}`).textContent = `Attendees: ${rsvpCounts[eventId]}`;
  }

  function addComment(e){
    e.preventDefault();
    const form = e.target;
    const text = form.querySelector('textarea').value.trim();
    if(text==='') return;
    const commentDiv = document.createElement('div');
    commentDiv.className='comment';
    commentDiv.innerHTML=`<p><strong>You</strong>: ${text}</p>
      <div class="comment-actions">
        <button onclick="likeComment(this)">👍 0</button>
        <button onclick="dislikeComment(this)">👎 0</button>
      </div>`;
    const commentsSection = form.parentElement;
    commentsSection.insertBefore(commentDiv, form);
    form.reset();
  }

  function likeComment(btn){
    let count = parseInt(btn.textContent.split(' ')[1]);
    count++;
    btn.textContent=`👍 ${count}`;
  }

  function dislikeComment(btn){
    let count = parseInt(btn.textContent.split(' ')[1]);
    count++;
    btn.textContent=`👎 ${count}`;
  }
</script>
</body>
</html>

