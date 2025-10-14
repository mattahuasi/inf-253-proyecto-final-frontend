import {
  AlarmClock,
  Gauge,
  HandPlatter,
  HeartHandshake,
  Layers,
  Shield,
  ShieldAlert,
  ShoppingCart,
  Soup,
  UserRound,
  UsersRound,
  Utensils,
} from "lucide-react";
import { NavigationSection } from "../types";

export const routes: NavigationSection[] = [
  {
    title: "",
    links: [{ name: "Dashboard", path: "/home/dashboard", icon: Gauge }],
  },
  {
    title: "Pedidos",
    links: [
      {
        name: "Hacer pedido",
        path: "/orders/add",
        icon: ShoppingCart,
      },
      {
        name: "Pedidos",
        path: "/orders/list",
        icon: HandPlatter,
      },
      { name: "Estados", path: "/states/list", icon: AlarmClock },
    ],
  },
  {
    title: "Restaurante",
    links: [
      { name: "Clientes", path: "/customers/list", icon: HeartHandshake },
      {
        name: "Categorías",
        path: "/categories/list",
        icon: Layers,
      },
      { name: "Menus", path: "/menus/list", icon: Soup },

      { name: "Mesas", path: "/tables/list", icon: Utensils },
    ],
  },
  {
    title: "Administración",
    links: [
      {
        name: "Empleados",
        path: "/employees/list",
        icon: UsersRound,
      },
      { name: "Roles", path: "/roles/list", icon: Shield },
      {
        name: "Permisos",
        path: "/permissions/list",
        icon: ShieldAlert,
      },
      {
        name: "Usuarios",
        path: "/users/list",
        icon: UserRound,
      },
    ],
  },
];
