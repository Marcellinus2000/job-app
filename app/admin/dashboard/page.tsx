//app/admin/dashboard/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Briefcase, FileText, TrendingUp, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-montserrat text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your job platform.</p>
        </div>
        <Button>
          <Briefcase className="mr-2 h-4 w-4" />
          Post New Job
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary">+3</span> new this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary">+18%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hire Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary">+2.1%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Latest job applications received</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                name: "Sarah Johnson",
                position: "Senior Frontend Developer",
                time: "2 hours ago",
                status: "pending",
              },
              {
                name: "Michael Chen",
                position: "Product Manager",
                time: "4 hours ago",
                status: "reviewed",
              },
              {
                name: "Emily Davis",
                position: "UX Designer",
                time: "6 hours ago",
                status: "interview",
              },
              {
                name: "David Wilson",
                position: "Backend Developer",
                time: "1 day ago",
                status: "rejected",
              },
            ].map((application, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-sm font-medium">{application.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{application.name}</p>
                    <p className="text-xs text-muted-foreground">{application.position}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={
                      application.status === "pending"
                        ? "secondary"
                        : application.status === "reviewed"
                          ? "outline"
                          : application.status === "interview"
                            ? "default"
                            : "destructive"
                    }
                  >
                    {application.status === "pending" && <Clock className="mr-1 h-3 w-3" />}
                    {application.status === "reviewed" && <CheckCircle className="mr-1 h-3 w-3" />}
                    {application.status === "interview" && <AlertCircle className="mr-1 h-3 w-3" />}
                    {application.status === "rejected" && <XCircle className="mr-1 h-3 w-3" />}
                    {application.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{application.time}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Job Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Jobs</CardTitle>
            <CardDescription>Jobs with the most applications this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                title: "Senior Frontend Developer",
                applications: 45,
                views: 234,
                department: "Engineering",
              },
              {
                title: "Product Manager",
                applications: 32,
                views: 189,
                department: "Product",
              },
              {
                title: "UX Designer",
                applications: 28,
                views: 156,
                department: "Design",
              },
              {
                title: "Backend Developer",
                applications: 24,
                views: 143,
                department: "Engineering",
              },
            ].map((job, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{job.title}</p>
                  <p className="text-xs text-muted-foreground">{job.department}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{job.applications} applications</p>
                  <p className="text-xs text-muted-foreground">{job.views} views</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
