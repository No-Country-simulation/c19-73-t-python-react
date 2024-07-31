// StoreManage.tsx
import { useEffect, useState } from 'react';

import { useColumns_categorias } from '../../../../components/columns-category';
import { LabelH1 } from '../../../../components/ui/label';
import {
  categorias_productos,
  getCategorias,
} from '../../../../core/categorias_productos';
import Datatable_Users from '../../auth/components/datatable-users';

function CategoryManage() {
  const [categoria, setCategoria] = useState<categorias_productos[]>([]);
  const columns = useColumns_categorias();

  useEffect(() => {
    const fetchStore = async () => {
      const data = await getCategorias();
      setCategoria(data);
    };

    fetchStore();
  }, []);

  return (
    <section className='px-48 pb-12 pt-10'>
      <div className='px-10 py-10 text-center'>
        <LabelH1>Categoría de productos</LabelH1>
      </div>

      <Datatable_Users
        data={categoria}
        columns={columns}
        caption='Lista de categorías'
        globalFilterColumn='nombre_categoría_producto'
      />
    </section>
  );
}

export default CategoryManage;
