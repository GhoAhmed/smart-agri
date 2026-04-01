import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

// Each icon is an inline Lucide SVG string — no extra dependency needed.
const icon = (path: string) =>
  `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(public auth: AuthService) {}

  stats = [
    { value: '12K+', label: 'Active Farmers' },
    { value: '98%', label: 'Uptime Guarantee' },
    { value: '42%', label: 'Average Water Saved' },
    { value: '3min', label: 'Avg. Setup Time' },
  ];

  features = [
    {
      title: 'Real-Time Monitoring',
      desc: 'Live sensor data for soil moisture, temperature, and valve status across all your fields.',
      icon: icon('<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>'),
    },
    {
      title: 'Irrigation Control',
      desc: 'Open and close valves remotely with a single tap. Schedule automatic watering cycles.',
      icon: icon('<path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/>'),
    },
    {
      title: 'Yield Analytics',
      desc: 'Track harvest trends, compare field performance, and export reports for your records.',
      icon: icon(
        '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
      ),
    },
    {
      title: 'Weather Integration',
      desc: 'Automatic irrigation adjustments based on forecasts. Never over-water after rain again.',
      icon: icon(
        '<path d="M17.5 19H9a7 7 0 117-7v2"/><path d="M17.5 19a2.5 2.5 0 100-5H17a5 5 0 00-9.9-1"/>',
      ),
    },
    {
      title: 'Multi-Farm Support',
      desc: 'Manage multiple properties under one account. Ideal for large agribusiness operations.',
      icon: icon(
        '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 17.5h7M17.5 14v7"/>',
      ),
    },
    {
      title: 'Role-Based Access',
      desc: 'Assign farmer and admin roles. Keep operations organized with fine-grained permissions.',
      icon: icon(
        '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>',
      ),
    },
  ];
}
