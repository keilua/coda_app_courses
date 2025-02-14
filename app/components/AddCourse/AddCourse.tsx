import { useEffect, useState, type FormEvent, useContext } from "react";
import { useNavigate } from "react-router";
import { CourseContext } from "~/shared/contexts/CourseContext";
import type { CourseI } from "~/shared/interfaces/Course.interface";

export default function AddCourse() {
  const { course, setCourse } = useContext(CourseContext);
  const navigate = useNavigate();

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();

    if (!course.title || !course.date || !course.liste) {
      throw new Error("Tous les champs sont obligatoires.");
    }

    await fetch("http://127.0.0.1:5500/courses/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(course),
    })
      .then((response) => response.json())
      .then((datas) => {
        if (datas.status !== 200) {
          throw new Error("Le statut de la requête est invalide.");
        }
        navigate("/"); 
      })
      .catch((err) => console.error(`Erreur : ${err}`));
  };

  return (
    <form action="#" method="POST" onSubmit={submitForm}>
      <label htmlFor="title">Titre des courses</label>
      <input
        type="text"
        name="title"
        value={course.title || ""}
        onChange={(e) => {
          setCourse((prevCourse: CourseI) => ({
            ...prevCourse,
            title: e.target.value,
          }));
        }}
        required
      />

      <label htmlFor="date">Date des courses</label>
      <input
        type="date"
        name="date"
        value={course.date || ""}
        onChange={(e) => {
          setCourse((prevCourse: CourseI) => ({
            ...prevCourse,
            date: e.target.value,
          }));
        }}
        required
      />

      <label htmlFor="liste">Liste des courses!</label>
      <input
        type="text"
        name="liste"
        value={course.liste || ""}
        onChange={(e) => {
          setCourse((prevCourse: CourseI) => ({
            ...prevCourse,
            liste: e.target.value,
          }));
        }}
        required
      />

      <button type="submit">Créer</button>
    </form>
  );
}
