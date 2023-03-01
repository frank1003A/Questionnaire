import React from "react";
import {
  AssignmentOutlined,
  HomeOutlined,
  MenuOutlined,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";

const Sideabr = () => {
  return (
    <aside>
      <div className="hamburger">
        <IconButton>
          <MenuOutlined />
        </IconButton>
      </div>
      <nav className="navlist">
        <div>
          <IconButton>
            <HomeOutlined />
          </IconButton>
        </div>
        <div>
          <IconButton>
            <AssignmentOutlined />
          </IconButton>
        </div>
      </nav>
    </aside>
  );
};

export default Sideabr;
