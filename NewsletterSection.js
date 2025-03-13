// NewsletterSection.js
import React, { useState } from 'react';

const NewsletterSection = ({
  theme = 'dark',
  headline = 'Want product news and updates?',
  subHeadline = 'Sign up for our newsletter.',
  buttonText = 'Subscribe',
  privacyText = 'We care about your data. Read our',
  privacyLinkText = 'privacy policy',
  privacyLinkUrl = '/privacy',
  onSubscribe = (email) => console.log('Subscribed:', email),
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const themes = {
    dark: {
      container: 'bg-[#111827] text-white',
      input: 'bg-[#1f2937] border-[#374151] text-white placeholder-gray-400',
      button: 'bg-indigo-600 hover:bg-indigo-700 text-white',
      link: 'text-indigo-400 hover:text-indigo-300'
    },
    light: {
      container: 'bg-white text-[#111827]',
      input: 'bg-white border-gray-300 text-gray-900 placeholder-gray-500',
      button: 'bg-indigo-600 hover:bg-indigo-700 text-white',
      link: 'text-indigo-600 hover:text-indigo-700'
    }
  };

  const currentTheme = themes[theme] || themes.dark;

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setError('');
    
    if (!email) {
      setError('Please enter an email address');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      await onSubscribe(email);
      
      // Success
      setSuccess(true);
      setEmail('');
    } catch (err) {
      setError('Failed to subscribe. Please try again.');
      console.error('Newsletter subscription error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`py-12 px-4 sm:px-6 lg:px-8 ${currentTheme.container}`}>
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {headline}
            </h2>
            <p className="mt-2 text-2xl sm:text-3xl font-bold">
              {subHeadline}
            </p>
          </div>
          <div className="mt-8 lg:mt-0">
            {success ? (
              <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="sm:flex">
                <div className="w-full">
                  <label htmlFor="email" className="sr-only">Email address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-5 py-3 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${currentTheme.input}`}
                  />
                  {error && (
                    <div className="mt-2 text-sm text-red-600">{error}</div>
                  )}
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full sm:w-auto flex justify-center items-center px-5 py-3 border border-transparent rounded-md shadow-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${currentTheme.button}`}
                  >
                    {isSubmitting ? (
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : null}
                    {buttonText}
                  </button>
                </div>
              </form>
            )}
            <p className="mt-3 text-sm">
              {privacyText}{' '}
              <a href={privacyLinkUrl} className={`font-medium ${currentTheme.link}`}>
                {privacyLinkText}
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;
