import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Star,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"

// Mock data - in real app this would come from API based on application ID
const applicationData = {
  id: 1,
  applicant: {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    avatar: "/placeholder.svg?height=80&width=80",
    linkedIn: "https://linkedin.com/in/sarahjohnson",
    portfolio: "https://sarahjohnson.dev",
  },
  job: {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Remote",
  },
  status: "Under Review",
  appliedDate: "2024-01-28",
  experienceYears: "5 years",
  expectedSalary: "$130k - $150k",
  availableFrom: "2024-03-01",
  coverLetter: `Dear Hiring Manager,

I am excited to apply for the Senior Frontend Developer position at your company. With over 5 years of experience in modern web development, I have developed a strong expertise in React, TypeScript, and Next.js.

In my current role at TechCorp, I have led the development of several high-impact features that improved user engagement by 40%. I am particularly passionate about creating accessible, performant web applications that provide exceptional user experiences.

I would love the opportunity to bring my skills and enthusiasm to your team. Thank you for considering my application.

Best regards,
Sarah Johnson`,
  resume: {
    url: "/resume-sarah-johnson.pdf",
    uploadedAt: "2024-01-28",
  },
  workExperience: [
    {
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      period: "2022 - Present",
      description: "Lead frontend development for multiple web applications using React and TypeScript.",
    },
    {
      title: "Frontend Developer",
      company: "StartupXYZ",
      period: "2020 - 2022",
      description: "Developed responsive web applications and component libraries.",
    },
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "UC Berkeley",
      year: "2019",
    },
  ],
  skills: ["React", "TypeScript", "Next.js", "JavaScript", "CSS", "Node.js", "GraphQL"],
  notes: [
    {
      id: 1,
      author: "John Admin",
      date: "2024-01-29",
      content: "Strong technical background. Portfolio shows excellent React skills.",
      type: "review",
    },
    {
      id: 2,
      author: "Jane HR",
      date: "2024-01-30",
      content: "Scheduled phone screening for Feb 2nd at 2 PM.",
      type: "interview",
    },
  ],
}

export default function ApplicationDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/applications">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Applications
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold font-montserrat text-foreground">{applicationData.applicant.name}</h1>
            <p className="text-muted-foreground">
              Applied for {applicationData.job.title} • {applicationData.appliedDate}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge
            variant={
              applicationData.status === "Under Review"
                ? "secondary"
                : applicationData.status === "Interview Scheduled"
                  ? "default"
                  : "outline"
            }
          >
            {applicationData.status}
          </Badge>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center space-x-2">
        <Button>
          <CheckCircle className="mr-2 h-4 w-4" />
          Move to Interview
        </Button>
        <Button variant="outline">
          <MessageSquare className="mr-2 h-4 w-4" />
          Send Message
        </Button>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download Resume
        </Button>
        <Button variant="outline" className="text-destructive hover:text-destructive bg-transparent">
          <XCircle className="mr-2 h-4 w-4" />
          Reject
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="resume">Resume & Documents</TabsTrigger>
          <TabsTrigger value="notes">Notes & Communication</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column - Candidate Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Candidate Profile */}
              <Card>
                <CardHeader>
                  <CardTitle>Candidate Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={applicationData.applicant.avatar || "/placeholder.svg"} alt="Candidate" />
                      <AvatarFallback className="text-lg">
                        {applicationData.applicant.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">{applicationData.applicant.name}</h3>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          {applicationData.applicant.email}
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          {applicationData.applicant.phone}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {applicationData.applicant.location}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-3">
                        <Button variant="outline" size="sm" asChild>
                          <a href={applicationData.applicant.linkedIn} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            LinkedIn
                          </a>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <a href={applicationData.applicant.portfolio} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Portfolio
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cover Letter */}
              <Card>
                <CardHeader>
                  <CardTitle>Cover Letter</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <p className="whitespace-pre-line text-muted-foreground">{applicationData.coverLetter}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Experience */}
              <Card>
                <CardHeader>
                  <CardTitle>Work Experience</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {applicationData.workExperience.map((exp, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                        <Briefcase className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium">{String(exp.title)}</h4>
                        <p className="text-sm text-muted-foreground">{String(exp.company)}</p>
                        <p className="text-xs text-muted-foreground">{String(exp.period)}</p>
                        <p className="text-sm mt-1">{String(exp.description)}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Education */}
              <Card>
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {applicationData.education.map((edu, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                        <GraduationCap className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium">{edu.degree}</h4>
                        <p className="text-sm text-muted-foreground">{edu.school}</p>
                        <p className="text-xs text-muted-foreground">{edu.year}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Application Details */}
            <div className="space-y-6">
              {/* Application Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Application Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Position</span>
                    <span className="text-sm font-medium">{applicationData.job.title}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Department</span>
                    <span className="text-sm font-medium">{applicationData.job.department}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Applied Date</span>
                    <span className="text-sm font-medium">{applicationData.appliedDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Experience</span>
                    <span className="font-medium">{applicationData.experienceYears}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Expected Salary</span>
                    <span className="text-sm font-medium">{applicationData.expectedSalary}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Available From</span>
                    <span className="text-sm font-medium">{applicationData.availableFrom}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {applicationData.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Status Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Change Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Clock className="mr-2 h-4 w-4" />
                    Mark as Reviewed
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Interview
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Move to Final Round
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Star className="mr-2 h-4 w-4" />
                    Make Offer
                  </Button>
                  <Separator />
                  <Button
                    variant="outline"
                    className="w-full justify-start text-destructive hover:text-destructive bg-transparent"
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject Application
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Notes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {applicationData.notes.slice(0, 2).map((note) => (
                    <div key={note.id} className="text-sm">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{note.author}</span>
                        <span className="text-muted-foreground">{note.date}</span>
                      </div>
                      <p className="text-muted-foreground">{note.content}</p>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    View All Notes
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="resume">
          <Card>
            <CardHeader>
              <CardTitle>Resume & Documents</CardTitle>
              <CardDescription>View and download candidate documents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Resume - Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">Uploaded {applicationData.resume.uploadedAt} • PDF</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
              <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Resume preview would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes">
          <div className="space-y-6">
            {/* Add Note */}
            <Card>
              <CardHeader>
                <CardTitle>Add Note</CardTitle>
                <CardDescription>Add internal notes about this candidate</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="note">Note</Label>
                  <Textarea id="note" placeholder="Add your thoughts about this candidate..." rows={3} />
                </div>
                <Button>Add Note</Button>
              </CardContent>
            </Card>

            {/* Notes History */}
            <Card>
              <CardHeader>
                <CardTitle>Notes & Communication History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {applicationData.notes.map((note) => (
                  <div key={note.id} className="flex items-start space-x-3 p-4 border border-border rounded-lg">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{note.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{note.author}</span>
                        <span className="text-sm text-muted-foreground">{note.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{note.content}</p>
                      <Badge variant="outline" className="mt-2">
                        {note.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>Application Timeline</CardTitle>
              <CardDescription>Track the progress of this application</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    date: "2024-01-28",
                    title: "Application Submitted",
                    description: "Candidate submitted application with resume and cover letter",
                    status: "completed",
                  },
                  {
                    date: "2024-01-29",
                    title: "Initial Review",
                    description: "Application reviewed by hiring manager",
                    status: "completed",
                  },
                  {
                    date: "2024-01-30",
                    title: "Phone Screening Scheduled",
                    description: "Phone screening scheduled for Feb 2nd at 2 PM",
                    status: "current",
                  },
                  {
                    date: "TBD",
                    title: "Technical Interview",
                    description: "Technical interview with engineering team",
                    status: "pending",
                  },
                  {
                    date: "TBD",
                    title: "Final Decision",
                    description: "Final hiring decision",
                    status: "pending",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div
                      className={`h-3 w-3 rounded-full mt-1 ${
                        item.status === "completed"
                          ? "bg-primary"
                          : item.status === "current"
                            ? "bg-secondary"
                            : "bg-muted"
                      }`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{item.title}</h4>
                        <span className="text-sm text-muted-foreground">{item.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
