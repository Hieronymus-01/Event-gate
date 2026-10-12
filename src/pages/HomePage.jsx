import MainLayouts from '../Layouts/MainLayouts';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { SessionContext } from '../Contexts/SessionContexts';

const HomePage = () => {
  const { session } = useContext(SessionContext);

  return (
    <MainLayouts>
      {/* shrink-0 prevents the flex parent (main) from collapsing these sections */}
      <div className="shrink-0 w-full">

        {/* ================= HERO ================= */}
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 20%, rgba(22,101,52,0.06) 0, transparent 45%), radial-gradient(circle at 80% 60%, rgba(240,180,41,0.08) 0, transparent 45%)',
            }}
          />
          <div
            className="absolute rounded-full opacity-10 animate-pulse"
            style={{
              width: 260, height: 260, top: -80, left: -60,
              background: 'radial-gradient(circle at 30% 30%, #166534, transparent 70%)',
            }}
          />
          <div
            className="absolute rounded-full opacity-10 animate-pulse"
            style={{
              width: 180, height: 180, bottom: -60, right: -40,
              background: 'radial-gradient(circle at 30% 30%, #f0b429, transparent 70%)',
            }}
          />

          <div className="max-w-4xl mx-auto text-center px-6 py-20 md:py-24 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 mb-6">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span className="text-[11px] font-bold tracking-widest text-amber-700 uppercase">
                Zai's Billiard Hall &amp; Bar
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-green-900 leading-[1.05] tracking-tight mb-6">
              Tournaments, Mentorship<br />&amp; Game Nights,<br />
              <span className="text-amber-500">All in One Place.</span>
            </h1>

            <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Discover and register for billiard tournaments, mentorship sessions, and special events at Zai's Billiard Hall &amp; Bar — simply and easily.
            </p>

            {!session && (
              <div className="flex justify-center gap-3 flex-wrap">
                <Link
                  to="/sign-up"
                  className="px-8 py-3.5 rounded-full bg-green-800 text-white text-sm font-bold hover:bg-green-900 transition shadow-lg shadow-green-900/20 flex items-center gap-2"
                >
                  Browse Events
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
                <Link
                  to="/log-in"
                  className="px-8 py-3.5 rounded-full border-2 border-gray-300 text-green-800 text-sm font-bold hover:border-green-800 transition"
                >
                  Login
                </Link>
              </div>
            )}

            {session && (
              <div className="flex justify-center">
                <Link
                  to="/events"
                  className="px-8 py-3.5 rounded-full bg-green-800 text-white text-sm font-bold hover:bg-green-900 transition shadow-lg shadow-green-900/20 flex items-center gap-2"
                >
                  Browse Events
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* ================= STATS BAR ================= */}
        <section className="border-y border-gray-100 bg-white w-full">
          <div className="w-full px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-extrabold text-green-900">50+</div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">Events Hosted</div>
            </div>
            <div className="text-center md:border-l border-gray-100">
              <div className="text-3xl md:text-4xl font-extrabold text-green-900">500+</div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">Active Players</div>
            </div>
            <div className="text-center md:border-l border-gray-100">
              <div className="text-3xl md:text-4xl font-extrabold text-green-900">12</div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">Billiard Tables</div>
            </div>
            <div className="text-center md:border-l border-gray-100">
              <div className="text-3xl md:text-4xl font-extrabold text-green-900">4.9★</div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">Customer Rating</div>
            </div>
          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section className="py-20 px-6 bg-gray-50 w-full">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-[11px] font-bold tracking-widest text-amber-600 uppercase mb-3">
                Simple &amp; Fast
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-green-900">How It Works</h2>
              <p className="text-gray-500 mt-3 max-w-xl mx-auto">
                Three quick steps and you're registered for your next event.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-[34px] left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-green-200 via-green-300 to-green-200 z-0" />

              <div className="bg-white p-7 rounded-2xl border border-gray-100 shadow-sm hover:-translate-y-1 hover:shadow-lg hover:border-green-200 transition-all duration-200 relative z-10">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-sm text-white mb-4 shadow-lg shadow-green-900/30 bg-gradient-to-br from-green-700 to-green-900">
                  1
                </div>
                <h3 className="text-lg font-extrabold text-green-900 mb-2">Create an Account</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Sign up in seconds with just your name and email — no paperwork needed.
                </p>
              </div>

              <div className="bg-white p-7 rounded-2xl border border-gray-100 shadow-sm hover:-translate-y-1 hover:shadow-lg hover:border-green-200 transition-all duration-200 relative z-10">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-sm text-white mb-4 shadow-lg shadow-green-900/30 bg-gradient-to-br from-green-700 to-green-900">
                  2
                </div>
                <h3 className="text-lg font-extrabold text-green-900 mb-2">Browse Events</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Find tournaments, mentorship sessions, and other events happening at Zai's.
                </p>
              </div>

              <div className="bg-white p-7 rounded-2xl border border-gray-100 shadow-sm hover:-translate-y-1 hover:shadow-lg hover:border-green-200 transition-all duration-200 relative z-10">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-sm text-white mb-4 shadow-lg shadow-green-900/30 bg-gradient-to-br from-green-700 to-green-900">
                  3
                </div>
                <h3 className="text-lg font-extrabold text-green-900 mb-2">Register &amp; Attend</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Sign up with one click and show up ready to play, learn, or compete.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FEATURES ================= */}
        <section className="py-20 px-6 bg-white w-full">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-[11px] font-bold tracking-widest text-amber-600 uppercase mb-3">
                Why Zai's Billiard
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-green-900 leading-tight">
                Everything you need to stay<br />in the loop
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:-translate-y-1 hover:shadow-lg hover:border-green-200 transition-all duration-200">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-5">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                </div>
                <h3 className="text-lg font-extrabold text-green-900 mb-2">Browse Events</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  See all upcoming tournaments, mentorship sessions, and events in one clean, organized list.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:-translate-y-1 hover:shadow-lg hover:border-green-200 transition-all duration-200">
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-5">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d99e1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                </div>
                <h3 className="text-lg font-extrabold text-green-900 mb-2">Easy Registration</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Register or unregister from any event with just one click — no queues, no hassle.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:-translate-y-1 hover:shadow-lg hover:border-green-200 transition-all duration-200">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-5">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h3 className="text-lg font-extrabold text-green-900 mb-2">Zai's Exclusive</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Built exclusively for Zai's regulars, walk-ins, and staff — everything in one place.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        {!session && (
          <section className="py-24 px-6 bg-green-900 text-center w-full relative overflow-hidden">
            <div
              className="absolute rounded-full opacity-[0.15]"
              style={{
                width: 300, height: 300, top: -100, right: -80,
                background: 'radial-gradient(circle at 30% 30%, #f0b429, transparent 70%)',
              }}
            />
            <div
              className="absolute rounded-full opacity-[0.12]"
              style={{
                width: 200, height: 200, bottom: -60, left: -60,
                background: 'radial-gradient(circle at 30% 30%, #f0b429, transparent 70%)',
              }}
            />

            <div className="max-w-2xl mx-auto relative z-10">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                Don't miss an event.
              </h2>
              <p className="text-green-200 mb-10 text-lg">
                Create your account today and stay connected with everything happening at Zai's Billiard Hall &amp; Bar.
              </p>
              <Link
                to="/sign-up"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-amber-400 text-green-900 font-bold hover:bg-amber-300 transition shadow-lg shadow-amber-500/20"
              >
                Sign Up for Free
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          </section>
        )}
        {/* ================= CONTACT US ================= */}
        <section className="py-20 px-6 bg-white w-full border-t border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-[11px] font-bold tracking-widest text-amber-600 uppercase mb-3">
                Get in Touch
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-green-900">Contact Us</h2>
              <p className="text-gray-500 mt-3 max-w-xl mx-auto">
                Have a question, want to book the venue, or host a tournament? Reach out — we reply within a day.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* ---------- LEFT: contact info ---------- */}
              <div className="space-y-4">

                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex gap-4 hover:border-green-200 transition">
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-green-50 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s7-7.58 7-13a7 7 0 1 0-14 0c0 5.42 7 13 7 13z" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Location</p>
                    <p className="text-sm font-semibold text-gray-800">123 Rizal Avenue, Barangay San Roque</p>
                    <p className="text-xs text-gray-500 mt-0.5">Marikina City, Metro Manila</p>
                  </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex gap-4 hover:border-green-200 transition">
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-green-50 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Phone</p>
                    <p className="text-sm font-semibold text-gray-800">+63 912 345 6789</p>
                    <p className="text-xs text-gray-500 mt-0.5">Mon – Sun, 10:00 AM – 2:00 AM</p>
                  </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex gap-4 hover:border-green-200 transition">
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-green-50 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 6-10 7L2 6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Email</p>
                    <p className="text-sm font-semibold text-gray-800">hello@zaisbilliard.ph</p>
                    <p className="text-xs text-gray-500 mt-0.5">For bookings & event inquiries</p>
                  </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex gap-4 hover:border-green-200 transition">
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-green-50 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Opening Hours</p>
                    <p className="text-sm font-semibold text-gray-800">Monday – Sunday: 10:00 AM – 2:00 AM</p>
                    <p className="text-xs text-gray-500 mt-0.5">Open 7 days a week</p>
                  </div>
                </div>

              </div>

              {/* ---------- RIGHT: message form ---------- */}
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16v16H4z" />
                      <path d="m22 6-10 7L2 6" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-sm font-extrabold text-green-900">Send Us a Message</h2>
                    <p className="text-[11px] text-gray-400">We'll get back to you by email.</p>
                  </div>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target;
                    const name = form.name.value;
                    const email = form.email.value;
                    const subject = form.subject.value || 'Inquiry from Zai\'s website';
                    const message = form.message.value;
                    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
                    window.location.href = `mailto:hello@zaisbilliard.ph?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                  }}
                  className="space-y-3"
                >
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                      Your Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="Juan Dela Cruz"
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                      Subject
                    </label>
                    <input
                      name="subject"
                      type="text"
                      placeholder="Table booking, tournament, etc."
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                      Message
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder="Tell us how we can help..."
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-green-800 text-white text-sm font-bold hover:bg-green-900 transition flex items-center justify-center gap-2"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 2 11 13" />
                      <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                    Send Message
                  </button>
                </form>
              </div>

            </div>
          </div>
        </section>

      </div>
    </MainLayouts>
  );
};

export default HomePage;