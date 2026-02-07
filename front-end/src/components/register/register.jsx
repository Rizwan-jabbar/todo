import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaGlobe, FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function RegisterForm() {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // "success" | "error" | ""
  const [showLang, setShowLang] = useState(false);

  const handleRegisterForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setStatus("");

    const registerUser = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerUser),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(t("register.success"));
        e.target.reset();
      } else {
        setStatus("error");
        setMessage(data.message || t("register.failed"));
      }
    } catch (error) {
      console.log(error);
      setStatus("error");
      setMessage(t("register.server_error"));
    } finally {
      setLoading(false);
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
    document.documentElement.dir = lng === "ur" ? "rtl" : "ltr";
    setShowLang(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col items-center justify-center px-4 py-10">
            {/* ---------------- LANGUAGE SELECTOR ---------------- */}
       <div className="mb-4 flex justify-end">
          <div className="relative inline-block text-left">
            <button
              onClick={() => setShowLang((s) => !s)}
              className="inline-flex justify-between items-center w-auto min-w-[80px] px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            >
              <FaGlobe />
              {i18n.language === "ur" ? "اردو" : "English"}
              <FaChevronDown
                className={`ml-2 h-4 w-4 transform transition-transform ${showLang ? "rotate-180" : "rotate-0"}`}
              />
            </button>

            <AnimatePresence>
              {showLang && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="origin-top-right absolute right-0 mt-2 w-max min-w-[100px] rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20"
                >
                  <div className="py-1">
                    <button
                      onClick={() => changeLanguage("en")}
                      className={`block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition ${
                        i18n.language === "en" ? "bg-gray-100 font-semibold" : ""
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => changeLanguage("ur")}
                      className={`block w-full px-4 py-2 text-right text-sm text-gray-700 hover:bg-gray-100 transition ${
                        i18n.language === "ur" ? "bg-gray-100 font-semibold" : ""
                      }`}
                    >
                      اردو
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      <div className="w-full max-w-md relative">

       

        {/* ---------------- REGISTER FORM CARD ---------------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
                  {t("register.title")}
                </h1>
                <p className="mt-1 text-sm text-gray-500">{t("register.subtitle")}</p>
              </div>

              <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 ring-1 ring-inset ring-green-200">
                {t("register.tag")}
              </span>
            </div>
          </div>

          <div className="p-6">
            <form className="space-y-4" onSubmit={handleRegisterForm}>
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-800">{t("register.name_label")}</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  placeholder={t("register.name_placeholder")}
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition"
                  autoComplete="name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-800">{t("register.email_label")}</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder={t("register.email_placeholder")}
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition"
                  autoComplete="email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-800">{t("register.password_label")}</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  required
                  placeholder={t("register.password_placeholder")}
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition"
                  autoComplete="new-password"
                  minLength={6}
                />
                <p className="mt-2 text-xs text-gray-400">{t("register.password_helper")}</p>
              </div>

              {message && (
                <div className={[
                  "rounded-xl border p-4 text-sm",
                  status === "success" ? "border-green-200 bg-green-50 text-green-700" : "border-red-200 bg-red-50 text-red-700"
                ].join(" ")}>
                  <p className="font-semibold">{status === "success" ? t("register.success") : t("register.failed")}</p>
                  <p className="mt-1">{message}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700 active:bg-green-800 disabled:opacity-60 disabled:cursor-not-allowed transition focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/40"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                    {t("register.tag")}…
                  </span>
                ) : (
                  t("register.tag")
                )}
              </button>

              <p className="text-center text-xs text-gray-400">{t("register.terms")}</p>
            </form>
          </div>
        </motion.div>

        <p className="mt-6 text-center text-xs text-gray-400">{t("register.tip")}</p>
      </div>
    </main>
  );
}

export default RegisterForm;
