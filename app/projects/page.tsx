import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
};

export default function Projects() {
  return (
    <div className="flex items-center justify-center">
      <main className="w-full max-w-3xl justify-between py-12 px-12">
        <h1 className="text-center">Projects</h1>
        <p className="indent-6">
          Over the past few years I have explored IaC and various IT operations,
          SRE practices, dev/gitops workflows, boilerplate web services, and
          even game development. Here are some of the projects I have built and
          continue to maintain.
        </p>
        <div className="flex flex-col gap-4 mt-4 items-stretch mt-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>hetzner-k8s</CardTitle>
                <CardAction>
                  <Link
                    href="https://github.com/ividrine/hetzner-k8s"
                    target="_blank"
                  >
                    View Project
                  </Link>
                </CardAction>
              </CardHeader>
              <CardContent>
                <p>
                  Self-managed kubernetes built on top of{" "}
                  <Link href="https://www.hetzner.com/cloud" target="_blank">
                    Hetzner Cloud
                  </Link>{" "}
                  using{" "}
                  <Link href="https://www.talos.dev/" target="_blank">
                    Talos Linux
                  </Link>{" "}
                </p>
              </CardContent>
              <CardFooter>
                <div className="flex flex-wrap gap-2">
                  <Badge>Terraform</Badge>
                  <Badge>Hetzner Cloud</Badge>
                  <Badge>Tailscale</Badge>
                  <Badge>Talos</Badge>
                  <Badge>Kubernetes</Badge>
                </div>
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>express-starter-app</CardTitle>
                <CardAction>
                  <Link
                    href="https://github.com/ividrine/express-starter-app"
                    target="_blank"
                  >
                    View Project
                  </Link>
                </CardAction>
              </CardHeader>
              <CardContent>
                <p>
                  Production ready Node/Express5 starter application for
                  building RESTful APIs. Complete with all the boilerplate
                  features you would expect and full observability using{" "}
                  <Link href="https://opentelemetry.io/" target="_blank">
                    OpenTelemetry
                  </Link>
                  .
                </p>
              </CardContent>
              <CardFooter>
                <div className="flex flex-wrap gap-2">
                  <Badge>Node</Badge>
                  <Badge>Express 5</Badge>
                  <Badge>PostgreSQL</Badge>
                  <Badge>TypeScript</Badge>
                  <Badge>Docker</Badge>
                  <Badge>OpenTelemetry</Badge>
                </div>
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Tactics Revived</CardTitle>
                <CardAction>
                  <Link
                    href="https://github.com/ividrine/TacticsRevived"
                    target="_blank"
                  >
                    View Project
                  </Link>
                </CardAction>
              </CardHeader>
              <CardContent>
                <p>
                  Live service, turn based strategy game built using Unreal
                  Engine 5 C++/Blueprints. Inspired by{" "}
                  <em>Tactics Arena: Online</em>, a web based flash game from
                  the early 2000s.
                </p>
              </CardContent>
              <CardFooter>
                <div className="flex flex-wrap gap-2">
                  <Badge>Unreal Engine</Badge>
                  <Badge>C++</Badge>
                  <Badge>UMG</Badge>
                </div>
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Tactics Revived API</CardTitle>
                <CardAction>
                  <Link
                    href="https://github.com/ividrine/tactics-api"
                    target="_blank"
                  >
                    View Project
                  </Link>
                </CardAction>
              </CardHeader>
              <CardContent>
                <p>
                  Web API layer for Tactics Revived. Bootstrapped with
                  express-starter-app, this includes player authentication, chat
                  system, and 1v1 matchmaking.
                </p>
              </CardContent>
              <CardFooter>
                <div className="flex flex-wrap gap-2">
                  <Badge>express-starter-app</Badge>
                  <Badge>WebSocket</Badge>
                  <Badge>Redis</Badge>
                  <Badge>AWS</Badge>
                </div>
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>website</CardTitle>
                <CardAction>
                  <Link
                    href="https://github.com/ividrine/website"
                    target="_blank"
                  >
                    View Project
                  </Link>
                </CardAction>
              </CardHeader>
              <CardContent>
                <p>
                  This website. It has my work / education, information about my
                  projects, blog and music archives.
                </p>
              </CardContent>
              <CardFooter>
                <div className="flex flex-wrap gap-2">
                  <Badge>NextJS</Badge>
                  <Badge>React</Badge>
                  <Badge>TypeScript</Badge>
                  <Badge>Shadcn</Badge>
                  <Badge>Tailwind</Badge>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
