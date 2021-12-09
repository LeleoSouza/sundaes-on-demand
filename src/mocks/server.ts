import { setupServer} from "msw/node";
import { handlers, handlersToppings } from "./handlers";
export const server =  setupServer(...handlers,...handlersToppings)