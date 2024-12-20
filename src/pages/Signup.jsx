import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';

const Signup = () => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);

    const validateForm = () => {
        const validationErrors = [];
        if (!first_name.trim()) validationErrors.push('First Name is required.');
        if (!last_name.trim()) validationErrors.push('Last Name is required.');
        if (!company.trim()) validationErrors.push('Company is required.');
        if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) validationErrors.push('Email is invalid.');
        if (!email.trim()) validationErrors.push('Email is required.');
        return validationErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();

        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors([]);
        const data = { first_name, last_name, company, email };

        try {
            const options = {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    'api-key': import.meta.env.VITE_BREVO_KEY
                },
                body: JSON.stringify({
                    attributes: { FIRSTNAME: data.first_name, LASTNAME: data.last_name, COMPANY: data.company },
                    updateEnabled: false,
                    email: data.email
                })
            };

            const response = await fetch('https://api.brevo.com/v3/contacts', options);
            const result = await response.json();
            console.log(result);

            if (response.ok) {
                alert('Thank you for signing up!');
                setFirstName('');
                setLastName('');
                setCompany('');
                setEmail('');
            } else {
                alert('There was an issue signing you up. Please try again.');
            }
        } catch (err) {
            console.error('Error creating contact in Brevo:', err);
            alert('There was an issue signing you up. Please try again.');
        }
    };

    return (
        <main className="signup">
            <h2>Want to learn some Workday tips and tricks or stay connected?</h2>
            <h2>Sign up for my newsletter!</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        value={first_name}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label>First Name</label>
                </div>
                <div>
                    <input
                        type="text"
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <label>Last Name</label>
                </div>
                <div>
                    <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                    />
                    <label>Company</label>
                </div>
                <div>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <label>Email</label>
                </div>
                <button type="submit">Sign Up</button>
                {errors.length > 0 && (
                    <div className="error">
                        {errors.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
            </form>
        </main>
    );
};

export default Signup;
