// StoreManage.tsx
import { useEffect, useState } from "react";
import { LabelH1 } from "../../../components/ui/label";
import Datatable_Users from "../auth/components/datatable-users";
import { getCategorias, categorias_productos } from "../../../core/categorias_productos";
import { useColumns_categorias } from "../../../components/columns-category";

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
    <section className="pt-10 px-48 pb-12">
      <div className="px-10 py-10 text-center">
        <LabelH1>Categoría de productos</LabelH1>
      </div>

      <Datatable_Users
        data={categoria}
        columns={columns}
        caption="Lista de categorías"
        globalFilterColumn="nombre_categoría_producto"
      />
    </section>
  );
}

export default CategoryManage;
