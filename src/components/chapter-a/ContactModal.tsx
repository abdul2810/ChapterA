import { useEffect, useState } from "react";
import { Modal, Form, Row, Col } from "react-bootstrap";
import { CheckCircle2 } from "lucide-react";

export const SERVICE_OPTIONS = [
  "New Book Project",
  "AI Proofreading",
  "Design & Formatting",
  "Cover Support",
  "Publishing Support",
  "Manuscript Review",
  "Royalty Consultation",
  "General Enquiry",
] as const;

export type ServiceOption = (typeof SERVICE_OPTIONS)[number];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedService: ServiceOption;
}

export function ContactModal({ open, onOpenChange, selectedService }: Props) {
  const [service, setService] = useState<ServiceOption>(selectedService);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (open) {
      setService(selectedService);
      setSubmitted(false);
    }
  }, [open, selectedService]);

  return (
    <Modal
      show={open}
      onHide={() => onOpenChange(false)}
      centered
      size="lg"
      dialogClassName="ca-modal"
      aria-labelledby="ca-modal-title"
    >
      <Modal.Body className="p-4 p-sm-5">
        {submitted ? (
          <div className="py-5 text-center">
            <CheckCircle2 className="text-gold mx-auto" size={48} strokeWidth={1.2} />
            <h3 className="serif mt-4" style={{ fontSize: "1.75rem" }}>
              Thank you.
            </h3>
            <p className="text-muted-ink mt-3 mx-auto" style={{ maxWidth: 360 }}>
              Your ChapterA request has been received. A publishing consultant
              will reach out within one business day.
            </p>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="btn-ink mt-4"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <p className="eyebrow mb-2">Editorial Intake</p>
              <h2 id="ca-modal-title" className="serif" style={{ fontSize: "2rem", lineHeight: 1.1 }}>
                Let's talk about your{" "}
                <span className="fst-italic text-gold">book project</span>.
              </h2>
              <div className="gold-rule-short mt-3" />
              <p className="text-muted-ink mt-3 mb-0" style={{ fontSize: "0.95rem" }}>
                Share a few details about your manuscript. We'll respond with a
                tailored publishing plan, timeline, and next steps.
              </p>
            </div>

            <Form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <Row className="g-3">
                <Col sm={6}>
                  <Field label="Full name">
                    <Form.Control required placeholder="Jane Aldrich" />
                  </Field>
                </Col>
                <Col sm={6}>
                  <Field label="Email">
                    <Form.Control required type="email" placeholder="jane@email.com" />
                  </Field>
                </Col>
                <Col sm={6}>
                  <Field label="Phone">
                    <Form.Control placeholder="+1 555 0100" />
                  </Field>
                </Col>
                <Col sm={6}>
                  <Field label="Genre">
                    <Form.Control placeholder="Literary fiction, memoir…" />
                  </Field>
                </Col>
                <Col sm={6}>
                  <Field label="Service needed">
                    <Form.Select
                      value={service}
                      onChange={(e) => setService(e.target.value as ServiceOption)}
                    >
                      {SERVICE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </Form.Select>
                  </Field>
                </Col>
                <Col sm={6}>
                  <Field label="Manuscript status">
                    <Form.Select defaultValue="Drafting">
                      <option value="Drafting">Still drafting</option>
                      <option value="Complete">First draft complete</option>
                      <option value="Edited">Self-edited</option>
                      <option value="Ready">Ready to publish</option>
                    </Form.Select>
                  </Field>
                </Col>
                <Col xs={12}>
                  <Field label="Project details">
                    <Form.Control
                      as="textarea"
                      rows={4}
                      className="ca-textarea"
                      placeholder="Tell us about your book, word count, audience, and what you need help with."
                    />
                  </Field>
                </Col>
              </Row>

              <div className="d-flex justify-content-between align-items-center pt-4 mt-2 gap-3">
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="btn btn-link text-muted-ink text-decoration-none tracking-wide text-uppercase"
                  style={{ fontSize: "0.7rem" }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-ink">
                  Send manuscript brief
                </button>
              </div>
            </Form>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Form.Label
        className="text-muted-ink text-uppercase tracking-wide mb-1"
        style={{ fontSize: "0.65rem", fontWeight: 500 }}
      >
        {label}
      </Form.Label>
      {children}
    </div>
  );
}
