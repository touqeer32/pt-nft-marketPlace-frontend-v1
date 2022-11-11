import React from "react";
import Profile from "../../components/user-settings/Profile";
import HomeLayout from "../../components/layouts/HomeLayout";

export default function Settings() {
  return (
    <div>
      <Profile />
    </div>
  );
}

Settings.Layout=HomeLayout
