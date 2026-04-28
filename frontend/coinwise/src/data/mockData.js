export const mockUsers = {
  students: [
    { id: 1, name: "Ana Souza", email: "ana@escola.edu.br", role: "student", avatar: "AS", balance: 320, course: "Engenharia de Software", semester: "5º", ra: "2021001" },
    { id: 2, name: "Bruno Lima", email: "bruno@escola.edu.br", role: "student", avatar: "BL", balance: 150, course: "Ciência da Computação", semester: "3º", ra: "2022015" },
    { id: 3, name: "Carla Mendes", email: "carla@escola.edu.br", role: "student", avatar: "CM", balance: 480, course: "Sistemas de Informação", semester: "7º", ra: "2020033" },
    { id: 4, name: "Diego Ferreira", email: "diego@escola.edu.br", role: "student", avatar: "DF", balance: 95, course: "Engenharia de Software", semester: "2º", ra: "2023004" },
    { id: 5, name: "Elena Costa", email: "elena@escola.edu.br", role: "student", avatar: "EC", balance: 210, course: "Redes de Computadores", semester: "4º", ra: "2021022" },
  ],
  teachers: [
    { id: 10, name: "Prof. Ricardo Alves", email: "ricardo@escola.edu.br", role: "teacher", avatar: "RA", balance: 500, department: "Ciências Exatas", subject: "Algoritmos e Estrutura de Dados" },
    { id: 11, name: "Profa. Juliana Matos", email: "juliana@escola.edu.br", role: "teacher", avatar: "JM", balance: 300, department: "Engenharia", subject: "Programação Orientada a Objetos" },
  ],
  companies: [
    { id: 20, name: "TechHub Café", email: "contato@techhub.com.br", role: "company", avatar: "TH", category: "Alimentação", description: "Café e lanches para estudantes" },
    { id: 21, name: "CodeBooks Store", email: "vendas@codebooks.com.br", role: "company", avatar: "CB", category: "Livraria", description: "Livros técnicos e cursos online" },
  ],
};

export const mockTransactions = [
  { id: 1, type: "received", amount: 50, from: "Prof. Ricardo Alves", to: "Ana Souza", message: "Excelente participação na aula de hoje! Parabéns pela resolução do exercício.", date: "2025-01-15T10:30:00", studentId: 1 },
  { id: 2, type: "spent", amount: 30, from: "Ana Souza", to: "TechHub Café", message: "Resgate: Combo Lanche + Café", date: "2025-01-14T14:20:00", studentId: 1 },
  { id: 3, type: "received", amount: 100, from: "Profa. Juliana Matos", to: "Ana Souza", message: "Melhor projeto da turma no semestre! Projeto excelente e bem documentado.", date: "2025-01-13T09:00:00", studentId: 1 },
  { id: 4, type: "spent", amount: 80, from: "Ana Souza", to: "CodeBooks Store", message: "Resgate: Livro Clean Code", date: "2025-01-12T16:45:00", studentId: 1 },
  { id: 5, type: "received", amount: 25, from: "Prof. Ricardo Alves", to: "Ana Souza", message: "Boa pontualidade e dedicação nos exercícios extras.", date: "2025-01-10T11:00:00", studentId: 1 },
  { id: 6, type: "received", amount: 75, from: "Prof. Ricardo Alves", to: "Bruno Lima", message: "Excelente apresentação do trabalho em grupo.", date: "2025-01-15T11:00:00", studentId: 2 },
  { id: 7, type: "received", amount: 120, from: "Profa. Juliana Matos", to: "Carla Mendes", message: "Nota máxima no projeto final! Trabalho excepcional.", date: "2025-01-15T08:30:00", studentId: 3 },
];

export const mockRewards = [
  { id: 1, name: "Combo Lanche + Café", cost: 30, company: "TechHub Café", companyId: 20, description: "Um lanche natural + café expresso ou chá à sua escolha. Válido de segunda a sexta.", image: "🥪", category: "Alimentação", available: true, totalRedeemed: 45 },
  { id: 2, name: "Livro Clean Code", cost: 80, company: "CodeBooks Store", companyId: 21, description: "Livro Clean Code - Robert C. Martin. Um dos melhores livros para programadores.", image: "📚", category: "Educação", available: true, totalRedeemed: 18 },
  { id: 3, name: "Curso Online - React Avançado", cost: 150, company: "CodeBooks Store", companyId: 21, description: "Acesso completo ao curso React Avançado com certificado. 40h de conteúdo.", image: "💻", category: "Cursos", available: true, totalRedeemed: 7 },
  { id: 4, name: "10 Cafés Expresso", cost: 25, company: "TechHub Café", companyId: 20, description: "Vale 10 cafés expressos no balcão. Ideal para as madrugadas de estudo!", image: "☕", category: "Alimentação", available: true, totalRedeemed: 92 },
  { id: 5, name: "Caneca Personalizada", cost: 40, company: "TechHub Café", companyId: 20, description: "Caneca exclusiva do TechHub com seu nome. Edição limitada.", image: "🎁", category: "Brinde", available: true, totalRedeemed: 23 },
  { id: 6, name: "Pack de Livros DevOps", cost: 200, company: "CodeBooks Store", companyId: 21, description: "Combo com 3 livros sobre DevOps, Docker e Kubernetes.", image: "📦", category: "Educação", available: false, totalRedeemed: 5 },
];

export const mockNotifications = [
  { id: 1, message: "Você recebeu 50 moedas de Prof. Ricardo Alves!", type: "received", time: "há 2h", read: false },
  { id: 2, message: "Nova vantagem disponível: Curso Online - React Avançado", type: "reward", time: "há 5h", read: false },
  { id: 3, message: "Resgate confirmado: Combo Lanche + Café", type: "spent", time: "ontem", read: true },
];

export const mockTeacherTransactions = [
  { id: 1, to: "Ana Souza", amount: 50, message: "Excelente participação na aula de hoje!", date: "2025-01-15T10:30:00" },
  { id: 2, to: "Bruno Lima", amount: 75, message: "Excelente apresentação do trabalho em grupo.", date: "2025-01-15T11:00:00" },
  { id: 3, to: "Elena Costa", amount: 30, message: "Boa participação nos exercícios de laboratório.", date: "2025-01-14T15:00:00" },
  { id: 4, to: "Carla Mendes", amount: 100, message: "Projeto excelente e bem documentado.", date: "2025-01-13T09:00:00" },
];