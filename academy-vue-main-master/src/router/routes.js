const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "projects",
        component: () => import("pages/ProjectPage.vue"),
      },
      {
        path: "assignments",
        component: () => import("pages/AssignmentsPage.vue"),
      },
      {
        path: "assignment-details/:id",
        component: () => import("pages/AssignmentDetailPage.vue"),
      },
      {
        path: "assessments",
        component: () => import("pages/AssessmentPage.vue"),
      },
      {
        path: "project-details/:id",
        component: () => import("pages/ProjectDetailPage.vue"),
      },
      {
        path: "query-details/:id",
        component: () => import("pages/TicketDetailPage.vue"),
      },
      {
        path: "doubts",
        component: () => import("pages/TicketPage.vue"),
      },
      {
        path: "ask-doubt",
        component: () => import("pages/RaiseTicket.vue"),
      },
      {
        path: "book-a-session",
        component: () => import("pages/BookSession.vue"),
      },
      {
        path: "jobs",
        component: () => import("pages/Jobs.vue"),
      },
      {
        path: "job-details",
        component: () => import("pages/JobDetailPage.vue"),
      },
      {
        path: "certificates",
        component: () => import("pages/CertificatesPage.vue"),
      },
      {
        path: "live-class-recordings",
        component: () => import("pages/LiveClassRecordings.vue"),
      },
      {
        path: "/:catchAll(.*)*",
        component: () => import("pages/ErrorNotFound.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("pages/LoginPage.vue"),
  },
  {
    path: "/admin",
    component: () => import("pages/AdminPage.vue"),
  },
  {
    path: "/onboarding",
    component: () => import("pages/OnBoarding.vue"),
  },
  {
    path: "/assessment",
    component: () => import("pages/Assessment01.vue"),
  },
  {
    path: "/assessment/:id",
    component: () => import("pages/Assessment.vue"),
  },
  {
    path: "/start-assessment/:id",
    component: () => import("pages/Assessment01.vue"),
  },
  {
    path: "/assessment02",
    component: () => import("pages/Assessment02.vue"),
  },
  {
    path: "/assessment-result/:id",
    component: () => import("pages/Assessment03.vue"),
  },
  {
    path: "/assessment-starting",
    component: () => import("pages/Assessment04.vue"),
  },
  // {
  //   path: "/resume/:catchAll(.*)*",
  //   // component: () => import("pages/Assessment04.vue"),
  //   beforeEnter(to, from, next) {
  //     window.location.href = "https://academy.datatrained.com/resume/resume-builder/review/design-view/untitled-22-feb-2023-21-35-2____7763d99163/?uuid=d25f7ffc-0ac7-4c8d-a20c-21f1f3a93bd4";
  //   }
  // }

  // Always leave this as last one,
  // but you can also remove it
  // {
  //   path: '/:catchAll(.*)*',
  //   component: () => import('pages/ErrorNotFound.vue')
  // }
];

export default routes;
