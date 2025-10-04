"use client";

import { useState } from "react";
import Image from "next/image";
import "./Contact.css"

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        location: "",
        expertise: "",
        comments: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = "Full name is required";
        } else if (formData.name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }

        const phoneRegex = /^\+?\d[\d\s]{5,14}$/;

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = "Please enter a valid  phone number";
        }

        // Email validation (optional but if provided, validate)
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        // Location validation
        if (!formData.location.trim()) {
            newErrors.location = "Location is required";
        } else if (formData.location.trim().length < 2) {
            newErrors.location = "Location must be at least 2 characters";
        }

        // Expertise validation
        if (!formData.expertise) {
            newErrors.expertise = "Please select an expertise area";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));


        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!validateForm()) {
            setIsSubmitting(false);
            return;
        }

        try {

            console.log("✅ Form Submitted:", formData);


            setFormData({
                name: "",
                phone: "",
                email: "",
                location: "",
                expertise: "",
                comments: "",
            });
            setErrors({});
            alert("Thank you! Your message has been sent successfully.");

        } catch (error) {
            console.error('Error submitting form:', error);
            alert("Sorry, there was an error submitting your form. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="style_contact__us__wrappper__62fYI">
            <section className="style_contactus__container__Flquh" aria-labelledby="contact-heading">
                {/* LEFT SIDE */}
                <div className="style_contactus__left__wrapper__NCGr8">
                    <div className="style_form__content__xGxAH">
                        <header>
                            <h1>Let&apos;s Launch Your Journey</h1>
                            <p>
                                Ready to take your game to the next level?<br />
                                Slide into our inbox
                            </p>
                        </header>

                        <div className="style_contact__details__qtUh0">
                            <div>
                                <Image
                                    src="/contact/phone.svg"
                                    alt="phone icon"
                                    width={20}
                                    height={20}
                                />
                                <a href="tel:+919774587007">+91 9774587007</a>
                            </div>

                            <div>
                                <Image
                                    src="/contact/email.svg"
                                    alt="email icon"
                                    width={20}
                                    height={20}
                                />
                                <a href="mailto:hello@gully91.com">hello@gully91.com</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE - FORM */}
                <div className="style_form__wrapper__eIlmx">
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="style_form__group__46EVf">
                            <label htmlFor="name" className="style_form__label__-sYoI">
                                Full Name <span className="style_required__star__UTD67">*</span>
                            </label>
                            <input
                                className={`style_inputfield__FJ49s ${errors.name ? 'style_input__error__8x9K2' : ''}`}
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter your full name"
                                maxLength={32}
                                autoComplete="name"
                                value={formData.name}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            />
                            {errors.name && <span className="style_error__message__vL3pQ">{errors.name}</span>}
                        </div>

                        <div className="style_form__group__46EVf">
                            <label htmlFor="phone" className="style_form__label__-sYoI">
                                Phone Number <span className="style_required__star__UTD67">*</span>
                            </label>
                            <input
                                className={`style_inputfield__FJ49s ${errors.phone ? 'style_input__error__8x9K2' : ''}`}
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="Enter your contact number"
                                inputMode="tel"
                                autoComplete="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            />
                            {errors.phone && <span className="style_error__message__vL3pQ">{errors.phone}</span>}
                        </div>

                        <div className="style_form__group__46EVf">
                            <label htmlFor="email" className="style_form__label__-sYoI">
                                Email
                            </label>
                            <input
                                className={`style_inputfield__FJ49s ${errors.email ? 'style_input__error__8x9K2' : ''}`}
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                maxLength={32}
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            />
                            {errors.email && <span className="style_error__message__vL3pQ">{errors.email}</span>}
                        </div>

                        <div className="style_form__group__46EVf">
                            <label htmlFor="location" className="style_form__label__-sYoI">
                                Location <span className="style_required__star__UTD67">*</span>
                            </label>
                            <input
                                className={`style_inputfield__FJ49s ${errors.location ? 'style_input__error__8x9K2' : ''}`}
                                id="location"
                                name="location"
                                type="text"
                                placeholder="Enter your location"
                                maxLength={32}
                                autoComplete="address-level1"
                                value={formData.location}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            />
                            {errors.location && <span className="style_error__message__vL3pQ">{errors.location}</span>}
                        </div>

                        <div className="style_form__group__46EVf">
                            <label htmlFor="expertise" className="style_form__label__-sYoI">
                                What Expertise You&apos;re Interested In <span className="style_required__star__UTD67">*</span>
                            </label>
                            <select
                                className={`style_inputfield__FJ49s style_placeholder__9Azjc !text-[16px] !text-[#ffffff9e] ${errors.expertise ? 'style_input__error__8x9K2' : ''}`}
                                id="expertise"
                                name="expertise"
                                value={formData.expertise}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            >
                                <option className="!text-[#ffffff9e] " value="" disabled>
                                    Select
                                </option>
                                <option value="GullyOS Tournament Management Tech">GullyOS Tournament Management Tech</option>
                                <option value="Production and Broadcasting">Production and Broadcasting</option>
                                <option value="Partnerships">Partnerships</option>
                                <option value="Brand Integrations">Brand Integrations</option>
                                <option value="Careers">Careers</option>
                                <option value="Support and Grievances">Support and Grievances</option>
                                <option value="Others">Others</option>
                            </select>
                            {errors.expertise && <span className="style_error__message__vL3pQ">{errors.expertise}</span>}
                        </div>

                        <div className="style_form__group__46EVf">
                            <label htmlFor="comments" className="style_form__label__-sYoI">
                                Add Comments
                            </label>
                            <textarea
                                className="style_inputfield__FJ49s"
                                id="comments"
                                name="comments"
                                placeholder="Need to enquire about..."
                                maxLength={1024}
                                aria-multiline="true"
                                style={{ height: "26px", resize: "none" }}
                                value={formData.comments}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            />
                        </div>

                        <button
                            type="submit"
                            className="style_form__submit__btn__F8DVM !mt-0"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}