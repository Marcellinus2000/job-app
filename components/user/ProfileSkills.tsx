"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function ProfileSkills() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Skills & Technologies</h3>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Skill
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Technical Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center">
              No technical skills added yet.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Soft Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center">
              No soft skills added yet.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
