import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SITE_CONFIG, type Theme, type Culture } from './config/site.config';
import { TRANSLATIONS } from './config/translations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  readonly config = SITE_CONFIG;
  readonly mapEmbedUrl: SafeResourceUrl;

  isScrolled = false;
  menuOpen = false;
  theme: Theme = SITE_CONFIG.theme.default;
  culture: Culture = 'el';

  reservation = {
    name: '', email: '', phone: '', date: '',
    time: SITE_CONFIG.reservation.defaultTime,
    partySize: SITE_CONFIG.reservation.defaultPartySize,
    notes: '', culture: 'el' as Culture,
  };
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  reviews: any[] = [];
  reviewsLoading = false;
  reviewsError = false;

  constructor(private http: HttpClient, private renderer: Renderer2, private sanitizer: DomSanitizer) {
    const { lat, lng } = SITE_CONFIG.location;
    this.mapEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://maps.google.com/maps?q=${lat},${lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`
    );
  }

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedCulture = localStorage.getItem('culture') as Culture;
    if (savedTheme === 'dark' || savedTheme === 'light') this.theme = savedTheme;
    if (savedCulture === 'el' || savedCulture === 'en') {
      this.culture = savedCulture;
      this.reservation.culture = savedCulture;
    }
    this.applyTheme();
    this.loadReviews();
  }

  get t() { return TRANSLATIONS[this.culture]; }

  @HostListener('window:scroll')
  onScroll() { this.isScrolled = window.scrollY > 60; }

  toggleMenu() { this.menuOpen = !this.menuOpen; }

  scrollTo(id: string) {
    this.menuOpen = false;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', this.theme);
    this.applyTheme();
  }

  toggleCulture() {
    this.culture = this.culture === 'el' ? 'en' : 'el';
    this.reservation.culture = this.culture;
    localStorage.setItem('culture', this.culture);
  }

  applyTheme() {
    const colors = SITE_CONFIG.theme.colors[this.theme];
    const root = document.documentElement;
    (Object.keys(colors) as Array<keyof typeof colors>).forEach(key => {
      const cssKey = (key as string).replace(/([A-Z])/g, '-$1').toLowerCase();
      root.style.setProperty(`--${cssKey}`, colors[key]);
    });
    this.renderer.setAttribute(document.documentElement, 'data-theme', this.theme);
  }

  get themeIcon() { return this.theme === 'dark' ? '☀️' : '🌙'; }
  get cultureLabel() { return this.culture === 'el' ? 'EN' : 'ΕΛ'; }

  submitReservation(ngForm: NgForm) {
    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = false;
    const payload = {
      name: this.reservation.name,
      email: this.reservation.email,
      phone: this.reservation.phone,
      date: new Date(`${this.reservation.date}T${this.reservation.time}`).toISOString(),
      time: this.reservation.time,
      partySize: Number(this.reservation.partySize),
      notes: this.reservation.notes,
      market: this.config.api.market,
      culture: this.reservation.culture,
    };
    const headers = new HttpHeaders({ 'X-Market': this.config.api.market, 'Content-Type': 'application/json' });
    this.http.post(`${this.config.api.baseUrl}/api/Reservations/CreateReservation`, payload, { headers }).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.reservation = { name: '', email: '', phone: '', date: '', time: this.config.reservation.defaultTime, partySize: this.config.reservation.defaultPartySize, notes: '', culture: this.culture };
        ngForm.resetForm(this.reservation);
      },
      error: () => { this.isSubmitting = false; this.submitError = true; },
    });
  }

  loadReviews() {
    this.reviewsLoading = true;
    this.http.get<any>(`${this.config.api.baseUrl}/SerpAPI?market=${this.config.api.market}`).subscribe({
      next: (data) => { this.reviewsLoading = false; this.reviews = (data?.reviews || []).slice(0, 6); },
      error: () => { this.reviewsLoading = false; this.reviewsError = true; },
    });
  }

  getStars(rating: number): number[] { return [1, 2, 3, 4, 5]; }


  openMap(): void {
    window.open(this.config.location.mapsUrl, '_blank', 'noopener');
  }
}
