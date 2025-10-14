import { Trash } from "lucide-react";

interface NewProducts {
  id: string;
  name: string;
  price: number;
  quantity: number;
  subTotal: number;
}

interface OrderProps {
  listOrder: NewProducts[];
  onRemoveProduct?: (id: string) => void;
}

export const ListOrderProducts: React.FC<OrderProps> = ({
  listOrder,
  onRemoveProduct,
}) => {
  const totalPrice = listOrder.reduce(
    (total, order) => total + order.subTotal,
    0
  );
  const totalQuantity = listOrder.reduce(
    (total, order) => total + order.quantity,
    0
  );

  return (
    <section className="products-buy">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-slate-500 dark:text-slate-400">
          <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Orden
              </th>
              <th scope="col" className="px-6 py-3">
                Precio c/u
              </th>
              <th scope="col" className="px-6 py-3">
                Cantidad
              </th>
              <th scope="col" className="px-6 py-3">
                Sub Total
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {listOrder.map((product) => (
              <tr
                key={product.id}
                className="bg-slate-100 border-b dark:bg-slate-800 dark:border-slate-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white"
                >
                  {product.name}
                </th>
                <td className="px-6 py-4">{product.price}</td>
                <td className="px-6 py-4">{product.quantity}</td>
                <td className="px-6 py-4">{product.subTotal}</td>
                <td className="px-6 py-4">
                  {onRemoveProduct && (
                    <button
                      onClick={() => onRemoveProduct(product.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total-section mt-4 text-slate-900 py-2 mb-4 dark:text-slate-100">
          <h4>Cantidad de platos: {totalQuantity}</h4>
          <h4>Precio total: {totalPrice.toFixed(2)} Bs.</h4>
        </div>
      </div>
    </section>
  );
};
