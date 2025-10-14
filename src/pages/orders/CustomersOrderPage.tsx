import { useEffect, useState } from "react";
import { ListOrderProducts } from "./ListOredererProduct";

interface NewProducts {
  id: string;
  name: string;
  price: number;
  quantity: number;
  subTotal: number;
}

export const CustomerOrdersPage: React.FC = () => {
  const [ordersHistory, setOrdersHistory] = useState<NewProducts[][]>([]);
  const [selectedOrder, setSelectedOrder] = useState<NewProducts[] | null>(
    null
  );

  useEffect(() => {
    const storedOrders = localStorage.getItem("ordersHistory");
    if (storedOrders) {
      setOrdersHistory(JSON.parse(storedOrders));
    }
  }, []);

  return (
    <>
      <div className="flex flex-col w-full mt-8 p-10 ">
        <h1 className="text-2xl font-bold text-center mb-8 text-slate-800 dark:text-slate-200">
          Historial de Pedidos
        </h1>

        <div className="flex flex-col items-center space-y-4 mb-8">
          {ordersHistory.length > 0 ? (
            ordersHistory.map((order, index) => (
              <button
                key={index}
                onClick={() => setSelectedOrder(order)}
                className={`w-full max-w-md p-4 text-left border rounded-lg shadow-md text-slate-800 dark:text-slate-200 ${
                  selectedOrder === order
                    ? "border-blue-500 bg-blue-100 text-slate-800 dark:bg-blue-900 dark:text-slate-200"
                    : "border-slate-300 hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-700 dark:hover:text-slate-200"
                }`}
              >
                <h2 className="text-lg font-semibold">
                  Pedido #{index + 1} (
                  {order.reduce((total, order) => total + order.quantity, 0)}
                  platos)
                </h2>

                <p className="text-sm text-slate-500">
                  Total: $
                  {order
                    .reduce((sum, item) => sum + item.subTotal, 0)
                    .toFixed(2)}
                </p>
              </button>
            ))
          ) : (
            <p className="text-center text-slate-500 dark:text-slate-300">
              No hay pedidos confirmados.
            </p>
          )}
        </div>

        <div className="w-full max-w-3xl mx-auto">
          {selectedOrder ? (
            <>
              <h2 className="text-xl font-bold mb-4 text-center text-slate-800 dark:text-slate-200">
                Detalles del Pedido Seleccionado
              </h2>
              <ListOrderProducts listOrder={selectedOrder} />
            </>
          ) : (
            <p className="text-slate-500 text-center">
              Selecciona un pedido para ver los detalles.
            </p>
          )}
        </div>
      </div>
    </>
  );
};
