export interface sessionInterface {
  user: User;
  token: string;
}

interface User {
  id: number;
  username: string;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  fecha_nacimiento: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
}
