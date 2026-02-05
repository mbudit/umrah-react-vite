import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MOCK_MUTAWIFS } from "@/constants";

const MatchGuidePage: React.FC = () => {
  const navigate = useNavigate();
  const [isMatching, setIsMatching] = useState(true);
  const [matchedGuide, setMatchedGuide] = useState<
    (typeof MOCK_MUTAWIFS)[0] | null
  >(null);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsMatching(false);
      setMatchedGuide(MOCK_MUTAWIFS[2]);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isMatching) {
    return (
      <div className="h-screen w-full max-w-md mx-auto bg-background-dark flex flex-col items-center justify-center p-6">
        <div className="relative mb-8">
          <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
            <span className="material-symbols-outlined text-primary text-5xl">
              psychology
            </span>
          </div>
          <div className="absolute -inset-4 rounded-full border-2 border-primary/30 animate-ping" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-3 text-center">
          AI Matching in Progress
        </h2>
        <p className="text-slate-400 text-center max-w-xs">
          Our AI is analyzing your preferences to find the perfect Mutawif for
          your spiritual journey...
        </p>
        <div className="flex gap-2 mt-6">
          <div
            className="w-2 h-2 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="w-2 h-2 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <div
            className="w-2 h-2 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full max-w-md mx-auto bg-background-dark flex flex-col">
      <header className="flex items-center justify-between px-4 py-4 border-b border-slate-800">
        <button onClick={() => navigate(-1)} className="btn-icon">
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h1 className="text-lg font-bold">AI Match Found!</h1>
        <div className="w-10" />
      </header>

      <main className="flex-1 overflow-y-auto p-6">
        {/* Success Badge */}
        <div className="flex justify-center mb-6">
          <div className="px-4 py-2 bg-primary/20 border border-primary/30 rounded-full flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">
              verified
            </span>
            <span className="text-primary font-bold text-sm">
              98% Match Score
            </span>
          </div>
        </div>

        {/* Guide Profile Card */}
        {matchedGuide && (
          <div className="bg-surface-dark rounded-3xl p-6 border border-slate-800 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div
                  className="w-20 h-20 rounded-2xl bg-cover bg-center ring-2 ring-primary/50"
                  style={{ backgroundImage: `url('${matchedGuide.photoUrl}')` }}
                />
                <div className="absolute -bottom-1 -right-1 bg-primary text-black p-1 rounded-full">
                  <span className="material-symbols-outlined text-sm">
                    verified
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white">
                  {matchedGuide.name}
                </h3>
                <div className="flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-yellow-500 text-lg">
                    star
                  </span>
                  <span className="text-white font-bold">
                    {matchedGuide.rating}
                  </span>
                  <span className="text-slate-400 text-sm">
                    ({matchedGuide.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {matchedGuide.languages.map((lang) => (
                <span
                  key={lang}
                  className="bg-white/10 px-3 py-1 rounded-lg text-xs text-slate-300 font-medium"
                >
                  {lang}
                </span>
              ))}
            </div>

            <h4 className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-3">
              Why This Match
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                <span className="material-symbols-outlined text-primary">
                  language
                </span>
                <span className="text-sm text-slate-300">
                  Speaks your preferred languages
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                <span className="material-symbols-outlined text-primary">
                  schedule
                </span>
                <span className="text-sm text-slate-300">
                  Available at your requested time
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                <span className="material-symbols-outlined text-primary">
                  thumb_up
                </span>
                <span className="text-sm text-slate-300">
                  Highly rated for first-time pilgrims
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Price Info */}
        <div className="bg-surface-dark rounded-2xl p-4 border border-slate-800 flex items-center justify-between mb-6">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">
              Estimated Price
            </p>
            <p className="text-2xl font-bold text-white">
              SAR 250
              <span className="text-sm text-slate-400 font-normal">
                /session
              </span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500">Duration</p>
            <p className="text-lg font-bold text-primary">3-4 hrs</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 bg-background-dark border-t border-slate-800">
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/find-guide")}
            className="flex-1 py-4 bg-surface-dark border border-slate-700 text-white font-bold rounded-xl hover:bg-slate-800 transition-all"
          >
            Try Another
          </button>
          <button
            onClick={() => navigate("/booking")}
            className="flex-1 py-4 bg-primary text-black font-bold rounded-xl hover:brightness-110 transition-all"
          >
            Book Now
          </button>
        </div>
      </footer>
    </div>
  );
};

export default MatchGuidePage;
