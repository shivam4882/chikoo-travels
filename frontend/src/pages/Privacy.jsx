export default function Privacy() {
  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div className="page-header">
        <h1>Privacy Policy</h1>
        <p>Your data, your trust — we protect it 🔒</p>
      </div>
      <div className="page-content">
        <div className="highlight-box">
          <strong>📌 Summary:</strong> We collect only essential information to process your bookings. We never sell or share your data with third parties.
        </div>

        <h2>1. Information We Collect</h2>
        <ul>
          <li><strong>Personal Information:</strong> Name, email, phone number, address, date of birth, and government ID (for booking purposes).</li>
          <li><strong>Payment Information:</strong> Card details (processed via secure gateways, we never store them).</li>
          <li><strong>Technical Information:</strong> IP address, browser type, device info, and browsing behavior on our site.</li>
          <li><strong>Booking Data:</strong> Travel preferences, itinerary, and special requests.</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>To confirm bookings and issue travel documents.</li>
          <li>To communicate with you about your tour (updates, reminders, itineraries).</li>
          <li>To process payments and refunds.</li>
          <li>To send promotional offers (only with your consent).</li>
          <li>To comply with legal requirements.</li>
        </ul>

        <h2>3. Data Sharing</h2>
        <p>We share your data only with:</p>
        <ul>
          <li>Hotels, airlines, and local vendors involved in your booking.</li>
          <li>Payment gateways for secure transactions.</li>
          <li>Government authorities if required by law.</li>
        </ul>
        <p><strong>We never sell your data to third parties.</strong></p>

        <h2>4. Data Security</h2>
        <ul>
          <li>All data is stored on encrypted servers.</li>
          <li>Payment information is processed via PCI-DSS compliant gateways.</li>
          <li>We follow industry-standard security practices to prevent unauthorized access.</li>
        </ul>

        <h2>5. Cookies</h2>
        <p>We use cookies to enhance your browsing experience, remember your preferences, and analyze site traffic. You can disable cookies in your browser settings, but some features may not work properly.</p>

        <h2>6. Your Rights</h2>
        <ul>
          <li><strong>Access:</strong> Request a copy of the data we hold about you.</li>
          <li><strong>Correction:</strong> Update incorrect personal information.</li>
          <li><strong>Deletion:</strong> Request removal of your data (subject to legal requirements).</li>
          <li><strong>Opt-out:</strong> Unsubscribe from marketing emails at any time.</li>
        </ul>

        <h2>7. Data Retention</h2>
        <p>We retain your data only as long as necessary for bookings and legal compliance (typically 3 years).</p>

        <h2>8. Changes to This Policy</h2>
        <p>We may update this policy periodically. Major changes will be notified via email or on our website.</p>

        <h2>9. Contact Us</h2>
        <p>For privacy-related questions, email <strong>contact@chikootravels.com</strong> or call <strong>+91 96672 59929</strong>.</p>
      </div>
    </div>
  );
}