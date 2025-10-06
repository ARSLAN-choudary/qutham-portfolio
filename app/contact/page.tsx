"use client";
import { Suspense } from "react";
import ContactForm from "../components/ContactForm/ContactForm";

function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactForm />
    </Suspense>
  );
}

export default page;
