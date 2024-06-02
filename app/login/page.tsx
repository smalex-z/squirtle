"use client";

import { useState } from 'react';
import Link from 'next/link';
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import styles from './Auth.module.css';

export default function AuthPanel() {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({ name: '', username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    const endpoint = activeTab === 'login' ? '#login' : '#signup';
    console.log(endpoint);
    console.log("Form Data Being Sent:", formData);
    try {
      console.log("Form Data Being Sent:", formData);
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Response from Server:", data);
      setMessage(data.message);
    } catch (error) {
      console.error("Error during submission:", error);
      setMessage("An error occurred");
    }
  };
  

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
                      Login to Squirtle
                    </h4>
                    <div className="login-google">
                      <a className="btn btn-outline-dark" href="/auth/google" role="button" style={{ textTransform: 'none' }}>
                        <img width="20px" style={{ marginBottom: '3px', marginRight: '5px' }} alt="Google sign-in" src="https://steelbluemedia.com/wp-content/uploads/2019/06/new-google-favicon-512.png" />
                        Continue with Google
                      </a>
                    </div>
                    <h6 className="my-3">
                      --- or ---
                    </h6>
                    <form method="post" className="w-100" onSubmit={handleSubmit} action="/login">
                      <input type="hidden" name="_csrf" value="YOUR_CSRF_TOKEN_HERE" />
                      <p><input type="text" placeholder="Username:" name="username" id="id_username" className={styles.formInput} onChange={handleChange} /></p>
                      <p><input type="password" placeholder="Password:" name="password" id="id_password" className={styles.formInput} onChange={handleChange} /></p>
                      <button type="submit" name="login-btn" className="btn btn-info w-100 mt-4 mb-4">Login</button>
                    </form>
                  </div>
                </div>
              )}

              {activeTab === 'signup' && (
                <div className="tab-pane fade show active" id="signup" role="tabpanel">
                  <div className="d-flex flex-column align-items-center w-100">
                    <h4 className="mt-3 mb-3">
                      Create a Squirtle account
                    </h4>
                    <div className="login-google">
                      <a className="btn btn-outline-dark" href="/auth/google" role="button" style={{ textTransform: 'none' }}>
                        <img width="20px" style={{ marginBottom: '3px', marginRight: '5px' }} alt="Google sign-in" src="https://steelbluemedia.com/wp-content/uploads/2019/06/new-google-favicon-512.png" />
                        Continue with Google
                      </a>
                    </div>
                    <h6 className="my-3">
                      --- or ---
                    </h6>
                    <form method="post" className="w-100" onSubmit={handleSubmit} action="/signup">
                      <input type="hidden" name="_csrf" value="YOUR_CSRF_TOKEN_HERE" />
                      <p><input type="text" placeholder="Name:" name="name" id="id_name" className={styles.formInput} onChange={handleChange} /></p>
                      <p><input type="text" placeholder="Username:" name="username" id="id_username" className={styles.formInput} onChange={handleChange} /></p>
                      <p><input type="password" placeholder="Password:" name="password" id="id_password" className={styles.formInput} onChange={handleChange} /></p>
                      <button type="submit" name="signup-btn" className="btn btn-info w-100 mt-4 mb-4">Sign Up</button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
          {message && <p className="text-center mt-4">{message}</p>}
        </div>
      </div>
    </div>
  );
}
