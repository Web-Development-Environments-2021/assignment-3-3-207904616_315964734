import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage")
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage")
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound
  },
  {
    path: "/games",
    name: "games",
    component: () => import("./pages/CurStage")
  },
  {
    path: "/favorites",
    name: "favorites",
    component: () => import("./pages/FavoritesPage")
  },
  {
    path: "/team/:id",
    name: "team",
    component: () => import("./pages/TeamPage")
  }
];

export default routes;
