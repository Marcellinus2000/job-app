import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import {
  Briefcase,
  FileText,
  Clock,
  CheckCircle,
  TrendingUp,
  Eye,
  ArrowRight,
  Star,
  MapPin,
  Calendar,
} from "lucide-react"

export default function UserDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-montserrat text-foreground">Welcome back, John!</h1>
          <p className="text-muted-foreground">Here's your job search progress and latest updates.</p>
        </div>
        <Link href="/jobs">
          <Button>
            <Briefcase className="mr-2 h-4 w-4" />
            Find Jobs
          </Button>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications Sent</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary">+3</span> this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary">1</span> scheduled
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary">+12%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Applications */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>Track the status of your latest job applications</CardDescription>
              </div>
              <Link href="/applications">
                <Button variant="outline" size="sm">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  company: "TechCorp Inc.",
                  position: "Senior Frontend Developer",
                  status: "Under Review",
                  applied: "2 days ago",
                  statusColor: "secondary",
                },
                {
                  company: "StartupXYZ",
                  position: "Full Stack Developer",
                  status: "Interview Scheduled",
                  applied: "5 days ago",
                  statusColor: "default",
                },
                {
                  company: "BigTech Solutions",
                  position: "React Developer",
                  status: "Application Sent",
                  applied: "1 week ago",
                  statusColor: "outline",
                },
              ].map((application, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{application.position}</p>
                      <p className="text-sm text-muted-foreground">{application.company}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={application.statusColor as any}>{application.status}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">{application.applied}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recommended Jobs */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recommended for You</CardTitle>
                <CardDescription>Jobs that match your skills and preferences</CardDescription>
              </div>
              <Link href="/jobs">
                <Button variant="outline" size="sm">
                  See More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  title: "Senior React Developer",
                  company: "InnovateTech",
                  location: "Remote",
                  type: "Full-time",
                  salary: "$120k - $150k",
                  posted: "2 days ago",
                  match: 95,
                },
                {
                  title: "Frontend Engineer",
                  company: "DesignStudio",
                  location: "New York, NY",
                  type: "Full-time",
                  salary: "$100k - $130k",
                  posted: "3 days ago",
                  match: 88,
                },
              ].map((job, index) => (
                <div key={index} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium">{job.title}</h3>
                      <p className="text-sm text-muted-foreground">{job.company}</p>
                    </div>
                    <Badge variant="secondary">{job.match}% match</Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {job.posted}
                    </div>
                    <span className="font-medium text-foreground">{job.salary}</span>
                  </div>
                  <Button size="sm" className="w-full">
                    Apply Now
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Profile Completion */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-4 w-4" />
                Profile Strength
              </CardTitle>
              <CardDescription>Complete your profile to get better job matches</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Profile Completion</span>
                  <span className="text-sm text-muted-foreground">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  Basic information added
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  Work experience added
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="h-4 w-4 border border-muted-foreground rounded-full mr-2" />
                  Add skills and certifications
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="h-4 w-4 border border-muted-foreground rounded-full mr-2" />
                  Upload portfolio projects
                </div>
              </div>
              <Link href="/profile">
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Complete Profile
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/jobs">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Briefcase className="mr-2 h-4 w-4" />
                  Browse Jobs
                </Button>
              </Link>
              <Link href="/applications">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <FileText className="mr-2 h-4 w-4" />
                  View Applications
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Star className="mr-2 h-4 w-4" />
                  Update Profile
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Job Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Job Alerts</CardTitle>
              <CardDescription>Stay updated with new opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Frontend Developer</span>
                  <Badge variant="outline">3 new</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Remote Jobs</span>
                  <Badge variant="outline">7 new</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Senior Level</span>
                  <Badge variant="outline">2 new</Badge>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
                Manage Alerts
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
