import MainLayouts from '../Layouts/MainLayouts';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { SessionContext } from '../Contexts/SessionContexts';

const HomePage = () => {
  const { session } = useContext(SessionContext);

  return (
    <MainLayouts>

      {/* Hero Section */}
      <div className="min-h-[85vh] flex items-center justify-center bg-white px-8">
        <div className="text-center max-w-2xl">
          <p className="text-sm font-semibold tracking-widest text-yellow-500 uppercase mb-4">
            FEU Roosevelt
          </p>
          <h1 className="text-6xl font-bold text-green-900 mb-6 leading-tight">
            Your Campus Events, <br /> All in One Place.
          </h1>
          <p className="text-gray-500 text-lg mb-10">
            EventGate helps FEU Roosevelt students discover, register, and keep
            track of school events — simply and easily.
          </p>

          {/* ✅ Only show buttons if not logged in */}
          {!session && (
            <div className="flex justify-center gap-4">
              <Link
                to="/sign-up"
                className="btn rounded-full bg-green-900 text-white hover:bg-green-800 border-none px-10"
              >
                Get Started
              </Link>
              <Link
                to="/log-in"
                className="btn rounded-full btn-outline border-green-900 text-green-900 hover:bg-green-900 hover:text-white px-10"
              >
                Login
              </Link>
            </div>
          )}

          {/* ✅ Show this if already logged in */}
          {session && (
            <div className="flex justify-center gap-4">
              <Link
                to="/events"
                className="btn rounded-full bg-green-900 text-white hover:bg-green-800 border-none px-10"
              >
                Browse Events
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Features Section */}
      <div className="py-24 px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-semibold tracking-widest text-yellow-500 uppercase text-center mb-3">
            Why EventGate
          </p>
          <h2 className="text-3xl font-bold text-green-900 text-center mb-16">
            Everything you need to stay in the loop
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-10 h-1 bg-yellow-400 rounded mb-6" />
              <h3 className="text-lg font-bold text-green-900 mb-3">Browse Events</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                See all upcoming school events in one clean, organized list.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-10 h-1 bg-yellow-400 rounded mb-6" />
              <h3 className="text-lg font-bold text-green-900 mb-3">Easy Registration</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Register or unregister from any event with just one click.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-10 h-1 bg-yellow-400 rounded mb-6" />
              <h3 className="text-lg font-bold text-green-900 mb-3">FEU Exclusive</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Built exclusively for FEU Roosevelt students and staff.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {!session && (
        <div className="py-24 px-8 bg-green-900 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Don't miss another event.
          </h2>
          <p className="text-green-300 mb-10 text-lg">
            Create your account today and stay connected with your campus.
          </p>
          <Link
            to="/sign-up"
            className="btn rounded-full bg-yellow-400 text-green-900 font-bold hover:bg-yellow-300 border-none px-12"
          >
            Sign Up for Free
          </Link>
        </div>
      )}

    </MainLayouts>
  );
};

export default HomePage;