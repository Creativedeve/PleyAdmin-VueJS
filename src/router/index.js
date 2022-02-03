import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login";
import ForgotPassword from "@/views/ForgotPassword";
import ResetPassword from "@/views/ResetPassword";
import AcceptInvite from "@/views/AcceptInvite";
import { UpdateTeam, ListTeams, UpdateTeamAchievement, CreateTeamAchievement } from "../views/Teams";
import { CreateArticle, UpdateArticle, ListArticles } from "../views/Articles";
import { LaunchML } from "../views/MediaLibrary";
import { InviteAdmin, UpdateAdmin, ListAdmins, ChangePassword } from "../views/Admins";
import NotFoundPage from "../views/NotFoundPage";
import { AUTH_TOKEN } from "../constants";

Vue.use(VueRouter);

const routes = [
  {
    path: "/mediaLibrary/launch",
    name: "MediaLibraryLaunch",
    component: LaunchML,
    secure: true,
  },
  {
    path: "/teams",
    name: "Teams",
    component: ListTeams,
    secure: true
  },
  {
    path: "/teams/:id",
    name: "Team", 
    component: UpdateTeam, 
    props: true,
    secure: true,
    //meta: {
    //  back: "/teams"
    //}
  },
  {
    path: "/teams/:teamId/achievements/create",
    name: "TeamAchievementCreate",
    component: CreateTeamAchievement,
    props: true,
    secure: true,
  },
  {
    path: "/teams/:teamId/achievements/:id",
    name: "TeamAchievement", 
    component: UpdateTeamAchievement, 
    props: true,
    secure: true,
  },
  {
    path: "/articles",
    name: "Articles",
    component: ListArticles,
    secure: true
  },
  {
    path: "/articles/create",
    name: "ArticleCreate",
    component: CreateArticle,
    secure: true,
    //meta: {
    //  back: "/articles"
    //}
  },
  {
    path: "/articles/:id",
    name: "Article", 
    component: UpdateArticle, 
    props: true,
    secure: true,
    //meta: {
    //  back: "/articles"
    //}
  },
  {
    path: "/admins",
    name: "Admins",
    component: ListAdmins,
    secure: true
  },
  {
    path: "/admins/invite",
    name: "AdminInvite",
    component: InviteAdmin,
    secure: true,
    //meta: {
    //  back: "/admins"
    //}
  },
  {
    path: "/admins/changePassword",
    name: "Change Password", 
    component: ChangePassword, 
    secure: true
  },
  {
    path: "/admins/:id",
    name: "Admin", 
    component: UpdateAdmin, 
    props: true,
    secure: true,
    //meta: {
    //  back: "/admins"
    //}
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      hideNavigation: true,
      className: "login"
    }
  },
  {
    path: "/forgotPassword",
    name: "Forgot Password",
    component: ForgotPassword,
    meta: {
      hideNavigation: true,
      className: "forgot-password"
    }
  },
  {
    path: "/acceptInvite/:token/:email",
    name: "AcceptInvite",
    component: AcceptInvite,
    props: true,
    meta: {
      hideNavigation: true,
      className: "accept-invite"
    }
  },
  {
    path: "/resetPassword/:token/:email",
    name: "ResetPassword",
    component: ResetPassword,
    props: true,
    meta: {
      hideNavigation: true,
      className: "reset-password"
    }
  },
  { path: "/", redirect: "/articles" },
  {
    path: "*",
    component: NotFoundPage,
    meta: {
      hideNavigation: false
    }
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

const setPageClass = (to, from) => {
  const body = document.getElementsByTagName("body")[0];
  if (from && from.meta && from.meta.className)
    body.classList.remove("page-" + from.meta.className);
  if (to.meta.className) body.classList.add("page-" + to.meta.className);
};

router.beforeEach((to, from, next) => {
  setPageClass(to, from);
  let token = localStorage.getItem(AUTH_TOKEN);
  router.options.routes.forEach(route => {
    if (to.matched[0].path === route.path && route.secure) {
      if (!token || token === "" || token === null) {
        return next("/login");
      }
    }
  });
  next();
});

export default router;
