import SignUp from "./SignUp";
import SignIn from "./SignIn";
import NotFound from "./NotFound";
import ForgotPassword from "./ForgotPassword";
import ForgotPasswordToken from "./ForgotPasswordToken";
import ExternalSignin from "./ExternalSignin";

const settings = {
  activeLayout: "layout1",
  layout1Settings: {
    topbar: {
      show: false,
    },
    leftSidebar: {
      show: false,
      mode: "close",
    },
  },
  layout2Settings: {
    mode: "full",
    topbar: {
      show: false,
    },
    navbar: { show: false },
  },
  secondarySidebar: { show: false },
  footer: { show: false },
};

const sessionRoutes = [
  {
    path: "/session/signup",
    component: SignUp,
    settings,
  },
  {
    path: "/session/signin",
    component: SignIn,
    settings,
  },
  {
    path: "/session/external-signin",
    component: ExternalSignin,
    settings,
  },
  {
    path: "/session/forgot-password",
    component: ForgotPassword,
    exact: true,
    settings,
  },
  {
    path: "/session/forgot-password/token",
    component: ForgotPasswordToken,
    settings,
  },
  {
    path: "/session/404",
    component: NotFound,
    settings,
  },
];

export default sessionRoutes;
