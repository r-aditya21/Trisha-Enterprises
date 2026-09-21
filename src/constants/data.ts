import { IMAGES } from "./images";
import type { Project, Service, Testimonial } from "@/types";

export const SERVICES: Service[] = [
  {
    id: "residential",
    title: "Residential Solar",
    description:
      "Transform your home into a clean energy powerhouse and eliminate rising utility costs forever.",
    icon: "home",
  },
  {
    id: "commercial",
    title: "Commercial Systems",
    description:
      "Scalable energy solutions for businesses to reduce overheads and meet corporate sustainability goals.",
    icon: "building",
  },
  {
    id: "maintenance",
    title: "Maintenance & Repair",
    description:
      "Comprehensive monitoring and cleaning services to ensure your system always operates at peak efficiency.",
    icon: "wrench",
  },
];

export const PROJECTS: Project[] = [
  {
    id: "miller",
    title: "The Miller Residence",
    location: "jalna, Maharastra",
    image: IMAGES.project1,
    stats: [
      { label: "System Size", value: "12.5 kW" },
      { label: "Annual Saving", value: "20,000" },
    ],
  },
  {
    id: "nexus",
    title: "Nexus Commercial Plaza",
    location: "Austin Logistics Hub",
    image: IMAGES.project2,
    stats: [
      { label: "System Size", value: "250 kW" },
      { label: "ROI Period", value: "3.5 Years" },
    ],
  },
  {
    id: "seaside",
    title: "Seaside Sustainable Villa",
    location: "Malibu, CA",
    image: IMAGES.project3,
    stats: [
      { label: "System Size", value: "18 kW" },
      { label: "Grid Independence", value: "95%" },
    ],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "anderson",
    name: "The Andersons",
    location: "California, US",
    quote:
      "Our bill dropped from $350 to just $22 in the first month. The installation team was professional and tidy. Highly recommended!",
    avatar: IMAGES.testimonial,
  },
  {
    id: "wright",
    name: "Marcus Wright",
    location: "Tech Plaza, Commercial",
    quote:
      "Scaling our energy needs with SolarPulse was the best decision for our warehouse. The government subsidy process was handled entirely by them.",
    initials: "MW",
  },
  {
    id: "lewis",
    name: "Sarah Lewis",
    location: "Austin, Texas",
    quote:
      "The battery storage system works flawlessly during grid outages. We feel much more secure and the app tracking is incredibly detailed.",
    initials: "SL",
  },
];

export const STATS = [
  { value: 100, suffix: "+", label: "Total Installations" },
  { value: 25, suffix: "", label: "Year Warranty" },
  { value: 500, suffix: "+", label: "Happy Customers" },
  { value: 80, suffix: "%", label: "Max Bill Reduction" },
];

export const LOGO_PARTNERS = [
  "Tesla Energy",
  "SunPower",
  "Enphase",
  "SolarEdge",
  "LG Energy",
  "Panasonic",
  "Generac",
  "Sonnen",
];

export const LOCATIONS = [
  { value: "ca", label: "California" },
  { value: "tx", label: "Texas" },
  { value: "fl", label: "Florida" },
  { value: "az", label: "Arizona" },
  { value: "other", label: "Other" },
];

export const FAQ_ITEMS = [
  {
    question: "How long does installation take?",
    answer:
      "Most residential installations are completed within 1–3 days after permits are approved, typically 4–8 weeks from contract signing.",
  },
  {
    question: "What financing options are available?",
    answer:
      "We offer $0-down loans, leases, and power purchase agreements. Federal tax credits can cover up to 30% of system cost.",
  },
  {
    question: "Do you handle permits and inspections?",
    answer:
      "Yes. Our team manages all permitting, utility interconnection, and final inspections end-to-end.",
  },
  {
    question: "What warranty do you provide?",
    answer:
      "25-year performance warranty on panels plus 10-year workmanship guarantee on installation.",
  },
];
