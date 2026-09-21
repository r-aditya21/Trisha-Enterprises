"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone required"),
  address: z.string().min(5, "Address is required"),
  propertyType: z.enum(["residential", "commercial"]),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { propertyType: "residential" },
  });

  const onSubmit = async (data: FormData) => {
    try {
      // 1. Submit to your Next.js API (Handles Email + Google Sheet silently)
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to log entry safely.");

      // 2. Format and open WhatsApp trigger right after backend success
      const YOUR_WHATSAPP_NUMBER = "917517226212"; // Include country code, no symbols
      const textMessage = `*New Inquiry Received*%0A%0A` +
                          `*Name:* ${encodeURIComponent(data.name)}%0A` +
                          `*Phone:* ${encodeURIComponent(data.phone)}%0A` +
                          `*Address:* ${encodeURIComponent(data.address)}%0A` +
                          `*Property Type:* ${encodeURIComponent(data.propertyType)}`;

      const whatsappUrl = `https://wa.me/${YOUR_WHATSAPP_NUMBER}?text=${textMessage}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");

      // 3. Show local success screen
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Something went wrong saving your inquiry. Please try again!");
    }
  };

  if (submitted) {
    return (
      <div className="space-y-2" role="status">
        <p className="text-body-lg text-secondary font-semibold">
          Thank you! 
        </p>
        <p className="text-sm text-on-surface-variant">
          Your details are saved. We opened WhatsApp so you can instantly text our team.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-label-md text-on-surface-variant normal-case">
            Full Name
          </label>
          <input
            id="name"
            {...register("name")}
            className={`w-full bg-surface-container-low border-b-2 border-outline-variant focus:border-secondary p-4 outline-none transition-colors duration-300 ${
              errors.name ? "border-error" : ""
            }`}
            placeholder="Your Name"
          />
          {errors.name && (
            <p className="text-sm text-error animate-[shake_0.3s_ease-in-out]" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="text-label-md text-on-surface-variant normal-case">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            {...register("phone")}
            className={`w-full bg-surface-container-low border-b-2 border-outline-variant focus:border-secondary p-4 outline-none transition-colors duration-300 ${
              errors.phone ? "border-error" : ""
            }`}
            placeholder="Your Number"
          />
          {errors.phone && (
            <p className="text-sm text-error animate-[shake_0.3s_ease-in-out]" role="alert">
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="address" className="text-label-md text-on-surface-variant normal-case">
          Property Address
        </label>
        <input
          id="address"
          {...register("address")}
          className={`w-full bg-surface-container-low border-b-2 border-outline-variant focus:border-secondary p-4 outline-none transition-colors duration-300 ${
            errors.address ? "border-error" : ""
          }`}
          placeholder="Where is the installation?"
        />
        {errors.address && (
          <p className="text-sm text-error animate-[shake_0.3s_ease-in-out]" role="alert">
            {errors.address.message}
          </p>
        )}
      </div>
      <fieldset className="space-y-2">
        <legend className="text-label-md text-on-surface-variant normal-case mb-2">
          Property Type
        </legend>
        <div className="flex gap-4">
          {(["residential", "commercial"] as const).map((type) => (
            <label key={type} className="flex-1 cursor-pointer">
              <input
                type="radio"
                value={type}
                {...register("propertyType")}
                className="sr-only peer"
              />
              <div className="p-4 border-2 border-outline-variant rounded-xl peer-checked:border-secondary peer-checked:bg-secondary/5 text-center transition-all duration-300 capitalize hover:border-secondary/50">
                {type}
              </div>
            </label>
          ))}
        </div>
      </fieldset>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-2xl py-5 cursor-pointer"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Processing Inquiry…
          </span>
        ) : (
          "Submit Details & Open WhatsApp"
        )}
      </Button>
    </form>
  );
}