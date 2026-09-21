"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IMAGES } from "@/constants/images";
import { Lightbox } from "@/components/ui/lightbox";

export default function AboutUs() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white text-slate-800 font-sans leading-relaxed">
      {/* Header Section */}
      <section
        className="max-w-5xl mx-auto px-6 py-16 text-center"
        aria-labelledby="about-heading"
      >
        <h2
          id="about-heading"
          className="text-headline-lg text-primary mb-6"
        >
          About Trisha Enterprises
        </h2>
        <p className="text-body-lg text-on-surface-variant max-w-3xl mx-auto">
          We are a premier solar installation agency dedicated to powering
          homes and businesses with clean, renewable energy. At Trisha
          Enterprises, we focus on delivering reliable, high-quality solar
          solutions tailored to your energy needs.
        </p>
      </section>

      {/* Services Section */}
      <section
        className="bg-surface-container-low py-16"
        aria-labelledby="services-overview-heading"
      >
        <div className="max-w-5xl mx-auto px-6">
          <h3
            id="services-overview-heading"
            className="text-headline-md text-primary text-center mb-10"
          >
            Our Services
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                title: "Residential Solar",
                desc: "Empowering homeowners with sustainable energy. We handle the complete process of bringing solar power to your rooftop, reducing your carbon footprint and electricity bills.",
              },
              {
                title: "Commercial Solar",
                desc: "Scalable solar solutions for businesses of all sizes. We design robust systems that provide long-term energy savings and energy independence for your commercial property.",
              },
              {
                title: "Professional Installation",
                desc: "Our expert technicians ensure that every panel is installed safely, efficiently, and in compliance with the highest industry standards for maximum performance.",
              },
              {
                title: "Ongoing Maintenance",
                desc: "We provide comprehensive maintenance and support to ensure your solar infrastructure operates at peak efficiency year-round.",
              },
            ].map((service) => (
              <div
                key={service.title}
                className="glass-card p-8 rounded-card border border-outline-variant/30"
              >
                <h4 className="text-headline-sm text-primary mb-3">
                  {service.title}
                </h4>
                <p className="text-body-md text-on-surface-variant">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section
        className="max-w-5xl mx-auto px-6 py-16"
        aria-labelledby="plans-heading"
      >
        <h3
          id="plans-heading"
          className="text-headline-md text-primary text-center mb-10"
        >
          Available System Plans
        </h3>
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {["2 kW", "3 kW", "4 kW", "5 kW", "6 kW"].map((plan) => (
            <div
              key={plan}
              className="px-5 py-2.5 bg-secondary-container/20 text-secondary border border-secondary/20 font-semibold rounded-full text-sm"
            >
              {plan} System
            </div>
          ))}
        </div>
        <div className="text-center bg-primary text-white max-w-2xl mx-auto p-8 rounded-card">
          <h4 className="text-headline-sm mb-3">Custom Plans</h4>
          <p className="text-primary-fixed-dim text-body-md">
            Need a specific capacity outside our standard ranges? We design and
            build custom solar infrastructures tailored exactly to your
            site&apos;s energy requirements.
          </p>
        </div>
      </section>

      {/* Certification Section */}
      <section
        className="max-w-5xl mx-auto px-6 pb-20"
        aria-labelledby="cert-heading"
      >
        <div className="border-2 border-outline-variant/30 rounded-card p-8 flex flex-col md:flex-row items-center gap-8 bg-white shadow-sm">
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            <div
              className="w-12 h-12 bg-surface-container rounded-full flex items-center justify-center mb-4 border border-outline-variant/30"
              aria-hidden="true"
            >
              <svg
                className="w-6 h-6 text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
            <h3 id="cert-heading" className="text-headline-md text-primary mb-3">
              Certification of Authorization
            </h3>
            <p className="text-body-md text-on-surface-variant">
              Trisha Enterprises is a fully licensed and authorized solar
              installation provider. We adhere to stringent safety, quality,
              and environmental standards to guarantee the reliability of every
              project we undertake.
            </p>
          </div>

          {/* Certificate Preview */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="View authorization certificate — click to expand"
            className="group relative h-64 w-full md:w-80 border border-outline-variant/30 rounded-card overflow-hidden bg-surface-container-low cursor-pointer shadow-inner flex-shrink-0 transition-all duration-200 hover:border-secondary/40 hover:shadow-md"
          >
            <Image
              src={IMAGES.certificate}
              alt="Trisha Enterprises Authorization Certificate"
              fill
              className="object-contain p-2 transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 320px"
              priority
            />
            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
              <span className="bg-white/90 text-slate-900 text-xs font-medium px-3 py-1.5 rounded shadow backdrop-blur-sm">
                Click to expand
              </span>
            </div>
          </button>
        </div>
      </section>

      {/* Shared accessible lightbox */}
      <Lightbox
        open={isOpen}
        onClose={() => setIsOpen(false)}
        label="Trisha Enterprises Authorization Certificate full view"
      >
        <div className="relative w-full h-full">
          <Image
            src={IMAGES.certificate}
            alt="Trisha Enterprises Authorization Certificate — high resolution view"
            fill
            className="object-contain"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>
      </Lightbox>
    </div>
  );
}