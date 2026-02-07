import { useEffect, useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

function UserProfile() {
  const { t } = useTranslation();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const fetchProfile = async () => {
    if (!token) {
      setError(t("user_profile.not_logged_in"));
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch("http://localhost:3000/api/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Unauthorized");

      const data = await res.json();
      setUser(data?.user);
    } catch (err) {
      setUser(null);
      setError(t("user_profile.session_expired"));
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ===================== LOADING ===================== */
  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center px-3 py-6 sm:px-4 sm:py-8">
        <div className="w-full max-w-xl rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center gap-3 sm:gap-4">
            <motion.div
              className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-gray-100"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            />
            <div className="flex-1 space-y-2">
              <motion.div
                className="h-4 w-32 sm:w-44 bg-gray-100 rounded"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }}
              />
              <motion.div
                className="h-3 w-48 sm:w-64 bg-gray-100 rounded"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }}
              />
            </div>
          </div>

          <div className="p-4 sm:p-6 space-y-3">
            {[...Array(3)].map((_, idx) => (
              <motion.div
                key={idx}
                className="h-12 rounded-xl bg-gray-100"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 * idx }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ===================== ERROR ===================== */
  if (error) {
    return (
      <div className="min-h-[45vh] flex items-center justify-center px-3 py-6 sm:px-4 sm:py-8">
        <div className="w-full max-w-xl rounded-2xl border border-red-200 bg-red-50 p-4 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-red-800">
                {t("user_profile.error_title")}
              </p>
              <p className="mt-1 text-sm text-red-700">{error}</p>
              <p className="mt-2 text-xs text-red-600/90">
                {t("user_profile.error_helper")}
              </p>
            </div>

            <button
              onClick={fetchProfile}
              className="w-full sm:w-auto inline-flex items-center gap-2 justify-center rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition"
            >
              <FiRefreshCw className="h-4 w-4" />
              {t("user_profile.retry")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ===================== PROFILE ===================== */
  return (
    <section className="px-3 py-6 sm:px-4 sm:py-8 flex justify-center">
      <div className="w-full max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white flex items-center justify-center font-bold text-base sm:text-lg">
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </div>

                <div className="min-w-0">
                  <h2 className="text-base sm:text-xl font-bold text-gray-900 truncate capitalize">
                    {user?.name || t("user_profile.user_placeholder")}
                  </h2>
                  <p className="mt-0.5 text-sm text-gray-500 truncate">
                    {user?.email || "—"}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 ring-1 ring-green-200">
                      {t("user_profile.active")}
                    </span>
                    <span className="rounded-full bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-gray-200">
                      {t("user_profile.profile")}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={fetchProfile}
                className="w-full sm:w-auto inline-flex items-center gap-2 justify-center rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition"
              >
                <FiRefreshCw className="h-4 w-4" />
                {t("user_profile.refresh")}
              </button>
            </div>
          </div>

          {/* Details */}
          <div className="p-4 sm:p-6">
            <div className="space-y-3">
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-xs font-semibold text-gray-500">
                  {t("user_profile.name")}
                </p>
                <p className="mt-1 text-sm font-semibold text-gray-900 capitalize break-words">
                  {user?.name || "—"}
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-xs font-semibold text-gray-500">
                  {t("user_profile.email")}
                </p>
                <p className="mt-1 text-sm font-semibold text-gray-900 break-words">
                  {user?.email || "—"}
                </p>
              </div>
            </div>

            <p className="mt-4 text-xs text-gray-400">
              {t("user_profile.note")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default UserProfile;
