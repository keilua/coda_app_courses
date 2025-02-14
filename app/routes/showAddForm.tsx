import { Link } from "react-router";
import AddCourse from "~/components/AddCourse/AddCourse";

export default function ShowAddForm() {
  return (
    <>
      <Link to="/">Retour à l'accueil</Link>
      <AddCourse />
    </>
  );
}
