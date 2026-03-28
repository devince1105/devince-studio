// components/sections/ContactForm.tsx

"use client";

import { useState, useEffect } from "react";

interface ContactFormProps {
    data: {
        nameLabel: string;
        namePlaceholder: string;
        emailLabel: string;
        emailPlaceholder: string;
        contactLabel?: string;
        contactPlaceholder?: string;
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
        contact: "",
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
                contact: "",
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

    const inputClasses =
        "w-full border-b border-neutral-300 dark:border-zinc-800 py-3 bg-transparent text-gray-900 dark:text-zinc-100 placeholder:text-neutral-400 dark:placeholder:text-zinc-600 focus:border-black dark:focus:border-white focus:outline-none transition-all";
    const labelClasses = "text-xs uppercase tracking-widest text-neutral-400 dark:text-zinc-500 font-medium";

    return (
        <form onSubmit={handleSubmit} className="space-y-12">
            {/* honeypot */}
            <input
                type="text"
                name="website"
                value={form.website}
                onChange={(e) => handleChange("website", e.target.value)}
                className="hidden"
            />

            {/* Row 1: Name & Email */}
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
                <div className="flex flex-col gap-4">
                    <label className={labelClasses}>
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
                        className={inputClasses}
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <label className={labelClasses}>
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
                        className={inputClasses}
                    />
                </div>
            </div>

            {/* Row 2: Budget & Contact */}
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
                <div className="flex flex-col gap-4">
                    <label className={labelClasses}>
                        {data.budgetLabel}
                    </label>
                    <div className="relative">
                        <select
                            value={form.budget}
                            onChange={(e) =>
                                handleChange("budget", e.target.value)
                            }
                            className={`${inputClasses} appearance-none cursor-pointer pr-10`}
                        >
                            {data.budgetOptions.map((option, index) => (
                                <option key={index} value={option} className="bg-white dark:bg-zinc-950 py-4">
                                    {option}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <label className={labelClasses}>
                        {data.contactLabel || "電話 / LINE ID"}
                    </label>
                    <input
                        type="text"
                        value={form.contact}
                        onChange={(e) =>
                            handleChange("contact", e.target.value)
                        }
                        placeholder={data.contactPlaceholder || "方便我們更快速地與您聯繫"}
                        className={inputClasses}
                    />
                </div>
            </div>

            {/* Row 3: Message textarea */}
            <div className="flex flex-col gap-4">
                <label className={labelClasses}>
                    {data.messageLabel}
                </label>
                <div className="relative">
                    <textarea
                        maxLength={500}
                        value={form.message}
                        onChange={(e) =>
                            handleChange("message", e.target.value)
                        }
                        placeholder={data.messagePlaceholder}
                        required
                        className="w-full border-b border-neutral-300 dark:border-zinc-800 py-4 bg-transparent text-gray-900 dark:text-zinc-100 placeholder:text-neutral-400 dark:placeholder:text-zinc-600 min-h-[160px] focus:border-black dark:focus:border-white focus:outline-none transition-all leading-relaxed resize-none"
                    />
                    <div className="absolute right-0 -bottom-6">
                        <p className="text-[10px] uppercase tracking-widest text-neutral-400 dark:text-zinc-600 font-mono">
                            {form.message.length} <span className="opacity-50">/</span> 500
                        </p>
                    </div>
                </div>
            </div>

            {/* Feedback Notifications */}
            {success && (
                <div className="flex items-start gap-4 p-5 text-green-800 dark:text-green-300 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 transition-all">
                    <div className="mt-0.5 shrink-0">
                        <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider mb-1">Message sent successfully</h4>
                        <p className="text-sm opacity-90">Thank you for reaching out. We will contact you soon.</p>
                    </div>
                </div>
            )}

            {error && (
                <div className="flex items-start gap-4 p-5 text-red-800 dark:text-red-300 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 transition-all">
                    <div className="mt-0.5 shrink-0">
                        <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider mb-1">Something went wrong</h4>
                        <p className="text-sm opacity-90">{error}</p>
                    </div>
                </div>
            )}

            {/* Button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-black dark:bg-white text-white dark:text-black uppercase tracking-[0.3em] font-medium text-xs transition-all hover:bg-zinc-800 dark:hover:bg-zinc-200 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? "Sending..." : data.buttonLabel}
            </button>
        </form>
    );
}