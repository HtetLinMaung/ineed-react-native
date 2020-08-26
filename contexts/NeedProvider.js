import React, { createContext, useState } from "react";

export const needContext = createContext([]);

const NeedProvider = (props) => {
  const value = useState([
    {
      _id: "2020-08-26T00:38:39.216Z",
      profileImage: "",
      username: "Htet Lin Maung",
      createdAt: "2020-08-26T00:38:39.216Z",
      tags: [
        {
          title: "Office",
          color: "#DEACFE",
        },
      ],
      header: "More milk!",
      body:
        "Our team want more milk in kitchen. And also would perfect if we stared buy soy milk with different tastes blah blah blah",
      status: "In progress",
    },
    {
      _id: "2020-08-26T00:38:39.217Z",
      profileImage: "",
      username: "Htet Lin Maung",
      createdAt: "2020-08-26T00:38:39.216Z",
      tags: [
        {
          title: "Trainings",
          color: "#92D7FF",
        },
      ],
      header: "Time management",
      body:
        'HR department want to do "Time management" training for colleges. We already find some companies that specialize in this way. Below you can find a list blah blah blah',
      status: "In progress",
    },
    {
      _id: "2020-08-26T00:38:39.218Z",
      profileImage: "",
      username: "Htet Lin Maung",
      createdAt: "2020-08-26T00:38:39.216Z",
      tags: [
        {
          title: "Corporate vacation",
          color: "#FFC999",
        },
      ],
      header: "Marathon",
      body:
        "Let's running together! This weekend will be great marathon in your city. It's good opportunity to challenge yourself and prove that you can do it!",
      status: "In progress",
    },
  ]);

  return (
    <needContext.Provider value={value}>{props.children}</needContext.Provider>
  );
};

export default NeedProvider;
