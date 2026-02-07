import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPlus, FaTrash, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";

function AddToDo() {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    task: "",
    description: "",
    tasks: [],
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.task.trim() === "") {
      setError(t("add_todo.messages.empty_task_error"));
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError(t("add_todo.messages.not_logged_in_error"));
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:3000/api/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: form.task,
          description: form.description,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || t("add_todo.messages.server_error"));

      const newTask = {
        id: data.task._id,
        text: data.task.title,
        description: data.task.description,
        addedTime: new Date(data.task.createdAt).getTime(),
      };

      setForm((prev) => ({
        task: "",
        description: "",
        tasks: [...prev.tasks, newTask],
      }));

      setSuccess(t("add_todo.messages.success_title"));
    } catch (err) {
      console.error(err);
      setError(err?.message || t("add_todo.messages.server_error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-4 py-8 flex justify-center">
      <div className="w-full max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl bg-white border border-gray-200 shadow-lg overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                {t("add_todo.title_section")}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {t("add_todo.subtitle_section")}
              </p>
            </div>

            <span className="shrink-0 inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 ring-1 ring-inset ring-green-200">
              {t("add_todo.create_tag")}
            </span>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="task"
                  className="block text-sm font-semibold text-gray-800"
                >
                  {t("add_todo.form.title_label")} <span className="text-red-500">{t("add_todo.form.title_required")}</span>
                </label>
                <input
                  id="task"
                  name="task"
                  value={form.task}
                  onChange={handleChange}
                  placeholder={t("add_todo.form.title_placeholder")}
                  type="text"
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500 transition"
                />
                <p className="mt-2 text-xs text-gray-400">
                  {t("add_todo.form.title_helper")}
                </p>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-semibold text-gray-800"
                >
                  {t("add_todo.form.description_label")} <span className="text-gray-400">{t("add_todo.form.description_optional")}</span>
                </label>
                <input
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder={t("add_todo.form.description_placeholder")}
                  type="text"
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500 transition"
                />
              </div>

              {(error || success) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={[
                    "rounded-xl border p-4 text-sm",
                    error
                      ? "border-red-200 bg-red-50 text-red-700"
                      : "border-green-200 bg-green-50 text-green-700",
                  ].join(" ")}
                >
                  <p className="font-semibold flex items-center gap-2">
                    {error ? <FaTrash /> : <FaCheck />} {error ? t("add_todo.messages.error_title") : t("add_todo.messages.success_title")}
                  </p>
                  <p className="mt-1">{error || success}</p>
                </motion.div>
              )}

              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 rounded-xl whitespace-nowrap bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700 active:bg-green-800 disabled:opacity-60 disabled:cursor-not-allowed transition focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/40"
                >
                  <FaPlus />
                  {loading ? t("add_todo.buttons.loading") : t("add_todo.buttons.submit")}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => {
                    setError("");
                    setSuccess("");
                    setForm((prev) => ({ ...prev, task: "", description: "" }));
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 active:bg-gray-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500/20"
                >
                  <FaTrash /> {t("add_todo.buttons.clear")}
                </motion.button>
              </div>
            </form>

            <p className="mt-5 text-xs text-gray-400">
              {t("add_todo.note")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AddToDo;
