"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import {
  Clock,
  LogIn,
  LogOut,
  Calendar,
  FileText,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

export default function PortalPage() {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<Date | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second
  useState(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  });

  const handleClockIn = () => {
    const now = new Date();
    setIsClockedIn(true);
    setClockInTime(now);
    toast.success("Clocked In Successfully!", {
      description: `Time: ${format(now, "hh:mm a")}`,
    });
  };

  const handleClockOut = () => {
    if (clockInTime) {
      const now = new Date();
      const duration = Math.floor(
        (now.getTime() - clockInTime.getTime()) / 1000 / 60 / 60
      );

      setIsClockedIn(false);
      toast.success("Clocked Out Successfully!", {
        description: `Total hours: ${duration.toFixed(1)} hours`,
      });
      setClockInTime(null);
    }
  };

  const getWorkedHours = () => {
    if (!clockInTime) return "0.0";
    const now = new Date();
    const hours = (now.getTime() - clockInTime.getTime()) / 1000 / 60 / 60;
    return hours.toFixed(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          Worker Portal
        </h1>
        <p className="text-muted-foreground mt-2">
          {format(currentTime, "EEEE, MMMM dd, yyyy")}
        </p>
      </div>

      {/* Status Card */}
      <Card className="glass border-white/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Current Status</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge
                  variant={isClockedIn ? "default" : "secondary"}
                  className={isClockedIn ? "gradient-primary text-white" : ""}
                >
                  {isClockedIn ? "Clocked In" : "Clocked Out"}
                </Badge>
                {isClockedIn && clockInTime && (
                  <span className="text-sm text-muted-foreground">
                    since {format(clockInTime, "hh:mm a")}
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold">
                {format(currentTime, "hh:mm")}
              </p>
              <p className="text-sm text-muted-foreground">
                {format(currentTime, "a")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clock In/Out Button */}
      <div className="flex justify-center">
        {!isClockedIn ? (
          <Button
            size="lg"
            onClick={handleClockIn}
            className="h-64 w-64 rounded-full gradient-primary text-white shadow-2xl hover:shadow-3xl transition-all animate-pulse-ring text-2xl font-bold"
          >
            <div className="flex flex-col items-center space-y-3">
              <LogIn className="w-16 h-16" />
              <span>Clock In</span>
            </div>
          </Button>
        ) : (
          <Button
            size="lg"
            onClick={handleClockOut}
            className="h-64 w-64 rounded-full bg-gradient-to-br from-red-500 to-orange-500 text-white shadow-2xl hover:shadow-3xl transition-all text-2xl font-bold"
          >
            <div className="flex flex-col items-center space-y-3">
              <LogOut className="w-16 h-16" />
              <span>Clock Out</span>
            </div>
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="glass border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hours Today</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{getWorkedHours()}h</div>
            <p className="text-xs text-muted-foreground">Target: 8 hours</p>
          </CardContent>
        </Card>

        <Card className="glass border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">38.5h</div>
            <p className="text-xs text-muted-foreground">5 days worked</p>
          </CardContent>
        </Card>

        <Card className="glass border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">156h</div>
            <p className="text-xs text-muted-foreground">19 days worked</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Attendance */}
      <Card className="glass border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Recent Attendance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                date: "Dec 6, 2025",
                clockIn: "08:15 AM",
                clockOut: "05:30 PM",
                hours: "9.25",
                status: "Present",
              },
              {
                date: "Dec 5, 2025",
                clockIn: "08:10 AM",
                clockOut: "05:15 PM",
                hours: "9.08",
                status: "Present",
              },
              {
                date: "Dec 4, 2025",
                clockIn: "08:20 AM",
                clockOut: "05:20 PM",
                hours: "9.00",
                status: "Present",
              },
              {
                date: "Dec 3, 2025",
                clockIn: "08:05 AM",
                clockOut: "05:10 PM",
                hours: "9.08",
                status: "Present",
              },
            ].map((record, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
              >
                <div>
                  <p className="font-medium">{record.date}</p>
                  <p className="text-sm text-muted-foreground">
                    {record.clockIn} - {record.clockOut}
                  </p>
                </div>
                <div className="text-right">
                  <Badge
                    variant="outline"
                    className="bg-green-500/10 text-green-600 border-green-500/20"
                  >
                    {record.status}
                  </Badge>
                  <p className="text-sm font-medium mt-1">{record.hours}h</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
