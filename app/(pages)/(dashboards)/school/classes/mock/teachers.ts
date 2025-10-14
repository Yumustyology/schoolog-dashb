export type Teacher = {
  id: string;
  name: string;
  email: string;
  teacherImg?: string;
  assignedTo?: string;
};

// Generate a large list of teachers to simulate pagination
const N = 300;
const names = [
  'Muhammad Jamiu',
  'Aisha Bello',
  'John Doe',
  'Jane Smith',
  'Samuel Ade',
  'Grace Okonkwo',
  'Emeka Obi',
  'Fatima Sule',
  'Peter Johnson',
  'Mary Uche',
];

const teachers: Teacher[] = Array.from({ length: N }).map((_, i) => {
  const name = names[i % names.length] + (i > names.length ? ` ${Math.floor(i / names.length)}` : '');
  return {
    id: `t-${i + 1}`,
    name,
    email: `${name.toLowerCase().replace(/\s+/g, '')}@example.com`,
    teacherImg: '/assets/images/avatar.png',
    assignedTo: i % 3 === 0 ? 'JSS1' : undefined,
  };
});

export type FetchTeachersQuery = {
  page?: number;
  limit?: number;
  search?: string;
};

export async function fetchTeachers({ page = 1, limit = 20, search = '' }: FetchTeachersQuery) {
  // simulate network delay
  await new Promise((r) => setTimeout(r, 300 + Math.random() * 300));

  let filtered = teachers;
  const q = (search || '').trim().toLowerCase();
  if (q) {
    filtered = teachers.filter((t) => t.name.toLowerCase().includes(q) || t.email.toLowerCase().includes(q));
  }

  const start = (page - 1) * limit;
  const items = filtered.slice(start, start + limit);
  return {
    items,
    total: filtered.length,
    page,
    limit,
  };
}
