import React, { useState } from 'react'
import SupplierProfile from './components/SupplierProfile.jsx'
import { scoreSuppliers } from './routing.js'
import { sikaLogo } from './images.js'

// ── Question definitions ──────────────────────────────────────────────────────

const QUESTIONS = [
  {
    id: 'create',
    number: 'Question 1 of 4',
    title: 'What do you want to create today?',
    options: [
      { label: 'Print & POS materials', value: 'print_pos' },
      { label: 'Product display', value: 'product_display' },
      { label: 'Shelving / POS fixture', value: 'shelving' },
      { label: 'Shop-in-Shop / branded retail area', value: 'shop_in_shop' },
      { label: 'Lightbox / illuminated visibility', value: 'lightbox' },
      { label: 'Promotional / event material', value: 'promo_event' },
      { label: 'I am not sure', value: 'not_sure' },
    ],
  },
  {
    id: 'where',
    number: 'Question 2 of 4',
    title: 'Where will it be implemented?',
    options: [
      { label: 'DIY store', value: 'diy_store' },
      { label: "Builders' merchant", value: 'builders_merchant' },
      { label: 'Trade counter', value: 'trade_counter' },
      { label: 'Cash & Carry area', value: 'cash_carry' },
      { label: 'Distributor showroom', value: 'distributor_showroom' },
      { label: 'Internal fair / event', value: 'internal_fair' },
      { label: 'Outdoor / mobile activation', value: 'outdoor_mobile' },
      { label: 'Not defined yet', value: 'not_defined' },
    ],
  },
  {
    id: 'support',
    number: 'Question 3 of 4',
    title: 'What type of support do you need?',
    options: [
      { label: 'Printing only', value: 'printing_only' },
      { label: 'Production only', value: 'production_only' },
      { label: 'Design + production', value: 'design_production' },
      { label: 'Full concept from idea to execution', value: 'full_concept' },
      { label: 'Lightbox / illuminated solution', value: 'lightbox_solution' },
      { label: 'Supplier recommendation only', value: 'recommendation_only' },
      { label: 'Not sure', value: 'not_sure' },
    ],
  },
  {
    id: 'scale',
    number: 'Question 4 of 4',
    title: 'What is the expected scale of the project?',
    options: [
      { label: '1 prototype / first concept', value: 'prototype' },
      { label: '1–5 units', value: '1_5' },
      { label: '5–20 units', value: '5_20' },
      { label: '20–50 units', value: '20_50' },
      { label: '50+ units / rollout', value: '50_plus' },
      { label: 'Not defined yet', value: 'not_defined' },
    ],
  },
]

const STEP = {
  LANDING: 'landing',
  QUESTIONS: 'questions',
  RESULT: 'result',
}

const PARTNER_NAMES = ['Printoclock', 'Propulzija', 'HMY Group', 'Holbox', 'Mobile Lightbox', 'Design4Retail']

// ── Landing visual tiles ──────────────────────────────────────────────────────

const VISUAL_TILES = [
  { icon: '🏪', label: 'Shop-in-Shop', accent: false },
  { icon: '🖨️', label: 'Print & POS', accent: true },
  { icon: '📦', label: 'Displays', accent: false },
  { icon: '💡', label: 'Lightbox', accent: true },
]

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [step, setStep] = useState(STEP.LANDING)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({ create: null, where: null, support: null, scale: null })
  const [result, setResult] = useState(null)

  function handleStart() {
    setStep(STEP.QUESTIONS)
    setQuestionIndex(0)
    setAnswers({ create: null, where: null, support: null, scale: null })
    setResult(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleSelectOption(questionId, value) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  function handleNext() {
    if (questionIndex < QUESTIONS.length - 1) {
      setQuestionIndex((i) => i + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const res = scoreSuppliers(answers)
      setResult(res)
      setStep(STEP.RESULT)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function handleBack() {
    if (questionIndex === 0) {
      setStep(STEP.LANDING)
    } else {
      setQuestionIndex((i) => i - 1)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleRestart() {
    setStep(STEP.LANDING)
    setQuestionIndex(0)
    setAnswers({ create: null, where: null, support: null, scale: null })
    setResult(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentQuestion = QUESTIONS[questionIndex]
  const currentAnswer = answers[currentQuestion?.id]
  const progress = ((questionIndex + 1) / QUESTIONS.length) * 100

  return (
    <div className="app-wrapper">

      {/* ── Header ── */}
      <header className="site-header">
        <div className="header-inner">
          <div className="header-logo-badge">
            <img
              src={sikaLogo}
              alt="Sika"
              className="sika-logo-img"
            />
            <div className="header-divider" />
            <span className="header-app-name">Activation Partner Finder</span>
          </div>
          {step === STEP.RESULT && (
            <button className="btn-secondary" onClick={handleRestart} style={{ fontSize: '13px', padding: '8px 16px' }}>
              ↺ Restart
            </button>
          )}
        </div>
      </header>

      {/* ── Main ── */}
      <main className="main-content">
        <div className="page-container">

          {/* ════ LANDING ════ */}
          {step === STEP.LANDING && (
            <div>

              {/* Hero card */}
              <div className="landing-hero-banner">
                <div className="landing-hero-content">
                  <div className="landing-eyebrow">
                    <span className="landing-eyebrow-dot" />
                    Internal tool — Channel Marketing
                  </div>
                  <h1 className="landing-title">
                    Sika Activation<br />
                    <span className="landing-title-accent">Partner Finder</span>
                  </h1>
                  <p className="landing-subtitle">
                    Find the right partner for POS, displays, visibility, shop-in-shop and promotional execution.
                  </p>
                  <p className="landing-intro">
                    A practical Channel Marketing tool to help Sika teams identify the right supplier for in-store activation, retail execution, promotional materials and branded customer environments.
                  </p>
                  <button className="btn-primary" onClick={handleStart}>
                    Start partner finder →
                  </button>
                </div>

                <div className="landing-hero-visual">
                  <div className="visual-tiles">
                    {VISUAL_TILES.map((t) => (
                      <div key={t.label} className={`visual-tile${t.accent ? ' accent' : ''}`}>
                        <span className="visual-tile-icon">{t.icon}</span>
                        <span className="visual-tile-label">{t.label}</span>
                      </div>
                    ))}
                  </div>
                  <span className="visual-placeholder-label">4 questions · instant match</span>
                </div>
              </div>

              {/* Info strip */}
              <div className="landing-info-strip">
                <div className="info-strip-card">
                  <div className="info-strip-number">4</div>
                  <div className="info-strip-label">Quick questions</div>
                  <div className="info-strip-sub">Answer four simple questions about your project need.</div>
                </div>
                <div className="info-strip-card">
                  <div className="info-strip-number">6</div>
                  <div className="info-strip-label">Validated partners</div>
                  <div className="info-strip-sub">Each partner is vetted for European activation projects.</div>
                </div>
                <div className="info-strip-card">
                  <div className="info-strip-number">1</div>
                  <div className="info-strip-label">Clear recommendation</div>
                  <div className="info-strip-sub">One focused supplier match with contact and next steps.</div>
                </div>
              </div>

              {/* Partners strip */}
              <div className="partners-strip" style={{ marginTop: 16 }}>
                <p className="partners-strip-label">Available MVP partners</p>
                <div className="partner-chips">
                  {PARTNER_NAMES.map((name) => (
                    <span key={name} className="partner-chip">{name}</span>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ════ QUESTIONS ════ */}
          {step === STEP.QUESTIONS && (
            <div className="question-flow">
              <div className="progress-bar-wrapper">
                <div className="progress-meta">
                  <span className="progress-step-label">{currentQuestion.number}</span>
                  <span className="progress-count">{questionIndex + 1} / {QUESTIONS.length}</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
              </div>

              <div className="question-card" key={questionIndex}>
                <p className="question-number">{currentQuestion.number}</p>
                <h2 className="question-title">{currentQuestion.title}</h2>

                <div className="options-grid">
                  {currentQuestion.options.map((opt) => (
                    <button
                      key={opt.value}
                      className={`option-btn${currentAnswer === opt.value ? ' selected' : ''}`}
                      onClick={() => handleSelectOption(currentQuestion.id, opt.value)}
                    >
                      <span className="option-dot" />
                      {opt.label}
                    </button>
                  ))}
                </div>

                <div className="question-nav">
                  <button className="btn-secondary" onClick={handleBack}>← Back</button>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span className="question-hint">Select one option to continue</span>
                    <button
                      className="btn-primary"
                      onClick={handleNext}
                      disabled={!currentAnswer}
                    >
                      {questionIndex < QUESTIONS.length - 1 ? 'Next →' : 'Find partner →'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ════ RESULT ════ */}
          {step === STEP.RESULT && result && (
            <div className="result-wrapper">

              {/* Top bar with Restart */}
              <div className="result-topbar">
                <div className="result-topbar-left">
                  <div className="result-eyebrow">✓ Recommendation ready</div>
                  <h2 className="result-title">Your recommended partner</h2>
                  <p className="result-subtitle">Based on your answers, here is the most suitable execution partner for your project.</p>
                </div>
                <button className="btn-secondary" onClick={handleRestart}>
                  ↺ Restart
                </button>
              </div>

              {/* Primary recommendation */}
              <SupplierProfile supplier={result.primary} isAlternative={false} />

              {/* Alternative */}
              {result.alternative && (
                <div className="alt-section">
                  <p className="alt-label">You may also consider</p>
                  <SupplierProfile supplier={result.alternative} isAlternative={true} />
                </div>
              )}

            </div>
          )}

        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="site-footer">
        <div className="footer-inner">
          <span className="footer-text">
            Sika Activation Partner Finder — Internal use only. Sika EMEA Channel Marketing.
          </span>
          <span className="footer-badge">
            <img src={sikaLogo} alt="Sika" style={{ height: '28px', width: 'auto' }} />
            MVP v1.0
          </span>
        </div>
      </footer>

    </div>
  )
}
