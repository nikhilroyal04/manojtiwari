"use client";

import React from 'react';
import CTA from '@/components/all/cta-section';

export default function PrivacyPolicy() {
    return (
        <div>
            <CTA
                title="Privacy Policy"
                description="Please read the following privacy policy carefully before using our website."
            />
            <div className="container mx-auto px-6 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="prose prose-lg max-w-none">
                        <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
                        <p className="mb-6 text-gray-700">
                            We collect information you provide directly to us, such as when you contact us, subscribe to our newsletter, or interact with our website. This may include your name, email address, and any other information you choose to provide.
                        </p>

                        <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
                        <p className="mb-6 text-gray-700">
                            We use the information we collect to provide, maintain, and improve our services, communicate with you, and personalize your experience on our website.
                        </p>

                        <h2 className="text-2xl font-bold mb-4">3. Information Sharing</h2>
                        <p className="mb-6 text-gray-700">
                            We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this privacy policy or as required by law.
                        </p>

                        <h2 className="text-2xl font-bold mb-4">4. Cookies and Tracking</h2>
                        <p className="mb-6 text-gray-700">
                            We may use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand where our visitors are coming from.
                        </p>

                        <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
                        <p className="mb-6 text-gray-700">
                            We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                        </p>

                        <h2 className="text-2xl font-bold mb-4">6. Third-Party Services</h2>
                        <p className="mb-6 text-gray-700">
                            Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties and encourage you to read their privacy policies.
                        </p>

                        <h2 className="text-2xl font-bold mb-4">7. Children&apos;s Privacy</h2>
                        <p className="mb-6 text-gray-700">
                            Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13.
                        </p>

                        <h2 className="text-2xl font-bold mb-4">8. Changes to This Policy</h2>
                        <p className="mb-6 text-gray-700">
                            We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the &quot;Last updated&quot; date.
                        </p>

                        <h2 className="text-2xl font-bold mb-4">9. Contact Us</h2>
                        <p className="mb-6 text-gray-700">
                            If you have any questions about this privacy policy, please contact us through the contact information provided on our website.
                        </p>

                        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">
                                <strong>Last updated:</strong> {new Date().toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}