import React from "react";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <div>
      <nav>
            <ul>
              <li>
                <Link to="/events">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/portfolio">
                  Portfolio
                </Link>
              </li>
            </ul>
      </nav>
    </div>
  );
}
