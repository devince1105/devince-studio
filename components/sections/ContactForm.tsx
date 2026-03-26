// components/sections/ContactForm.tsx

"use client";

import { useState, useEffect } from "react";

interface ContactFormProps {
    data: {
        nameLabel: string;
        namePlaceholder: string;
        emailLabel: string;
        emailPlaceholder: string;
        companyLabel: string;
        companyPlaceholder: string;
        serviceLabel: string;
        serviceOptions: string[];
        budgetLabel: string;
        budgetOptions: string[];
        messageLabel: string;
        messagePlaceholder: string;
        buttonLabel: string;
    };
}

export default function ContactForm({ data }: ContactFormProps) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        company: "",
        service: data.serviceOptions[0] || "",
        budget: data.budgetOptions[0] || "",
        message: "",
        website: "", // honeypot
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    // Auto-dismiss success message
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccess(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    const handleChange = (
        field: keyof typeof form,
        value: string
    ) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        setSuccess(false);
        setError("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.error || "Send failed");
            }

            setSuccess(true);

            // reset
            setForm({
                name: "",
                email: "",
                company: "",
                service: data.serviceOptions[0] || "",
                budget: data.budgetOptions[0] || "",
                message: "",
                website: "",
            });
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-10">
            {/* honeypot */}
            <input
                type="text"
                name="website"
                value={form.website}
                onChange={(e) => handleChange("website", e.target.value)}
                className="hidden"
            />

            {/* Row 1 */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                    <label className="text-xs uppercase tracking-widest text-neutral-400">
                        {data.nameLabel}
                    </label>
                    <input
                        type="text"
                        value={form.name}
                        onChange={(e) =>
                            handleChange("name", e.target.value)
                        }
                        placeholder={data.namePlaceholder}
                        required
                        className="w-full border-b border-neutral-300 py-3 bg-transparent focus:border-black focus:outline-none transition"
                    />
                </div>

                <div className="space-y-3">
                    <label className="text-xs uppercase tracking-widest text-neutral-400">
                        {data.emailLabel}
                    </label>
                    <input
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                            handleChange("email", e.target.value)
                        }
                        placeholder={data.emailPlaceholder}
                        required
                        className="w-full border-b border-neutral-300 py-3 bg-transparent focus:border-black focus:outline-none transition"
                    />
                </div>
            </div>

            {/* Company */}
            <div className="space-y-3">
                <label className="text-xs uppercase tracking-widest text-neutral-400">
                    {data.companyLabel}
                </label>
                <input
                    type="text"
                    value={form.company}
                    onChange={(e) =>
                        handleChange("company", e.target.value)
                    }
                    placeholder={data.companyPlaceholder}
                    className="w-full border-b border-neutral-300 py-3 bg-transparent focus:border-black focus:outline-none transition"
                />
            </div>

            {/* Row 2 */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                    <label className="text-xs uppercase tracking-widest text-neutral-400">
                        {data.serviceLabel}
                    </label>
                    <select
                        value={form.service}
                        onChange={(e) =>
                            handleChange("service", e.target.value)
                        }
                        className="w-full border-b border-neutral-300 py-3 bg-transparent focus:border-black focus:outline-none transition"
                    >
                        {data.serviceOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-3">
                    <label className="text-xs uppercase tracking-widest text-neutral-400">
                        {data.budgetLabel}
                    </label>
                    <select
                        value={form.budget}
                        onChange={(e) =>
                            handleChange("budget", e.target.value)
                        }
                        className="w-full border-b border-neutral-300 py-3 bg-transparent focus:border-black focus:outline-none transition"
                    >
                        {data.budgetOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Message */}
            <div className="space-y-3">
                <label className="text-xs uppercase tracking-widest text-neutral-400">
                    {data.messageLabel}
                </label>
                <textarea
                    maxLength={500}
                    value={form.message}
                    onChange={(e) =>
                        handleChange("message", e.target.value)
                    }
                    placeholder={data.messagePlaceholder}
                    required
                    className="w-full border border-neutral-300 py-4 px-4 bg-transparent min-h-[160px] focus:border-black focus:outline-none transition"
                />
                <p className="text-xs text-neutral-400">
                    {form.message.length}/500
                </p>
            </div>

            {/* Feedback Notifications */}
            {success && (
                <div className="flex items-start gap-4 p-4 text-green-800 bg-green-50 border border-green-200 rounded-sm">
                    <div className="mt-0.5 shrink-0">
                        <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider mb-0.5">Message sent successfully</h4>
                        <p className="text-sm opacity-90">Thank you for reaching out. We will contact you soon.</p>
                    </div>
                </div>
            )}

            {error && (
                <div className="flex items-start gap-4 p-4 text-red-800 bg-red-50 border border-red-200 rounded-sm">
                    <div className="mt-0.5 shrink-0">
                        <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider mb-0.5">Something went wrong</h4>
                        <p className="text-sm opacity-90">{error}</p>
                    </div>
                </div>
            )}

            {/* Button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-black text-white uppercase tracking-[0.2em] text-sm transition hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? "Sending..." : data.buttonLabel}
            </button>
        </form>
    );
}