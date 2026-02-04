import React from 'react'
import { User, Mail, Phone, Linkedin, Github } from 'lucide-react';

function PersonalForm({ cv, setCv }) {

    const handleChange = (e) => {
        setCv({
            ...cv,
            personal: {
                ...cv.personal,
                [e.target.name]: e.target.value
            }
        });
    };

    return (
        <div className='mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500'>
            <h2 className='text-xl font-bold mb-5 text-[var(--text-primary)] flex items-center gap-2'>
                <User className="w-5 h-5 text-[var(--primary-color)]" />
                Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2 space-y-1.5">
                    <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider ml-1">Full Name</label>
                    <input
                        name='fullName'
                        placeholder='e.g. John Doe'
                        value={cv.personal.fullName}
                        onChange={handleChange}
                        className='input'
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider ml-1 flex items-center gap-1">
                        <Mail className="w-3 h-3" /> Email
                    </label>
                    <input
                        name='email'
                        placeholder='e.g. john@example.com'
                        value={cv.personal.email}
                        onChange={handleChange}
                        className='input'
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider ml-1 flex items-center gap-1">
                        <Phone className="w-3 h-3" /> Phone
                    </label>
                    <input
                        name='phone'
                        placeholder='e.g. +1 234 567 890'
                        value={cv.personal.phone}
                        onChange={handleChange}
                        className='input'
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider ml-1 flex items-center gap-1">
                        <Linkedin className="w-3 h-3" /> LinkedIn
                    </label>
                    <input
                        name='linkedin'
                        placeholder='LinkedIn URL'
                        value={cv.personal.linkedin}
                        onChange={handleChange}
                        className='input'
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider ml-1 flex items-center gap-1">
                        <Github className="w-3 h-3" /> GitHub
                    </label>
                    <input
                        name='github'
                        placeholder='GitHub URL'
                        value={cv.personal.github}
                        onChange={handleChange}
                        className='input'
                    />
                </div>
            </div>
        </div>
    )
}

export default PersonalForm