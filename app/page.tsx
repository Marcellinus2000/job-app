//app/page.tsx

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Briefcase, TrendingUp, Shield } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold font-montserrat text-foreground">
                JobHub
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            Professional Job Management
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black font-montserrat text-foreground mb-6">
            Streamline Your Job Application Process
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you're a job seeker or HR professional, JobHub provides the
            tools you need to manage applications efficiently and effectively.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-transparent"
              >
                Sign In to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-montserrat text-foreground mb-4">
              Everything You Need in One Platform
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From application tracking to candidate management, we've got you
              covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle>For Job Seekers</CardTitle>
                <CardDescription>
                  Track applications, manage your profile, and never miss an
                  opportunity.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Application tracking dashboard</li>
                  <li>• Profile management</li>
                  <li>• Job search and filtering</li>
                  <li>• Status notifications</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Briefcase className="h-8 w-8 text-primary mb-2" />
                <CardTitle>For HR Teams</CardTitle>
                <CardDescription>
                  Manage job postings, review applications, and streamline
                  hiring.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Candidate management</li>
                  <li>• Job posting tools</li>
                  <li>• Application review system</li>
                  <li>• Team collaboration</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Analytics & Insights</CardTitle>
                <CardDescription>
                  Get valuable insights into your hiring process and
                  performance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Application analytics</li>
                  <li>• Performance metrics</li>
                  <li>• Hiring funnel insights</li>
                  <li>• Custom reports</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold font-montserrat text-foreground mb-4">
            Trusted by Professionals
          </h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of job seekers and HR professionals who trust JobHub
            for their career and hiring needs.
          </p>
          <Link href="/register">
            <Button size="lg">
              Get Started Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 JobHub. Built with modern technology for the modern
            workforce.
          </p>
        </div>
      </footer>
    </div>
  );
}
