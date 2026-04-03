import { useState } from "react";

const TRACKS = [
  { id: "webdev", label: "🌐 Web Development", icon: "🌐" },
  { id: "python", label: "🐍 Python Programming", icon: "🐍" },
  { id: "dsa", label: "🧠 DSA & Problem Solving", icon: "🧠" },
  { id: "reactjs", label: "⚛️ React.js", icon: "⚛️" },
  { id: "backend", label: "🖥️ Backend / Node.js", icon: "🖥️" },
  { id: "aiml", label: "🤖 AI / ML Basics", icon: "🤖" },
];

const HOURS = [1, 2, 3, 4, 5, 6];

const ROADMAPS = {
  webdev: {
    title: "Web Development",
    totalWeeks: { 1: 24, 2: 14, 3: 10, 4: 8, 5: 7, 6: 6 },
    weeks: [
      {
        title: "HTML Basics",
        topics: ["HTML structure", "Tags & Elements", "Forms & Tables", "Semantic HTML"],
        resources: [
          { name: "HTML Full Course – freeCodeCamp", url: "https://www.youtube.com/watch?v=pQN-pnXPaVg", type: "YouTube" },
          { name: "MDN HTML Guide", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML", type: "MDN" },
          { name: "freeCodeCamp HTML", url: "https://www.freecodecamp.org/learn/responsive-web-design/", type: "freeCodeCamp" },
        ],
        project: "Build a personal profile page",
      },
      {
        title: "CSS Fundamentals",
        topics: ["Selectors", "Box Model", "Flexbox", "CSS Grid"],
        resources: [
          { name: "CSS Full Course – Traversy Media", url: "https://www.youtube.com/watch?v=yfoY53QXEnI", type: "YouTube" },
          { name: "Flexbox Froggy (Game)", url: "https://flexboxfroggy.com/", type: "Game" },
          { name: "CSS Grid Garden (Game)", url: "https://cssgridgarden.com/", type: "Game" },
        ],
        project: "Clone a simple landing page",
      },
      {
        title: "Responsive Design",
        topics: ["Media Queries", "Mobile First", "CSS Variables", "Transitions"],
        resources: [
          { name: "Responsive Web Design – freeCodeCamp", url: "https://www.freecodecamp.org/learn/responsive-web-design/", type: "freeCodeCamp" },
          { name: "Kevin Powell CSS YouTube", url: "https://www.youtube.com/@KevinPowell", type: "YouTube" },
        ],
        project: "Make your profile page mobile-friendly",
      },
      {
        title: "JavaScript Basics",
        topics: ["Variables", "Functions", "Arrays", "DOM Manipulation"],
        resources: [
          { name: "JS Crash Course – Traversy Media", url: "https://www.youtube.com/watch?v=hdI2bqOjy3c", type: "YouTube" },
          { name: "freeCodeCamp JS Algorithms", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/", type: "freeCodeCamp" },
          { name: "MDN JS Guide", url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript", type: "MDN" },
        ],
        project: "Build a To-Do List app",
      },
      {
        title: "JavaScript Intermediate",
        topics: ["ES6+", "Promises", "Fetch API", "JSON"],
        resources: [
          { name: "JavaScript ES6 – Fireship", url: "https://www.youtube.com/watch?v=NCwa_xi0Uuc", type: "YouTube" },
          { name: "Async JS – The Net Ninja", url: "https://www.youtube.com/watch?v=ZYb_ZU8LNxs", type: "YouTube" },
        ],
        project: "Weather app using free API",
      },
      {
        title: "Git & GitHub",
        topics: ["Git init/commit/push", "Branches", "GitHub Pages", "Open Source basics"],
        resources: [
          { name: "Git & GitHub – freeCodeCamp", url: "https://www.youtube.com/watch?v=RGOj5yH7evk", type: "YouTube" },
          { name: "GitHub Docs", url: "https://docs.github.com/en/get-started", type: "Docs" },
        ],
        project: "Push all your projects to GitHub",
      },
      {
        title: "React Basics",
        topics: ["Components", "Props", "State", "useEffect"],
        resources: [
          { name: "React Full Course – freeCodeCamp", url: "https://www.youtube.com/watch?v=bMknfKXIFA8", type: "YouTube" },
          { name: "React Docs (Official)", url: "https://react.dev/learn", type: "Docs" },
        ],
        project: "Build a quiz app in React",
      },
      {
        title: "Final Project Week",
        topics: ["Portfolio website", "Deploy on Vercel (free)", "Write a README", "Share on LinkedIn"],
        resources: [
          { name: "Vercel Free Hosting", url: "https://vercel.com", type: "Tool" },
          { name: "How to write README – GitHub", url: "https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes", type: "Docs" },
        ],
        project: "🎉 Deploy your full portfolio!",
      },
    ],
  },
  python: {
    title: "Python Programming",
    totalWeeks: { 1: 20, 2: 12, 3: 8, 4: 6, 5: 5, 6: 4 },
    weeks: [
      {
        title: "Python Basics",
        topics: ["Variables & Types", "Conditions", "Loops", "Functions"],
        resources: [
          { name: "Python for Beginners – freeCodeCamp", url: "https://www.youtube.com/watch?v=rfscVS0vtbw", type: "YouTube" },
          { name: "Python.org Tutorial", url: "https://docs.python.org/3/tutorial/", type: "Docs" },
        ],
        project: "Simple calculator",
      },
      {
        title: "Data Structures",
        topics: ["Lists", "Dictionaries", "Tuples", "Sets"],
        resources: [
          { name: "Python DS – Corey Schafer", url: "https://www.youtube.com/playlist?list=PL-osiE80TeTt2d9bfVyTiXJA-UTHn6WwU", type: "YouTube" },
        ],
        project: "Student grade manager",
      },
      {
        title: "File Handling & Modules",
        topics: ["Read/Write files", "os module", "JSON", "pip packages"],
        resources: [
          { name: "Python File I/O – freeCodeCamp", url: "https://www.youtube.com/watch?v=Uh2ebFW8OYM", type: "YouTube" },
          { name: "Real Python File Handling", url: "https://realpython.com/read-write-files-python/", type: "Article" },
        ],
        project: "Expense tracker with CSV",
      },
      {
        title: "OOP in Python",
        topics: ["Classes", "Objects", "Inheritance", "Encapsulation"],
        resources: [
          { name: "OOP Python – Corey Schafer", url: "https://www.youtube.com/playlist?list=PL-osiE80TeTsqhIuOqKhwlXsIBIdSeYtc", type: "YouTube" },
        ],
        project: "Bank account system",
      },
    ],
  },
  dsa: {
    title: "DSA & Problem Solving",
    totalWeeks: { 1: 20, 2: 12, 3: 8, 4: 6, 5: 5, 6: 4 },
    weeks: [
      {
        title: "Arrays & Strings",
        topics: ["Array basics", "Two pointer", "Sliding window", "String manipulation"],
        resources: [
          { name: "DSA Full Course – freeCodeCamp", url: "https://www.youtube.com/watch?v=8hly31xKli0", type: "YouTube" },
          { name: "LeetCode Free Problems", url: "https://leetcode.com/problemset/", type: "Practice" },
        ],
        project: "Solve 20 easy LeetCode problems",
      },
      {
        title: "Linked Lists & Stacks",
        topics: ["Singly LL", "Doubly LL", "Stack", "Queue"],
        resources: [
          { name: "Linked List – mycodeschool", url: "https://www.youtube.com/playlist?list=PL2_aWCzGMAwI3W_JlcBbtYTwiQSsOTa6P", type: "YouTube" },
        ],
        project: "Implement stack using array",
      },
      {
        title: "Recursion & Sorting",
        topics: ["Recursion basics", "Bubble Sort", "Merge Sort", "Quick Sort"],
        resources: [
          { name: "Recursion – Abdul Bari", url: "https://www.youtube.com/watch?v=KEEKn7Me-ms", type: "YouTube" },
          { name: "Sorting Visualizer", url: "https://visualgo.net/en/sorting", type: "Tool" },
        ],
        project: "Visualize sorting algorithms",
      },
      {
        title: "Trees & Graphs",
        topics: ["Binary Tree", "BST", "BFS", "DFS"],
        resources: [
          { name: "Trees – WilliamFiset", url: "https://www.youtube.com/watch?v=oSWTXtMglKE", type: "YouTube" },
          { name: "Graph Visualizer", url: "https://visualgo.net/en/graphds", type: "Tool" },
        ],
        project: "Solve 10 tree problems on LeetCode",
      },
    ],
  },
  reactjs: {
    title: "React.js",
    totalWeeks: { 1: 16, 2: 10, 3: 7, 4: 6, 5: 5, 6: 4 },
    weeks: [
      {
        title: "React Fundamentals",
        topics: ["JSX", "Components", "Props", "State"],
        resources: [
          { name: "React Course – freeCodeCamp", url: "https://www.youtube.com/watch?v=bMknfKXIFA8", type: "YouTube" },
          { name: "React Official Docs", url: "https://react.dev/learn", type: "Docs" },
        ],
        project: "Counter & Todo app",
      },
      {
        title: "Hooks Deep Dive",
        topics: ["useState", "useEffect", "useContext", "useRef"],
        resources: [
          { name: "React Hooks – Codevolution", url: "https://www.youtube.com/playlist?list=PLC3y8-rFHvwisvxhZ135pogtX7_Oe3Q3A", type: "YouTube" },
        ],
        project: "Dark/light theme toggle app",
      },
      {
        title: "React Router & API",
        topics: ["react-router-dom", "Fetch/Axios", "Loading states", "Error handling"],
        resources: [
          { name: "React Router – Web Dev Simplified", url: "https://www.youtube.com/watch?v=Ul3y1LXxzdU", type: "YouTube" },
        ],
        project: "Movie search app using free API",
      },
      {
        title: "Final React Project",
        topics: ["Component architecture", "Deploy on Vercel", "Performance basics"],
        resources: [
          { name: "Vercel Free Deploy", url: "https://vercel.com", type: "Tool" },
        ],
        project: "🎉 Full React portfolio project",
      },
    ],
  },
  backend: {
    title: "Backend / Node.js",
    totalWeeks: { 1: 18, 2: 10, 3: 8, 4: 6, 5: 5, 6: 4 },
    weeks: [
      {
        title: "Node.js Basics",
        topics: ["Node intro", "fs module", "http module", "npm"],
        resources: [
          { name: "Node.js Crash Course – Traversy", url: "https://www.youtube.com/watch?v=fBNz5xF-Kx4", type: "YouTube" },
          { name: "Node.js Docs", url: "https://nodejs.org/en/docs/", type: "Docs" },
        ],
        project: "Simple file server",
      },
      {
        title: "Express.js",
        topics: ["Routing", "Middleware", "REST API", "Error handling"],
        resources: [
          { name: "Express Crash Course – Traversy", url: "https://www.youtube.com/watch?v=L72fhGm1tfE", type: "YouTube" },
        ],
        project: "Build a REST API",
      },
      {
        title: "MongoDB & Mongoose",
        topics: ["NoSQL basics", "CRUD operations", "Schema", "Atlas free tier"],
        resources: [
          { name: "MongoDB Crash Course – Web Dev Simplified", url: "https://www.youtube.com/watch?v=ofme2o29ngU", type: "YouTube" },
          { name: "MongoDB Atlas Free", url: "https://www.mongodb.com/cloud/atlas/register", type: "Tool" },
        ],
        project: "Todo API with MongoDB",
      },
      {
        title: "Auth & Deployment",
        topics: ["JWT Auth", "bcrypt", "Deploy on Render (free)", ".env files"],
        resources: [
          { name: "JWT Auth – Web Dev Simplified", url: "https://www.youtube.com/watch?v=mbsmsi7l3r4", type: "YouTube" },
          { name: "Render Free Hosting", url: "https://render.com", type: "Tool" },
        ],
        project: "🎉 Full backend API deployed",
      },
    ],
  },
  aiml: {
    title: "AI / ML Basics",
    totalWeeks: { 1: 24, 2: 14, 3: 10, 4: 8, 5: 7, 6: 6 },
    weeks: [
      {
        title: "Python for ML",
        topics: ["NumPy", "Pandas", "Matplotlib", "Data cleaning"],
        resources: [
          { name: "NumPy & Pandas – freeCodeCamp", url: "https://www.youtube.com/watch?v=r-uOLxNrNk8", type: "YouTube" },
          { name: "Kaggle Free Courses", url: "https://www.kaggle.com/learn", type: "freeCodeCamp" },
        ],
        project: "Analyze a free dataset from Kaggle",
      },
      {
        title: "ML Fundamentals",
        topics: ["Supervised learning", "Linear Regression", "Classification", "Train/Test split"],
        resources: [
          { name: "ML Course – Andrew Ng (Coursera Audit)", url: "https://www.coursera.org/learn/machine-learning", type: "Course" },
          { name: "ML Crash Course – Google", url: "https://developers.google.com/machine-learning/crash-course", type: "Docs" },
        ],
        project: "House price prediction model",
      },
      {
        title: "Scikit-Learn",
        topics: ["sklearn basics", "Decision Trees", "KNN", "Model evaluation"],
        resources: [
          { name: "Scikit-Learn – Sentdex", url: "https://www.youtube.com/playlist?list=PLQVvvaa0QuDd0flgGphKCej-9jp-QdzZ3", type: "YouTube" },
          { name: "sklearn Docs", url: "https://scikit-learn.org/stable/user_guide.html", type: "Docs" },
        ],
        project: "Spam email classifier",
      },
      {
        title: "Deep Learning Intro",
        topics: ["Neural networks basics", "TensorFlow/Keras intro", "Image classification"],
        resources: [
          { name: "Deep Learning – freeCodeCamp", url: "https://www.youtube.com/watch?v=tPYj3fFJGjk", type: "YouTube" },
          { name: "TensorFlow Free Tutorials", url: "https://www.tensorflow.org/tutorials", type: "Docs" },
        ],
        project: "Handwritten digit recognizer (MNIST)",
      },
    ],
  },
};

const TYPE_COLORS = {
  YouTube: { bg: "#fee2e2", color: "#991b1b", icon: "▶" },
  freeCodeCamp: { bg: "#dcfce7", color: "#166534", icon: "🏕" },
  MDN: { bg: "#dbeafe", color: "#1e40af", icon: "📘" },
  Docs: { bg: "#dbeafe", color: "#1e40af", icon: "📄" },
  Game: { bg: "#fef9c3", color: "#854d0e", icon: "🎮" },
  Practice: { bg: "#f3e8ff", color: "#6b21a8", icon: "💻" },
  Tool: { bg: "#e0f2fe", color: "#0c4a6e", icon: "🔧" },
  Article: { bg: "#fce7f3", color: "#9d174d", icon: "📰" },
  Course: { bg: "#dcfce7", color: "#166534", icon: "🎓" },
};

export default function RoadmapBuilder() {
  const [step, setStep] = useState(1); // 1=select track, 2=select hours, 3=show roadmap
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedHours, setSelectedHours] = useState(null);
  const [expandedWeek, setExpandedWeek] = useState(0);

  const roadmap = selectedTrack ? ROADMAPS[selectedTrack] : null;
  const totalWeeks = roadmap && selectedHours ? roadmap.totalWeeks[selectedHours] : null;

  // Scale weeks display based on hours
  const getWeeksToShow = () => {
    if (!roadmap) return [];
    return roadmap.weeks;
  };

  const handleReset = () => {
    setStep(1);
    setSelectedTrack(null);
    setSelectedHours(null);
    setExpandedWeek(0);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .rb-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);
          padding: 32px 16px 60px;
          color: #f8fafc;
        }

        .rb-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .rb-badge {
          display: inline-block;
          background: rgba(99,102,241,0.2);
          color: #a5b4fc;
          border: 1px solid rgba(99,102,241,0.3);
          border-radius: 20px;
          padding: 5px 16px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }

        .rb-title {
          font-size: clamp(28px, 5vw, 44px);
          font-weight: 800;
          background: linear-gradient(135deg, #fff 0%, #a5b4fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.2;
          margin-bottom: 12px;
        }

        .rb-sub {
          font-size: 14px;
          color: #94a3b8;
          font-weight: 400;
          max-width: 420px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Steps indicator */
        .rb-steps {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          margin-bottom: 36px;
        }

        .rb-step-dot {
          width: 32px;
          height: 6px;
          border-radius: 3px;
          background: rgba(255,255,255,0.1);
          transition: all 0.3s;
        }

        .rb-step-dot.active { background: #6366f1; width: 48px; }
        .rb-step-dot.done { background: #22c55e; }

        /* Card */
        .rb-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 32px;
          max-width: 720px;
          margin: 0 auto 24px;
          backdrop-filter: blur(10px);
        }

        .rb-card-title {
          font-size: 18px;
          font-weight: 700;
          color: #f1f5f9;
          margin-bottom: 6px;
        }

        .rb-card-sub {
          font-size: 13px;
          color: #64748b;
          margin-bottom: 24px;
        }

        /* Track Grid */
        .track-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 12px;
        }

        .track-btn {
          background: rgba(255,255,255,0.04);
          border: 1.5px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          padding: 18px 14px;
          cursor: pointer;
          text-align: center;
          transition: all 0.2s;
          color: #cbd5e1;
          font-family: inherit;
          font-size: 13px;
          font-weight: 600;
        }

        .track-btn:hover {
          border-color: #6366f1;
          background: rgba(99,102,241,0.1);
          color: #fff;
          transform: translateY(-2px);
        }

        .track-btn.selected {
          border-color: #6366f1;
          background: rgba(99,102,241,0.2);
          color: #fff;
        }

        .track-icon {
          font-size: 28px;
          display: block;
          margin-bottom: 8px;
        }

        /* Hours Grid */
        .hours-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 10px;
        }

        @media (max-width: 480px) { .hours-grid { grid-template-columns: repeat(3, 1fr); } }

        .hour-btn {
          background: rgba(255,255,255,0.04);
          border: 1.5px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 14px 8px;
          cursor: pointer;
          text-align: center;
          color: #cbd5e1;
          font-family: inherit;
          font-size: 20px;
          font-weight: 800;
          transition: all 0.2s;
        }

        .hour-btn small {
          display: block;
          font-size: 10px;
          font-weight: 500;
          color: #64748b;
          margin-top: 3px;
        }

        .hour-btn:hover, .hour-btn.selected {
          border-color: #6366f1;
          background: rgba(99,102,241,0.2);
          color: #fff;
          transform: translateY(-2px);
        }

        .hour-btn.selected small { color: #a5b4fc; }

        /* Next button */
        .rb-next {
          display: block;
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: #fff;
          border: none;
          border-radius: 12px;
          font-family: inherit;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          margin-top: 20px;
          transition: opacity 0.2s, transform 0.15s;
        }

        .rb-next:disabled { opacity: 0.3; cursor: not-allowed; }
        .rb-next:not(:disabled):hover { transform: translateY(-1px); opacity: 0.92; }

        /* Summary bar */
        .rb-summary {
          max-width: 720px;
          margin: 0 auto 20px;
          background: rgba(99,102,241,0.15);
          border: 1px solid rgba(99,102,241,0.3);
          border-radius: 14px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .rb-summary-info { font-size: 14px; color: #c7d2fe; font-weight: 500; }
        .rb-summary-info strong { color: #fff; }

        .rb-reset {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.15);
          color: #cbd5e1;
          border-radius: 8px;
          padding: 7px 14px;
          font-family: inherit;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .rb-reset:hover { background: rgba(255,255,255,0.15); }

        /* Weeks */
        .weeks-list {
          max-width: 720px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .week-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          overflow: hidden;
          transition: border-color 0.2s;
        }

        .week-card.open { border-color: rgba(99,102,241,0.4); }

        .week-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 20px;
          cursor: pointer;
          user-select: none;
        }

        .week-header:hover { background: rgba(255,255,255,0.03); }

        .week-left { display: flex; align-items: center; gap: 14px; }

        .week-num {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: #fff;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 800;
          flex-shrink: 0;
        }

        .week-title { font-size: 15px; font-weight: 700; color: #f1f5f9; }
        .week-topics { font-size: 12px; color: #64748b; margin-top: 2px; }

        .week-chevron {
          font-size: 16px;
          color: #475569;
          transition: transform 0.2s;
        }

        .week-card.open .week-chevron { transform: rotate(180deg); }

        .week-body {
          padding: 0 20px 20px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        /* Topics */
        .topics-section { margin-top: 16px; }
        .section-label {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #64748b;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .topics-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-bottom: 16px;
        }

        .topic-chip {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 4px 12px;
          font-size: 12px;
          color: #cbd5e1;
          font-weight: 500;
        }

        /* Resources */
        .resources-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }

        .resource-link {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 11px 14px;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s;
        }

        .resource-link:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(99,102,241,0.4);
        }

        .resource-badge {
          font-size: 10px;
          font-weight: 700;
          border-radius: 6px;
          padding: 3px 8px;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .resource-name { font-size: 13px; font-weight: 500; color: #e2e8f0; flex: 1; }
        .resource-arrow { font-size: 12px; color: #64748b; }

        /* Project */
        .project-box {
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.25);
          border-radius: 10px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .project-icon { font-size: 18px; }
        .project-label { font-size: 11px; font-weight: 700; color: #86efac; text-transform: uppercase; letter-spacing: 0.05em; }
        .project-text { font-size: 13px; color: #dcfce7; font-weight: 500; }

        /* Free banner */
        .free-banner {
          max-width: 720px;
          margin: 20px auto 0;
          background: rgba(34,197,94,0.08);
          border: 1px solid rgba(34,197,94,0.2);
          border-radius: 12px;
          padding: 14px 18px;
          text-align: center;
          font-size: 13px;
          color: #86efac;
          font-weight: 500;
        }

        @media (max-width: 480px) {
          .rb-card { padding: 20px 16px; }
          .track-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <div className="rb-root">
        {/* Header */}
        <div className="rb-header">
          <div className="rb-badge">100% Free Resources Only</div>
          <h1 className="rb-title">Your Free Coding Roadmap</h1>
          <p className="rb-sub">Koi paid course nahi. Sirf free resources se — YouTube, freeCodeCamp, MDN.</p>
        </div>

        {/* Step Indicators */}
        <div className="rb-steps">
          <div className={`rb-step-dot ${step === 1 ? "active" : step > 1 ? "done" : ""}`} />
          <div className={`rb-step-dot ${step === 2 ? "active" : step > 2 ? "done" : ""}`} />
          <div className={`rb-step-dot ${step === 3 ? "active" : ""}`} />
        </div>

        {/* Step 1: Select Track */}
        {step === 1 && (
          <div className="rb-card">
            <div className="rb-card-title">🎯 Kya seekhna hai?</div>
            <div className="rb-card-sub">Apna learning track choose karo</div>
            <div className="track-grid">
              {TRACKS.map(t => (
                <button
                  key={t.id}
                  className={`track-btn ${selectedTrack === t.id ? "selected" : ""}`}
                  onClick={() => setSelectedTrack(t.id)}
                >
                  <span className="track-icon">{t.icon}</span>
                  {t.label.replace(t.icon + " ", "")}
                </button>
              ))}
            </div>
            <button
              className="rb-next"
              disabled={!selectedTrack}
              onClick={() => setStep(2)}
            >
              Next →
            </button>
          </div>
        )}

        {/* Step 2: Select Hours */}
        {step === 2 && (
          <div className="rb-card">
            <div className="rb-card-title">⏰ Roz kitne ghante de sakte ho?</div>
            <div className="rb-card-sub">Honest raho — isse better roadmap milega</div>
            <div className="hours-grid">
              {HOURS.map(h => (
                <button
                  key={h}
                  className={`hour-btn ${selectedHours === h ? "selected" : ""}`}
                  onClick={() => setSelectedHours(h)}
                >
                  {h}
                  <small>{h === 1 ? "ghanta" : "ghante"}</small>
                </button>
              ))}
            </div>
            {selectedHours && roadmap && (
              <div style={{ marginTop: "16px", background: "rgba(99,102,241,0.1)", borderRadius: "10px", padding: "12px 16px", fontSize: "13px", color: "#a5b4fc", textAlign: "center" }}>
                📅 Estimated completion: <strong style={{ color: "#fff" }}>{roadmap.totalWeeks[selectedHours]} weeks</strong> (~{Math.round(roadmap.totalWeeks[selectedHours] / 4)} months)
              </div>
            )}
            <button className="rb-next" disabled={!selectedHours} onClick={() => setStep(3)}>
              Mera Roadmap Banao 🚀
            </button>
          </div>
        )}

        {/* Step 3: Roadmap */}
        {step === 3 && roadmap && (
          <>
            <div className="rb-summary">
              <div className="rb-summary-info">
                📚 <strong>{roadmap.title}</strong> &nbsp;·&nbsp;
                ⏰ <strong>{selectedHours} ghante/din</strong> &nbsp;·&nbsp;
                📅 <strong>~{totalWeeks} weeks</strong>
              </div>
              <button className="rb-reset" onClick={handleReset}>← Dobara banao</button>
            </div>

            <div className="weeks-list">
              {getWeeksToShow().map((week, i) => (
                <div key={i} className={`week-card ${expandedWeek === i ? "open" : ""}`}>
                  <div className="week-header" onClick={() => setExpandedWeek(expandedWeek === i ? -1 : i)}>
                    <div className="week-left">
                      <div className="week-num">W{i + 1}</div>
                      <div>
                        <div className="week-title">{week.title}</div>
                        <div className="week-topics">{week.topics.slice(0, 2).join(", ")} {week.topics.length > 2 ? `+${week.topics.length - 2} more` : ""}</div>
                      </div>
                    </div>
                    <span className="week-chevron">▼</span>
                  </div>

                  {expandedWeek === i && (
                    <div className="week-body">
                      {/* Topics */}
                      <div className="topics-section">
                        <div className="section-label">📌 Is week mein seekhoge</div>
                        <div className="topics-chips">
                          {week.topics.map((t, j) => (
                            <span key={j} className="topic-chip">{t}</span>
                          ))}
                        </div>
                      </div>

                      {/* Resources */}
                      <div className="section-label">🆓 Free Resources</div>
                      <div className="resources-list">
                        {week.resources.map((r, j) => {
                          const typeStyle = TYPE_COLORS[r.type] || TYPE_COLORS["Docs"];
                          return (
                            <a key={j} href={r.url} target="_blank" rel="noopener noreferrer" className="resource-link">
                              <span
                                className="resource-badge"
                                style={{ background: typeStyle.bg, color: typeStyle.color }}
                              >
                                {typeStyle.icon} {r.type}
                              </span>
                              <span className="resource-name">{r.name}</span>
                              <span className="resource-arrow">↗</span>
                            </a>
                          );
                        })}
                      </div>

                      {/* Project */}
                      <div className="section-label">🔨 Week ka Project</div>
                      <div className="project-box">
                        <span className="project-icon">🏗️</span>
                        <div>
                          <div className="project-label">Build karo</div>
                          <div className="project-text">{week.project}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="free-banner">
              ✅ Ye saare resources bilkul <strong>FREE</strong> hain. Koi paid course ki zaroorat nahi!
            </div>
          </>
        )}
      </div>
    </>
  );
}