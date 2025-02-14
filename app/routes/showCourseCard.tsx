import { useState, useContext } from "react";
import type { Route } from "../+types/root";
import type { CourseI } from "~/shared/interfaces/Course.interface";
import { CourseContext } from "~/shared/contexts/CourseContext";
import { useNavigate } from "react-router";

export async function loader({ params }: Route.LoaderArgs) {

}

export default function ShowCourseCard({ params }: Route.ComponentProps) {
  const { id } = params;
  let navigate = useNavigate();
  let { course, setCourse } = useContext(CourseContext);

  const submitUpdateForm = async (e: any) => {
    e.preventDefault();

    if (!course.title || !course.date || !course.liste) {
      throw new Error("Une ou plusieurs valeurs sont invalides.");
    }

    await fetch("http://localhost:5500/courses/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
      body: JSON.stringify(course)
    })
    .then(response => response.json())
    .then(datas => {
      if (datas.status !== 200) {
        throw new Error("Le statut de la requête est invalide.");
      }

      navigate("/courses/list");
    })
    .catch(err => console.error(err));
  };

  return (
    <form action="#" method="POST" onSubmit={submitUpdateForm}>
      <label htmlFor="title">Titre</label>
      <input
        type="text"
        name="title"
        defaultValue={course.title}
        onChange={(e) => {
          let newTitle = e.target.value ?? null;
          setCourse((course: CourseI) => {
            course.title = newTitle;
            return course;
          });
        }}
        required
      />
      <label htmlFor="date">Date</label>
      <input
        type="date"
        name="date"
        defaultValue={course.date}
        onChange={(e) => {
          let newDate = e.target.value ?? null;
          setCourse((course: CourseI) => {
            course.date = newDate;
            return course;
          });
        }}
        required
      />
      <label htmlFor="liste">Liste des articles</label>
      <textarea
        name="liste"
        defaultValue={course.liste}
        onChange={(e) => {
          let newListe = e.target.value ?? null;
          setCourse((course: CourseI) => {
            course.liste = newListe;
            return course;
          });
        }}
        required
      />
      <input type="hidden" value={id} name="id" />
      <button type="submit">Modifier</button>
    </form>
  );
}