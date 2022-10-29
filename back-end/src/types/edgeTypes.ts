import { PizzaEdges } from "@prisma/client";

export type IEdgeData = Omit<PizzaEdges, 'id'>;