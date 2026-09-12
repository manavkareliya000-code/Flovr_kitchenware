import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MessageCircle,
  Clock,
  MapPin,
  ArrowRight,
  Send,
  CheckCircle,
} from "lucide-react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("FLOVR Contact Form:", formData);

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="bg-[#F7F1E8] text-[#4A3428]">
      {/* ================= HERO ================= */}
      <section className="overflow-hidden border-b border-[#D9CBBE] bg-[#F7F1E8]">
  <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:px-20 lg:py-10">
    
    {/* LEFT CONTENT */}
    <div className="max-w-2xl">
      <div className="mb-5 flex items-center gap-3">
        <span className="h-px w-10 bg-[#A86643]" />

        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A86643]">
          Get in Touch
        </p>
      </div>

      <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight text-[#4A3428] sm:text-5xl lg:text-6xl xl:text-7xl">
        Let's talk about
        <span className="mt-2 block font-serif italic font-normal text-[#A86643]">
          your everyday.
        </span>
      </h1>

      <p className="mt-6 max-w-xl text-sm leading-7 text-[#75675D] sm:text-base">
        Have a question about a product, your order, delivery or
        anything else? Our team is always happy to help you find
        the right solution for your home.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="#contact-form"
          className="inline-flex items-center rounded-xl bg-[#4A3428] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#A86643]"
        >
          Send a Message
        </a>

        <a
          href="https://wa.me/919XXXXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-xl border border-[#D9CBBE] bg-[#FFFDFC] px-6 py-3.5 text-sm font-semibold text-[#4A3428] transition hover:border-[#4A3428] hover:bg-[#4A3428] hover:text-white"
        >
          Chat on WhatsApp
        </a>
      </div>
    </div>

    {/* RIGHT VISUAL */}
    <div className="relative">
      <div className="relative overflow-hidden hidden md:block rounded-[2rem] bg-[#EDE3D7]">
        <img
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85"
          alt="FLOVR customer support"
          className="h-[380px] w-full object-cover lg:h-[420px]"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#4A3428]/50 via-transparent to-transparent" />

        {/* Floating card */}
        <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/30 bg-white/60 p-5 shadow-xl backdrop-blur-md sm:bottom-7 sm:left-7 sm:right-auto sm:max-w-sm">
          <p className="text-[10px] font-semibold uppercase text-[#A86643]">
            FLOVR Support
          </p>

          <h3 className="mt-2  font-semibold text-[#4A3428]">
            Here when you need us.
          </h3>

          <p className="mt-2 text-[10px] leading-2 text-[#75675D]">
            Product questions, order support and everything in between.
          </p>
        </div>
      </div>

      {/* Decorative element */}
      {/* <div className="absolute -right-4 -top-4 hidden h-20 w-20 rounded-full border border-[#D6AE8C] lg:block" /> */}
    </div>

  </div>
</section>

      {/* ================= CONTACT CONTENT ================= */}
      <section className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16 md:py-20 lg:px-10 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          {/* ================= CONTACT INFO ================= */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A86643]">
              Contact Information
            </p>

            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
              Let's start a conversation.
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#75675D]">
              Our support team is here to help with product questions,
              orders, shipping and general enquiries.
            </p>

            <div className="mt-8 space-y-3">
              {/* Email */}
              <a
                href="mailto:hello@flovr.in"
                className="group flex items-start gap-4 rounded-2xl border border-[#D9CBBE] bg-[#FFFDFC] p-4 transition hover:-translate-y-0.5 hover:shadow-md sm:p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F7F1E8] text-[#4A3428] transition group-hover:bg-[#4A3428] group-hover:text-white">
                  <Mail size={19} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-[#75675D]">
                    Email
                  </p>

                  <p className="mt-1 break-all text-sm font-semibold text-[#4A3428]">
                    hello@flovr.in
                  </p>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/919XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 rounded-2xl border border-[#D9CBBE] bg-[#FFFDFC] p-4 transition hover:-translate-y-0.5 hover:shadow-md sm:p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F7F1E8] text-[#4A3428] transition group-hover:bg-[#4A3428] group-hover:text-white">
                  <MessageCircle size={19} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-[#75675D]">
                    WhatsApp
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#4A3428]">
                    Chat with us
                  </p>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+919XXXXXXXXX"
                className="group flex items-start gap-4 rounded-2xl border border-[#D9CBBE] bg-[#FFFDFC] p-4 transition hover:-translate-y-0.5 hover:shadow-md sm:p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F7F1E8] text-[#4A3428] transition group-hover:bg-[#4A3428] group-hover:text-white">
                  <Phone size={19} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-[#75675D]">
                    Phone
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#4A3428]">
                    Call our support team
                  </p>
                </div>
              </a>

              {/* Hours */}
              <div className="flex items-start gap-4 rounded-2xl border border-[#D9CBBE] bg-[#FFFDFC] p-4 sm:p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F7F1E8] text-[#4A3428]">
                  <Clock size={19} />
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-[#75675D]">
                    Support Hours
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#4A3428]">
                    Monday – Saturday
                  </p>

                  <p className="mt-1 text-xs text-[#75675D]">
                    10:00 AM – 6:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="mt-6 rounded-2xl bg-[#4A3428] p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#D6AE8C]">
                  <MessageCircle size={20} />
                </div>

                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-white">
                    Need a quick answer?
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-white/70">
                    Chat with us directly on WhatsApp for faster assistance.
                  </p>

                  <a
                    href="https://wa.me/919XXXXXXXXX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#FFFDFC] px-4 py-2.5 text-xs font-semibold text-[#4A3428] transition hover:bg-[#D6AE8C]"
                  >
                    Chat on WhatsApp
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ================= CONTACT FORM ================= */}
          <div className="rounded-3xl border border-[#D9CBBE] bg-[#FFFDFC] p-5 shadow-sm sm:p-7 md:p-8">
            {submitted ? (
              <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#4A3428] text-white">
                  <CheckCircle size={30} />
                </div>

                <h2 className="mt-6 text-2xl font-semibold text-[#4A3428]">
                  Message Sent
                </h2>

                <p className="mt-3 max-w-sm text-sm leading-6 text-[#75675D]">
                  Thank you for contacting FLOVR. We've received your
                  message and will get back to you soon.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 rounded-xl bg-[#4A3428] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#A86643]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <div className="mb-7">
                  <h2 className="text-2xl font-semibold text-[#4A3428]">
                    Send us a message
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#75675D]">
                    Fill out the form below and our team will get back to
                    you.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name + Email */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-[#4A3428]"
                      >
                        Full Name
                      </label>

                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="w-full rounded-xl border border-[#D9CBBE] bg-white px-4 py-3 text-sm text-[#4A3428] outline-none transition placeholder:text-[#A99B91] focus:border-[#A86643] focus:ring-2 focus:ring-[#A86643]/10"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-[#4A3428]"
                      >
                        Email Address
                      </label>

                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                        className="w-full rounded-xl border border-[#D9CBBE] bg-white px-4 py-3 text-sm text-[#4A3428] outline-none transition placeholder:text-[#A99B91] focus:border-[#A86643] focus:ring-2 focus:ring-[#A86643]/10"
                      />
                    </div>
                  </div>

                  {/* Phone + Subject */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-medium text-[#4A3428]"
                      >
                        Phone Number
                      </label>

                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full rounded-xl border border-[#D9CBBE] bg-white px-4 py-3 text-sm text-[#4A3428] outline-none transition placeholder:text-[#A99B91] focus:border-[#A86643] focus:ring-2 focus:ring-[#A86643]/10"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="mb-2 block text-sm font-medium text-[#4A3428]"
                      >
                        Subject
                      </label>

                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-[#D9CBBE] bg-white px-4 py-3 text-sm text-[#4A3428] outline-none transition focus:border-[#A86643] focus:ring-2 focus:ring-[#A86643]/10"
                      >
                        <option value="">Select a subject</option>
                        <option value="Product Enquiry">
                          Product Enquiry
                        </option>
                        <option value="Order Help">Order Help</option>
                        <option value="Shipping">Shipping</option>
                        <option value="Return">Return / Exchange</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium text-[#4A3428]"
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      rows={6}
                      required
                      className="w-full resize-none rounded-xl border border-[#D9CBBE] bg-white px-4 py-3 text-sm leading-6 text-[#4A3428] outline-none transition placeholder:text-[#A99B91] focus:border-[#A86643] focus:ring-2 focus:ring-[#A86643]/10"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#4A3428] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#A86643]"
                  >
                    Send Message
                    <Send size={17} />
                  </button>

                  <p className="text-center text-[11px] leading-5 text-[#75675D]">
                    We usually respond during our support hours.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ================= FAQ CTA ================= */}
      <section className="border-t border-[#D9CBBE] bg-[#FFFDFC]">
        <div className="mx-auto max-w-[900px] px-5 py-14 text-center sm:px-8 sm:py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A86643]">
            Need Help?
          </p>

          <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
            Looking for a quick answer?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#75675D]">
            Check our frequently asked questions for quick answers about
            orders, shipping, returns and more.
          </p>

          <Link
            to="/faq"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#4A3428] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#A86643]"
          >
            Visit FAQs
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Contact;