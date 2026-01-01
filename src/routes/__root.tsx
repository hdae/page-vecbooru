/* eslint-disable react-refresh/only-export-components */
import { Theme } from "@radix-ui/themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            retry: false,
        },
    },
});

function RootLayout() {
    return (
        <Theme appearance="dark" accentColor="iris" panelBackground="translucent" style={{ height: "100%" }}>
            <QueryClientProvider client={queryClient}>
                <Toaster
                    position="bottom-center"
                    toastOptions={{
                        style: {
                            background: '#333',
                            color: '#fff',
                        },
                    }}
                />
                <Outlet />
            </QueryClientProvider>
        </Theme>
    );
}

export const rootRoute = createRootRoute({
    component: RootLayout,
});
