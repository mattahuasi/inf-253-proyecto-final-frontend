import {
  HandPlatter,
  HeartHandshake,
  Soup,
  Users2,
  UsersRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { SectionCard } from "../../components/cards/SectionCard";
import { StatCard } from "../../components/cards/StatCard";
import { StackedBarChart } from "../../components/charts/StackedBarChart";
import { ErrorMessage } from "../../components/ui/ErrorMessage";
import { Loading } from "../../components/ui/Loading";
import { State } from "../../interfaces/state";
import { deserialized } from "../../libs/fractal";
import { getDashboardRequest } from "../../services/dashboard";
import { getStatesRequest } from "../../services/states";

export default function Dashboard() {
  const [ordersToday, setOrdersToday] = useState(0);
  const [states, setStates] = useState<State[]>([]);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalMenus, setTotalMenus] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await getDashboardRequest();
        setOrdersToday(data.orders_today);
        setTotalCustomers(data.total_customers);
        setTotalEmployees(data.total_employees);
        setTotalMenus(data.total_menus);
        setTotalUsers(data.total_users);
      } catch (error) {
        setError(error as Error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    const fetchStates = async () => {
      try {
        setLoading(true);
        const { data } = await getStatesRequest();
        setStates(deserialized(data));
      } catch (error) {
        setError(error as Error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    fetchStates();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;

  console.log(states);

  return (
    <SectionCard title="Dashboard">
      <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-clip">
        <StatCard
          title="Pedidos Hoy"
          counter={ordersToday.toString()}
          Icon={HandPlatter}
          iconColor="#ef4444"
        />
        <StatCard
          title="Total Menús"
          counter={totalMenus.toString()}
          Icon={Soup}
          iconColor="#ff9066"
        />
        <StatCard
          title="Total Clientes"
          counter={totalCustomers.toString()}
          Icon={HeartHandshake}
          iconColor="#4ad991"
        />
        <StatCard
          title="Total Empleados"
          counter={totalEmployees.toString()}
          Icon={UsersRound}
          iconColor="#8280ff"
        />
        <StatCard
          title="Total Usuarios"
          counter={totalUsers.toString()}
          Icon={Users2}
          iconColor="#eab308"
        />
      </section>

      <section className="mt-10 flex flex-col gap-6 overflow-clip">
        <StackedBarChart />
      </section>
    </SectionCard>
  );
}
