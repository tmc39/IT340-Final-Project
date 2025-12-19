import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  events: any[] = [];
  myRsvps: any[] = [];
  upcomingEvents: any[] = [];
  searchQuery: string = '';
  searchResults: any[] = [];
  userId: string = '';
  userName: string = '';

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Get user info from token
    const token = this.authService.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.userId = payload.userId;
      this.userName = payload.email.split('@')[0];
    }

    // Load dashboard data
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe({
      next: (response) => {
        this.events = response.events;
        
        // Filter upcoming events (next 5)
        this.upcomingEvents = this.events.slice(0, 5);
        
        // Filter events user has RSVP'd to
        this.myRsvps = this.events.filter(event => 
          event.attendees.includes(this.userId)
        );
      },
      error: (error) => {
        console.error('Error loading events:', error);
      }
    });
  }

  searchEvents() {
    if (!this.searchQuery.trim()) {
      this.searchResults = [];
      return;
    }

    this.eventService.searchEvents(this.searchQuery).subscribe({
      next: (response) => {
        this.searchResults = response.events;
      },
      error: (error) => {
        console.error('Search error:', error);
      }
    });
  }

  goToEvent(eventId: string) {
    this.router.navigate(['/events']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}


—-----------------------------------------
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  events: any[] = [];
  myRsvps: any[] = [];
  upcomingEvents: any[] = [];
  watchList: any[] = [];
  searchQuery: string = '';
  searchResults: any[] = [];
  userId: string = '';
  userName: string = '';

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Get user info from token
    const token = this.authService.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.userId = payload.userId;
      this.userName = payload.email.split('@')[0];
    }

    // Load dashboard data
    this.loadEvents();
    this.loadWatchList();
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe({
      next: (response) => {
        this.events = response.events;
        
        // Filter upcoming events (next 5)
        this.upcomingEvents = this.events.slice(0, 5);
        
        // Filter events user has RSVP'd to
        this.myRsvps = this.events.filter(event => 
          event.attendees.includes(this.userId)
        );
      },
      error: (error) => {
        console.error('Error loading events:', error);
      }
    });
  }

  loadWatchList() {
    this.eventService.getWatchList(this.userId).subscribe({
      next: (response) => {
        this.watchList = response.watchList;
      },
      error: (error) => {
        console.error('Error loading watch list:', error);
      }
    });
  }

  addToWatchList(eventId: string) {
    this.eventService.addToWatchList(this.userId, eventId).subscribe({
      next: (response) => {
        alert('Added to watch list!');
        this.loadWatchList();
      },
      error: (error) => {
        alert(error.error.error || 'Failed to add to watch list');
      }
    });
  }

  removeFromWatchList(eventId: string) {
    this.eventService.removeFromWatchList(this.userId, eventId).subscribe({
      next: (response) => {
        alert('Removed from watch list');
        this.loadWatchList();
      },
      error: (error) => {
        console.error('Error removing from watch list:', error);
      }
    });
  }

  searchEvents() {
    if (!this.searchQuery.trim()) {
      this.searchResults = [];
      return;
    }

    this.eventService.searchEvents(this.searchQuery).subscribe({
      next: (response) => {
        this.searchResults = response.events;
      },
      error: (error) => {
        console.error('Search error:', error);
      }
    });
  }

  goToEvent(eventId: string) {
    this.router.navigate(['/events']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
