import { type RouteConfig, index, prefix, route, layout } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  ...prefix("courses", [
    layout("layouts/CoursesLayout.tsx", [
      route("add", "routes/showAddForm.tsx"),
      route("list", "routes/showCourses.tsx"),
      route("update/:id", "routes/showCourseCard.tsx")
    ]),
  ])
] satisfies RouteConfig;
