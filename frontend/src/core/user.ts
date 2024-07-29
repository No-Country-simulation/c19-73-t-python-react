
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
          },{
            id_usuario: 4,
            nombre: "Michael Brown Brown Browning",
            telefono: "+1 555 123 4567",
            direccion: "987 Elm St, Metropolis, USA",
            correo: "michael.brown@example.com",
            contrasena: "password321",
            rol_id: 1
          },
          {
            id_usuario: 5,
            nombre: "Sarah Davis Davis Davis",
            telefono: "+44 20 7946 6789",
            direccion: "654 King St, London, UK",
            correo: "sarah.davis@example.com",
            contrasena: "password654",
            rol_id: 2
          },
          {
            id_usuario: 6,
            nombre: "David Wilson Wilson Wilsoning",
            telefono: "+61 2 8765 4321",
            direccion: "321 Prince St, Sydney, Australia",
            correo: "david.wilson@example.com",
            contrasena: "password987",
            rol_id: 3
          },
          {
            id_usuario: 7,
            nombre: "Laura Martinez Martinez Martinezing",
            telefono: "+34 91 123 4567",
            direccion: "123 Calle Mayor, Madrid, Spain",
            correo: "laura.martinez@example.com",
            contrasena: "password741",
            rol_id: 1
          },
          {
            id_usuario: 8,
            nombre: "Carlos Lopez Lopez Lopezing",
            telefono: "+52 55 1234 5678",
            direccion: "456 Avenida Reforma, Mexico City, Mexico",
            correo: "carlos.lopez@example.com",
            contrasena: "password852",
            rol_id: 2
          }
    ]
}