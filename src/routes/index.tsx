/* eslint-disable react-refresh/only-export-components */
import { SearchPage } from "@/components/search/SearchPage";
import { createRoute, useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import { rootRoute } from "./__root";

interface SearchParams {
    q?: string;
}

function IndexPage() {
    const { q } = indexRoute.useSearch();
    const navigate = useNavigate();

    // Only update URL on blur, not on every keystroke
    const handleQueryChange = useCallback((newQuery: string) => {
        navigate({
            to: "/",
            search: newQuery ? { q: newQuery } : {},
            replace: true,
        });
    }, [navigate]);

    return (
        <SearchPage
            initialQuery={q ?? ""}
            onQueryChange={handleQueryChange}
        />
    );
}

export const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    validateSearch: (search: Record<string, unknown>): SearchParams => {
        return {
            q: typeof search.q === 'string' ? search.q : undefined,
        };
    },
    component: IndexPage,
});
