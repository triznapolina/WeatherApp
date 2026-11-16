import { useEffect, useState } from 'react';

export default function useFetch(fetcher, deps = []) {
    const [state, setState] = useState({ data: null, loading: true, error: null });
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        let cancelled = false;
        setState((prev) => ({ ...prev, loading: true, error: null }));

        fetcher()
            .then((data) => {
                if (!cancelled) setState({ data, loading: false, error: null });
            })
            .catch((err) => {
                if (!cancelled) setState({ data: null, loading: false, error: err.message });
            });

        return () => {
            cancelled = true;
        };
    }, [...deps, attempt]);

    const reload = () => setAttempt((n) => n + 1);

    return { ...state, reload };
}
