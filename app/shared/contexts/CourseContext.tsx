import { createContext, useState } from "react";
import type { CourseI } from "../interfaces/Course.interface";

export const CourseContext = createContext<any>();

export default function CourseProvider({ children }: any) {
  let [course, setCourse] = useState<CourseI>({
    id: undefined,
    title: undefined,
    date: undefined,
    liste: undefined,
    creation_date: undefined,
  });

  return (
    <CourseContext.Provider
      value={{
        course,
        setCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}
