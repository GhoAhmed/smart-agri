import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
  LucideAngularModule,
  Activity,
  CloudRain,
  BarChart3,
  Droplet,
  Frame,
  RollerCoasterIcon,
} from 'lucide-angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
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
      icon: Activity,
    },
    {
      title: 'Irrigation Control',
      desc: 'Open and close valves remotely with a single tap. Schedule automatic watering cycles.',
      icon: Droplet,
    },
    {
      title: 'Yield Analytics',
      desc: 'Track harvest trends, compare field performance, and export reports for your records.',
      icon: BarChart3,
    },
    {
      title: 'Weather Integration',
      desc: 'Automatic irrigation adjustments based on forecasts. Never over-water after rain again.',
      icon: CloudRain,
    },
    {
      title: 'Multi-Farm Support',
      desc: 'Manage multiple properties under one account. Ideal for large agribusiness operations.',
      icon: Frame,
    },
    {
      title: 'Role-Based Access',
      desc: 'Assign farmer and admin roles. Keep operations organized with fine-grained permissions.',
      icon: RollerCoasterIcon,
    },
  ];
}
