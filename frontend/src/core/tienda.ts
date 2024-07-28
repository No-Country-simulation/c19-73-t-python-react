export type tiendas = {
    id_tienda: number;
    id_usuario: number;
    id_estado_tienda: number;
    nombre_tienda: string;
    logo_tienda: string;
    descripcion: string;
    telefono_tienda: string;
    correo_tienda: string;
    nombre_banco: string;
    tipo_cuenta_bancaria: string;
    numero_de_cuenta: string;
    cci: string;
  };
  
  const tiendasData: tiendas[] = [
    {
      id_tienda: 1,
      id_usuario: 1,
      id_estado_tienda: 1,
      nombre_tienda: 'Artesanías La Paz',
      logo_tienda: 'logo1.png',
      descripcion: 'Tienda de artesanías bolivianas.',
      telefono_tienda: '123456789',
      correo_tienda: 'contacto@lapaz.com',
      nombre_banco: 'Banco La Paz',
      tipo_cuenta_bancaria: 'Ahorro',
      numero_de_cuenta: '1234567890',
      cci: '001234567890'
    },
    {
      id_tienda: 2,
      id_usuario: 2,
      id_estado_tienda: 1,
      nombre_tienda: 'Artesanías Cusco',
      logo_tienda: 'logo2.png',
      descripcion: 'Tienda de artesanías peruanas.',
      telefono_tienda: '987654321',
      correo_tienda: 'contacto@cusco.com',
      nombre_banco: 'Banco Cusco',
      tipo_cuenta_bancaria: 'Corriente',
      numero_de_cuenta: '0987654321',
      cci: '009876543210'
    },
    {
      id_tienda: 3,
      id_usuario: 3,
      id_estado_tienda: 1,
      nombre_tienda: 'Artesanías Quito',
      logo_tienda: 'logo3.png',
      descripcion: 'Tienda de artesanías ecuatorianas.',
      telefono_tienda: '123123123',
      correo_tienda: 'contacto@quito.com',
      nombre_banco: 'Banco Quito',
      tipo_cuenta_bancaria: 'Ahorro',
      numero_de_cuenta: '1231231230',
      cci: '001231231230'
    },
    {
      id_tienda: 4,
      id_usuario: 4,
      id_estado_tienda: 1,
      nombre_tienda: 'Artesanías Bogotá',
      logo_tienda: 'logo4.png',
      descripcion: 'Tienda de artesanías colombianas.',
      telefono_tienda: '321321321',
      correo_tienda: 'contacto@bogota.com',
      nombre_banco: 'Banco Bogotá',
      tipo_cuenta_bancaria: 'Corriente',
      numero_de_cuenta: '3213213210',
      cci: '003213213210'
    },
    {
      id_tienda: 5,
      id_usuario: 5,
      id_estado_tienda: 1,
      nombre_tienda: 'Artesanías Lima',
      logo_tienda: 'logo5.png',
      descripcion: 'Tienda de artesanías peruanas.',
      telefono_tienda: '456456456',
      correo_tienda: 'contacto@lima.com',
      nombre_banco: 'Banco Lima',
      tipo_cuenta_bancaria: 'Ahorro',
      numero_de_cuenta: '4564564560',
      cci: '004564564560'
    }
  ];
  
  export async function getTiendas(): Promise<tiendas[]> {
    // Simular una llamada a una API con una promesa
    return new Promise((resolve) => {
      setTimeout(() => resolve(tiendasData), 100);
    });
  }
  