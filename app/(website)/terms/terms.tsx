"use client";

import React from 'react';
import CTA from '@/components/all/cta-section';

export default function Terms() {
    return (
        <div>
            <CTA
                title="Terms of Service"
                description="Please read these terms of service carefully before using our website."
            />
            <div className="container mx-auto px-6 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="prose prose-lg max-w-none">
                        <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                        <p className="mb-6 text-gray-700">
                            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
                        </p>

                        <h2 className="text-2xl font-bold mb-4">2. Use License</h2>
                        <p className="mb-6 text-gray-700">
                            Permission is granted to temporarily download one copy of the materials (information or software) on this website for personal, non-commercial transitory viewing only.
                        </p>

                        <h2 className="text-2xl font-bold mb-4">3. Disclaimer</h2>
                        <p className="mb-6 text-gray-700">
                            The materials on this website are provided on an &apos;as is&apos; basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                        </p>

                        <h2 className="text-2xl font-bold mb-4">4. Limitations</h2>
                        <p className="mb-6 text-gray-700">
                            In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.
                        </p>

                        <h2 className="text-2xl font-bold mb-4">5. Accuracy of Materials</h2>
                        <p className="mb-6 text-gray-700">
                            The materials appearing on our website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on our website are accurate, complete or current.
                        </p>

                        <h2 className="text-2xl font-bold mb-4">6. Links</h2>
                        <p className="mb-6 text-gray-700">
                            We have not reviewed all of the sites linked to our website and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site.
                        </p>

                        <h2 className="text-2xl font-bold mb-4">7. Modifications</h2>
                        <p className="mb-6 text-gray-700">
                            We may revise these terms of service for our website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms of Service.
                        </p>

                        <h2 className="text-2xl font-bold mb-4">8. Governing Law</h2>
                        <p className="mb-6 text-gray-700">
                            These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
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