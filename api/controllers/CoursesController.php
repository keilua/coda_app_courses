<?php
class CoursesController
{
  public function Add(...$course)
  {
    $title = $course["title"] ?? null;
    $date = $course["date"] ?? null;
    $liste = $course["liste"] ?? null;

    if (!$title || !$date || !$liste) {
      http_response_code(400);
      echo json_encode([
        "message" => "Une ou plusieurs valeurs ne sont pas définies.",
        "status" => 400
      ]);
      exit;
    }

    $config = new Config();
    $courseManager = new Course(BDD::getInstance($config->getConfig()));

    if ($courseManager->add($title, $date, $liste)) {
      http_response_code(200);
      echo json_encode([
        "message" => "Ajout de la course en base de données.",
        "status" => 200
      ]);
      exit;
    }

    http_response_code(400);
    echo json_encode([
      "message" => "Erreur lors de l'ajout de la course en BDD.",
      "status" => 400
    ]);
    exit;
  }

  public function ShowList()
  {
    $config = new Config();
    $courseManager = new Course(BDD::getInstance($config->getConfig()));
    $courses = $courseManager->getList();

    if (!$courses) {
      http_response_code(400);
      echo json_encode([
        "message" => "Aucune course trouvée.",
        "status" => 400
      ]);
      exit;
    }

    http_response_code(200);
    echo json_encode([
      "message" => "Liste des courses.",
      "status" => 200,
      "courses" => $courses
    ]);
    exit;
  }

  public function Show(...$params)
  {
    $id = $params["id"] ?? null;

    if (!$id) {
      http_response_code(400);
      echo json_encode([
        "message" => "Le paramètre ID est invalide.",
        "status" => 400
      ]);
      exit;
    }

    $config = new Config();
    $courseManager = new Course(BDD::getInstance($config->getConfig()));
    $course = $courseManager->getById($id);

    if (!$course) {
      http_response_code(400);
      echo json_encode([
        "message" => "Erreur lors de la récupération de la course.",
        "status" => 400
      ]);
      exit;
    }

    http_response_code(200);
    echo json_encode([
      "message" => "Course récupérée.",
      "status" => 200,
      "course" => $course
    ]);
    exit;
  }

  public function Update(...$course)
  {
    $id = $course["id"] ?? null;
    $title = $course["title"] ?? null;
    $date = $course["date"] ?? null;
    $liste = $course["liste"] ?? null;

    if (!$id || !$title || !$date || !$liste) {
      http_response_code(400);
      echo json_encode([
        "message" => "Les paramètres sont invalides.",
        "status" => 400
      ]);
      exit;
    }

    $config = new Config();
    $courseManager = new Course(BDD::getInstance($config->getConfig()));

    if (!$courseManager->update([
      "id" => $id,
      "title" => $title,
      "date" => $date,
      "liste" => $liste,
    ])) {
      http_response_code(400);
      echo json_encode([
        "message" => "Erreur lors de la modification de la course.",
        "status" => 400
      ]);
      exit;
    }

    http_response_code(200);
    echo json_encode([
      "message" => "Mise à jour de la course effectuée.",
      "status" => 200
    ]);
    exit;
  }

  public function Delete(...$params)
  {
    $id = $params["id"] ?? null;

    if (!$id) {
      http_response_code(400);
      echo json_encode([
        "message" => "Le paramètre ID est invalide.",
        "status" => 400
      ]);
      exit;
    }

    $config = new Config();
    $courseManager = new Course(BDD::getInstance($config->getConfig()));

    if (!$courseManager->deleteById($id)) {
      http_response_code(400);
      echo json_encode([
        "message" => "La suppression de la course a échoué.",
        "status" => 400
      ]);
      exit;
    }

    http_response_code(200);
    echo json_encode([
      "message" => "La course n°{$id} a été supprimée.",
      "status" => 200
    ]);
    exit;
  }
}
