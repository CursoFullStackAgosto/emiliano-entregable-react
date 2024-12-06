import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import "src/assets/styles/header.modules.scss";

const Header = () => {
  const todos = useSelector((state) => state.todos);

  const [animate, setAnimate] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Calcular tareas completadas y totales solo cuando cambian los todos
  const { todosCompleted, totalTodos, progress } = useMemo(() => {
    if (!Array.isArray(todos)) {
      return { todosCompleted: 0, totalTodos: 0, progress: 0 };
    }

    const completed = todos.filter((todo) => todo.is_completed).length;
    const total = todos.length;
    const progress = total > 0 ? (completed / total) * 100 : 0;
    return { todosCompleted: completed, totalTodos: total, progress };
  }, [todos]);

  // Animación del progreso
  useEffect(() => {
    if (animate) {
      const timeoutId = setTimeout(() => {
        setAnimate(false);
        setAnimationComplete(true);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [animate]);

  const totalLength = 251.327;
  // const dashOffset = totalLength - (progress / 100) * totalLength;

  return (
    <div className="container header">
      <div className="leftHeader">
        <h1>Task Manager</h1>
        <p>to help you get organized</p>
      </div>
      <div className="rightHeader">
        <svg
          className="circle"
          width="100"
          height="100"
          style={{ overflow: "visible" }}
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="#adcafe"
            stroke="#adcafe"
            strokeWidth="8"
          />
          <linearGradient
            id="stroke-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#0f2376" />
            <stop offset="100%" stopColor="#adcafe" />
          </linearGradient>
          <filter id="stroke-shadow" x="-20" y="-20" width="240" height="240">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="2"
              floodColor="#ffffff80"
            />
          </filter>
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="url(#stroke-gradient)"
            strokeWidth="18"
            filter="url(#stroke-shadow)"
            style={{
              strokeDasharray: animationComplete
                ? `${(progress / 100) * totalLength} ${
                    totalLength - (progress / 100) * totalLength
                  }`
                : `0 ${totalLength}`,
              transition: "strokeDasharray 2s ease-in-out",
            }}
          />
          <text x="50" y="55" textAnchor="middle" fontSize="18" fill="#ffffff">
            {todosCompleted}/{totalTodos}
          </text>
        </svg>
      </div>
    </div>
  );
};

export default Header;
