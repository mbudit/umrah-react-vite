import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "locationPrefs.v2";

const DEFAULT_MAP_BG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDbQZT5d-tleb_AuRslWpYuFDUnLqqnmOkS-X1AohCrchKFCA8Pn3xAVEoKW0_k8OgrtNMnSmy3iBFbIBgfqr4gzlmO-d0g2YEKCMPHlFKvlP4PnpsPT8PW-D7I-JB2YhDEqf7uY_-308DdJKkhRqYbDI7XcyW9KXEOmKGh9DK0qGY0YDc7w8BaxruHka_nVTUy_PZcZd5mVMGsy2R48SV_ia_Jdl8pbA508N1a6t22xTLcw25OYYpcWmDN0bgEp3hvXL8Xpv-6qUgm";

const PICKUP_SUGGESTIONS = [
  {
    name: "Abraj Al Bait Clock Tower",
    type: "landmark",
    gate: "Main Entrance",
  },
  { name: "Masjid al-Haram Gate King Fahd", type: "gate", gate: "Gate 79" },
  { name: "Masjid al-Haram Gate King Abdulaziz", type: "gate", gate: "Gate 1" },
  { name: "Jabal Omar Hotel Lobby", type: "hotel", gate: "S1 Level" },
  { name: "Hilton Suites Makkah", type: "hotel", gate: "Lobby" },
  {
    name: "Ajyad Street (Main Entrance)",
    type: "street",
    gate: "Opposite King Abdulaziz Gate",
  },
  { name: "Zamzam Tower Lobby", type: "hotel", gate: "Ground Floor" },
];

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function MaterialIcon({
  name,
  className = "",
  fill = false,
}: {
  name: string;
  className?: string;
  fill?: boolean;
}) {
  return (
    <span
      className={`material-symbols-outlined select-none ${className} ${fill ? "fill-1" : ""}`}
      style={{
        fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
      }}
    >
      {name}
    </span>
  );
}

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => onClose(), 2000);
    return () => clearTimeout(t);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[1000] animate-in fade-in slide-in-from-top duration-300">
      <div className="px-6 py-3 rounded-2xl bg-slate-900/90 dark:bg-white/90 backdrop-blur-md text-white dark:text-slate-900 text-sm font-medium shadow-2xl flex items-center gap-3">
        <div className="size-2 rounded-full bg-primary animate-pulse" />
        {message}
      </div>
    </div>
  );
}

const PreferencesPage: React.FC = () => {
  const navigate = useNavigate();
  const initialName = "Ahmad";

  const [pickupText, setPickupText] = useState("Abraj Al Bait Clock Tower");
  const [notes, setNotes] = useState("");
  const [language, setLanguage] = useState("ms");
  const [pax, setPax] = useState(2);
  const [gender, setGender] = useState("male");
  const [specialNeeds, setSpecialNeeds] = useState(false);
  const [wheelchair, setWheelchair] = useState<string | null>(null);
  const [urgency, setUrgency] = useState<string>("standard");
  const [location, setLocation] = useState<{
    lat: number | null;
    lng: number | null;
    source: string;
  }>({ lat: null, lng: null, source: "none" });

  const [toast, setToast] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        setIsScrolled(scrollRef.current.scrollTop > 10);
      }
    };
    const el = scrollRef.current;
    el?.addEventListener("scroll", handleScroll);
    return () => el?.removeEventListener("scroll", handleScroll);
  }, []);

  const suggestions = useMemo(() => {
    const q = pickupText.trim().toLowerCase();
    if (!q) return [];
    return PICKUP_SUGGESTIONS.filter((s) =>
      s.name.toLowerCase().includes(q),
    ).slice(0, 5);
  }, [pickupText]);

  const canContinue = pickupText.trim() && language;

  const handleToggleSpecialNeeds = (next: boolean) => {
    setSpecialNeeds(next);
    if (!next) setWheelchair(null);
    setToast(next ? "Accessibility mode activated" : "Special needs cleared");
  };

  async function handleMyLocation() {
    if (!navigator.geolocation) {
      setToast("GPS not supported on this device");
      return;
    }
    setToast("Pinpointing your location...");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          source: "gps",
        });
        setPickupText("📍 My Current Location");
        setToast("Location synced successfully");
      },
      () => setToast("Access denied. Please enable GPS."),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  const handleContinue = () => {
    const payload = {
      user: initialName,
      pickup: { text: pickupText, notes, location },
      preferences: { language, pax, gender, specialNeeds, wheelchair, urgency },
      timestamp: new Date().toISOString(),
    };
    console.log("Preferences saved:", payload);
    setToast("Preferences saved!");
    setTimeout(() => navigate("/find-guide"), 1000);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display antialiased">
      <div className="relative flex h-screen w-full max-w-[480px] mx-auto flex-col overflow-hidden bg-background-light dark:bg-[#0a0f14] shadow-2xl">
        {/* Modern Blur Header */}
        <header
          className={`fixed top-0 w-full max-w-[480px] z-50 transition-all duration-300 px-4 py-3 flex items-center justify-between border-b ${
            isScrolled
              ? "bg-white/80 dark:bg-[#0a0f14]/80 backdrop-blur-xl border-slate-200 dark:border-white/10"
              : "bg-transparent border-transparent"
          }`}
        >
          <button
            onClick={() => navigate(-1)}
            className="size-11 flex items-center justify-center rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm active:scale-90 transition"
          >
            <MaterialIcon name="chevron_left" className="text-xl" />
          </button>
          <div className="flex flex-col items-center">
            <h1 className="text-sm font-bold tracking-tight uppercase opacity-50">
              Preferences
            </h1>
            <p className="text-xs font-medium text-primary">Step 2 of 4</p>
          </div>
          <button className="size-11 flex items-center justify-center rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
            <MaterialIcon name="more_horiz" />
          </button>
        </header>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto scrollbar-hide pt-20 pb-40"
        >
          {/* Welcome User Section */}
          <div className="px-6 mb-6">
            <h2 className="text-2xl font-bold tracking-tight">
              Salam, {initialName}
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Tell us where to find you and your service preferences.
            </p>
          </div>
          {/* Immersive Map Card */}
          <div className="px-6 mb-8">
            <div className="group relative w-full aspect-[16/11] rounded-[32px] overflow-hidden border-4 border-white dark:border-white/5 shadow-2xl transition-transform hover:scale-[1.01]">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url("${DEFAULT_MAP_BG}")` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              {/* Dynamic Pin */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute -inset-4 bg-primary/30 rounded-full animate-ping" />
                  <div className="relative bg-primary text-white p-3 rounded-full shadow-2xl border-2 border-white">
                    <MaterialIcon name="person_pin_circle" fill />
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 whitespace-nowrap bg-black/80 backdrop-blur-md text-[10px] font-bold text-white px-3 py-1 rounded-full border border-white/20">
                    {location.source === "gps"
                      ? "Live GPS Location"
                      : "Target Pickup Point"}
                  </div>
                </div>
              </div>

              <button
                onClick={handleMyLocation}
                className="absolute bottom-5 right-5 size-12 bg-white dark:bg-slate-800 rounded-2xl shadow-xl flex items-center justify-center text-primary active:scale-90 transition transform"
              >
                <MaterialIcon name="my_location" />
              </button>
            </div>
          </div>
          {/* Input Section */}
          <div className="px-6 space-y-6">
            {/* Search Input */}
            <div className="relative group">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2 block px-1">
                Pickup Location
              </label>
              <div className="flex items-center bg-white dark:bg-white/5 border-2 border-transparent focus-within:border-primary/50 rounded-[22px] h-16 px-5 shadow-sm transition-all">
                <MaterialIcon
                  name="search"
                  className="text-slate-400 group-focus-within:text-primary transition"
                />
                <input
                  value={pickupText}
                  onChange={(e) => setPickupText(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 200)
                  }
                  placeholder="Hotel name or Haram Gate..."
                  className="flex-1 bg-transparent border-none focus:ring-0 text-base font-semibold placeholder:text-slate-400 placeholder:font-normal px-4"
                />
                {pickupText && (
                  <button
                    onClick={() => setPickupText("")}
                    className="p-2 text-slate-400 hover:text-rose-500"
                  >
                    <MaterialIcon name="cancel" fill />
                  </button>
                )}
              </div>

              {/* Enhanced Suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-3 bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200 dark:border-white/10 shadow-2xl z-20 overflow-hidden animate-in fade-in duration-200">
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => setPickupText(s.name)}
                      className="w-full flex items-center gap-4 px-5 py-4 hover:bg-slate-50 dark:hover:bg-white/5 transition border-b border-slate-100 dark:border-white/5 last:border-0"
                    >
                      <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <MaterialIcon
                          name={
                            s.type === "hotel"
                              ? "hotel"
                              : s.type === "gate"
                                ? "door_front"
                                : "location_on"
                          }
                          className="text-xl"
                        />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold">{s.name}</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-tighter">
                          {s.gate}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notes Textarea */}
            <div>
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2 block px-1">
                Meeting Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex: 'Waiting at the main lobby entrance near the fountain'..."
                className="w-full bg-white dark:bg-white/5 border-2 border-transparent focus:border-primary/50 rounded-[22px] p-5 min-h-[120px] text-sm font-medium shadow-sm transition-all focus:ring-0 resize-none"
              />
            </div>

            {/* Premium Selector: Language */}
            <div>
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3 block px-1">
                Guide Language
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "ms", label: "Melayu", flag: "🇲🇾" },
                  { id: "ar", label: "عربي", flag: "🇸🇦" },
                  { id: "en", label: "English", flag: "🇬🇧" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setLanguage(opt.id)}
                    className={`flex flex-col items-center gap-1 p-4 rounded-3xl border-2 transition-all duration-300 ${
                      language === opt.id
                        ? "border-primary bg-primary text-white shadow-xl shadow-primary/30 scale-105"
                        : "border-white dark:border-white/5 bg-white dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:border-slate-200"
                    }`}
                  >
                    <span className="text-xl">{opt.flag}</span>
                    <span className="text-[11px] font-bold">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Enhanced Pax Counter */}
            <div className="flex items-center justify-between bg-white dark:bg-white/5 p-6 rounded-[32px] border border-slate-100 dark:border-white/5">
              <div>
                <p className="font-bold text-lg">Group Size</p>
                <p className="text-xs text-slate-500 font-medium">
                  Number of pilgrims
                </p>
              </div>
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setPax((p) => clamp(p - 1, 1, 12))}
                  className="size-12 rounded-2xl bg-slate-100 dark:bg-white/10 flex items-center justify-center active:scale-90 transition"
                >
                  <MaterialIcon name="remove" />
                </button>
                <span className="text-2xl font-black text-primary min-w-[30px] text-center">
                  {pax}
                </span>
                <button
                  onClick={() => setPax((p) => clamp(p + 1, 1, 12))}
                  className="size-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30 active:scale-90 transition"
                >
                  <MaterialIcon name="add" />
                </button>
              </div>
            </div>

            {/* Mutawif Gender Selection */}
            <div>
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3 block px-1">
                Mutawif Preference
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "none", label: "Any", icon: "group" },
                  { id: "male", label: "Male", icon: "man" },
                  { id: "female", label: "Female", icon: "woman" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setGender(opt.id)}
                    className={`flex flex-col items-center gap-2 py-4 rounded-[26px] border-2 transition-all ${
                      gender === opt.id
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-white dark:border-white/5 bg-white dark:bg-white/5 text-slate-400"
                    }`}
                  >
                    <MaterialIcon name={opt.icon} fill={gender === opt.id} />
                    <span className="text-[10px] font-black uppercase tracking-tighter">
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Accessibility Modern Card */}
            <div
              className={`p-6 rounded-[32px] border-2 transition-all duration-500 ${
                specialNeeds
                  ? "border-orange-500/50 bg-orange-500/5 dark:bg-orange-500/10"
                  : "border-white dark:border-white/5 bg-white dark:bg-white/5"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`size-12 rounded-2xl flex items-center justify-center transition-colors ${
                      specialNeeds
                        ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                        : "bg-slate-100 dark:bg-white/10 text-slate-400"
                    }`}
                  >
                    <MaterialIcon name="accessible_forward" />
                  </div>
                  <div>
                    <p className="font-bold">Special Assistance</p>
                    <p className="text-xs text-slate-500 font-medium">
                      Wheelchair support needed
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={specialNeeds}
                    onChange={(e) => handleToggleSpecialNeeds(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-8 bg-slate-200 dark:bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-orange-500 shadow-inner"></div>
                </label>
              </div>

              {specialNeeds && (
                <div className="mt-6 pt-6 border-t border-orange-500/20 space-y-4 animate-in fade-in slide-in-from-bottom duration-300">
                  <p className="text-[11px] font-black uppercase tracking-widest text-orange-600 dark:text-orange-400">
                    Wheelchair Ownership
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        id: "need_assistant",
                        title: "Need Provider",
                        sub: "Include wheelchair",
                      },
                      {
                        id: "own_wheelchair",
                        title: "Own Chair",
                        sub: "Just assistance",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setWheelchair(opt.id)}
                        className={`text-left p-4 rounded-2xl border-2 transition-all ${
                          wheelchair === opt.id
                            ? "border-orange-500 bg-orange-500/10 text-orange-700 dark:text-orange-300"
                            : "border-slate-200 dark:border-white/5 text-slate-500"
                        }`}
                      >
                        <p className="text-xs font-black uppercase tracking-tighter">
                          {opt.title}
                        </p>
                        <p className="text-[10px] opacity-70 leading-tight">
                          {opt.sub}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Service Urgency Selection */}
            <div className="bg-white dark:bg-white/5 p-6 rounded-[32px] border border-slate-100 dark:border-white/5">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3 block">
                Service Priority
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => setUrgency("standard")}
                  className={`flex-1 py-3 px-4 rounded-2xl text-xs font-bold border-2 transition-all ${urgency === "standard" ? "bg-primary/10 border-primary text-primary" : "bg-transparent border-slate-100 dark:border-white/5 text-slate-400"}`}
                >
                  Standard
                </button>
                <button
                  onClick={() => setUrgency("express")}
                  className={`flex-1 py-3 px-4 rounded-2xl text-xs font-bold border-2 transition-all ${urgency === "express" ? "bg-amber-500/10 border-amber-500 text-amber-600" : "bg-transparent border-slate-100 dark:border-white/5 text-slate-400"}`}
                >
                  🚀 Express
                </button>
              </div>
            </div>
          </div>
          <div className="h-20" /> {/* Spacer for footer */}
        </div>

        {/* Glossy Footer CTA */}
        <footer className="absolute bottom-0 left-0 right-0 p-6 bg-white/70 dark:bg-[#0a0f14]/70 backdrop-blur-2xl border-t border-slate-200 dark:border-white/10 z-30">
          <button
            onClick={handleContinue}
            disabled={!canContinue}
            className={`group w-full h-16 flex items-center justify-between px-8 rounded-[24px] font-black text-lg transition-all transform active:scale-95 ${
              canContinue
                ? "bg-primary text-white shadow-2xl shadow-primary/40 hover:brightness-110"
                : "bg-slate-200 dark:bg-white/5 text-slate-400 cursor-not-allowed"
            }`}
          >
            <span className="tracking-tight uppercase">Confirm Selection</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium opacity-70 group-hover:opacity-100 transition">
                Save & Continue
              </span>
              <MaterialIcon name="arrow_forward_ios" className="text-base" />
            </div>
          </button>
          <p className="text-center text-[10px] text-slate-400 mt-4 font-medium uppercase tracking-[0.2em]">
            Premium Umrah Services v2.4
          </p>
        </footer>

        <Toast message={toast} onClose={() => setToast("")} />
      </div>
    </div>
  );
};

export default PreferencesPage;
