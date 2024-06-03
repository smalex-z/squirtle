"use client";

import { useState } from 'react';
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import styles from './Auth.module.css';


export default function AuthPanel() {
    const [activeTab, setActiveTab] = useState('login');

    const handleLogin = async (event) => {
        event.preventDefault();

        const username = event.target.username.value;
        const password = event.target.password.value;

        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (data.success) {
            console.log('Login successful!');
        } else {
            console.log('Login failed!')
        }
    };

    const handleSignup = async (event) => {
        event.preventDefault();

        const firstName = event.target.firstName.value;
        const lastName = event.target.lastName.value;
        const username = event.target.username.value;
        const password = event.target.password.value;

        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName, lastName, username, password }),
        });

        if (!response.ok) {
            console.error('Signup failed');
            return;
        }

        const data = await response.json();

        if (data.success) {
            console.log('Signup successful!');
        } else {
            console.log('Signup failed!');
        }
    };



    return (
        <div className={styles.contentbody}>
            <div className={styles.contentBox}>
                <div className={`${styles.authPanel} mt-3`}>
                    <div className={`${styles.row} row`}>
                        <ul className="nav nav-tabs pe-0" id="authTabs">
                            <li className={`nav-item ${styles.navItem}`}>
                                <a
                                    className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
                                    id="login-tab"
                                    onClick={() => setActiveTab('login')}
                                    href="#login"
                                >
                                    Login
                                </a>
                            </li>
                            <li className={`nav-item ${styles.navItem}`}>
                                <a
                                    className={`nav-link ${activeTab === 'signup' ? 'active' : ''}`}
                                    id="signup-tab"
                                    onClick={() => setActiveTab('signup')}
                                    href="#signup"
                                >
                                    Sign Up
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className={`${styles.row} row px-4`}>
                        <div className="tab-content mt-3 p-0" id="authTabsContent">
                            {activeTab === 'login' && (
                                <div className="tab-pane fade show active" id="login" role="tabpanel">
                                    <div className="d-flex flex-column align-items-center w-100">
                                        <h4 className="mt-3 mb-3">
                                            Sign In to Squirtle
                                        </h4>

                                        <form method="post" className="w-100" onSubmit={handleLogin}>
                                            <p><input type="text" placeholder="Username:" name="username" id="id_username" className={styles.formInput} /></p>
                                            <p><input type="password" placeholder="Password:" name="password" id="id_password" className={styles.formInput} /></p>
                                            <button type="submit" name="login-btn" className="btn btn-info w-100 mt-4 mb-4">Login</button>
                                        </form>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'signup' && (
                                <div className="tab-pane fade show active" id="signup" role="tabpanel">
                                    <div className="d-flex flex-column align-items-center w-100">
                                        <h4 className="mt-3 mb-3">
                                            Sign Up to Squirtle
                                        </h4>
                                        <form method="post" className="w-100" onSubmit={handleSignup}>
                                            <p><input type="text" placeholder="First Name:" name="firstName" id="id_firstname" className={styles.formInput} /></p>
                                            <p><input type="text" placeholder="Last Name:" name="lastName" id="id_lastname" className={styles.formInput} /></p>
                                            <p><input type="text" placeholder="Username:" name="username" id="id_username" className={styles.formInput} /></p>
                                            <p><input type="password" placeholder="Password:" name="password" id="id_password" className={styles.formInput} /></p>
                                            <button type="submit" name="signup-btn" className="btn btn-info w-100 mt-4 mb-4">Sign Up</button>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
