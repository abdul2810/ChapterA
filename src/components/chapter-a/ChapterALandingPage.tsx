import { useEffect, useState } from "react";
import { Container, Row, Col, Navbar, Nav, Offcanvas, Accordion } from "react-bootstrap";
import { ContactModal, type ServiceOption } from "./ContactModal";

import {
  Upload,
  Sparkles,
  LayoutTemplate,
  BookOpen,
  Coins,
  ArrowRight,
  Quote,
  Menu,
  X,
} from "lucide-react";

import servicesDesk from '../../assets/services-desk.jpg';
import bgLibrary from '../../assets/bg-library.jpg';
import bgProblem from '../../assets/bg-problem.jpg';


const NAV = [
  { label: "Workflow", href: "#workflow" },
  { label: "Services", href: "#services" },
  { label: "Why ChapterA", href: "#why" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export function ChapterALandingPage() {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState<ServiceOption>("New Book Project");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const openContactModal = (preselect: ServiceOption) => {
    setService(preselect);
    setOpen(true);
    setMenuOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-vh-100 bg-paper text-ink">
      <Header
        scrolled={scrolled}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        onCta={() => openContactModal("New Book Project")}
      />

      <main>
        <Hero onCta={openContactModal} />
        <Problem />
        <Workflow onCta={openContactModal} />
        <Services onCta={openContactModal} />
        <WhyChapterA onCta={openContactModal} />
        <Testimonials onCta={openContactModal} />
        <Faq />
        <FinalCta onCta={openContactModal} />
      </main>

      <Footer />

      <ContactModal open={open} onOpenChange={setOpen} selectedService={service} />
    </div>
  );
}

/* ---------- Logo ---------- */
function Logo() {
  return (
    <a href="#top" className="serif text-decoration-none" style={{ fontSize: "1.5rem" }}>
      <span className="text-ink">Chapter</span>
      <span className="text-gold fst-italic">A</span>
    </a>
  );
}

/* ---------- Header ---------- */
function Header({
  scrolled,
  menuOpen,
  setMenuOpen,
  onCta,
}: {
  scrolled: boolean;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  onCta: () => void;
}) {
  return (
    <header id="top" className={`ca-nav ${scrolled ? "scrolled" : ""}`}>
      <Container className="d-flex align-items-center justify-content-between" style={{ height: 80 }}>
        <Logo />
        <Nav className="d-none d-lg-flex gap-4 align-items-center">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="nav-link-ca">
              {n.label}
            </a>
          ))}
        </Nav>
        <div className="d-flex align-items-center gap-2">
          <button onClick={onCta} className="btn-ink d-none d-sm-inline-flex">
            Get Publishing Support
          </button>
          <button
            className="btn btn-link d-lg-none text-ink p-2"
            onClick={() => setMenuOpen(true)}
            aria-label="Menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </Container>

      <Offcanvas
        show={menuOpen}
        onHide={() => setMenuOpen(false)}
        placement="end"
        style={{ background: "var(--paper)" }}
      >
        <Offcanvas.Header>
          <Logo />
          <button
            className="btn btn-link text-ink ms-auto p-2"
            onClick={() => setMenuOpen(false)}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="d-flex flex-column gap-3">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setMenuOpen(false)}
                className="text-ink text-decoration-none fs-5"
              >
                {n.label}
              </a>
            ))}
            <button onClick={onCta} className="btn-ink mt-2 w-100 justify-content-center">
              Get Publishing Support
            </button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero({ onCta }: { onCta: (s: ServiceOption) => void }) {
  return (
    <section className="position-relative overflow-hidden">
      <Container className="pt-5 pt-lg-5 pb-5 pb-lg-5" style={{ paddingTop: "4rem", paddingBottom: "6rem" }}>
        <Row className="g-5 align-items-center">
          <Col lg={7}>
            <p className="eyebrow">ChapterA · Est. for Authors</p>
            <h1 className="h-display mt-3">
              From manuscript
              <br />
              to <span className="fst-italic text-gold">published</span> book —
              <br />
              with AI and expert
              <br />
              publishing support.
            </h1>
            <div className="gold-rule-short mt-4" />
            <p className="mt-3 text-muted-ink" style={{ maxWidth: 540, fontSize: "1.05rem", lineHeight: 1.7 }}>
              Upload your <span className="text-ink fw-medium">.doc or .docx</span> manuscript.
              ChapterA proofreads, shapes the design, supports publishing, and
              guides you toward royalties — the editorial team you should have
              had from the start.
            </p>
            <div className="mt-4 d-flex flex-wrap gap-3">
              <button onClick={() => onCta("New Book Project")} className="btn-ink">
                Start My Book Project
                <ArrowRight size={16} />
              </button>
              <button onClick={() => onCta("Manuscript Review")} className="btn-gold-outline">
                Talk to ChapterA
              </button>
            </div>
            <div className="mt-5 d-flex align-items-center gap-4 text-muted-ink" style={{ fontSize: "0.75rem" }}>
              <Stat label="Authors guided" value="380+" />
              <Divider />
              <Stat label="Titles published" value="142" />
              <Divider />
              <Stat label="Avg. review" value="4.9 ★" />
            </div>
          </Col>

          <Col lg={5}>
            <div className="manuscript-frame mx-auto" style={{ maxWidth: 420 }}>
              <div
                className="bg-paper p-4 p-sm-5"
                style={{
                  border: "1px solid var(--border)",
                  boxShadow: "0 30px 80px -30px rgba(0,0,0,0.25)",
                }}
              >
                <div className="d-flex justify-content-between text-uppercase tracking-wider text-muted-ink" style={{ fontSize: "0.65rem" }}>
                  <span>Manuscript</span>
                  <span>Folio 01</span>
                </div>
                <div className="gold-rule-short mt-3" />
                <p className="chapter-num mt-4 mb-2" style={{ fontSize: "0.95rem" }}>
                  Chapter I
                </p>
                <h3 className="serif" style={{ fontSize: "1.85rem", lineHeight: 1.2 }}>
                  The Quiet Beginning
                </h3>
                <p className="drop-cap mt-3 text-muted-ink" style={{ fontSize: "0.95rem", lineHeight: 1.7 }}>
                  She had written for years before anyone asked to read a single
                  page, and even then the question came shyly, in a borrowed
                  voice, as though the world were not quite ready to admit it had
                  been waiting.
                </p>
                <div className="d-flex justify-content-between mt-4 text-muted-ink" style={{ fontSize: "0.7rem" }}>
                  <span className="fst-italic">— draft.docx</span>
                  <span className="text-gold tracking-wide text-uppercase" style={{ fontSize: "0.65rem" }}>
                    Under review
                  </span>
                </div>
              </div>
              <div
                className="bg-ink text-paper position-absolute tracking-wider text-uppercase"
                style={{
                  bottom: -24,
                  right: -24,
                  padding: "0.75rem 1.25rem",
                  fontSize: "0.65rem",
                }}
              >
                Ch. A · Editorial
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="serif text-ink" style={{ fontSize: "1.5rem" }}>{value}</div>
      <div className="tracking-wide text-uppercase mt-1" style={{ fontSize: "0.65rem" }}>{label}</div>
    </div>
  );
}
function Divider() {
  return <span style={{ height: 32, width: 1, background: "var(--border)" }} />;
}

/* ---------- Problem ---------- */
// function Problem() {
//   return (
//     <section
//       className="text-paper position-relative overflow-hidden"
//       style={{
//         backgroundImage: `linear-gradient(rgba(14,14,14,0.88), rgba(14,14,14,-0.08)), url(${bgProblem})`,
//         backgroundSize: "contain",
//         backgroundPosition: "center",
//       }}
//     >
//       <Container className="section-pad">
//         <Row className="g-4">
//           <Col lg={5}>
//             <p className="eyebrow">The honest truth</p>
//             <h2 className="h-section text-paper mt-3">
//               You finished the writing.
//               <br />
//               <span className="fst-italic text-gold">Now comes the difficult part.</span>
//             </h2>
//           </Col>
//           <Col lg={7}>
//             <div style={{ color: "rgba(247,243,236,0.75)", lineHeight: 1.7, fontSize: "1.05rem" }}>
//               <p>
//                 Most authors close the last chapter expecting clarity, and instead
//                 find a wall — editing standards they were never taught, formatting
//                 traps that break on every device, cover briefs they don't know how
//                 to write, and distribution paperwork that quietly buries the book.
//               </p>
//               <p>
//                 ChapterA was built for exactly that moment. A small editorial team,
//                 assisted by careful AI, takes your draft and walks it through every
//                 stage that stands between a finished manuscript and a real,
//                 royalty-earning book.
//               </p>
//             </div>
//             <Row className="g-3 pt-3" style={{ color: "rgba(247,243,236,0.85)", fontSize: "0.9rem" }}>
//               {[
//                 "Inconsistent edits & typos",
//                 "Messy typography & spacing",
//                 "Cover design uncertainty",
//                 "Confusing publishing requirements",
//                 "Royalty structures left unclear",
//                 "No clear timeline or next step",
//               ].map((p) => (
//                 <Col sm={6} key={p} className="d-flex align-items-start gap-2">
//                   <span style={{ marginTop: 10, height: 1, width: 16, background: "var(--gold)", flexShrink: 0 }} />
//                   <span>{p}</span>
//                 </Col>
//               ))}
//             </Row>
//           </Col>
//         </Row>
//       </Container>
//     </section>
//   );
// }

function Problem() {
  return (
    <>
      <style>
        {`

          @media (max-width: 768px) {

            .problem-section {
              background-size: cover !important;
              background-position: center !important;
            }

            .problem-heading {
              font-size: 2rem !important;
              line-height: 1.2 !important;
            }

            .problem-text {
              font-size: 0.95rem !important;
              line-height: 1.7 !important;
            }

            .problem-points {
              margin-top: 1rem !important;
            }

            .problem-point-text {
              font-size: 0.88rem !important;
              line-height: 1.5 !important;
            }
          }

          @media (max-width: 480px) {

            .problem-heading {
              font-size: 1.7rem !important;
            }

            .problem-text {
              font-size: 0.9rem !important;
            }

            .problem-points .col-sm-6 {
              width: 100%;
            }
          }
        `}
      </style>

      <section
        className="problem-section text-paper position-relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(14,14,14,0.88), rgba(14,14,14,-0.08)), url(${bgProblem})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      >
        <Container className="section-pad">
          <Row className="g-4">
            <Col lg={5}>
              <p className="eyebrow">The honest truth</p>

              <h2 className="problem-heading h-section text-paper mt-3">
                You finished the writing.
                <br />
                <span className="fst-italic text-gold">
                  Now comes the difficult part.
                </span>
              </h2>
            </Col>

            <Col lg={7}>
              <div
                className="problem-text"
                style={{
                  color: "rgba(247,243,236,0.75)",
                  lineHeight: 1.7,
                  fontSize: "1.05rem",
                }}
              >
                <p>
                  Most authors close the last chapter expecting clarity, and
                  instead find a wall — editing standards they were never
                  taught, formatting traps that break on every device, cover
                  briefs they don't know how to write, and distribution
                  paperwork that quietly buries the book.
                </p>

                <p>
                  ChapterA was built for exactly that moment. A small editorial
                  team, assisted by careful AI, takes your draft and walks it
                  through every stage that stands between a finished manuscript
                  and a real, royalty-earning book.
                </p>
              </div>

              <Row
                className="problem-points g-3 pt-3"
                style={{
                  color: "rgba(247,243,236,0.85)",
                  fontSize: "0.9rem",
                }}
              >
                {[
                  "Inconsistent edits & typos",
                  "Messy typography & spacing",
                  "Cover design uncertainty",
                  "Confusing publishing requirements",
                  "Royalty structures left unclear",
                  "No clear timeline or next step",
                ].map((p) => (
                  <Col
                    sm={6}
                    key={p}
                    className="d-flex align-items-start gap-2"
                  >
                    <span
                      style={{
                        marginTop: 10,
                        height: 1,
                        width: 16,
                        background: "var(--gold)",
                        flexShrink: 0,
                      }}
                    />

                    <span className="problem-point-text">{p}</span>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

/* ---------- Workflow ---------- */
const STEPS: {
  step: string;
  title: string;
  body: string;
  icon: typeof Upload;
  service: ServiceOption;
  cta: string;
}[] = [
  {
    step: "I",
    title: "Manuscript Upload",
    body: "Send us your .doc or .docx draft. We open it the way an editor opens a letter — quietly, in full, with your intent as the center.",
    icon: Upload,
    service: "Manuscript Review",
    cta: "Upload Manuscript",
  },
  {
    step: "II",
    title: "AI Proofreading",
    body: "Sentence-level review for grammar, consistency, tense, and rhythm — proposed as suggestions, never silently rewritten over your voice.",
    icon: Sparkles,
    service: "AI Proofreading",
    cta: "Ask About Proofreading",
  },
  {
    step: "III",
    title: "Design & Formatting",
    body: "Typography, hierarchy, chapter openings, page layout, and cover direction tuned for both print and e-book editions.",
    icon: LayoutTemplate,
    service: "Design & Formatting",
    cta: "Plan the Design",
  },
  {
    step: "IV",
    title: "Publishing Support",
    body: "ISBN, metadata, distribution setup, and submissions handled end-to-end across Amazon KDP, Apple Books, and global retail.",
    icon: BookOpen,
    service: "Publishing Support",
    cta: "Start Publishing",
  },
  {
    step: "V",
    title: "Royalties Guidance",
    body: "We help you read the contracts, choose the right model, and structure long-term royalties so the book continues to earn for you.",
    icon: Coins,
    service: "Royalty Consultation",
    cta: "Plan My Royalties",
  },
];

function Workflow({ onCta }: { onCta: (s: ServiceOption) => void }) {
  return (
    <section id="workflow" className="section-pad">
      <Container>
        <div style={{ maxWidth: 640 }}>
          <p className="eyebrow">The Workflow</p>
          <h2 className="h-section mt-3">
            Five chapters between
            <br />
            <span className="fst-italic text-gold">your draft and your book.</span>
          </h2>
          <div className="gold-rule-short mt-3" />
        </div>

        <div className="mt-5">
          {STEPS.map((s, i) => (
            <Row
              key={s.step}
              className="g-3 g-lg-4 py-4 align-items-start"
              style={{
                borderTop: "1px solid var(--border)",
                ...(i === STEPS.length - 1 ? { borderBottom: "1px solid var(--border)" } : {}),
              }}
            >
              <Col lg={2}>
                <div className="d-flex align-items-baseline gap-2">
                  <span className="chapter-num" style={{ fontSize: "2.25rem" }}>{s.step}</span>
                  <span className="tracking-wider text-uppercase text-muted-ink" style={{ fontSize: "0.65rem" }}>
                    Step {i + 1}
                  </span>
                </div>
              </Col>
              <Col lg={2}>
                <div
                  className="d-inline-flex align-items-center justify-content-center"
                  style={{ height: 56, width: 56, border: "1px solid rgba(184,146,74,0.6)" }}
                >
                  <s.icon size={22} strokeWidth={1.4} />
                </div>
              </Col>
              <Col lg={5}>
                <h3 className="serif" style={{ fontSize: "1.75rem" }}>{s.title}</h3>
                <p className="mt-2 text-muted-ink" style={{ lineHeight: 1.7 }}>{s.body}</p>
              </Col>
              <Col lg={3} className="text-lg-end">
                <button onClick={() => onCta(s.service)} className="btn-gold-outline">
                  {s.cta}
                  <ArrowRight size={14} />
                </button>
              </Col>
            </Row>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- Services ---------- */
const SERVICES: { title: string; body: string; service: ServiceOption }[] = [
  { title: "Manuscript Intake", body: "Structured read-through of your full draft with a written editorial assessment, scope, and timeline.", service: "Manuscript Review" },
  { title: "AI Proofreading", body: "Hybrid AI + human pass for grammar, punctuation, tense, and consistency — voice preserved.", service: "AI Proofreading" },
  { title: "Typography Cleanup", body: "Smart quotes, hyphenation, widows, orphans, leading, and tracking — finalized for press.", service: "Design & Formatting" },
  { title: "Layout Formatting", body: "Interior layout for print and reflowable e-book, chapter openings, and front/back matter.", service: "Design & Formatting" },
  { title: "Cover Support", body: "Cover concepts, typography direction, and final print-ready files including spine and back.", service: "Cover Support" },
  { title: "Publishing Support", body: "ISBN, metadata, categories, keywords, KDP / IngramSpark / Apple Books setup and submission.", service: "Publishing Support" },
  { title: "Royalty Consultation", body: "Contract review, royalty model selection, and long-term earning strategy across territories.", service: "Royalty Consultation" },
];

// function Services({ onCta }: { onCta: (s: ServiceOption) => void }) {
//   return (
//     <section
//       id="services"
//       className="section-pad"
//       style={{ background: "rgba(230,224,212,0.35)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
//     >
//       <Container>
//         <Row className="g-4 align-items-end">
//           <Col lg={7}>
//             <p className="eyebrow">The Services</p>
//             <h2 className="h-section mt-3">
//               Editorial craft, <span className="fst-italic text-gold">à la carte</span>.
//             </h2>
//           </Col>
//           <Col lg={5}>
//             <p className="text-muted-ink mb-0" style={{ lineHeight: 1.7 }}>
//               Pick the parts of the publishing process you'd like help with —
//               most authors choose three or four. Each engagement is scoped, fixed
//               in price, and led by a named editor.
//             </p>
//           </Col>
//         </Row>

//         <Row className="g-0 mt-5" style={{ background: "var(--border)", border: "1px solid var(--border)" }}>
//           {SERVICES.map((s, i) => (
//             <Col sm={6} lg={4} key={s.title} style={{ borderRight: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
//               <article className="service-card h-100">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <span className="chapter-num" style={{ fontSize: "1.5rem" }}>
//                     {String(i + 1).padStart(2, "0")}
//                   </span>
//                   <span style={{ height: 1, width: 40, background: "rgba(184,146,74,0.6)" }} />
//                 </div>
//                 <h3 className="serif mt-4" style={{ fontSize: "1.5rem" }}>{s.title}</h3>
//                 <p className="mt-2 text-muted-ink" style={{ fontSize: "0.95rem", lineHeight: 1.7 }}>{s.body}</p>
//                 <button
//                   onClick={() => onCta(s.service)}
//                   className="btn btn-link p-0 mt-3 d-inline-flex align-items-center gap-2 text-ink text-decoration-none tracking-wide text-uppercase"
//                   style={{ fontSize: "0.7rem" }}
//                 >
//                   Enquire <ArrowRight size={14} />
//                 </button>
//               </article>
//             </Col>
//           ))}
//           <Col sm={6} lg={4} className="bg-ink text-paper d-flex flex-column justify-content-between p-4 p-lg-5">
//             <div>
//               <p className="eyebrow">Bespoke</p>
//               <h3 className="serif text-paper mt-4" style={{ fontSize: "1.5rem" }}>
//                 A full publishing partnership.
//               </h3>
//               <p className="mt-2" style={{ color: "rgba(247,243,236,0.7)", fontSize: "0.95rem", lineHeight: 1.7 }}>
//                 Hand the entire process to ChapterA — from draft to royalties.
//               </p>
//             </div>
//             <button
//               onClick={() => onCta("New Book Project")}
//               className="btn btn-link p-0 mt-3 align-self-start text-gold text-decoration-none tracking-wide text-uppercase d-inline-flex align-items-center gap-2"
//               style={{ fontSize: "0.7rem" }}
//             >
//               Start a Project <ArrowRight size={14} />
//             </button>
//           </Col>
//         </Row>
//       </Container>
//     </section>
//   );
// }

function Services({ onCta }: { onCta: (s: ServiceOption) => void }) {
  return (
    <section
      id="services"
      className="section-pad"
      style={{ background: "rgba(230,224,212,0.35)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
    >
      <Container>
        <Row className="g-4 align-items-end">
          <Col lg={7}>
            <p className="eyebrow">The Services</p>
            <h2 className="h-section mt-3">
              Editorial craft, <span className="fst-italic text-gold">à la carte</span>.
            </h2>
          </Col>
          <Col lg={5}>
            <p className="text-muted-ink mb-0" style={{ lineHeight: 1.7 }}>
              Pick the parts of the publishing process you'd like help with —
              most authors choose three or four. Each engagement is scoped, fixed
              in price, and led by a named editor.
            </p>
          </Col>
        </Row>

        <div className="mt-5" style={{ overflow: "hidden", border: "1px solid var(--border)", position: "relative" }}>
          <img
            src={servicesDesk}
            alt="Editor's desk with manuscripts, pen and reading glasses"
            loading="lazy"
            width={1600}
            height={1024}
            style={{ width: "100%", height: 280, objectFit: "cover", display: "block" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(247,243,236,0.05) 0%, rgba(14,14,14,0.55) 100%)",
            }}
          />
          <div
            className="position-absolute text-paper p-4"
            style={{ bottom: 0, left: 0, right: 0 }}
          >
            <p className="eyebrow text-gold mb-1">Studio</p>
            <p className="serif mb-0" style={{ fontSize: "1.35rem" }}>
              One desk. One editor. <span className="fst-italic text-gold">Your manuscript.</span>
            </p>
          </div>
        </div>


        <Row className="g-0 mt-5" style={{ background: "var(--border)", border: "1px solid var(--border)" }}>
          {SERVICES.map((s, i) => (
            <Col sm={6} lg={4} key={s.title} style={{ borderRight: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
              <article className="service-card h-100">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="chapter-num" style={{ fontSize: "1.5rem" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ height: 1, width: 40, background: "rgba(184,146,74,0.6)" }} />
                </div>
                <h3 className="serif mt-4" style={{ fontSize: "1.5rem" }}>{s.title}</h3>
                <p className="mt-2 text-muted-ink" style={{ fontSize: "0.95rem", lineHeight: 1.7 }}>{s.body}</p>
                <button
                  onClick={() => onCta(s.service)}
                  className="btn btn-link p-0 mt-3 d-inline-flex align-items-center gap-2 text-ink text-decoration-none tracking-wide text-uppercase"
                  style={{ fontSize: "0.7rem" }}
                >
                  Enquire <ArrowRight size={14} />
                </button>
              </article>
            </Col>
          ))}
          <Col sm={6} lg={4} className="bg-ink text-paper d-flex flex-column justify-content-between p-4 p-lg-5">
            <div>
              <p className="eyebrow">Bespoke</p>
              <h3 className="serif text-paper mt-4" style={{ fontSize: "1.5rem" }}>
                A full publishing partnership.
              </h3>
              <p className="mt-2" style={{ color: "rgba(247,243,236,0.7)", fontSize: "0.95rem", lineHeight: 1.7 }}>
                Hand the entire process to ChapterA — from draft to royalties.
              </p>
            </div>
            <button
              onClick={() => onCta("New Book Project")}
              className="btn btn-link p-0 mt-3 align-self-start text-gold text-decoration-none tracking-wide text-uppercase d-inline-flex align-items-center gap-2"
              style={{ fontSize: "0.7rem" }}
            >
              Start a Project <ArrowRight size={14} />
            </button>
          </Col>
        </Row>
      </Container>
    </section>
  );
}


/* ---------- Why ChapterA ---------- */
function WhyChapterA({ onCta }: { onCta: (s: ServiceOption) => void }) {
  const reasons = [
    { h: "An editor, not an algorithm.", p: "AI accelerates the careful work; a named editor signs off on every page that leaves our desk." },
    { h: "Royalty-first thinking.", p: "Decisions on format, pricing, and platform are made to maximize what you actually earn." },
    { h: "Publishing without the maze.", p: "ISBNs, metadata, KDP, IngramSpark, Apple Books — handled, documented, and explained." },
    { h: "Editorial tone, always.", p: "Your voice is the brief. Our job is to remove the friction between it and the reader." },
  ];
  return (
    <section id="why" className="section-pad">
      <Container>
        <Row className="g-5">
          <Col lg={5}>
            <p className="eyebrow">Why ChapterA</p>
            <h2 className="h-section mt-3">
              A publishing house
              <br />
              <span className="fst-italic text-gold">for one author at a time.</span>
            </h2>
            <div className="gold-rule-short mt-3" />
            <p className="mt-3 text-muted-ink" style={{ lineHeight: 1.7 }}>
              ChapterA isn't a marketplace, a template, or a self-serve tool.
              It's a small editorial team that takes one manuscript seriously at
              a time — yours.
            </p>
            <button onClick={() => onCta("General Enquiry")} className="btn-ink mt-4">
              Speak With Our Team
            </button>
          </Col>
          <Col lg={7}>
            <Row className="g-0" style={{ border: "1px solid var(--border)", background: "var(--border)" }}>
              {reasons.map((r) => (
                <Col sm={6} key={r.h} style={{ borderRight: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
                  <div className="bg-paper p-4 h-100">
                    <span className="d-block" style={{ height: 1, width: 32, background: "var(--gold)" }} />
                    <h3 className="serif mt-3" style={{ fontSize: "1.25rem", lineHeight: 1.3 }}>{r.h}</h3>
                    <p className="mt-2 text-muted-ink" style={{ fontSize: "0.95rem", lineHeight: 1.7 }}>{r.p}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

/* ---------- Testimonials ---------- */
// function Testimonials({ onCta }: { onCta: (s: ServiceOption) => void }) {
//   return (
//     <section className="bg-ink text-paper section-pad position-relative overflow-hidden">
//       <Container style={{ maxWidth: 880 }} className="text-center">
//         <Quote className="text-gold mx-auto" size={40} strokeWidth={1.2} />
//         <p className="serif mt-4" style={{ fontSize: "1.85rem", lineHeight: 1.35 }}>
//           "I had three years of writing in a folder. ChapterA turned it into a
//           book on shelves in four months — without ever flattening my voice. It
//           was the first time the publishing process felt
//           <span className="fst-italic text-gold"> kind</span>."
//         </p>
//         <div className="mt-4 d-flex align-items-center justify-content-center gap-3" style={{ color: "rgba(247,243,236,0.7)" }}>
//           <span className="serif text-paper">Mira Halvorsen</span>
//           <span style={{ height: 1, width: 32, background: "var(--gold)" }} />
//           <span className="tracking-wide text-uppercase" style={{ fontSize: "0.7rem" }}>
//             Author, <em>Northwater</em>
//           </span>
//         </div>
//         <button
//           onClick={() => onCta("Manuscript Review")}
//           className="btn-gold-outline mt-5"
//           style={{ color: "var(--paper)" }}
//         >
//           Request a Manuscript Review
//         </button>
//       </Container>
//     </section>
//   );
// }

function Testimonials({ onCta }: { onCta: (s: ServiceOption) => void }) {
  return (
    <section
      className="bg-ink text-paper section-pad position-relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(14,14,14,0.82), rgba(14,14,14,-0.08)), url(${bgLibrary})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container style={{ maxWidth: 880, position: "relative", zIndex: 1 }} className="text-center">

        <Quote className="text-gold mx-auto" size={40} strokeWidth={1.2} />
        <p className="serif mt-4" style={{ fontSize: "1.85rem", lineHeight: 1.35 }}>
          "I had three years of writing in a folder. ChapterA turned it into a
          book on shelves in four months — without ever flattening my voice. It
          was the first time the publishing process felt
          <span className="fst-italic text-gold"> kind</span>."
        </p>
        <div className="mt-4 d-flex align-items-center justify-content-center gap-3" style={{ color: "rgba(247,243,236,0.7)" }}>
          <span className="serif text-paper">Mira Halvorsen</span>
          <span style={{ height: 1, width: 32, background: "var(--gold)" }} />
          <span className="tracking-wide text-uppercase" style={{ fontSize: "0.7rem" }}>
            Author, <em>Northwater</em>
          </span>
        </div>
        <button
          onClick={() => onCta("Manuscript Review")}
          className="btn-gold-outline mt-5"
          style={{ color: "var(--paper)" }}
        >
          Request a Manuscript Review
        </button>
      </Container>
    </section>
  );
}


/* ---------- FAQ ---------- */
const FAQS = [
  { q: "Do you work with first-time authors?", a: "Yes — most of our authors are publishing their first book. Our intake call is built specifically to demystify the process." },
  { q: "What file formats do you accept?", a: "Standard .doc and .docx manuscripts. We can also work from Google Docs or Pages exports if needed." },
  { q: "Is the AI proofreading the only edit?", a: "No. AI is one pass. A human editor reviews every suggestion, and a senior editor signs off before formatting begins." },
  { q: "Will I keep my royalties?", a: "Always. ChapterA is a service, not a publisher. You keep 100% of your royalties; we help you structure them." },
  { q: "How long does the full process take?", a: "Typical book projects run 10–16 weeks from manuscript intake to listed for sale, depending on length and scope." },
  { q: "Can you help with just one stage?", a: "Absolutely — about half of our authors come to us for a single service such as proofreading or cover design." },
];

function Faq() {
  return (
    <section id="faq" className="section-pad">
      <Container style={{ maxWidth: 1080 }}>
        <Row className="g-5">
          <Col lg={4}>
            <p className="eyebrow">FAQ</p>
            <h2 className="h-section mt-3">
              Quiet <span className="fst-italic text-gold">answers</span> to the loud questions.
            </h2>
            <div className="gold-rule-short mt-3" />
          </Col>
          <Col lg={8}>
            <Accordion className="ca-accordion" defaultActiveKey="0" flush>
              {FAQS.map((f, i) => (
                <Accordion.Item key={f.q} eventKey={String(i)}>
                  <Accordion.Header>
                    <span className="d-flex align-items-baseline gap-3">
                      <span className="chapter-num" style={{ fontSize: "1rem", fontStyle: "normal" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{f.q}</span>
                    </span>
                  </Accordion.Header>
                  <Accordion.Body>{f.a}</Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

/* ---------- Final CTA ---------- */
function FinalCta({ onCta }: { onCta: (s: ServiceOption) => void }) {
  return (
    <section
      id="contact"
      className="section-pad bg-paper position-relative"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <Container style={{ maxWidth: 880 }} className="text-center">
        <p className="eyebrow">Chapter A · Final Page</p>
        <h2 className="serif mt-4" style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)", lineHeight: 1.05, fontWeight: 400 }}>
          Your manuscript has already become
          <br />
          <span className="fst-italic text-gold">a story.</span>
          <br />
          Let ChapterA turn it into a published book.
        </h2>
        <div className="gold-rule mt-5 mx-auto" style={{ maxWidth: 360 }} />
        <button
          onClick={() => onCta("New Book Project")}
          className="btn-ink mt-5"
          style={{ padding: "1.1rem 2.5rem" }}
        >
          Begin My Book Project
          <ArrowRight size={16} />
        </button>
        <p className="mt-3 text-muted-ink" style={{ fontSize: "0.75rem", letterSpacing: "0.04em" }}>
          One submission. One editor. One published book.
        </p>
      </Container>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="bg-ink" style={{ color: "rgba(247,243,236,0.7)" }}>
      <Container className="py-5">
        <Row className="g-4">
          <Col lg={6}>
            <span className="serif text-paper" style={{ fontSize: "1.5rem" }}>
              Chapter<span className="text-gold fst-italic">A</span>
            </span>
            <p className="mt-3" style={{ maxWidth: 380, color: "rgba(247,243,236,0.55)", lineHeight: 1.7 }}>
              An editorial studio for independent authors. Manuscript to royalties,
              with AI assistance and a named editor on every page.
            </p>
          </Col>
          <Col sm={6} lg={3}>
            <p className="eyebrow" style={{ color: "rgba(247,243,236,0.6)" }}>Studio</p>
            <ul className="list-unstyled mt-3 d-flex flex-column gap-2">
              <li><a href="#workflow" className="text-decoration-none" style={{ color: "rgba(247,243,236,0.7)" }}>Workflow</a></li>
              <li><a href="#services" className="text-decoration-none" style={{ color: "rgba(247,243,236,0.7)" }}>Services</a></li>
              <li><a href="#why" className="text-decoration-none" style={{ color: "rgba(247,243,236,0.7)" }}>Why ChapterA</a></li>
            </ul>
          </Col>
          <Col sm={6} lg={3}>
            <p className="eyebrow" style={{ color: "rgba(247,243,236,0.6)" }}>Contact</p>
            <ul className="list-unstyled mt-3 d-flex flex-column gap-2" style={{ color: "rgba(247,243,236,0.7)" }}>
              <li>hello@chaptera.studio</li>
              <li>Mon – Fri · 9 to 6</li>
            </ul>
          </Col>
        </Row>
      </Container>
      <div style={{ borderTop: "1px solid rgba(247,243,236,0.1)" }}>
        <Container className="py-3 d-flex flex-column flex-sm-row justify-content-between gap-2" style={{ fontSize: "0.75rem", color: "rgba(247,243,236,0.4)" }}>
          <span>© {new Date().getFullYear()} ChapterA Editorial Studio.</span>
          <span className="tracking-wide text-uppercase">Bound in ink. Finished in gold.</span>
        </Container>
      </div>
    </footer>
  );
}
