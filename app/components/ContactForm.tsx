'use client';

import { useState } from 'react';
import { submitContactForm, validateContactForm } from '@/lib/queries/contact';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitMessage(null);

        // Validate form
        const { valid, errors: validationErrors } = validateContactForm(formData);

        if (!valid) {
            setErrors(validationErrors);
            return;
        }

        setIsLoading(true);

        try {
            const result = await submitContactForm(formData);

            if (result.success) {
                setSubmitMessage({ type: 'success', text: result.message });
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: '',
                });
                setErrors({});
            } else {
                setSubmitMessage({ type: 'error', text: result.message });
            }
        } catch (error) {
            setSubmitMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='w-full max-w-xl mx-auto flex-1'>
            <div className='contact-card bg-white rounded-xl border border-white py-8 px-6 md:p-14'>
                <form className='space-y-5 flex flex-col gap-5' onSubmit={handleSubmit}>

                    <div>
                        <label className='text-base font-medium'>
                            Name
                        </label>
                        <input
                            type='text'
                            name='name'
                            placeholder='Your Name'
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`w-full border-b-2 py-3 text-sm text-gray-800 focus:outline-hidden transition ${
                                errors.name ? 'border-red-500' : 'border-[#E5E5E5]'
                            }`}
                        />
                        {errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name}</p>}
                    </div>

                    <div>
                        <label className='text-base font-medium'>
                            Email
                        </label>
                        <input
                            type='email'
                            name='email'
                            placeholder='Your Email'
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full border-b-2 py-3 text-sm text-gray-800 focus:outline-hidden focus:ring-0 focus-visible:outline-hidden active:outline-hidden transition ${
                                errors.email ? 'border-red-500' : 'border-[#E5E5E5]'
                            }`}
                        />
                        {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email}</p>}
                    </div>

                    <div>
                        <label className='text-base font-medium'>
                            Phone Number
                        </label>
                        <input
                            type='tel'
                            name='phone'
                            placeholder='Your Number'
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={`w-full border-b-2 py-3 text-sm text-gray-800 focus:outline-hidden transition ${
                                errors.phone ? 'border-red-500' : 'border-[#E5E5E5]'
                            }`}
                        />
                        {errors.phone && <p className='text-red-500 text-sm mt-1'>{errors.phone}</p>}
                    </div>

                    <div>
                        <label className='text-base font-medium'>
                            Message
                        </label>
                        <textarea
                            name='message'
                            placeholder='Add Your Message Here'
                            rows={1}
                            value={formData.message}
                            onChange={handleInputChange}
                            className={`w-full border-b-2 py-3 text-sm text-gray-800 focus:outline-hidden transition ${
                                errors.message ? 'border-red-500' : 'border-[#E5E5E5]'
                            }`}
                        />
                        {errors.message && <p className='text-red-500 text-sm mt-1'>{errors.message}</p>}
                    </div>

                    {submitMessage && (
                        <div
                            className={`p-3 rounded-md text-sm font-medium ${
                                submitMessage.type === 'success'
                                    ? 'bg-green-100 text-green-800 border border-green-300'
                                    : 'bg-red-100 text-red-800 border border-red-300'
                            }`}
                        >
                            {submitMessage.text}
                        </div>
                    )}

                    <button
                        type='submit'
                        disabled={isLoading}
                        className='w-full bg-brand-primary hover:bg-brand-primaryHover disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 px-8  transition'
                    >
                        {isLoading ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            </div>
        </div>
    )
}