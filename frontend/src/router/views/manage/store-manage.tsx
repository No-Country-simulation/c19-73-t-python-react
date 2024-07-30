// StoreManage.tsx
import { useEffect, useState } from "react";
import { LabelH1 } from "../../../components/ui/label";
import Datatable_Users from "../auth/components/datatable-users";
import { tiendas, getTiendas } from "../../../core/tienda";
import { useColumns_store } from "../../../components/columns-store";

function StoreManage() {
  const [tienda, setTiendas] = useState<tiendas[]>([]);
  const columns = useColumns_store();

  useEffect(() => {
    const fetchStore = async () => {
      const data = await getTiendas();
      setTiendas(data);
    };

    fetchStore();
  }, []);

  return (
    <section className="pt-10 px-36 pb-12">
      <div className="px-10 py-10 text-center">
        <LabelH1>Tiendas</LabelH1>
      </div>

      <Datatable_Users
        data={tienda}
        columns={columns}
        caption="Lista de tiendas"
        globalFilterColumn="nombre_tienda"
      />
    </section>
  );
}

export default StoreManage;
