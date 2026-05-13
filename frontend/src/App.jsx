import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import CourseList from './components/CourseList';
import CourseForm from './components/CourseForm';
import { getCourses, createCourse, deleteCourse } from './services/api';

const ROLES_CLAIM = 'https://courses-app.com/roles';

export default function App() {
  const { isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently, user } = useAuth0();
  const [courses, setCourses] = useState([]);
  const [listLoading, setListLoading] = useState(false);

  const roles = user?.[ROLES_CLAIM] || [];
  const isAdmin = roles.includes('ADMIN');

  useEffect(() => {
    if (isAuthenticated) {
      loadCourses();
    }
  }, [isAuthenticated]);

  async function loadCourses() {
    setListLoading(true);
    try {
      const token = await getAccessTokenSilently();
      const data = await getCourses(token);
      setCourses(data);
    } catch (err) {
      console.error(err);
    } finally {
      setListLoading(false);
    }
  }

  async function handleCreate(formData) {
    const token = await getAccessTokenSilently();
    await createCourse(token, formData);
    await loadCourses();
  }

  async function handleDelete(id) {
    const token = await getAccessTokenSilently();
    await deleteCourse(token, id);
    await loadCourses();
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500 text-lg">Carregando...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-4">
        <h1 className="text-3xl font-bold text-blue-700">Sistema de Cursos</h1>
        <p className="text-gray-600">Faça login para acessar o sistema.</p>
        <button
          onClick={() => loginWithRedirect()}
          className="bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-800 transition"
        >
          Entrar com Auth0
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        {isAdmin && <CourseForm onSubmit={handleCreate} />}
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          Cursos Cadastrados ({courses.length})
        </h2>
        <CourseList
          courses={courses}
          isAdmin={isAdmin}
          onDelete={handleDelete}
          loading={listLoading}
        />
      </main>
    </div>
  );
}
