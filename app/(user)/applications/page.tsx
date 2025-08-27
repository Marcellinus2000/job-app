import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  MapPin,
  Building,
  Eye,
  MessageSquare,
  Download,
} from "lucide-react"
import { Breadcrumb } from "@/components/ui/breadcrumb"

export default function ApplicationsPage() {
  const applications = [
    {
      id: 1,
      jobTitle: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "Remote",
      appliedDate: "2024-01-28",
      status: "Under Review",
      statusColor: "secondary",
      salary: "$120k - $150k",
      notes: "Application submitted with portfolio",
    },
    {
      id: 2,
      jobTitle: "Full Stack Developer",
      company: "StartupXYZ",
      location: "San Francisco, CA",
      appliedDate: "2024-01-25",
      status: "Interview Scheduled",
      statusColor: "default",
      salary: "$100k - $140k",
      notes: "Phone interview scheduled for Feb 2nd",
      interviewDate: "2024-02-02",
    },
    {
      id: 3,
      jobTitle: "React Developer",
      company: "BigTech Solutions",
      location: "New York, NY",
      appliedDate: "2024-01-20",
      status: "Rejected",
      statusColor: "destructive",
      salary: "$80 - $100/hr",
      notes: "Position filled by internal candidate",
    },
    {
      id: 4,
      jobTitle: "Frontend Engineer",
      company: "DesignStudio",
      location: "Remote",
      appliedDate: "2024-01-15",
      status: "Application Sent",
      statusColor: "outline",
      salary: "$90k - $120k",
      notes: "Waiting for initial response",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Under Review":
        return <Clock className="h-4 w-4" />
      case "Interview Scheduled":
        return <Calendar className="h-4 w-4" />
      case "Rejected":
        return <XCircle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const activeApplications = applications.filter((app) => app.status !== "Rejected" && app.status !== "Withdrawn")
  const pastApplications = applications.filter((app) => app.status === "Rejected" || app.status === "Withdrawn")

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Dashboard", href: "/dashboard" }, { label: "My Applications" }]} />

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-montserrat text-foreground">My Applications</h1>
        <p className="text-muted-foreground">Track and manage your job applications</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {applications.filter((app) => app.status === "Under Review").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {applications.filter((app) => app.status === "Interview Scheduled").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
          </CardContent>
        </Card>
      </div>

      {/* Applications Tabs */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active ({activeApplications.length})</TabsTrigger>
          <TabsTrigger value="past">Past ({pastApplications.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeApplications.map((application) => (
            <Card key={application.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                      <Building className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{application.jobTitle}</h3>
                      <p className="text-muted-foreground">{application.company}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {application.location}
                        </div>
                        <span>{application.salary}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant={application.statusColor as any} className="flex items-center gap-1">
                    {getStatusIcon(application.status)}
                    {application.status}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Applied on:</span>
                    <span>{new Date(application.appliedDate).toLocaleDateString()}</span>
                  </div>

                  {application.interviewDate && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Interview:</span>
                      <span className="font-medium text-primary">
                        {new Date(application.interviewDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}

                  <div className="flex items-start justify-between text-sm">
                    <span className="text-muted-foreground">Notes:</span>
                    <span className="text-right max-w-xs">{application.notes}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      View Job
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Contact
                    </Button>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastApplications.map((application) => (
            <Card key={application.id} className="opacity-75">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                      <Building className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{application.jobTitle}</h3>
                      <p className="text-muted-foreground">{application.company}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {application.location}
                        </div>
                        <span>{application.salary}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant={application.statusColor as any} className="flex items-center gap-1">
                    {getStatusIcon(application.status)}
                    {application.status}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Applied on:</span>
                    <span>{new Date(application.appliedDate).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-start justify-between text-sm">
                    <span className="text-muted-foreground">Notes:</span>
                    <span className="text-right max-w-xs">{application.notes}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
