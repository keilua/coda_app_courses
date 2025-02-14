<?php
class Course {
  private int $id;
  private string $title;
  private string $date;
  private string $liste;
  private string $creation_date;

  private $bdd;

  public function __construct($bdd = null) {
    if (!is_null($bdd)) {
      $this->setBdd($bdd);
    }
  }

  public function getId(): int {
    return $this->id;
  }

  public function setId(int $id) {
    $this->id = $id;
  }

  public function getTitle(): string {
    return $this->title;
  }

  public function setTitle(string $title) {
    $this->title = $title;
  }

  public function getDate(): string {
    return $this->date;
  }

  public function setDate(string $date) {
    $this->date = $date;
  }

  public function getListe(): string {
    return $this->liste;
  }

  public function setListe(string $liste) {
    $this->liste = $liste;
  }

  public function getCreationDate(): string {
    return $this->creation_date;
  }

  public function setCreationDate(string $creation_date) {
    $this->creation_date = $creation_date;
  }

  public function add(string $title, string $date, string $liste) {
    $req = $this->bdd->prepare("INSERT INTO courses (title, date, liste) VALUES (:title, :date, :liste)");
    $req->bindValue(":title", $title, PDO::PARAM_STR);
    $req->bindValue(":date", $date, PDO::PARAM_STR);
    $req->bindValue(":liste", $liste, PDO::PARAM_STR);
    return $req->execute();
  }

  public function getList() {
    $req = $this->bdd->prepare("SELECT * FROM courses ORDER BY creation_date DESC");
    $req->execute();
    return $req->fetchAll(PDO::FETCH_OBJ);
  }

  public function getById(int $id) {
    $req = $this->bdd->prepare("SELECT * FROM courses WHERE id = :id");
    $req->bindValue(":id", $id, PDO::PARAM_INT);
    $req->execute();
    return $req->fetch(PDO::FETCH_OBJ);
  }

  public function update(array $course) {
    $req = $this->bdd->prepare("UPDATE courses SET title = :title, date = :date, liste = :liste WHERE id = :id");
    $req->bindValue(":id", $course["id"], PDO::PARAM_INT);
    $req->bindValue(":title", $course["title"], PDO::PARAM_STR);
    $req->bindValue(":date", $course["date"], PDO::PARAM_STR);
    $req->bindValue(":liste", $course["liste"], PDO::PARAM_STR);
    return $req->execute();
  }

  public function deleteById(int $id) {
    return $this->bdd->exec("DELETE FROM courses WHERE id = {$id}");
  }

  private function setBdd($bdd) {
    $this->bdd = $bdd;
  }
}
