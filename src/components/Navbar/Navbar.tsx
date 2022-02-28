import React from "react";
import { Link } from "react-router-dom";
import { Content } from "../WalletConnection/WalletConnection"

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
              <li>
                <Content />
              </li>
            </ul>
      </nav>
    </div>
  );
}
