import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const DEMO_USER = {
  id: "user-demo-101",
  name: "Arjun Verma",
  email: "arjun.verma@example.com",
  role: "student",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  title: "Frontend Developer & CS Undergrad",
  college: "Indian Institute of Technology, Delhi",
  graduationYear: "2025",
  location: "New Delhi, India",
  phone: "+91 98765 43210",
  skills: ["React.js", "JavaScript", "TypeScript", "Tailwind CSS", "Node.js", "REST APIs", "Git"],
  bio: "Pre-final year CS student passionate about building performant, accessible web applications. Winner of Smart India Hackathon and active open-source contributor. Seeking 6-month frontend or full-stack software internships.",
  resumeName: "Arjun_Verma_Resume_2026.pdf",
  resumeSize: "320 KB",
  portfolio: "https://arjunverma.dev",
  github: "https://github.com/arjunverma",
  linkedin: "https://linkedin.com/in/arjunverma"
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('hirehub_user');
      if (stored) {
        return JSON.parse(stored);
      }
      // Provide demo user by default for instant great preview experience
      localStorage.setItem('hirehub_user', JSON.stringify(DEMO_USER));
      return DEMO_USER;
    } catch {
      return DEMO_USER;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => !!user);

  useEffect(() => {
    setIsAuthenticated(!!user);
    if (user) {
      localStorage.setItem('hirehub_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('hirehub_user');
    }
  }, [user]);

  const login = (email, password) => {
    // Basic validation
    if (!email || !password) {
      return { success: false, error: "Please enter both email and password." };
    }
    
    // Check if matching registered user or demo user
    const loggedInUser = {
      ...DEMO_USER,
      email: email,
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase())
    };
    setUser(loggedInUser);
    return { success: true, user: loggedInUser };
  };

  const loginWithDemo = () => {
    setUser(DEMO_USER);
    return { success: true, user: DEMO_USER };
  };

  const signup = (userData) => {
    const newUser = {
      id: "user-" + Date.now(),
      name: userData.name || "Student User",
      email: userData.email,
      role: "student",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      title: userData.title || "Aspiring Software Engineer",
      college: userData.college || "Tech University",
      graduationYear: userData.graduationYear || "2025",
      location: userData.location || "Bangalore, India",
      phone: userData.phone || "+91 98000 00000",
      skills: userData.skills || ["React", "JavaScript", "HTML/CSS"],
      bio: userData.bio || "Enthusiastic student looking for career-defining opportunities.",
      resumeName: "My_Resume.pdf",
      resumeSize: "210 KB",
      portfolio: userData.portfolio || "",
      github: userData.github || "",
      linkedin: userData.linkedin || ""
    };
    setUser(newUser);
    return { success: true, user: newUser };
  };

  const updateProfile = (updatedFields) => {
    setUser((prev) => {
      const updated = { ...prev, ...updatedFields };
      localStorage.setItem('hirehub_user', JSON.stringify(updated));
      return updated;
    });
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hirehub_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        loginWithDemo,
        signup,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
