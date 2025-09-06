import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles.css";

const mockCourses = [
  {
    id: 1,
    title: "Digital Marketing Mastery",
    description:
      "Learn the complete digital marketing funnel from scratch to advanced strategies.",
    price: 2999,
    instructor: "Priya Sharma",
    instructorId: "instructor1",
    rating: 4.9,
    students: 2847,
    duration: "12 hours",
    level: "Beginner",
    category: "Marketing",
    thumbnail: "💼",
    reviews: [],
  },
  {
    id: 2,
    title: "React Development Bootcamp",
    description:
      "Build modern web applications with React, hooks, and advanced patterns.",
    price: 3999,
    instructor: "Arjun Patel",
    instructorId: "instructor2",
    rating: 4.8,
    students: 1943,
    duration: "18 hours",
    level: "Intermediate",
    category: "Programming",
    thumbnail: "⚛️",
    reviews: [],
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    description:
      "Create beautiful and functional user interfaces with design thinking approach.",
    price: 2499,
    instructor: "Sneha Reddy",
    instructorId: "instructor3",
    rating: 4.7,
    students: 3201,
    duration: "15 hours",
    level: "Beginner",
    category: "Design",
    thumbnail: "🎨",
    reviews: [],
  },
];

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function App() {
  const [user, setUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [courses, setCourses] = useState(mockCourses);
  const [page, setPage] = useState("role-selection");
  const [selectedRole, setSelectedRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      const savedEnrollments = localStorage.getItem("enrollments");

      if (savedUser) {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setPage("dashboard");
      }
      if (savedEnrollments) {
        setEnrolledCourses(JSON.parse(savedEnrollments));
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      localStorage.clear();
    }
  }, []);

  function handleRoleSelection(role) {
    setSelectedRole(role);
    setPage("login");
  }

  function handleLogin(userData) {
    const completeUserData = {
      ...userData,
      role: selectedRole,
      profileImage: null,
      bio: "",
      thassaType: "",
      joinedDate: new Date().toISOString(),
    };
    setUser(completeUserData);
    try {
      localStorage.setItem("user", JSON.stringify(completeUserData));
    } catch (error) {
      console.error("Error saving user to localStorage:", error);
    }
    setPage("dashboard");
  }

  function handleLogout() {
    setUser(null);
    setSelectedRole("");
    setEnrolledCourses([]);
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
    setPage("role-selection");
  }

  function updateUser(updatedUserData) {
    setUser(updatedUserData);
    try {
      localStorage.setItem("user", JSON.stringify(updatedUserData));
    } catch (error) {
      console.error("Error updating user in localStorage:", error);
    }
  }

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {page === "role-selection" && (
          <RoleSelection key="role" onRoleSelect={handleRoleSelection} />
        )}

        {page === "login" && (
          <LoginPage
            key="login"
            selectedRole={selectedRole}
            onLogin={handleLogin}
            onBack={() => setPage("role-selection")}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}

        {page === "dashboard" && user && (
          <Dashboard
            key="dashboard"
            user={user}
            courses={courses}
            enrolledCourses={enrolledCourses}
            setPage={setPage}
            onLogout={handleLogout}
          />
        )}

        {page === "courses" && (
          <CoursesPage
            key="courses"
            user={user}
            courses={courses}
            enrolledCourses={enrolledCourses}
            setEnrolledCourses={setEnrolledCourses}
            setPage={setPage}
            onLogout={handleLogout}
          />
        )}

        {page === "create-course" && (
          <CreateCoursePage
            key="create"
            user={user}
            courses={courses}
            setCourses={setCourses}
            setPage={setPage}
            onLogout={handleLogout}
          />
        )}

        {page === "profile" && (
          <ProfilePage
            key="profile"
            user={user}
            setPage={setPage}
            onLogout={handleLogout}
            updateUser={updateUser}
          />
        )}

        {[
          "analytics",
          "students",
          "live-session",
          "study-groups",
          "certificates",
        ].includes(page) && (
          <ComingSoonPage
            key={page}
            user={user}
            page={page}
            setPage={setPage}
            onLogout={handleLogout}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function RoleSelection({ onRoleSelect }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="role-selection-container"
    >
      <motion.div
        className="welcome-card"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="logo-section"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.div
            className="logo"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            SkillForge
          </motion.div>
          <h2>Welcome to SkillForge</h2>
          <p>Choose your learning journey</p>
        </motion.div>

        <motion.div
          className="role-cards"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="role-card"
            variants={itemVariants}
            whileHover={{
              scale: 1.03,
              y: -8,
              boxShadow: "0 12px 40px rgba(76, 175, 80, 0.2)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onRoleSelect("student")}
          >
            <motion.div
              className="role-illustration"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="student-icon">🎓</div>
            </motion.div>
            <h3>I'm a Student</h3>
            <p>Discover courses, learn new skills, and advance your career</p>
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.li variants={itemVariants}>
                Access thousands of courses
              </motion.li>
              <motion.li variants={itemVariants}>Join study groups</motion.li>
              <motion.li variants={itemVariants}>Earn certificates</motion.li>
              <motion.li variants={itemVariants}>Track your progress</motion.li>
            </motion.ul>
          </motion.div>

          <motion.div
            className="role-card"
            variants={itemVariants}
            whileHover={{
              scale: 1.03,
              y: -8,
              boxShadow: "0 12px 40px rgba(76, 175, 80, 0.2)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onRoleSelect("teacher")}
          >
            <motion.div
              className="role-illustration"
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="teacher-icon">👨‍🏫</div>
            </motion.div>
            <h3>I'm a Teacher</h3>
            <p>Share your knowledge and build your teaching business</p>
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.li variants={itemVariants}>
                Create and sell courses
              </motion.li>
              <motion.li variants={itemVariants}>Manage students</motion.li>
              <motion.li variants={itemVariants}>Analytics dashboard</motion.li>
              <motion.li variants={itemVariants}>Live sessions</motion.li>
            </motion.ul>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function LoginPage({ selectedRole, onLogin, onBack, isLoading, setIsLoading }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignUp, setIsSignUp] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !formData.email ||
      (!isSignUp && !formData.password) ||
      (isSignUp && (!formData.name || !formData.password))
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const userData = {
        id: Date.now(),
        name: formData.name || formData.email.split("@")[0],
        email: formData.email,
        joinedDate: new Date().toISOString(),
      };
      setIsLoading(false);
      onLogin(userData);
    }, 1500);
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="login-container"
    >
      <motion.button
        className="back-button"
        onClick={onBack}
        whileHover={{ scale: 1.05, x: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        ← Back
      </motion.button>

      <motion.div
        className="login-card"
        initial={{ scale: 0.9, opacity: 0, rotateY: -10 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="login-left"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.div
            className="login-illustration"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.5,
              duration: 0.6,
              type: "spring",
              stiffness: 200,
            }}
          >
            <div className="illustration-content">
              <motion.div
                className="person-1"
                animate={{ y: [0, -5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
              >
                👨‍💻
              </motion.div>
              <motion.div
                className="person-2"
                animate={{ y: [0, 5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
              >
                👩‍💻
              </motion.div>
              <motion.div
                className="laptop"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                💻
              </motion.div>
            </div>
          </motion.div>
          <h3>Distance Learning Programs</h3>
          <p>
            Acquire new skills and advance your career with our comprehensive
            online courses.
          </p>
        </motion.div>

        <motion.div
          className="login-right"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="login-header">
            <motion.div className="logo" whileHover={{ scale: 1.05 }}>
              SkillForge
            </motion.div>
            <h2>Welcome to SkillForge</h2>
            <motion.p
              className="role-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            >
              {selectedRole === "student" ? "Student Portal" : "Teacher Portal"}
            </motion.p>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="login-form"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {isSignUp && (
                <motion.div
                  className="input-group"
                  variants={itemVariants}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="form-input"
                    whileFocus={{ scale: 1.02, borderColor: "#4CAF50" }}
                    required
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div className="input-group" variants={itemVariants}>
              <motion.input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="form-input"
                whileFocus={{ scale: 1.02, borderColor: "#4CAF50" }}
                required
              />
            </motion.div>

            <motion.div className="input-group" variants={itemVariants}>
              <motion.input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="form-input"
                whileFocus={{ scale: 1.02, borderColor: "#4CAF50" }}
                required={isSignUp}
              />
            </motion.div>

            <motion.button
              type="submit"
              className={`sign-in-btn ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <motion.div
                  className="spinner"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                />
              ) : isSignUp ? (
                "Sign Up"
              ) : (
                "Sign In"
              )}
            </motion.button>

            <motion.div className="divider" variants={itemVariants}>
              <span>or</span>
            </motion.div>

            <motion.button
              type="button"
              className="google-btn"
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="google-icon">🔍</span>
              Sign in with Google
            </motion.button>

            <motion.div className="auth-switch" variants={itemVariants}>
              {isSignUp ? (
                <p>
                  Already have an account?{" "}
                  <button type="button" onClick={() => setIsSignUp(false)}>
                    Sign In
                  </button>
                </p>
              ) : (
                <p>
                  Don't have an account?{" "}
                  <button type="button" onClick={() => setIsSignUp(true)}>
                    Create Account
                  </button>
                </p>
              )}
            </motion.div>
          </motion.form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function MobileHeader({ user, setPage, onLogout }) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const teacherNavItems = [
    {
      name: "Dashboard",
      icon: "🏠",
      action: () => {
        setPage("dashboard");
        setShowMobileMenu(false);
      },
    },
    {
      name: "Create Course",
      icon: "➕",
      action: () => {
        setPage("create-course");
        setShowMobileMenu(false);
      },
    },
    {
      name: "Analytics",
      icon: "📊",
      action: () => {
        setPage("analytics");
        setShowMobileMenu(false);
      },
    },
    {
      name: "Students",
      icon: "👥",
      action: () => {
        setPage("students");
        setShowMobileMenu(false);
      },
    },
  ];

  const studentNavItems = [
    {
      name: "Dashboard",
      icon: "🏠",
      action: () => {
        setPage("dashboard");
        setShowMobileMenu(false);
      },
    },
    {
      name: "Courses",
      icon: "📚",
      action: () => {
        setPage("courses");
        setShowMobileMenu(false);
      },
    },
    {
      name: "Study Groups",
      icon: "👥",
      action: () => {
        setPage("study-groups");
        setShowMobileMenu(false);
      },
    },
    {
      name: "Certificates",
      icon: "🏆",
      action: () => {
        setPage("certificates");
        setShowMobileMenu(false);
      },
    },
  ];

  const navItems = user.role === "teacher" ? teacherNavItems : studentNavItems;

  return (
    <motion.div
      className="mobile-header"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div className="header-left" whileHover={{ scale: 1.02 }}>
        <div className="logo">SkillForge</div>
      </motion.div>

      <motion.div
        className="desktop-nav"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {navItems.map((item, index) => (
          <motion.button
            key={index}
            className="nav-item"
            onClick={item.action}
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-text">{item.name}</span>
          </motion.button>
        ))}
      </motion.div>

      <div className="header-right">
        <motion.button
          className="mobile-menu-btn"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          whileTap={{ scale: 0.95 }}
        >
          <span className={`hamburger ${showMobileMenu ? "active" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </motion.button>

        <motion.div
          className="user-menu"
          onClick={() => setShowUserMenu(!showUserMenu)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="user-avatar"
            whileHover={{ rotate: 5, scale: 1.1 }}
          >
            {user.profileImage ? (
              <img src={user.profileImage} alt="Profile" />
            ) : (
              user.name.charAt(0).toUpperCase()
            )}
          </motion.div>
          <span className="user-name desktop-only">{user.name}</span>

          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                className="dropdown-menu"
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <motion.button
                  onClick={() => {
                    setPage("profile");
                    setShowUserMenu(false);
                  }}
                  whileHover={{ backgroundColor: "#f0f9f0" }}
                >
                  <span className="menu-icon">👤</span>
                  Profile Settings
                </motion.button>
                <motion.button
                  onClick={onLogout}
                  whileHover={{ backgroundColor: "#f0f9f0" }}
                >
                  <span className="menu-icon">🚪</span>
                  Logout
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            className="mobile-nav-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="mobile-nav-content"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {navItems.map((item, index) => (
                <motion.button
                  key={index}
                  className="mobile-nav-item"
                  onClick={item.action}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-text">{item.name}</span>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Dashboard({ user, courses, enrolledCourses, setPage, onLogout }) {
  const userCourses =
    user.role === "teacher"
      ? courses.filter((c) => c.instructorId === user.id)
      : [];
  const enrolledDetails =
    user.role === "student"
      ? courses.filter((c) => enrolledCourses.includes(c.id))
      : [];

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <MobileHeader user={user} setPage={setPage} onLogout={onLogout} />

      <div className="main-container">
        <motion.div
          className="dashboard-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="dashboard-header" variants={itemVariants}>
            <h1>Welcome back, {user.name}! 👋</h1>
            <p>Here's your {user.role} dashboard</p>
          </motion.div>

          {user.role === "teacher" ? (
            <TeacherDashboard userCourses={userCourses} setPage={setPage} />
          ) : (
            <StudentDashboard
              enrolledCourses={enrolledDetails}
              setPage={setPage}
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

function TeacherDashboard({ userCourses, setPage }) {
  const stats = {
    totalCourses: userCourses.length,
    totalStudents: userCourses.reduce(
      (sum, course) => sum + course.students,
      0
    ),
    totalRevenue: userCourses.reduce(
      (sum, course) => sum + course.price * course.students,
      0
    ),
    avgRating:
      userCourses.length > 0
        ? (
            userCourses.reduce((sum, course) => sum + course.rating, 0) /
            userCourses.length
          ).toFixed(1)
        : 0,
  };

  const actionItems = [
    {
      title: "Create New Course",
      desc: "Build and launch your next course",
      icon: "➕",
      action: () => setPage("create-course"),
    },
    {
      title: "Analytics Dashboard",
      desc: "Track performance and engagement",
      icon: "📊",
      action: () => setPage("analytics"),
    },
    {
      title: "Manage Students",
      desc: "View and interact with your students",
      icon: "👨‍🎓",
      action: () => setPage("students"),
    },
    {
      title: "Live Sessions",
      desc: "Host interactive live classes",
      icon: "🎥",
      action: () => setPage("live-session"),
    },
  ];

  return (
    <motion.div className="dashboard-grid">
      <motion.div
        className="stats-section"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {[
          { icon: "📚", value: stats.totalCourses, label: "Total Courses" },
          { icon: "👥", value: stats.totalStudents, label: "Total Students" },
          {
            icon: "💰",
            value: `₹${(stats.totalRevenue / 1000).toFixed(0)}K`,
            label: "Revenue",
          },
          { icon: "⭐", value: stats.avgRating, label: "Avg Rating" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="stat-card"
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="stat-icon"
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {stat.icon}
            </motion.div>
            <div className="stat-info">
              <motion.h3
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.2 + index * 0.1,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                {stat.value}
              </motion.h3>
              <p>{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="action-cards"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {actionItems.map((item, index) => (
          <motion.div
            key={index}
            className="action-card"
            variants={itemVariants}
            whileHover={{
              scale: 1.03,
              y: -8,
              boxShadow: "0 15px 35px rgba(76, 175, 80, 0.2)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={item.action}
          >
            <motion.div
              className="action-icon"
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {item.icon}
            </motion.div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

function StudentDashboard({ enrolledCourses, setPage }) {
  const stats = {
    coursesEnrolled: enrolledCourses.length,
    hoursLearned: enrolledCourses.length * 8,
    certificatesEarned: Math.floor(enrolledCourses.length * 0.7),
    currentStreak: 15,
  };

  const actionItems = [
    {
      title: "Browse Courses",
      desc: "Discover new skills and knowledge",
      icon: "🔍",
      action: () => setPage("courses"),
    },
    {
      title: "Study Groups",
      desc: "Join collaborative learning sessions",
      icon: "👥",
      action: () => setPage("study-groups"),
    },
    {
      title: "My Certificates",
      desc: "View and download your achievements",
      icon: "🎓",
      action: () => setPage("certificates"),
    },
    {
      title: "Live Classes",
      desc: "Join interactive live sessions",
      icon: "📹",
      action: () => setPage("live-session"),
    },
  ];

  return (
    <motion.div className="dashboard-grid">
      <motion.div
        className="stats-section"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {[
          {
            icon: "📚",
            value: stats.coursesEnrolled,
            label: "Courses Enrolled",
          },
          {
            icon: "⏱️",
            value: `${stats.hoursLearned}h`,
            label: "Hours Learned",
          },
          {
            icon: "🏆",
            value: stats.certificatesEarned,
            label: "Certificates",
          },
          { icon: "🔥", value: stats.currentStreak, label: "Day Streak" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="stat-card"
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <motion.div
              className="stat-icon"
              whileHover={{ rotate: 10, scale: 1.1 }}
            >
              {stat.icon}
            </motion.div>
            <div className="stat-info">
              <motion.h3
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
              >
                {stat.value}
              </motion.h3>
              <p>{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="action-cards"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {actionItems.map((item, index) => (
          <motion.div
            key={index}
            className="action-card"
            variants={itemVariants}
            whileHover={{
              scale: 1.03,
              y: -8,
              boxShadow: "0 15px 35px rgba(76, 175, 80, 0.2)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={item.action}
          >
            <motion.div
              className="action-icon"
              whileHover={{ rotate: 5, scale: 1.1 }}
            >
              {item.icon}
            </motion.div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {enrolledCourses.length > 0 && (
        <motion.div
          className="continue-learning"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <h3>Continue Learning</h3>
          <motion.div
            className="course-progress-list"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {enrolledCourses.slice(0, 3).map((course, index) => (
              <motion.div
                key={course.id}
                className="progress-item"
                variants={itemVariants}
                whileHover={{ x: 5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="course-thumb"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  {course.thumbnail}
                </motion.div>
                <div className="course-info">
                  <h4>{course.title}</h4>
                  <p>by {course.instructor}</p>
                  <div className="progress-bar">
                    <motion.div
                      className="progress-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.floor(Math.random() * 100)}%` }}
                      transition={{ delay: 0.5 + index * 0.2, duration: 1 }}
                    />
                  </div>
                </div>
                <motion.button
                  className="continue-btn"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Continue
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

function CoursesPage({
  user,
  courses,
  enrolledCourses,
  setEnrolledCourses,
  setPage,
  onLogout,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Programming", "Marketing", "Design", "Business"];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  function handleEnroll(courseId) {
    if (!enrolledCourses.includes(courseId)) {
      const newEnrollments = [...enrolledCourses, courseId];
      setEnrolledCourses(newEnrollments);
      try {
        localStorage.setItem("enrollments", JSON.stringify(newEnrollments));
      } catch (error) {
        console.error("Error saving enrollments:", error);
      }
      alert("Enrollment successful! 🎉");
    }
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <MobileHeader user={user} setPage={setPage} onLogout={onLogout} />

      <div className="main-container">
        <motion.div
          className="courses-header"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <h1>Discover Courses</h1>
            <p>Find the perfect course to advance your skills</p>
          </motion.div>

          <motion.div className="search-section" variants={itemVariants}>
            <div className="search-bar">
              <motion.input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                whileFocus={{ scale: 1.02, borderColor: "#4CAF50" }}
              />
            </div>

            <motion.div
              className="filter-tabs"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  className={`filter-tab ${
                    selectedCategory === category ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(category)}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="courses-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              className="course-card"
              variants={itemVariants}
              whileHover={{
                y: -10,
                scale: 1.02,
                boxShadow: "0 15px 40px rgba(0, 0, 0, 0.15)",
              }}
              whileTap={{ scale: 0.98 }}
              layout
            >
              <div className="course-image">
                <motion.div
                  className="course-thumbnail"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {course.thumbnail}
                </motion.div>
                <motion.div
                  className="course-level"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {course.level}
                </motion.div>
              </div>

              <div className="course-content">
                <h3>{course.title}</h3>
                <p className="instructor">by {course.instructor}</p>
                <p className="description">{course.description}</p>

                <div className="course-stats">
                  <span>⭐ {course.rating}</span>
                  <span>👥 {course.students}</span>
                  <span>⏱️ {course.duration}</span>
                </div>

                <div className="course-footer">
                  <div className="price">₹{course.price}</div>
                  <motion.button
                    className={`enroll-btn ${
                      enrolledCourses.includes(course.id) ? "enrolled" : ""
                    }`}
                    onClick={() => handleEnroll(course.id)}
                    disabled={enrolledCourses.includes(course.id)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {enrolledCourses.includes(course.id)
                      ? "✓ Enrolled"
                      : "Enroll Now"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

function CreateCoursePage({ user, courses, setCourses, setPage, onLogout }) {
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    level: "Beginner",
    category: "Programming",
  });

  function handleSubmit(e) {
    e.preventDefault();
    const newCourse = {
      ...courseData,
      id: Date.now(),
      instructor: user.name,
      instructorId: user.id,
      rating: 0,
      students: 0,
      reviews: [],
      thumbnail: ["🚀", "💡", "🎯", "⭐", "📚", "🔥"][
        Math.floor(Math.random() * 6)
      ],
    };

    const updatedCourses = [...courses, newCourse];
    setCourses(updatedCourses);
    try {
      localStorage.setItem("courses", JSON.stringify(updatedCourses));
    } catch (error) {
      console.error("Error saving courses:", error);
    }
    alert("Course created successfully! 🎉");
    setPage("dashboard");
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <MobileHeader user={user} setPage={setPage} onLogout={onLogout} />

      <div className="main-container">
        <motion.div
          className="create-course-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="page-header" variants={itemVariants}>
            <h1>Create New Course</h1>
            <p>Share your knowledge with the world</p>
          </motion.div>

          <motion.div
            className="course-form-card"
            variants={itemVariants}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.form
              onSubmit={handleSubmit}
              className="course-form"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="form-grid">
                <motion.div className="form-group" variants={itemVariants}>
                  <label>Course Title</label>
                  <motion.input
                    type="text"
                    value={courseData.title}
                    onChange={(e) =>
                      setCourseData({ ...courseData, title: e.target.value })
                    }
                    placeholder="Enter an engaging course title"
                    className="form-input"
                    whileFocus={{ scale: 1.02, borderColor: "#4CAF50" }}
                    required
                  />
                </motion.div>

                <motion.div className="form-group" variants={itemVariants}>
                  <label>Category</label>
                  <motion.select
                    value={courseData.category}
                    onChange={(e) =>
                      setCourseData({ ...courseData, category: e.target.value })
                    }
                    className="form-input"
                    whileFocus={{ scale: 1.02, borderColor: "#4CAF50" }}
                  >
                    <option value="Programming">Programming</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Design">Design</option>
                    <option value="Business">Business</option>
                  </motion.select>
                </motion.div>

                <motion.div
                  className="form-group full-width"
                  variants={itemVariants}
                >
                  <label>Description</label>
                  <motion.textarea
                    value={courseData.description}
                    onChange={(e) =>
                      setCourseData({
                        ...courseData,
                        description: e.target.value,
                      })
                    }
                    placeholder="What will students learn in this course?"
                    className="form-textarea"
                    rows={4}
                    whileFocus={{ scale: 1.02, borderColor: "#4CAF50" }}
                    required
                  />
                </motion.div>

                <motion.div className="form-group" variants={itemVariants}>
                  <label>Price (₹)</label>
                  <motion.input
                    type="number"
                    value={courseData.price}
                    onChange={(e) =>
                      setCourseData({ ...courseData, price: e.target.value })
                    }
                    placeholder="2999"
                    className="form-input"
                    min="0"
                    whileFocus={{ scale: 1.02, borderColor: "#4CAF50" }}
                    required
                  />
                </motion.div>

                <motion.div className="form-group" variants={itemVariants}>
                  <label>Duration</label>
                  <motion.input
                    type="text"
                    value={courseData.duration}
                    onChange={(e) =>
                      setCourseData({ ...courseData, duration: e.target.value })
                    }
                    placeholder="e.g., 8 hours"
                    className="form-input"
                    whileFocus={{ scale: 1.02, borderColor: "#4CAF50" }}
                    required
                  />
                </motion.div>

                <motion.div className="form-group" variants={itemVariants}>
                  <label>Level</label>
                  <motion.select
                    value={courseData.level}
                    onChange={(e) =>
                      setCourseData({ ...courseData, level: e.target.value })
                    }
                    className="form-input"
                    whileFocus={{ scale: 1.02, borderColor: "#4CAF50" }}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </motion.select>
                </motion.div>
              </div>

              <motion.button
                type="submit"
                className="submit-btn"
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  y: -3,
                  boxShadow: "0 8px 25px rgba(76, 175, 80, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                Create Course
              </motion.button>
            </motion.form>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ProfilePage({ user, setPage, onLogout, updateUser }) {
  const [editing, setEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name || "",
    email: user.email || "",
    bio: user.bio || "",
    thassaType: user.thassaType || "",
    profileImage: user.profileImage || null,
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData({
          ...profileData,
          profileImage: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const updatedUser = { ...user, ...profileData };
    updateUser(updatedUser);
    setEditing(false);
    alert("Profile updated successfully! ✅");
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <MobileHeader user={user} setPage={setPage} onLogout={onLogout} />

      <div className="main-container">
        <motion.div
          className="profile-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="page-header" variants={itemVariants}>
            <h1>Profile Settings</h1>
            <p>Manage your account information and preferences</p>
          </motion.div>

          <motion.div
            className="profile-card"
            variants={itemVariants}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="profile-header">
              <motion.div
                className="profile-image-section"
                whileHover={{ scale: 1.05 }}
              >
                <div className="profile-avatar-large">
                  {profileData.profileImage ? (
                    <img src={profileData.profileImage} alt="Profile" />
                  ) : (
                    user.name.charAt(0).toUpperCase()
                  )}
                </div>
                {editing && (
                  <motion.div
                    className="image-upload-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <label htmlFor="image-upload" className="upload-btn">
                      📸 Change Photo
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: "none" }}
                    />
                  </motion.div>
                )}
              </motion.div>

              <div className="profile-basic">
                {editing ? (
                  <motion.input
                    type="text"
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                    className="profile-input large"
                    whileFocus={{ scale: 1.02, borderColor: "#4CAF50" }}
                  />
                ) : (
                  <h2>{user.name}</h2>
                )}

                <div className="user-role-badge">{user.role}</div>

                {user.thassaType && (
                  <motion.div
                    className="thassa-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    {user.thassaType === "king"
                      ? "👑 Thassa King"
                      : "👸 Thassa Queen"}
                  </motion.div>
                )}

                <p className="join-date">
                  Joined {new Date(user.joinedDate).toLocaleDateString()}
                </p>
              </div>

              <motion.button
                className={editing ? "save-btn" : "edit-btn"}
                onClick={editing ? handleSave : () => setEditing(true)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {editing ? "💾 Save" : "✏️ Edit Profile"}
              </motion.button>
            </div>

            <div className="profile-details">
              <motion.div className="profile-section" variants={itemVariants}>
                <h3>📧 Email</h3>
                {editing ? (
                  <motion.input
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                    className="profile-input"
                    whileFocus={{ scale: 1.02, borderColor: "#4CAF50" }}
                  />
                ) : (
                  <p>{user.email}</p>
                )}
              </motion.div>

              <motion.div className="profile-section" variants={itemVariants}>
                <h3>📝 Bio</h3>
                {editing ? (
                  <motion.textarea
                    value={profileData.bio}
                    onChange={(e) =>
                      setProfileData({ ...profileData, bio: e.target.value })
                    }
                    className="profile-textarea"
                    placeholder="Tell us about yourself..."
                    rows={3}
                    whileFocus={{ scale: 1.02, borderColor: "#4CAF50" }}
                  />
                ) : (
                  <p>{user.bio || "No bio added yet."}</p>
                )}
              </motion.div>

              <motion.div className="profile-section" variants={itemVariants}>
                <h3>👑 Thassa Status</h3>
                {editing ? (
                  <div className="thassa-selection">
                    <motion.label
                      className={`thassa-option ${
                        profileData.thassaType === "king" ? "selected" : ""
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <input
                        type="radio"
                        name="thassaType"
                        value="king"
                        checked={profileData.thassaType === "king"}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            thassaType: e.target.value,
                          })
                        }
                      />
                      <span className="option-content">
                        <span className="option-icon">👑</span>
                        <span className="option-text">Thassa King</span>
                      </span>
                    </motion.label>

                    <motion.label
                      className={`thassa-option ${
                        profileData.thassaType === "queen" ? "selected" : ""
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <input
                        type="radio"
                        name="thassaType"
                        value="queen"
                        checked={profileData.thassaType === "queen"}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            thassaType: e.target.value,
                          })
                        }
                      />
                      <span className="option-content">
                        <span className="option-icon">👸</span>
                        <span className="option-text">Thassa Queen</span>
                      </span>
                    </motion.label>

                    <motion.label
                      className={`thassa-option ${
                        profileData.thassaType === "" ? "selected" : ""
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <input
                        type="radio"
                        name="thassaType"
                        value=""
                        checked={profileData.thassaType === ""}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            thassaType: e.target.value,
                          })
                        }
                      />
                      <span className="option-content">
                        <span className="option-icon">🤷</span>
                        <span className="option-text">Prefer not to say</span>
                      </span>
                    </motion.label>
                  </div>
                ) : (
                  <p>
                    {user.thassaType === "king"
                      ? "👑 Thassa King"
                      : user.thassaType === "queen"
                      ? "👸 Thassa Queen"
                      : "Not specified"}
                  </p>
                )}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ComingSoonPage({ user, page, setPage, onLogout }) {
  const pageInfo = {
    analytics: {
      icon: "📊",
      title: "Analytics Dashboard",
      desc: "Track your teaching performance",
    },
    students: {
      icon: "👥",
      title: "Student Management",
      desc: "Manage your students and track their progress",
    },
    "live-session": {
      icon: "🎥",
      title: "Live Sessions",
      desc: "Interactive live streaming for enhanced learning",
    },
    "study-groups": {
      icon: "👥",
      title: "Study Groups",
      desc: "Collaborative learning with your peers",
    },
    certificates: {
      icon: "🏆",
      title: "Certificates",
      desc: "Digital certificates for completed courses",
    },
  };

  const info = pageInfo[page];

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <MobileHeader user={user} setPage={setPage} onLogout={onLogout} />
      <div className="main-container">
        <motion.div
          className="page-header"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <h1>{info.title}</h1>
          <p>{info.desc}</p>
        </motion.div>

        <motion.div
          className="coming-soon"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="coming-soon-icon"
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            }}
          >
            {info.icon}
          </motion.div>
          <h3>{info.title} Coming Soon</h3>
          <p>{info.desc}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
