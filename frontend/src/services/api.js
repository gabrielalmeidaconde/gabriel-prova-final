const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const headers = (token) => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
});

export async function getCourses(token) {
  const res = await fetch(`${API_URL}/courses`, { headers: headers(token) });
  if (!res.ok) throw new Error('Erro ao buscar cursos');
  return res.json();
}

export async function createCourse(token, data) {
  const res = await fetch(`${API_URL}/courses`, {
    method: 'POST',
    headers: headers(token),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Erro ao criar curso');
  }
  return res.json();
}

export async function deleteCourse(token, id) {
  const res = await fetch(`${API_URL}/courses/${id}`, {
    method: 'DELETE',
    headers: headers(token),
  });
  if (!res.ok) throw new Error('Erro ao deletar curso');
}
