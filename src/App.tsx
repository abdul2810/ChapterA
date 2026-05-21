import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChapterALandingPage } from "@/components/chapter-a/ChapterALandingPage";

function NotFound() {
  return (
    <div className="d-flex min-vh-100 align-items-center justify-content-center bg-paper px-3">
      <div className="text-center" style={{ maxWidth: 420 }}>
        <h1 className="serif" style={{ fontSize: "5rem" }}>404</h1>
        <p className="text-muted-ink mb-4">Page not found.</p>
        <a href="/" className="btn-ink">Go home</a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChapterALandingPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
