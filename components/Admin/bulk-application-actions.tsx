"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronDown, Mail, Download, Trash2, CheckCircle, XCircle } from "lucide-react"

interface BulkApplicationActionsProps {
  selectedApplications: string[]
  onBulkAction: (action: string, data?: any) => void
  onClearSelection: () => void
}

export function BulkApplicationActions({
  selectedApplications,
  onBulkAction,
  onClearSelection,
}: BulkApplicationActionsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentAction, setCurrentAction] = useState<string>("")
  const [actionData, setActionData] = useState<any>({})

  const handleAction = (action: string) => {
    setCurrentAction(action)
    if (action === "email" || action === "reject" || action === "status-change") {
      setIsDialogOpen(true)
    } else {
      onBulkAction(action)
    }
  }

  const handleDialogSubmit = () => {
    onBulkAction(currentAction, actionData)
    setIsDialogOpen(false)
    setActionData({})
    onClearSelection()
  }

  if (selectedApplications.length === 0) {
    return null
  }

  return (
    <>
      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium">{selectedApplications.length} applications selected</span>
          <Button variant="ghost" size="sm" onClick={onClearSelection}>
            Clear selection
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Bulk Actions
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleAction("status-change")}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Change Status
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAction("email")}>
              <Mail className="mr-2 h-4 w-4" />
              Send Email
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAction("download")}>
              <Download className="mr-2 h-4 w-4" />
              Download Resumes
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleAction("reject")} className="text-destructive">
              <XCircle className="mr-2 h-4 w-4" />
              Reject Applications
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAction("delete")} className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Applications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {currentAction === "email" && "Send Bulk Email"}
              {currentAction === "reject" && "Reject Applications"}
              {currentAction === "status-change" && "Change Status"}
            </DialogTitle>
            <DialogDescription>
              This action will affect {selectedApplications.length} selected applications.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {currentAction === "email" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="subject">Email Subject</Label>
                  <input
                    id="subject"
                    className="w-full px-3 py-2 border border-border rounded-md"
                    placeholder="Enter email subject"
                    value={actionData.subject || ""}
                    onChange={(e) => setActionData((prev: any) => ({ ...prev, subject: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Enter your message..."
                    rows={4}
                    value={actionData.message || ""}
                    onChange={(e) => setActionData((prev: any) => ({ ...prev, message: e.target.value }))}
                  />
                </div>
              </>
            )}

            {currentAction === "reject" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="reason">Rejection Reason</Label>
                  <Select
                    value={actionData.reason || ""}
                    onValueChange={(value) => setActionData((prev: any) => ({ ...prev, reason: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="qualifications">Insufficient qualifications</SelectItem>
                      <SelectItem value="experience">Lack of required experience</SelectItem>
                      <SelectItem value="position-filled">Position filled</SelectItem>
                      <SelectItem value="budget">Budget constraints</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any additional notes..."
                    rows={3}
                    value={actionData.notes || ""}
                    onChange={(e) => setActionData((prev: any) => ({ ...prev, notes: e.target.value }))}
                  />
                </div>
              </>
            )}

            {currentAction === "status-change" && (
              <div className="space-y-2">
                <Label htmlFor="status">New Status</Label>
                <Select
                  value={actionData.status || ""}
                  onValueChange={(value) => setActionData((prev: any) => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select new status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reviewing">Under Review</SelectItem>
                    <SelectItem value="phone-screen">Phone Screening</SelectItem>
                    <SelectItem value="technical">Technical Interview</SelectItem>
                    <SelectItem value="final">Final Interview</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleDialogSubmit}>
              {currentAction === "email" && (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email
                </>
              )}
              {currentAction === "reject" && (
                <>
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject Applications
                </>
              )}
              {currentAction === "status-change" && (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Update Status
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
