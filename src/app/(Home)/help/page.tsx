// pages/help.tsx
"use client";
import React, { useState } from "react";
import { ChevronDown, User, Calendar, FileText } from "lucide-react";
import Link from 'next/link';
const sections = [
  {
    title: "Getting Started",
    icon: <User className="w-5 h-5 text-blue-600" />, 
    content: [
      "Sign up or log in to your account to access the CRM features.",
      "Set up your profile .",
      "Create your first leads, contacts, and companies to start managing your workflow.",
    ],
  },
  {
    title: "Managing Leads",
    icon: <FileText className="w-5 h-5 text-green-600" />, 
    content: [
      "Create a new lead using the 'Add Lead' button.",
      "Edit a lead by clicking the pen icon on the lead row.",
      "Delete a lead using the trash icon if no longer relevant.",
      "Filter leads by status, assigned user, or source using the table filters.",
    ],
  },
  {
    title: "Reminders & Calendar",
    icon: <Calendar className="w-5 h-5 text-yellow-600" />, 
    content: [
      "Create reminders for specific leads to track follow-ups.",
      "Use the calendar view to see all upcoming events and reminders.",
      "Edit or delete reminders using the icons in the reminder list.",
    ],
  },
  {
    title: "User Roles & Permissions",
    icon: <User className="w-5 h-5 text-red-600" />, 
    content: [
      "Admins have full access to all features including user management.",
      "Sales team members can manage leads and reminders assigned to them.",
      "Assign correct roles to control access levels appropriately.",
    ],
  },
];

const faqs = [
  {
    question: "How can I reset my password?",
    answer: "Go to the login page and click 'Forgot Password' to reset via email.",
  },
  {
    question: "Can I export my leads?",
    answer: "Yes, you can export your leads to a CSV or Excel file from the Leads section for offline analysis.",
  },
  {
    question: "How do I contact support?",
    answer: "Click the 'Contact Support' button at the bottom of this page to send a message.",
  },
];

const Help = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-12">
      <div className="max-w-6xl mx-auto bg-white shadow-sm rounded-2xl p-6 sm:p-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#12284C] mb-4 text-center sm:text-left">
          Help Center
        </h1>
        <p className="text-gray-700 mb-10 text-center sm:text-left">
          Welcome to the Simple CRM Help Center! Find guides, tips, and answers to common questions.
          Still need help? Contact our support team below.
        </p>
        {/* Sections */}
        <div className="space-y-4 mb-10">
          {sections.map((section) => (
            <div key={section.title} className="border border-[#12284C] rounded-lg">
              <button
                className="w-full flex justify-between items-center p-4 text-left focus:outline-none hover:bg-[#f0f4f8] transition"
                onClick={() =>
                  setOpenSection(openSection === section.title ? null : section.title)
                }>
                <div className="flex items-center gap-3 font-semibold text-[#12284C]">
                  {section.icon}
                  {section.title}
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-[#12284C] transition-transform ${
                    openSection === section.title ? "rotate-180" : ""
                  }`}/>
              </button>
              {openSection === section.title && (
                <ul className="p-4 pl-12 list-disc list-inside text-gray-700 space-y-2">
                  {section.content.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* FAQ */}
        <h2 className="text-3xl sm:text-4xl font-bold text-[#12284C] mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4 mb-10">
          {faqs.map((faq) => (
            <div key={faq.question} className="border border-[#12284C] rounded-lg">
              <button
                className="w-full flex justify-between items-center p-4 text-left focus:outline-none hover:bg-[#f0f4f8] transition"
                onClick={() => setOpenFaq(openFaq === faq.question ? null : faq.question)}>
                <span className="font-medium text-[#12284C]">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#12284C] transition-transform ${
                    openFaq === faq.question ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaq === faq.question && (
                <p className="p-4 pl-6 text-gray-700">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
        {/* Contact Support */}
        <div className="text-center mt-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#12284C] mb-4">Still Need Help?</h2>
          <p className="text-gray-700 mb-6">
            If you cannot find the answer here, our support team is ready to assist you.
          </p>
          <Link href="/contactus1" className="inline-block bg-[#12284C] text-white font-semibold px-8 py-3 rounded-xl hover:bg-[#0f1f3a] transition">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Help;
