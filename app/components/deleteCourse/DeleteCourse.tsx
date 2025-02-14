import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function DeleteCourse({ ...props }: any){
  let navigate = useNavigate();
  let [id, setId] = useState("");

  useEffect(() => {
    if (!id && props.courseId) {
      setId(props.courseId);
    }
  }, [id, props.courseId]);
  
  const submitDeleteForm = async (e: any) => {
    e.preventDefault();
    await fetch("http://127.0.0.1:5500/courses/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id
      })
    })
    .then(response => response.json())
    .then(datas => {
      if(datas.status !== 200){
        throw new Error("Le statut de la requête n'est pas valide.");
      }
      navigate("/");
    })
    .catch(err => console.error(err));
  }

  return(
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <button onClick={() => navigate("/")} style={{ position: 'absolute', top: '10px', left: '650px' }}>
        Retour à l'accueil
      </button>
      <div style={{ marginTop: '50px'}}>
        {id ? (
          <form method="POST" onSubmit={submitDeleteForm}>
            <input type="hidden" value={id} name="id" />
            <button type="submit">Supprimer</button>
          </form>
        ) : (
          <p>Aucune course à supprimer.</p>
        )}
      </div>
    </div>
  );
}
