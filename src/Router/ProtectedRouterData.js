import { lazy } from "react";

const Recent = lazy(() => import("../Pages/Recent"));
const Image = lazy(() => import("../Pages/Image"));
const Video = lazy(() => import("../Pages/Video"));
const Music = lazy(() => import("../Pages/Music"));
const AllFiles = lazy(() => import("../Pages/AllFiles"));
const Profile = lazy(() => import("../Pages/Profile/Profile"));

export const ToProtect = [
  {
    path: "/",
    component: Recent,
    exact: true,
  },
  {
    path: "/photos",
    component: Image,
    exact: true,
  },
  {
    path: "/videos",
    component: Video,
    exact: true,
  },
  {
    path: "/music",
    component: Music,
    exact: true,
  },
  {
    path: "/all-files",
    component: AllFiles,
    exact: true,
  },
  {
    path: "/profile",
    component: Profile,
    exact: true,
  },
];
