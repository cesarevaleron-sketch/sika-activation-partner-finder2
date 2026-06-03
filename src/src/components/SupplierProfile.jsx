import React from 'react'
import { supplierImages } from '../images.js'

const FORMS_URL =
  'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=iGqK65PZUE608K2j3554-FVMlwCuoo1Dg2OoEg1v64ZUMUhKUzZBU0RZRDFHRk00TjI4M1lBMzRUTC4u'

export default function SupplierProfile({ supplier, isAlternative = false }) {
  if (!supplier) return null

  const hasEmail = supplier.contact_email && supplier.contact_email !== 'null'
  const imageUrl = supplierImages[supplier.supplier_image] || null

  return (
    <div className={`supplier-card${isAlternative ? ' is-alternative' : ''}`}>

      {/* Card header: full-width image banner, then name row */}
      <div className="supplier-card-header">

        {/* Full-width image banner */}
        <div className="supplier-image-block">
          {imageUrl ? (
            <img src={imageUrl} alt={`${supplier.supplier_name} project reference`} />
          ) : (
            <>
              <div className="supplier-image-icon">🏢</div>
              <span className="supplier-image-placeholder">
                Supplier image / project reference
              </span>
            </>
          )}
        </div>

        {/* Name + badge + actions — below the image */}
        <div className="supplier-header-info">
          <div className="badge-row">
            {isAlternative ? (
              <div className="alternative-badge">↗ Alternative option</div>
            ) : (
              <div className="recommended-badge">★ Recommended</div>
            )}
          </div>

          <h2 className="supplier-name">{supplier.supplier_name}</h2>
          <p className="supplier-category">{supplier.category}</p>

          {/* Action buttons */}
          <div className="supplier-action-row" style={{ marginTop: 14 }}>
            {hasEmail ? (
              <a href={`mailto:${supplier.contact_email}`} className="btn-contact">
                ✉ Contact supplier
              </a>
            ) : (
              <span className="btn-contact-disabled">Contact to be completed</span>
            )}
            {supplier.website && (
              <a href={supplier.website} target="_blank" rel="noopener noreferrer" className="btn-website">
                ↗ Visit website
              </a>
            )}
          </div>
        </div>

      </div>

      {/* Card body */}
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
            <span className="info-label">Contact person</span>
            <span className="info-value">
              {supplier.contact_person && (
                <span style={{ display: 'block' }}>{supplier.contact_person}</span>
              )}
              {hasEmail && (
                <a href={`mailto:${supplier.contact_email}`}>{supplier.contact_email}</a>
              )}
              {supplier.phone && supplier.phone !== 'null' && (
                <span style={{ display: 'block' }}>
                  <a href={`tel:${supplier.phone}`}>{supplier.phone}</a>
                </span>
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

      {/* Microsoft Forms CTA — inside card, bottom */}
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

    </div>
  )
}
