import { lazy } from "react";

const Signin = lazy(() => import("../Pages/Signin/Signin"));
const Signup = lazy(() => import("../Pages/Signup/Signup"));
const AccountActivatedSuccess = lazy(() =>
  import("../Pages/AccountActivatedSuccess/AccountActivatedSuccess")
);

const PasswordChangedSuccess = lazy(() =>
  import("../Pages/PasswordChangedSuccess/PasswordChangedSuccess")
);
const ResetPassword = lazy(() =>
  import("../Pages/ResetPassword/ResetPassword")
);
const ForgotPassword = lazy(() =>
  import("../Pages/ForgotPassword/ForgotPassword")
);

//these router will be access without authentication
export const openRouter = [
  {
    path: "/signin",
    component: Signin,
    exact: true,
  },
  {
    path: "/signup",
    component: Signup,
    exact: true,
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
    exact: true,
  },
  {
    path: "/account-verification/:token",
    component: AccountActivatedSuccess,
    exact: true,
  },
  {
    path: "/reset-password/:token",
    component: ResetPassword,
    exact: true,
  },
  {
    path: "/passwordchanged-Successfully",
    component: PasswordChangedSuccess,
    exact: true,
  },
];
