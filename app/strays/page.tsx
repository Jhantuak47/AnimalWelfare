import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type StrayStatus = "reported" | "claimed" | "rescued";

type StrayReport = {
  id: string;
  animalType: string;
  description: string;
  status: StrayStatus;
  location: string;
  reportedAt: string;
  position: { top: string; left: string };
};

const statusStyles: Record<StrayStatus, { label: string; className: string }> = {
  reported: { label: "Reported", className: "bg-destructive/10 text-destructive" },
  claimed: { label: "Claimed", className: "bg-accent text-accent-foreground" },
  rescued: { label: "Rescued", className: "bg-secondary text-secondary-foreground" },
};

const mockReports: StrayReport[] = [
  {
    id: "1",
    animalType: "Dog",
    description: "Limping, appears injured near the corner store.",
    status: "reported",
    location: "5th & Main St",
    reportedAt: "12 min ago",
    position: { top: "28%", left: "38%" },
  },
  {
    id: "2",
    animalType: "Cat",
    description: "Hiding under a parked car, looks scared but unharmed.",
    status: "claimed",
    location: "Oakwood Park",
    reportedAt: "45 min ago",
    position: { top: "55%", left: "62%" },
  },
  {
    id: "3",
    animalType: "Dog",
    description: "Friendly stray, no collar, wandering near the school.",
    status: "rescued",
    location: "Elm Street Elementary",
    reportedAt: "3 hr ago",
    position: { top: "70%", left: "22%" },
  },
];

export default function StraysPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-10">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Active Reports</h1>
        <p className="text-sm text-muted-foreground">
          Live view of strays reported by the community. Claim one to start helping.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="relative h-80 overflow-hidden rounded-xl bg-muted ring-1 ring-foreground/10 lg:col-span-3 lg:h-auto">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklch,var(--foreground),transparent_95%)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--foreground),transparent_95%)_1px,transparent_1px)] bg-[size:32px_32px]" />
          {mockReports.map((report) => (
            <div
              key={report.id}
              className="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center"
              style={{ top: report.position.top, left: report.position.left }}
            >
              <div
                className={
                  "flex size-8 items-center justify-center rounded-full text-primary-foreground ring-4 ring-background " +
                  (report.status === "reported"
                    ? "bg-destructive"
                    : report.status === "claimed"
                    ? "bg-primary"
                    : "bg-muted-foreground")
                }
              >
                <MapPin className="size-4" />
              </div>
            </div>
          ))}
          <span className="absolute bottom-3 left-3 rounded-4xl bg-popover px-2.5 py-1 text-xs text-muted-foreground shadow-sm">
            Map placeholder — wire up Leaflet here
          </span>
        </div>

        <div className="flex flex-col gap-3 lg:col-span-2">
          {mockReports.map((report) => (
            <Card key={report.id}>
              <CardContent className="flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-medium">{report.animalType}</span>
                  <Badge className={statusStyles[report.status].className}>
                    {statusStyles[report.status].label}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{report.description}</p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="size-3.5" />
                  {report.location}
                  <span>·</span>
                  {report.reportedAt}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
