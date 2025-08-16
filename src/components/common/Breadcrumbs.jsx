import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = ({ nameMap = {} }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex items-center space-x-2 text-sm text-lightText">
        <li>
          <Link to="/dashboard" className="hover:text-text">
            Dashboard
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const displayValue = nameMap[value] || value;

          return (
            <li key={to} className="flex items-center">
              <span className="mx-2">/</span>
              {isLast ? (
                <span className="font-semibold text-text">{displayValue}</span>
              ) : (
                <Link to={to} className="hover:text-text">
                  {displayValue}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
