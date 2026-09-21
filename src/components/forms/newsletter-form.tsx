"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";

const schema = z.object({
  email: z.string().email("Valid email required"),
});

export function NewsletterForm() {
  const [done, setDone] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  if (done) {
    return <p className="text-sm text-secondary-fixed-dim">Subscribed. Thank you!</p>;
  }

  return (
    <form
      onSubmit={handleSubmit(() => setDone(true))}
      className="flex gap-2 max-w-sm"
      aria-label="Newsletter signup"
    >
      <input
        type="email"
        placeholder="Email"
        {...register("email")}
        className="flex-1 rounded-full px-4 py-2 text-sm bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:ring-2 focus:ring-secondary"
      />
      <Button type="submit" size="sm" className="rounded-full">
        Join
      </Button>
      {errors.email && (
        <p className="sr-only" role="alert">
          {String(errors.email.message)}
        </p>
      )}
    </form>
  );
}
