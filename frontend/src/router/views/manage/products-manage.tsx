// StoreManage.tsx
import { useEffect, useState } from 'react';

import { useColumns_productos } from '../../../components/columns-products';
import { LabelH1 } from '../../../components/ui/label';
import { getProductos, productos } from '../../../core/productos';
import Datatable_Users from '../auth/components/datatable-users';

function ProductsManage() {
  const [producto, setProducto] = useState<productos[]>([]);
  const columns = useColumns_productos();

  useEffect(() => {
    const fetchStore = async () => {
      const data = await getProductos();
      setProducto(data);
    };

    fetchStore();
  }, []);

  return (
    <section className='px-36 pb-12 pt-10'>
      <div className='px-10 py-10 text-center'>
        <LabelH1>Productos</LabelH1>
      </div>

      <Datatable_Users
        data={producto}
        columns={columns}
        caption='Lista de producto'
        globalFilterColumn='nombre_producto'
      />
    </section>
  );
}

export default ProductsManage;
