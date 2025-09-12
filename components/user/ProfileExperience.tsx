"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function ProfileExperience() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Work Experience</h3>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Experience
        </Button>
      </div>
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No work experience added yet.</p>
          <Button className="mt-4">
            <Plus className="mr-2 h-4 w-4" /> Add Your First Experience
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
