import Vue from "vue";
import VueRouter from "vue-router";
import MainView from "../views/MainView.vue";
import Login from "@/components/member/MemberLogin";
import MemberJoin from "@/components/member/MemberJoin";
import AgentJoin from "@/components/member/AgentJoin";
import JoinCheck from "@/components/member/JoinCheck";
import FindPassword from "@/components/member/FindPassword";

import AppMember from "../views/AppMember.vue";
import AppQnA from "../views/AppQnA.vue";
import AppHouse from "../views/AppHouse.vue";
import AppDeal from "../views/AppDeal";
import AppNotice from "../views/AppNotice.vue";
import AppChat from "../views/AppChat.vue";

import qna from "@/components/qna/QnAList";
import QnAModify from "@/components/qna/QnAModify";
import QWrite from "@/components/qna/QuestionWrite";
import QView from "@/components/qna/QnAView";
import AWrite from "@/components/qna/AnswerWrite";
import MemberUpdate from "@/components/member/MemberUpdate";

// notice router
import NoticeList from "@/components/notice/NoticeList";
import NoticeModify from "@/components/notice/NoticeModify";
import NoticeView from "@/components/notice/NoticeView";
import NoticeWrite from "@/components/notice/NoticeWrite";

import HouseInfo from "@/components/house/HouseInfo.vue";
import HouseFavorite from "@/components/house/HouseFavorite.vue";

import DealCreate from "@/components/deal/DealCreate";
import DealList from "@/components/deal/DealList";
import DealView from "@/components/deal/DealView";
import DealModify from "@/components/deal/DealModify";

import ChatDetail from "@/components/chat/ChatDetail";
import ChatTest from "@/components/chat/ChatTest";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: MainView,
  },
  {
    path: "/chat",
    name: "chat",
    component: AppChat,
    redirect: "chat/test",
    children: [
      {
        path: "test",
        name: "chattest",
        component: ChatTest,
      },
      {
        path: "detail/:roomId",
        name: "chatdetail",
        component: ChatDetail,
      },
    ],
  },
  {
    path: "/member",
    name: "member",
    component: AppMember,
    children: [
      {
        path: "join",
        name: "join",
        component: JoinCheck,
      },
      {
        path: "joinMember",
        name: "memberjoin",
        component: MemberJoin,
      },
      {
        path: "joinAgent",
        name: "agentjoin",
        component: AgentJoin,
      },
      {
        path: "login",
        name: "login",
        component: Login,
      },
      {
        path: "update",
        name: "update",
        component: MemberUpdate,
      },
      {
        path: "passFind",
        name: "passFind",
        component: FindPassword,
      },
    ],
  },
  {
    path: "/qna",
    name: "qna",
    component: AppQnA,
    redirect: "/qna/list",
    children: [
      {
        path: "list",
        name: "qnalist",
        component: qna,
      },
      {
        path: "write",
        name: "qwrite",
        component: QWrite,
      },
      {
        path: "view/:id",
        name: "qview",
        component: QView,
      },
      {
        path: "modify",
        name: "qnamodify",
        component: QnAModify,
      },
      {
        path: "awrite/:id",
        name: "awrite",
        component: AWrite,
      },
    ],
  },

  {
    path: "/notice",
    name: "notice",
    component: AppNotice,
    redirect: "/notice/list",
    children: [
      {
        path: "list",
        name: "nlist",
        component: NoticeList,
      },
      {
        path: "write",
        name: "nwrite",
        component: NoticeWrite,
      },
      {
        path: "view/:id",
        name: "nview",
        component: NoticeView,
      },
      {
        path: "modify",
        name: "nmodify",
        component: NoticeModify,
      },
    ],
  },

  {
    path: "/apt",
    name: "apt",
    component: AppHouse,
  },
  {
    path: "/info/:aptCode",
    name: "aptinfo",
    component: HouseInfo,
    props: true,
  },
  {
    path: "/favorite",
    name: "houseFavorite",
    component: HouseFavorite,
  },
  {
    path: "/deal",
    name: "deal",
    component: AppDeal,
    redirect: "/deal/list/:agent_id",
    children: [
      {
        path: "list/:agent_id",
        name: "deallist",
        component: DealList,
      },
      {
        path: "create",
        name: "dealcreate",
        component: DealCreate,
      },
      {
        path: "view/:no",
        name: "dealview",
        component: DealView,
      },
      {
        path: "modify/:no",
        name: "dealmodify",
        component: DealModify,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
