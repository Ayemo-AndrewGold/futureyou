
import React from "react";

const PrivacyPolicy = () => {
  return (
    <main className="bg-gray-50 min-h-screen py-5">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Privacy Policy
          </h1>

          <p className="mt-4 text-gray-600 text-lg">
            Your privacy matters to us. This policy explains how we collect,
            use, and protect your information.
          </p>

          <p className="mt-3 text-sm text-gray-500">
            Last Updated: June 29, 2026
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-10">
          <h2 className="font-semibold text-xl mb-4">Contents</h2>

          <ul className="space-y-2 text-blue-600">
            <li>
              <a href="#information">1. Information We Collect</a>
            </li>

            <li>
              <a href="#usage">2. How We Use Your Information</a>
            </li>

            <li>
              <a href="#sharing">3. Information Sharing</a>
            </li>

            <li>
              <a href="#cookies">4. Cookies</a>
            </li>

            <li>
              <a href="#security">5. Data Security</a>
            </li>

            <li>
              <a href="#rights">6. Your Rights</a>
            </li>

            <li>
              <a href="#children">7. Children's Privacy</a>
            </li>

            <li>
              <a href="#changes">8. Changes to this Policy</a>
            </li>

            <li>
              <a href="#contact">9. Contact Us</a>
            </li>
          </ul>
        </div>

        {/* Content */}
        <article className="bg-white rounded-xl shadow-sm border p-8 md:p-12 prose prose-gray max-w-none">

          <section id="information">
            <h2>1. Information We Collect</h2>

            <p>
              We may collect personal information that you voluntarily provide,
              including:
            </p>

            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Company or organization</li>
              <li>Profile information</li>
            </ul>

            <p>
              We also collect non-personal information such as browser type,
              device information, IP address, and pages visited to improve our
              services.
            </p>
          </section>

          <section id="usage">
            <h2>2. How We Use Your Information</h2>

            <p>Your information may be used to:</p>

            <ul>
              <li>Provide and improve our services.</li>
              <li>Respond to your inquiries.</li>
              <li>Create and manage your account.</li>
              <li>Send important updates.</li>
              <li>Improve website performance and user experience.</li>
              <li>Comply with legal obligations.</li>
            </ul>
          </section>

          <section id="sharing">
            <h2>3. Information Sharing</h2>

            <p>
              We do not sell your personal information.
            </p>

            <p>
              We may share information with trusted third-party service
              providers that help us operate our platform, process payments,
              provide analytics, or comply with legal obligations.
            </p>
          </section>

          <section id="cookies">
            <h2>4. Cookies</h2>

            <p>
              We use cookies and similar technologies to enhance your browsing
              experience, remember preferences, analyze traffic, and improve our
              services.
            </p>

            <p>
              You can disable cookies through your browser settings, although
              some features may not function properly.
            </p>
          </section>

          <section id="security">
            <h2>5. Data Security</h2>

            <p>
              We implement reasonable administrative, technical, and physical
              safeguards to protect your personal information from unauthorized
              access, alteration, disclosure, or destruction.
            </p>

            <p>
              However, no method of transmission over the internet is completely
              secure.
            </p>
          </section>

          <section id="rights">
            <h2>6. Your Rights</h2>

            <p>Depending on your location, you may have the right to:</p>

            <ul>
              <li>Access your personal information.</li>
              <li>Correct inaccurate information.</li>
              <li>Request deletion of your information.</li>
              <li>Withdraw consent.</li>
              <li>Object to certain data processing.</li>
              <li>Request a copy of your data.</li>
            </ul>
          </section>

          <section id="children">
            <h2>7. Children's Privacy</h2>

            <p>
              Our services are not intended for children under the applicable
              minimum legal age. We do not knowingly collect personal
              information from children.
            </p>
          </section>

          <section id="changes">
            <h2>8. Changes to this Privacy Policy</h2>

            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with an updated revision date.
            </p>
          </section>

          <section id="contact">
            <h2>9. Contact Us</h2>

            <p>
              If you have questions about this Privacy Policy, you may contact
              us using the information below.
            </p>

            <div className="mt-6 rounded-lg bg-gray-100 p-6">
              <p>
                <strong>Email:</strong> futureyoulimited@gmail.com
              </p>

              <p>
                <strong>Phone:</strong> 08169159291
              </p>

              <p>
                <strong>Address:</strong> Your Blk F3 Suite 256 Eastline HFP Complex, Lekki-Epe Expressway, Lagos.
              </p>
            </div>
          </section>

        </article>
      </div>
    </main>
  );
};

export default PrivacyPolicy;