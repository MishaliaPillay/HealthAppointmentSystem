"use client";
import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  CheckCircle,
  Heart,
  MessageSquare,
  Shield,
  Star,
  Stethoscope,
  User,
  Video,
} from "lucide-react";
import { Button } from "antd";
import "./style.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="page-container">
      {/* Header */}
      <header className="header">
        <div className="container header-container">
          <div className="logo-container">
            <div className="logo-icon">
              <Heart className="icon" fill="white" />
            </div>
            <span className="logo-text">HealthConnect</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="tag">
                <span className="tag-content">
                  <Stethoscope className="tag-icon" />
                  Healthcare Made Simple
                </span>
              </div>
              <h1 className="hero-title">
                Your Health, <span className="highlight">Your Schedule</span>
              </h1>
              <p className="hero-description">
                Book appointments with top healthcare providers in your area. No
                waiting lines, no phone calls – just simple, secure scheduling.
              </p>
              <div>
                <Button
                  type="primary"
                  size="large"
                  className="book-button"
                  onClick={() => router.push("/login")}
                >
                  Get Started
                  <ArrowRight className="button-icon" />
                </Button>
              </div>
            </div>
            <div className="hero-image">
              <div className="icon-container">
                <div className="icon-glow"></div>
                <div className="icon-background">
                  <Stethoscope className="hero-icon" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Key Features</div>
            <h2 className="section-title">Simplifying Healthcare Access</h2>
            <p className="section-description">
              Our platform makes managing your healthcare appointments
              effortless and efficient.
            </p>
          </div>
          <div className="features-grid">
            {[
              {
                title: "Easy Scheduling",
                description: "Book appointments with just a few clicks, 24/7.",
                icon: <Calendar className="feature-icon" />,
              },
              {
                title: "Instant Confirmations",
                description:
                  "Receive immediate appointment confirmations and reminders.",
                icon: <CheckCircle className="feature-icon" />,
              },
              {
                title: "Emotion Detection",
                description:
                  "AI-powered analysis to understand your emotional state.",
                icon: <Video className="feature-icon" />,
              },
              {
                title: "Secure Health Records",
                description:
                  "Your medical information is protected with bank-level security.",
                icon: <Shield className="feature-icon" />,
              },
              {
                title: "Smart Provider Matching",
                description:
                  "Find the right specialist for your specific health needs.",
                icon: <Stethoscope className="feature-icon" />,
              },
              {
                title: "24/7 Support",
                description:
                  "Our team is always available to assist with any questions.",
                icon: <MessageSquare className="feature-icon" />,
              },
            ].map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon-container">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Simple Process</div>
            <h2 className="section-title">How It Works</h2>
            <p className="section-description">
              Getting the healthcare you need has never been easier.
            </p>
          </div>
          <div className="steps-grid">
            {[
              {
                step: "1",
                title: "Create Account",
                description:
                  "Sign up and complete your health profile in minutes.",
                icon: <User className="step-icon" />,
              },
              {
                step: "2",
                title: "Find Provider",
                description:
                  "Search for specialists based on your needs and location.",
                icon: <Stethoscope className="step-icon" />,
              },
              {
                step: "3",
                title: "Book Appointment",
                description:
                  "Select a convenient time slot from available options.",
                icon: <Calendar className="step-icon" />,
              },
              {
                step: "4",
                title: "Get Care",
                description:
                  "Visit your provider in-person or via video consultation.",
                icon: <Heart className="step-icon" />,
              },
            ].map((step, index) => (
              <div key={index} className="step-card">
                <div className="step-number">{step.step}</div>
                <div className="step-icon-container">{step.icon}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {[
              {
                stat: "10,000+",
                label: "Appointments Booked",
                icon: <Calendar className="stat-icon" />,
              },
              {
                stat: "500+",
                label: "Healthcare Providers",
                icon: <User className="stat-icon" />,
              },
              {
                stat: "98%",
                label: "Patient Satisfaction",
                icon: <Star className="stat-icon" />,
              },
              {
                stat: "24/7",
                label: "Customer Support",
                icon: <MessageSquare className="stat-icon" />,
              },
            ].map((item, index) => (
              <div key={index} className="stat-item">
                <div className="stat-icon-container">{item.icon}</div>
                <h3 className="stat-number">{item.stat}</h3>
                <p className="stat-label">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Testimonials</div>
            <h2 className="section-title">What Our Users Say</h2>
            <p className="section-description">
              Real experiences from patients and healthcare providers.
            </p>
          </div>
          <div className="testimonials-grid">
            {[
              {
                quote:
                  "HealthConnect has transformed how I manage my practice. Fewer no-shows and more satisfied patients!",
                author: "Dr. Sarah Johnson",
                role: "Cardiologist",
              },
              {
                quote:
                  "As a busy parent, being able to book appointments for my family at any time has been a game-changer.",
                author: "Craig Managaladzi",
                role: "Patient",
              },
              {
                quote:
                  "The Emotion detection feature saved me so much time when I needed a quick follow-up with my doctor.",
                author: "Katleho Madaba",
                role: "Patient",
              },
            ].map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-stars">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="star-icon" />
                    ))}
                </div>
                <p className="testimonial-quote">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="testimonial-author">
                  <p className="author-name">{testimonial.author}</p>
                  <p className="author-role">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-column">
              <div className="footer-logo">
                <div className="logo-icon">
                  <Heart className="icon" fill="white" />
                </div>
                <span className="logo-text">HealthConnect</span>
              </div>
              <p className="footer-description">
                Connecting patients with quality healthcare providers 24/7.
              </p>
            </div>
            <div className="footer-column">
              <h3 className="footer-heading">For Patients</h3>
              <ul className="footer-links">
                <li>
                  <Link href="#" className="footer-link">
                    Find a Doctor
                  </Link>
                </li>
                <li>
                  <Link href="#" className="footer-link">
                    Book Appointment
                  </Link>
                </li>
                <li>
                  <Link href="#" className="footer-link">
                    Video Consultations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="footer-link">
                    Health Records
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h3 className="footer-heading">For Providers</h3>
              <ul className="footer-links">
                <li>
                  <Link href="#" className="footer-link">
                    Join Our Network
                  </Link>
                </li>
                <li>
                  <Link href="#" className="footer-link">
                    Provider Portal
                  </Link>
                </li>
                <li>
                  <Link href="#" className="footer-link">
                    Practice Management
                  </Link>
                </li>
                <li>
                  <Link href="#" className="footer-link">
                    Resources
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h3 className="footer-heading">Legal</h3>
              <ul className="footer-links">
                <li>
                  <Link href="#" className="footer-link">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="footer-link">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="footer-link">
                    HIPAA Compliance
                  </Link>
                </li>
                <li>
                  <Link href="#" className="footer-link">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="copyright">
              © {new Date().getFullYear()} HealthConnect. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
