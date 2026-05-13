const STATUS_LABEL = {
  DISPONIVEL: { label: 'Disponível', className: 'bg-green-100 text-green-800' },
  CANCELADO: { label: 'Cancelado', className: 'bg-red-100 text-red-800' },
};

export default function CourseList({ courses, isAdmin, onDelete, loading }) {
  if (loading) {
    return <p className="text-center text-gray-500 py-10">Carregando cursos...</p>;
  }

  if (courses.length === 0) {
    return <p className="text-center text-gray-400 py-10">Nenhum curso cadastrado.</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-4 py-3 text-left">Código</th>
            <th className="px-4 py-3 text-left">Nome</th>
            <th className="px-4 py-3 text-left">Instrutor</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Cadastrado por</th>
            <th className="px-4 py-3 text-left">Data</th>
            {isAdmin && <th className="px-4 py-3 text-left">Ações</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {courses.map((course) => {
            const status = STATUS_LABEL[course.status] || { label: course.status, className: 'bg-gray-100 text-gray-700' };
            return (
              <tr key={course.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 font-mono font-medium text-gray-800">{course.codigo}</td>
                <td className="px-4 py-3 text-gray-700">{course.nome}</td>
                <td className="px-4 py-3 text-gray-600">{course.instrutor}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${status.className}`}>
                    {status.label}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">{course.adminEmail}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">
                  {new Date(course.dataCadastro).toLocaleDateString('pt-BR')}
                </td>
                {isAdmin && (
                  <td className="px-4 py-3">
                    <button
                      onClick={() => {
                        if (confirm(`Deletar o curso "${course.nome}"?`)) {
                          onDelete(course.id);
                        }
                      }}
                      className="text-red-600 hover:text-red-800 font-medium text-xs transition"
                    >
                      Deletar
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
