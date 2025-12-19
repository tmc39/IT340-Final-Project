import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'https://192.168.56.102:3000/api/events';

  constructor(private http: HttpClient) {}

  // Create event
  createEvent(eventData: any): Observable<any> {
    return this.http.post(this.apiUrl, eventData);
  }

  // Get all events
  getAllEvents(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Get single event
  getEvent(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // RSVP to event
  rsvpEvent(eventId: string, userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${eventId}/rsvp`, { userId });
  }

  // Cancel RSVP
  cancelRsvp(eventId: string, userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${eventId}/rsvp`, { body: { userId } });
  }

  // Add comment
  addComment(eventId: string, userId: string, userName: string, text: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${eventId}/comments`, { userId, userName, text });
  }

  // Search events
  searchEvents(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search/${query}`);
  }

  // Add to watch list
  addToWatchList(userId: string, eventId: string): Observable<any> {
    return this.http.post('https://192.168.56.102:3000/api/watchlist', { userId, eventId });
  }

  // Get watch list
  getWatchList(userId: string): Observable<any> {
    return this.http.get(`https://192.168.56.102:3000/api/watchlist/${userId}`);
  }

  // Remove from watch list
  removeFromWatchList(userId: string, eventId: string): Observable<any> {
    return this.http.delete('https://192.168.56.102:3000/api/watchlist', { body: { userId, eventId } });
  }
}
