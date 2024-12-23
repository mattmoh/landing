import React, { useState } from 'react';
import './Signup.css';
import ResponseModal from '../components/ResponseModal';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const validateForm = () => {
        const validationErrors = [];
        if (!firstName.trim()) validationErrors.push('First Name is required.');
        if (!lastName.trim()) validationErrors.push('Last Name is required.');
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
        const data = { first_name: firstName, last_name: lastName, company, email };

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
                    listIds: [2],
                    email: data.email
                })
            };

            const response = await fetch('https://api.brevo.com/v3/contacts', options);
            const result = await response.json();
            console.log(result);

            if (response.ok) {
                setModalMessage('Thank you for signing up!');
                setFirstName('');
                setLastName('');
                setCompany('');
                setEmail('');
            } else {
                setModalMessage(`Error: ${result.message}`);
            }
        } catch (err) {
            console.error('Error creating contact in Brevo:', err);
            setModalMessage(`Error: ${err.message}`);
        } finally {
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <main className="signup">
            <h2>Want to learn some Workday tips and tricks or stay connected?<br />Sign up for my newsletter!</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label>First Name</label>
                </div>
                <div>
                    <input
                        type="text"
                        value={lastName}
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
            <ResponseModal isOpen={isModalOpen} onRequestClose={closeModal} message={modalMessage} />
        </main>
    );
};

export default Signup;
