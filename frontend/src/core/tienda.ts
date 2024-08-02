export type tiendas = {
  id_tienda: number;
  id_usuario: number;
  id_estado_tienda: number;
  nombre_tienda: string;
  logo_tienda: string;
  descripcion: string;
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
    nombre_banco: 'Banco La Paz',
    tipo_cuenta_bancaria: 'Ahorro',
    numero_de_cuenta: '1234567890',
    cci: '001234567890',
  },
  {
    id_tienda: 2,
    id_usuario: 2,
    id_estado_tienda: 1,
    nombre_tienda: 'Artesanías Cusco',
    logo_tienda: 'logo2.png',
    descripcion: 'Tienda de artesanías peruanas.',
    nombre_banco: 'Banco Cusco',
    tipo_cuenta_bancaria: 'Corriente',
    numero_de_cuenta: '0987654321',
    cci: '009876543210',
  },
  {
    id_tienda: 3,
    id_usuario: 3,
    id_estado_tienda: 1,
    nombre_tienda: 'Artesanías Quito',
    logo_tienda: 'logo3.png',
    descripcion: 'Tienda de artesanías ecuatorianas.',
    nombre_banco: 'Banco Quito',
    tipo_cuenta_bancaria: 'Ahorro',
    numero_de_cuenta: '1231231230',
    cci: '001231231230',
  },
  {
    id_tienda: 4,
    id_usuario: 4,
    id_estado_tienda: 1,
    nombre_tienda: 'Artesanías Bogotá',
    logo_tienda: 'logo4.png',
    descripcion: 'Tienda de artesanías colombianas.',
    nombre_banco: 'Banco Bogotá',
    tipo_cuenta_bancaria: 'Corriente',
    numero_de_cuenta: '3213213210',
    cci: '003213213210',
  },
  {
    id_tienda: 5,
    id_usuario: 5,
    id_estado_tienda: 1,
    nombre_tienda: 'Artesanías Lima',
    logo_tienda: 'logo5.png',
    descripcion: 'Tienda de artesanías peruanas.',
    nombre_banco: 'Banco Lima',
    tipo_cuenta_bancaria: 'Ahorro',
    numero_de_cuenta: '4564564560',
    cci: '004564564560',
  },
  {
    id_tienda: 6,
    id_usuario: 6,
    id_estado_tienda: 1,
    nombre_tienda: 'Artesanías Cusco',
    logo_tienda: 'logo6.png',
    descripcion: 'Tienda de artesanías tradicionales de Cusco.',
    nombre_banco: 'Banco Cusco',
    tipo_cuenta_bancaria: 'Corriente',
    numero_de_cuenta: '6543219870',
    cci: '007654321987',
  },
  {
    id_tienda: 7,
    id_usuario: 7,
    id_estado_tienda: 2,
    nombre_tienda: 'Artesanías Arequipa',
    logo_tienda: 'logo7.png',
    descripcion: 'Especialidades en artesanías de Arequipa.',
    nombre_banco: 'Banco Arequipa',
    tipo_cuenta_bancaria: 'Ahorro',
    numero_de_cuenta: '7894561230',
    cci: '008794561230',
  },
  {
    id_tienda: 8,
    id_usuario: 8,
    id_estado_tienda: 1,
    nombre_tienda: 'Artesanías Puno',
    logo_tienda: 'logo8.png',
    descripcion: 'Artesanías únicas de la región de Puno.',
    nombre_banco: 'Banco Puno',
    tipo_cuenta_bancaria: 'Corriente',
    numero_de_cuenta: '3216549870',
    cci: '009321654987',
  },
];

export async function getTiendas(): Promise<tiendas[]> {
  // Simular una llamada a una API con una promesa
  return new Promise((resolve) => {
    setTimeout(() => resolve(tiendasData), 100);
  });
}


