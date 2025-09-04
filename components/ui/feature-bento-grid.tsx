import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import {
  IconHeartbeat,
  IconStethoscope,
  IconBrain,
  IconShieldCheck,
  IconClock24,
  IconUserHeart,
  IconDeviceMobile,
} from "@tabler/icons-react";

export function FeaturesBentoGrid() {
  return (
    <BentoGrid className="max-w-6xl mx-auto mt-16">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-blue-100/50 to-white dark:from-blue-900/20 dark:to-neutral-900" />
);

const items = [
  {
    title: "Instant AI Consultations",
    description: "Get accurate medical guidance within seconds through natural voice or chat conversations.",
    header: <Skeleton />,
    icon: <IconStethoscope className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
  },
  {
    title: "Doctor’s Intelligent Assistant",
    description: "Support healthcare providers with AI tools that save time and improve diagnostic accuracy.",
    header: <Skeleton />,
    icon: <IconBrain className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
  },
  {
    title: "Patient-Centered Care",
    description: "Deliver personalized health insights, tracking, and reminders to improve outcomes.",
    header: <Skeleton />,
    icon: <IconUserHeart className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
  },
  {
    title: "24/7 Availability",
    description: "Ensure round-the-clock healthcare access, eliminating wait times and scheduling barriers.",
    header: <Skeleton />,
    icon: <IconClock24 className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
  },
  {
    title: "Data Security First",
    description: "HIPAA-compliant encryption and privacy safeguards to protect sensitive patient data.",
    header: <Skeleton />,
    icon: <IconShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
  },
  {
    title: "Seamless Multi-Device Access",
    description: "Access care from web, mobile, or voice-enabled devices — anytime, anywhere.",
    header: <Skeleton />,
    icon: <IconDeviceMobile className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
  },
  {
    title: "Continuous Monitoring",
    description: "AI-powered health tracking ensures early detection of risks before they escalate.",
    header: <Skeleton />,
    icon: <IconHeartbeat className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
  },
];
