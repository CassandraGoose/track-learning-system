import Link from "next/link";

function SiteFooter() {
  return (
    <>
      <footer
        className="footer p-10 border-t border-secondary"
        data-testid="footer1"
      >
        <aside>
          <Link
            href="/"
            className="btn btn-ghost normal-case text-xl"
            data-testid="footer-home-link"
          >
            TRACK
          </Link>
          <p>
            Track System
            <br />
            Your personal LMS and learning portfolio
          </p>
        </aside>
        <nav>
          <header className="footer-title">Company - coming soon</header>
          <a className="link link-hover">About us - coming soon</a>
          <a className="link link-hover">Contact - coming soon</a>
          <a className="link link-hover">Jobs - coming soon</a>
          <a className="link link-hover">Press kit - coming soon</a>
        </nav>
        <nav>
          <header className="footer-title">
            Legal - coming soon
          </header>
          <a className="link link-hover">Terms of use - coming soon</a>
          <a className="link link-hover">Privacy policy - coming soon</a>
          <a className="link link-hover">Cookie policy - coming soon</a>
        </nav>
      </footer>
      <footer
        className="footer px-10 py-4 border-t border-secondary"
        data-testid="footer2"
      >
        <aside>
          <p>
            Icons made by{" "}
            <a
              href="https://www.flaticon.com/authors/karyative"
              title="Karyative"
            >
              Karyative
            </a>{" "}
            from{" "}
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>
          </p>
          <p>
            Copyright © 2023 - All right reserved by Track
          </p>
        </aside>
      </footer>
    </>
  );
}

export default SiteFooter;
