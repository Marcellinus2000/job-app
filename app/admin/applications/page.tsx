"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ApplicationStatusManager } from "@/components/Admin/application-status-manager"
import { BulkApplicationActions } from "@/components/Admin/bulk-application-actions"
import { Search, Filter, Download, Eye, Calendar, Clock, CheckCircle, XCircle, FileText } from "lucide-react"
import Link from "next/link"
import { Breadcrumb } from "@/components/ui/breadcrumb"

const applications = [
  {
    id: "1",
    applicant: {
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    job: {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
    },
    status: "Under Review",
    applied: "2024-01-28",
    experience: "5 years",
    location: "San Francisco, CA",
    salary: "$130k - $150k",
    score: 85,
  },
  {
    id: "2",
    applicant: {
      name: "Michael Chen",
      email: "michael.chen@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    job: {
      id: 2,
      title: "Product Manager",
      department: "Product",
    },
    status: "Interview Scheduled",
    applied: "2024-01-27",
    experience: "7 years",
    location: "New York, NY",
    salary: "$140k - $160k",
    score: 92,
  },
  {
    id: "3",
    applicant: {
      name: "Emily Davis",
      email: "emily.davis@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    job: {
      id: 3,
      title: "UX Designer",
      department: "Design",
    },
    status: "Pending",
    applied: "2024-01-26",
    experience: "3 years",
    location: "Remote",
    salary: "$90k - $110k",
    score: 78,
  },
  {
    id: "4",
    applicant: {
      name: "David Wilson",
      email: "david.wilson@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    job: {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
    },
    status: "Rejected",
    applied: "2024-01-25",
    experience: "2 years",
    location: "Chicago, IL",
    salary: "$100k - $120k",
    score: 65,
  },
  {
    id: "5",
    applicant: {
      name: "Lisa Anderson",
      email: "lisa.anderson@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    job: {
      id: 4,
      title: "Marketing Specialist",
      department: "Marketing",
    },
    status: "Hired",
    applied: "2024-01-20",
    experience: "4 years",
    location: "Austin, TX",
    salary: "$70k - $85k",
    score: 88,
  },
]

export default function ApplicationsPage() {
  const [selectedApplications, setSelectedApplications] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedApplications(filteredApplications.map((app) => app.id))
    } else {
      setSelectedApplications([])
    }
  }

  const handleSelectApplication = (applicationId: string, checked: boolean) => {
    if (checked) {
      setSelectedApplications([...selectedApplications, applicationId])
    } else {
      setSelectedApplications(selectedApplications.filter((id) => id !== applicationId))
    }
  }

  const handleStatusChange = (applicationId: string, newStatus: string, data?: any) => {
    console.log("Status change:", applicationId, newStatus, data)
    // TODO: Implement status change logic
  }

  const handleBulkAction = (action: string, data?: any) => {
    console.log("Bulk action:", action, selectedApplications, data)
    // TODO: Implement bulk action logic
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Under Review":
        return <Clock className="h-4 w-4" />
      case "Interview Scheduled":
        return <Calendar className="h-4 w-4" />
      case "Hired":
        return <CheckCircle className="h-4 w-4" />
      case "Rejected":
        return <XCircle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Hired":
        return "default"
      case "Interview Scheduled":
        return "secondary"
      case "Under Review":
        return "outline"
      case "Rejected":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.job.title.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    const matchesDepartment = departmentFilter === "all" || app.job.department === departmentFilter

    return matchesSearch && matchesStatus && matchesDepartment
  })

  const activeApplications = applications.filter(
    (app) => app.status !== "Rejected" && app.status !== "Hired" && app.status !== "Withdrawn",
  )
  const completedApplications = applications.filter(
    (app) => app.status === "Rejected" || app.status === "Hired" || app.status === "Withdrawn",
  )

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Admin", href: "/admin/dashboard" }, { label: "Applications" }]} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-montserrat text-foreground">Applications</h1>
          <p className="text-muted-foreground">Review and manage job applications</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Advanced Filters
          </Button>
        </div>
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
            <p className="text-xs text-muted-foreground">
              <span className="text-primary">+12</span> this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {applications.filter((app) => app.status === "Under Review").length}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
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
            <p className="text-xs text-muted-foreground">Scheduled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hired</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.filter((app) => app.status === "Hired").length}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Applications</CardTitle>
          <CardDescription>Search and filter applications by various criteria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or job title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Under Review">Under Review</SelectItem>
                <SelectItem value="Interview Scheduled">Interview Scheduled</SelectItem>
                <SelectItem value="Hired">Hired</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Product">Product</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      <BulkApplicationActions
        selectedApplications={selectedApplications}
        onBulkAction={handleBulkAction}
        onClearSelection={() => setSelectedApplications([])}
      />

      {/* Applications Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All ({filteredApplications.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({activeApplications.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedApplications.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {/* Applications List */}
          <Card>
            <CardContent className="p-0">
              <div className="space-y-0">
                {/* Header */}
                <div className="flex items-center space-x-4 p-4 border-b border-border bg-muted/30">
                  <Checkbox
                    checked={
                      selectedApplications.length === filteredApplications.length && filteredApplications.length > 0
                    }
                    onCheckedChange={handleSelectAll}
                  />
                  <div className="flex-1 grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground">
                    <div className="col-span-3">Candidate</div>
                    <div className="col-span-2">Position</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-1">Score</div>
                    <div className="col-span-2">Applied</div>
                    <div className="col-span-2">Actions</div>
                  </div>
                </div>

                {/* Applications */}
                {filteredApplications.map((application) => (
                  <div
                    key={application.id}
                    className="flex items-center space-x-4 p-4 border-b border-border hover:bg-muted/30 transition-colors"
                  >
                    <Checkbox
                      checked={selectedApplications.includes(application.id)}
                      onCheckedChange={(checked) => handleSelectApplication(application.id, checked as boolean)}
                    />
                    <div className="flex-1 grid grid-cols-12 gap-4 items-center">
                      {/* Candidate */}
                      <div className="col-span-3 flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={application.applicant.avatar || "/placeholder.svg"} alt="Candidate" />
                          <AvatarFallback>
                            {application.applicant.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{application.applicant.name}</p>
                          <p className="text-sm text-muted-foreground">{application.applicant.email}</p>
                        </div>
                      </div>

                      {/* Position */}
                      <div className="col-span-2">
                        <p className="font-medium">{application.job.title}</p>
                        <p className="text-sm text-muted-foreground">{application.job.department}</p>
                      </div>

                      {/* Status */}
                      <div className="col-span-2">
                        <Badge variant={getStatusVariant(application.status)} className="flex items-center gap-1 w-fit">
                          {getStatusIcon(application.status)}
                          {application.status}
                        </Badge>
                      </div>

                      {/* Score */}
                      <div className="col-span-1">
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">{application.score}</span>
                          <span className="text-sm text-muted-foreground">/100</span>
                        </div>
                      </div>

                      {/* Applied Date */}
                      <div className="col-span-2">
                        <p className="text-sm">{application.applied}</p>
                        <p className="text-xs text-muted-foreground">{application.experience} experience</p>
                      </div>

                      {/* Actions */}
                      <div className="col-span-2 flex items-center space-x-2">
                        <Link href={`/admin/applications/${application.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Button>
                        </Link>
                        <ApplicationStatusManager
                          applicationId={application.id}
                          currentStatus={application.status}
                          onStatusChange={(newStatus, data) => handleStatusChange(application.id, newStatus, data)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active">
          <Card>
            <CardContent>
              <p className="text-muted-foreground">Active applications view would show similar layout...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardContent>
              <p className="text-muted-foreground">Completed applications view would show similar layout...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
