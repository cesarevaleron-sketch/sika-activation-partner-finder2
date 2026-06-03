import React from 'react'

const FORMS_URL =
  'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=iGqK65PZUE608K2j3554-FVMlwCuoo1Dg2OoEg1v64ZUMUhKUzZBU0RZRDFHRk00TjI4M1lBMzRUTC4u'

export default function SupplierProfile({ supplier, isAlternative = false }) {
  if (!supplier) return null

  return (
    <div className="supplier-card">
      {/* Header */}
      <div className="supplier-card-header">
        <div className="supplier-image-block">
          <span className="supplier-image-placeholder">
            Supplier image /<br />project reference<br />placeholder
          </span>
        </div>

        <div className="supplier-header-info">
          {isAlternative ? (
            <div className="alternative-badge">
              <span>↗</span> Alternative option
            </div>
          ) : (
            <div className="recommended-badge">
              <span>★</span> Recommended
            </div>
          )}
          <h2 className="supplier-name">{supplier.supplier_name}</h2>
          <p className="supplier-category">{supplier.category}</p>
        </div>
      </div>

      {/* Body */}
      <div className="supplier-card-body">
        <p className="supplier-description">{supplier.short_description}</p>

        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Country / Base</span>
            <span className="info-value">{supplier.country_base_location}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Geographic scope</span>
            <span className="info-value">{supplier.scope}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Website</span>
            <span className="info-value">
              <a href={supplier.website} target="_blank" rel="noopener noreferrer">
                {supplier.website.replace(/^https?:\/\//, '')}
              </a>
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Contact</span>
            <span className="info-value">
              {supplier.contact_person && <span>{supplier.contact_person}</span>}
              {supplier.contact_email && (
                <>
                  <br />
                  <a href={`mailto:${supplier.contact_email}`}>{supplier.contact_email}</a>
                </>
              )}
              {supplier.phone && (
                <>
                  <br />
                  <a href={`tel:${supplier.phone}`}>{supplier.phone}</a>
                </>
              )}
            </span>
          </div>
        </div>

        {/* Recommended for */}
        {supplier.recommended_for && supplier.recommended_for.length > 0 && (
          <div className="recommended-for-section">
            <p className="section-label">Recommended for</p>
            <ul className="recommended-for-list">
              {supplier.recommended_for.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Suggested next step */}
        {supplier.suggested_next_step && (
          <div className="next-step-box">
            <p className="next-step-label">Suggested next step</p>
            <p className="next-step-text">{supplier.suggested_next_step}</p>
          </div>
        )}
      </div>

      {/* Microsoft Forms CTA */}
      <div style={{ padding: '0 32px 32px' }}>
        <FormsCTA />
      </div>
    </div>
  )
}

export function FormsCTA() {
  return (
    <div className="forms-cta-block">
      <div className="forms-cta-content">
        <h3 className="forms-cta-title">Already have a project in mind?</h3>
        <p className="forms-cta-body">
          Take this short request form to share your country, expected quantity, timing, selected
          supplier and project need. This will help us validate the right execution route and
          identify potential economies of scale across Europe.
        </p>
      </div>
      <a
        href={FORMS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-cta"
      >
        Start request form →
      </a>
    </div>
  )
}
