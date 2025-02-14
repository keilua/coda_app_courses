
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router";
import type { CourseI } from "~/shared/interfaces/Course.interface";
import DeleteCourse from "~/components/deleteCourse/DeleteCourse";
import { CourseContext } from "~/shared/contexts/CourseContext";

export default function ShowCourses() {
  let { setCourse } = useContext(CourseContext);
  let [courses, setCourses] = useState([]);

  useEffect(() => {
    if (courses.length <= 0) {
      fetchCourses();
    }
  }, [courses]);

  const fetchCourses = async () => {
    await fetch("http://127.0.0.1:5500/courses/get/list", {
      method: "GET",
      mode: "cors",
    })
      .then((response) => response.json())
      .then((datas) => {
        if (datas.status !== 200) {
          throw new Error("Le statut de la requête n'est pas valide.");
        }

        if (!datas.courses) {
          throw new Error("Aucune course n'a été retournée.");
        }

        setCourses(datas.courses);
      })
      .catch((err) => console.error(err));
  };

  const updateCourseContext = (course: CourseI) => {
    setCourse({ ...course }); 
  };
  

  return (
    <section className="main-sections">
      {courses.length > 0 &&
        courses.map((course: CourseI) => (
          <article className="main-articles" key={course.id}>
            <h2 className="main-articles-title">
              {course.title} - {course.date}
            </h2>
            <p>{course.liste}</p>
            <Link to={`/courses/update/${course.id}`} onClick={() => updateCourseContext(course)}>
              Modifier
            </Link>
            <DeleteCourse courseId={course.id} />
          </article>
        ))}
    </section>
  );
}
