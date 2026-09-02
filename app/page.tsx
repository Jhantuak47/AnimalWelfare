import Link from "next/link";
import { MapPinned, Siren, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const steps = [
  {
    icon: Siren,
    title: "Report a stray",
    description: "Spot an animal in need? Drop a pin, add a photo, and describe the situation in under a minute.",
  },
  {
    icon: MapPinned,
    title: "Volunteers see it live",
    description: "Reports appear instantly on the community map so nearby volunteers know exactly where to go.",
  },
  {
    icon: Users,
    title: "Rescue gets coordinated",
    description: "A volunteer claims the case, tracks it through to rescue, and closes the loop for everyone watching.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="flex flex-col items-center gap-6 px-6 py-20 text-center sm:py-28">
        <span className="rounded-4xl bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
          Community-powered animal rescue
        </span>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          See a stray in trouble? <span className="text-primary">Get it help, fast.</span>
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Report strays with a photo and location, and let nearby volunteers claim and resolve
          cases on a live community map.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button size="lg" className="h-11 px-6">
            <Link href="/report">Report a Stray</Link>
          </Button>
          <Button size="lg" variant="outline" className="h-11 px-6">
            <Link href="/strays">View the Map</Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 px-6 pb-24 sm:grid-cols-3">
        {steps.map(({ icon: Icon, title, description }) => (
          <Card key={title}>
            <CardHeader>
              <div className="mb-2 flex size-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <Icon className="size-4.5" />
              </div>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>
    </div>
  );
}
