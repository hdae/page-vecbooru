import { createRouter, RouterProvider } from "@tanstack/react-router";
import { rootRoute } from "./routes/__root";
import { indexRoute } from "./routes/index";

const routeTree = rootRoute.addChildren([indexRoute]);

const router = createRouter({
    basepath: '/page-vecbooru',
    routeTree
});

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

export const App = () => {
    return <RouterProvider router={router} />;
};
