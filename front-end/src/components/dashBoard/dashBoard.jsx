import { useTranslation } from "react-i18next";
import AddToDo from "../addToDo/addToDo";
import TaskList from "../taskList/taskList";
import UserProfile from "../userProfile/userProfile";
import { FaTasks, FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";

function DashBoard() {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 p-2 lg:p-10">
      {/* Dashboard Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 flex items-center gap-2">
          <FaTasks className="text-green-600" /> {t("dashboard.title")}
        </h1>
        <p className="mt-1 text-sm text-gray-500">{t("dashboard.subtitle")}</p>
      </motion.div>

      {/* User Profile + Add Task */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <UserProfile />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AddToDo />
        </motion.div>
      </div>

      {/* Task List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 mt-6"
      >
        <TaskList className="w-full" />
      </motion.div>
    </div>
  );
}

export default DashBoard;
