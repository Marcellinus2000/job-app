"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { CalendarIcon, CheckCircle, XCircle, Clock } from "lucide-react"
import { format } from "date-fns"

interface ApplicationStatusManagerProps {
  applicationId: string
  currentStatus: string
  onStatusChange: (newStatus: string, data?: any) => void
}

const statusOptions = [
  { value: "pending", label: "Pending Review", color: "secondary" },
  { value: "reviewing", label: "Under Review", color: "secondary" },
  { value: "phone-screen", label: "Phone Screening", color: "default" },
  { value: "technical", label: "Technical Interview", color: "default" },
  { value: "final", label: "Final Interview", color: "default" },
  { value: "offer", label: "Offer Extended", color: "default" },
  { value: "hired", label: "Hired", color: "default" },
  { value: "rejected", label: "Rejected", color: "destructive" },
  { value: "withdrawn", label: "Withdrawn", color: "secondary" },
]

export function ApplicationStatusManager({
  applicationId,
  currentStatus,
  onStatusChange,
}: ApplicationStatusManagerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(currentStatus)
  const [notes, setNotes] = useState("")
  const [interviewDate, setInterviewDate] = useState<Date>()
  const [interviewTime, setInterviewTime] = useState("")
  const [rejectionReason, setRejectionReason] = useState("")

  const handleStatusChange = () => {
    const data: any = { notes }

    if (selectedStatus.includes("interview") || selectedStatus === "phone-screen") {
      data.interviewDate = interviewDate
      data.interviewTime = interviewTime
    }

    if (selectedStatus === "rejected") {
      data.rejectionReason = rejectionReason
    }

    onStatusChange(selectedStatus, data)
    setIsOpen(false)
    setNotes("")
    setInterviewDate(undefined)
    setInterviewTime("")
    setRejectionReason("")
  }

  const currentStatusOption = statusOptions.find((option) => option.value === currentStatus)
  const selectedStatusOption = statusOptions.find((option) => option.value === selectedStatus)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Clock className="mr-2 h-4 w-4" />
          Change Status
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Application Status</DialogTitle>
          <DialogDescription>Change the status of this application and add relevant details.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Current Status */}
          <div>
            <Label>Current Status</Label>
            <div className="mt-1">
              <Badge variant={currentStatusOption?.color as any}>{currentStatusOption?.label}</Badge>
            </div>
          </div>

          {/* New Status */}
          <div className="space-y-2">
            <Label htmlFor="status">New Status</Label>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Interview Scheduling */}
          {(selectedStatus.includes("interview") || selectedStatus === "phone-screen") && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Interview Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {interviewDate ? format(interviewDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={interviewDate} onSelect={setInterviewDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Interview Time</Label>
                <Input id="time" type="time" value={interviewTime} onChange={(e) => setInterviewTime(e.target.value)} />
              </div>
            </div>
          )}

          {/* Rejection Reason */}
          {selectedStatus === "rejected" && (
            <div className="space-y-2">
              <Label htmlFor="rejection">Rejection Reason</Label>
              <Select value={rejectionReason} onValueChange={setRejectionReason}>
                <SelectTrigger>
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="qualifications">Insufficient qualifications</SelectItem>
                  <SelectItem value="experience">Lack of required experience</SelectItem>
                  <SelectItem value="cultural-fit">Not a cultural fit</SelectItem>
                  <SelectItem value="position-filled">Position filled by another candidate</SelectItem>
                  <SelectItem value="budget">Budget constraints</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any additional notes about this status change..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleStatusChange}>
            {selectedStatus === "rejected" ? (
              <>
                <XCircle className="mr-2 h-4 w-4" />
                Reject Application
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Update Status
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
