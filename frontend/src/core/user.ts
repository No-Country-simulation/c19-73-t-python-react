
export type usuario = {
    id_usuario?: number;
    nombre: string;
    telefono: string;
    direccion: string;
    correo: string;
    contrasena: string;
    rol_id?: number;
}

export async function getUser(): Promise<usuario[]>{
    return[
        {
            id_usuario: 1,
            nombre: "John Doe Doe Doeing",
            telefono: "+1 123 456 7890",
            direccion: "123 Main St, Springfield, USA",
            correo: "john.doe@example.com",
            contrasena: "password123",
            rol_id: 1
          },
          {
            id_usuario: 2,
            nombre: "Jane Smith Smith Smith",
            telefono: "+44 20 7946 0958",
            direccion: "456 High St, London, UK",
            correo: "jane.smith@example.com",
            contrasena: "password456",
            rol_id: 2
          },
          {
            id_usuario: 3,
            nombre: "Emily Johnson Johnson Johnson",
            telefono: "+61 2 1234 5678",
            direccion: "789 Queen St, Sydney, Australia",
            correo: "emily.johnson@example.com",
            contrasena: "password789",
            rol_id: 3
          }
    ]
}