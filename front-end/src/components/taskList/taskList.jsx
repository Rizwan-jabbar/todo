import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

function TaskList() {
  const { t } = useTranslation();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch tasks from API
  const fetchTasks = async () => {
    if (!token) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    try {
      setError("");
      const res = await fetch("http://localhost:3000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch tasks");

      setTasks(data.tasks || []);
    } catch (err) {
      setError(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  // Delete a task
  const handleDelete = async (taskId) => {
    if (!token) return alert("Not logged in");

    try {
      const res = await fetch(`http://localhost:3000/api/task/${taskId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete task");

      setTasks((prev) => prev.filter((t) => t._id !== taskId));
      if (selectedTask?._id === taskId) setSelectedTask(null);
    } catch (err) {
      alert(err.message || "Delete failed");
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, []);


  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <p className="text-gray-600 font-semibold">{t("tasksList.loading")}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <>
      <section className="px-4 py-6 flex justify-center">
        <div className="w-full max-w-2xl rounded-2xl bg-white border shadow-sm">
          <div className="p-5 border-b">
            <h2 className="text-xl font-bold">{t("tasksList.your_tasks")}</h2>
            <p className="text-sm text-gray-500">{t("tasksList.click_task")}</p>
          </div>

          <div className="p-5">
            {tasks.length === 0 ? (
              <p className="text-gray-500 text-center">{t("tasksList.no_tasks")}</p>
            ) : (
              <ul className="space-y-3">
                <AnimatePresence>
                  {tasks.map((task) => (
                    <motion.li
                      key={task._id}
                      layout
                      onClick={() => setSelectedTask(task)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between rounded-xl border p-4 hover:shadow-lg transition cursor-pointer"
                    >
                      <h4 className="font-semibold text-gray-800 hover:underline">
                        {task.title}
                      </h4>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(task._id);
                        }}
                        className="text-red-600 hover:text-red-700"
                        title={t("tasksList.delete")}
                      >
                        <FaTrash />
                      </button>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* Modal / Popup */}
      <AnimatePresence>
        {selectedTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold">{selectedTask.title}</h3>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="text-xl text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-xs font-semibold text-gray-500">{t("tasksList.description")}</p>
                  <p className="text-sm text-gray-700">{selectedTask.description || t("tasksList.no_tasks")}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-500">{t("tasksList.created_at")}</p>
                  <p className="text-sm text-gray-700">{new Date(selectedTask.createdAt).toLocaleString()}</p>
                </div>
              </div>

              <div className="mt-6 text-right">
                <button
                  onClick={() => setSelectedTask(null)}
                  className="rounded-xl bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800"
                >
                  {t("tasksList.close")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default TaskList;
