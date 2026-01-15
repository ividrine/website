import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/dist/client/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function About() {
  return (
    <div className="flex items-center justify-center font-sans">
      <main className="w-full max-w-3xl justify-between py-12 px-12">
        <div>
          <h1 className="text-center">About</h1>
          <p className="indent-6">
            I am a dad, software engineer, tinkerer and lifelong learner. I love
            solving hard problems, being creative and building cool new things.
            I am driven by deep curiosity and passion for computer science and
            information technology. I&apos;m a fan of skateboarding, video games
            and good music.
          </p>
        </div>

        <div className="mb-12 mt-8">
          <h2 className="text-center">Work</h2>
          <div className="flex flex-col gap-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Magnetic</CardTitle>
                <CardAction>
                  <Link href="https://magneticmobile.com" target="_blank">
                    View Site
                  </Link>
                </CardAction>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Android Developer (Jan 2025 - Present) <br />
                </CardDescription>
                <span>
                  <Link
                    href="https://play.google.com/store/apps/details?id=com.sei.android&hl=en_US"
                    target="_blank"
                  >
                    7-Eleven Android App
                  </Link>{" "}
                  / Subscriptions and User Retention
                </span>
              </CardContent>

              <CardFooter>
                <div className="flex flex-wrap gap-2">
                  <Badge>Kotlin</Badge>
                  <Badge>Jetpack Compose</Badge>
                  <Badge>JUnit</Badge>
                </div>
              </CardFooter>

              <CardContent>
                <CardDescription>
                  Full-stack Web Developer (Dec 2020 - Jan 2025)
                </CardDescription>
                <span>
                  <Link href="https://www.speedway.com/" target="_blank">
                    Speedway.com
                  </Link>{" "}
                  / Loyalty and Rewards
                </span>
              </CardContent>

              <CardFooter>
                <div className="flex flex-wrap gap-2">
                  <Badge>.Net</Badge>
                  <Badge>Node</Badge>
                  <Badge>NextJS</Badge>
                  <Badge>React</Badge>
                  <Badge>SQL</Badge>
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pirate MX Powersports</CardTitle>
                <CardDescription>
                  Full-Stack Software Developer (April 2018 - Aug 2020)
                </CardDescription>
                <CardAction>
                  <Link href="https://www.piratemx.com/" target="_blank">
                    View Site
                  </Link>
                </CardAction>
              </CardHeader>
              <CardContent>
                <span>
                  <Link href="https://www.piratemx.com/" target="_blank">
                    Piratemx.com
                  </Link>{" "}
                  / E-commerce, Multi-Channel Sales and Inventory.
                </span>
              </CardContent>
              <CardFooter>
                <div className="flex flex-wrap gap-2">
                  <Badge>Node</Badge>
                  <Badge>Angular</Badge>
                  <Badge>RabbitMQ</Badge>
                  <Badge>Elasticsearch</Badge>
                  <Badge>MongoDB</Badge>
                  <Badge>SQL</Badge>
                  <Badge>Heroku</Badge>
                  <Badge>Shopify</Badge>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div>
          <h2 className="text-center">Education</h2>
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>West Virginia University at Parkersburg</CardTitle>
                <CardDescription>
                  Bachelor of Applied Technology, Software Engineering (2015 -
                  2019)
                </CardDescription>
                <CardAction>
                  <Link href="https://www.wvup.edu/" target="_blank">
                    View Site
                  </Link>
                </CardAction>
              </CardHeader>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
