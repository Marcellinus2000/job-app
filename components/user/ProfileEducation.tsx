"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function ProfileEducation() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Education</h3>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Education
        </Button>
      </div>
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No education history added yet.</p>
          <Button className="mt-4">
            <Plus className="mr-2 h-4 w-4" /> Add Your Education
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
