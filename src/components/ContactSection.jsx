import React, { useState } from 'react';
import { SectionTag } from './common/SectionTag';
import { ArrowIcon, CheckIcon } from './common/Icons';

/**
 * Section 11: Contact & Business Enquiry Component
 * Interactive form with React state validation, enquiry categorization, and submission confirmation.
 */
export const ContactSection = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    email: '',
    phone: '',
    enquiryType: 'Hospitality & Hotel Supply',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your full name.';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your business email.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.phone.trim()) errs.phone = 'Please provide a valid contact number.';
    if (!formData.message.trim()) errs.message = 'Please specify details about your enquiry.';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate luxury async processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      organization: '',
      email: '',
      phone: '',
      enquiryType: 'Hospitality & Hotel Supply',
      message: ''
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="content-container">
        
        <div className="contact-grid">
          
          {/* Left Column: Brand Information */}
          <div className="contact-info-col">
            <SectionTag>Partnerships & Supply</SectionTag>
            <h2 className="serif-display contact-heading">
              Connect with MIZUHA India
            </h2>
            <p className="contact-lead">
              For distribution partnerships, hospitality enquiries, corporate supply, or general brand questions, we welcome your conversation.
            </p>

            <div className="contact-meta-cards">
              <div className="meta-card">
                <span className="meta-label">Brand Headquarters</span>
                <p className="meta-value">India — Official Operations</p>
                <span className="meta-sub">Institutional, hospitality and corporate supply inquiries</span>
              </div>

              <div className="meta-card">
                <span className="meta-label">Direct Correspondence</span>
                <p className="meta-value">partnerships@mizuha.in</p>
                <span className="meta-sub">All inquiries are reviewed within one business day</span>
              </div>

              <div className="meta-card">
                <span className="meta-label">Packaging Standard</span>
                <p className="meta-value">300ml Canned Drinking Water</p>
                <span className="meta-sub">100% Recyclable Aluminium — Hermetically Sealed</span>
              </div>
            </div>
          </div>

          {/* Right Column: Enquiry Form */}
          <div className="contact-form-col">
            <div className="form-card-container">
              {isSubmitted ? (
                <div className="form-success-state">
                  <div className="success-icon-badge">
                    <CheckIcon />
                  </div>
                  <h3 className="success-heading">Enquiry Received</h3>
                  <p className="success-text">
                    Thank you, {formData.fullName}. Your communication has been dispatched to the MIZUHA India operations desk. A brand specialist will reach out shortly.
                  </p>
                  <button type="button" className="btn-primary" onClick={handleReset}>
                    <span>Submit Another Enquiry</span>
                    <ArrowIcon />
                  </button>
                </div>
              ) : (
                <form className="enquiry-form" onSubmit={handleSubmit} noValidate>
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="fullName" className="form-label">Full Name *</label>
                      <input 
                        type="text" 
                        id="fullName" 
                        name="fullName" 
                        value={formData.fullName} 
                        onChange={handleChange}
                        className={`form-input ${errors.fullName ? 'error' : ''}`}
                        placeholder="e.g. Rahul Sharma"
                      />
                      {errors.fullName && <span className="field-error">{errors.fullName}</span>}
                    </div>

                    <div className="form-field">
                      <label htmlFor="organization" className="form-label">Organization / Entity</label>
                      <input 
                        type="text" 
                        id="organization" 
                        name="organization" 
                        value={formData.organization} 
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Company or Hotel Name"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="email" className="form-label">Business Email *</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange}
                        className={`form-input ${errors.email ? 'error' : ''}`}
                        placeholder="name@company.com"
                      />
                      {errors.email && <span className="field-error">{errors.email}</span>}
                    </div>

                    <div className="form-field">
                      <label htmlFor="phone" className="form-label">Phone Number *</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange}
                        className={`form-input ${errors.phone ? 'error' : ''}`}
                        placeholder="+91 98765 43210"
                      />
                      {errors.phone && <span className="field-error">{errors.phone}</span>}
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="enquiryType" className="form-label">Enquiry Classification</label>
                    <select 
                      id="enquiryType" 
                      name="enquiryType" 
                      value={formData.enquiryType} 
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="Hospitality & Hotel Supply">Hospitality & Hotel Supply</option>
                      <option value="Corporate & Office Distribution">Corporate & Office Distribution</option>
                      <option value="Retail & Supermarket Distribution">Retail & Supermarket Distribution</option>
                      <option value="Event & Luxury Gifting">Event & Luxury Gifting</option>
                      <option value="General Brand Enquiry">General Brand Enquiry</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label htmlFor="message" className="form-label">Requirements or Message *</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows="4" 
                      value={formData.message} 
                      onChange={handleChange}
                      className={`form-textarea ${errors.message ? 'error' : ''}`}
                      placeholder="Please indicate your volume requirements, delivery timelines, or partnership scope..."
                    />
                    {errors.message && <span className="field-error">{errors.message}</span>}
                  </div>

                  <button 
                    type="submit" 
                    className="btn-primary form-submit-btn" 
                    disabled={isSubmitting}
                  >
                    <span>{isSubmitting ? 'Transmitting Enquiry...' : 'Transmit Official Enquiry'}</span>
                    <ArrowIcon />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;

