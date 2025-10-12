// lib/emailjsService.js
import emailjs from '@emailjs/browser';
import { emailjsConfig } from '../emailjsConfig';
import toast from 'react-hot-toast';

interface ContactFormData {
    name: string;
    email?: string;
    phone: string;
    location: string;
    expertise: string;
    comments?: string;
    fromCareers?: boolean;
}

export const sendContactForm = async (formData: ContactFormData) => {
    try {
        const templateParams = {
            from_name: formData.name,
            from_email: formData.email || 'Not provided',
            phone: formData.phone,
            location: formData.location,
            expertise: formData.expertise,
            comments: formData.comments || 'No comments provided',
            submission_date: new Date().toLocaleString(),
            source: formData.fromCareers ? 'Careers Page' : 'Contact Page'
        };

        const response = await emailjs.send(
            emailjsConfig.serviceId,
            emailjsConfig.templateId,
            templateParams,
            emailjsConfig.publicKey
        );

        // If there's a resume file, send it separately
    
        return { success: true, message: 'Email sent successfully!' };
    } catch (error) {
        toast.error("Sorry, Failed to send email. Please try again.");
       
    }
};

