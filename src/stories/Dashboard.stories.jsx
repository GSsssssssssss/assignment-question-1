// src/component/dashboard/Dashboard.stories.js

import React from "react";
import { storiesOf } from "@storybook/react";

import Dashboard from "../pages/Dashboard";


import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";

// Stories
storiesOf("Dashboard", module).add("Default", () => (
  <Dashboard
    currencyList={Object.keys(mockData.results[0].bestExecutionData.orderVolume)}
    mockData={mockData}
    timestamps={timestamps}
  />
));
