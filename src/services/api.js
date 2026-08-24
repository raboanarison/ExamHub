export async function login(email, password) {
  console.log("login", email, password);
}

export async function getExams() {
  return [];
}

export async function getExam(id) {
  return null;
}

export async function submitExam(id, answers) {
  console.log(id, answers);
}

export async function getResults() {
  return [];
}