import { Button } from "@/components/ui/button";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-semibold text-slate-900">SkillSwap</div>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                onClick={handleLogin}
                className="text-slate-600 hover:text-slate-900"
              >
                Sign In
              </Button>
              <Button onClick={handleLogin} className="bg-primary text-white hover:bg-accent">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Exchange Skills, Build Community
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            SkillSwap is a platform that enables people to exchange skills with others in their community. 
            Learn something new while teaching what you know.
          </p>
          <Button
            onClick={handleLogin}
            size="lg"
            className="bg-primary text-white px-8 py-3 text-lg font-medium hover:bg-accent shadow-lg"
          >
            Get Started
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-slate-500 text-sm">
            © 2024 SkillSwap. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
