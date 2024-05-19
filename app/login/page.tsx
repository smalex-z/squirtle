"use client";

import { useState } from 'react';
import Link from 'next/link';
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import styles from './Auth.module.css';


export default function AuthPanel() {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className={styles.contentbody}>
        <div className={styles.contentBox}>
        <div className="row mx-0 mt-4">
            <Link href="/" legacyBehavior>
            <a className="px-0">
                <img src="logo.png" alt="logo" className={styles.logo} />
            </a>
            </Link>
        </div>

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
                    <div className="login-google">
                        <a className="btn btn-outline-dark" href="/auth/google" role="button" style={{ textTransform: 'none' }}>
                        <img width="20px" style={{ marginBottom: '3px', marginRight: '5px' }} alt="Google sign-in" src="https://steelbluemedia.com/wp-content/uploads/2019/06/new-google-favicon-512.png" />
                        Login with Google
                        </a>
                    </div>
                    <h6 className="my-3">
                        --- or ---
                    </h6>
                    <form method="post" className="w-100">
                        <input type="hidden" name="_csrf" value="YOUR_CSRF_TOKEN_HERE" />
                        <p><input type="text" placeholder="Username:" name="username" id="id_username" className={styles.formInput}/></p>
                        <p><input type="password" placeholder="Password:" name="password" id="id_password" className={styles.formInput} /></p>
                        <button type="submit" name="login-btn" className="btn btn-info w-100 mt-4 mb-4">Login</button>
                    </form>
                    </div>
                </div>
                )}

                {activeTab === 'signup' && (
                <div className="tab-pane fade" id="signup" role="tabpanel">
                    <form method="post">
                    <input type="hidden" name="_csrf" value="YOUR_CSRF_TOKEN_HERE" />
                    {/* Replace the following line with your actual form fields */}
                    <input type="text" name="signup" placeholder="Signup Form Fields" className={styles.formInput}/>
                    <button type="submit" name="signup-btn" className="btn btn-success">Sign Up</button>
                    </form>
                </div>
                )}
            </div>
            </div>
        </div>
        </div>
    </div>
  );
}
