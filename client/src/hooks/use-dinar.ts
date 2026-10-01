import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type DinarMarketData } from "@shared/routes";

// GET /api/dinar/market
export function useMarketData(type: 'market' | 'official' = 'market') {
  return useQuery({
    queryKey: [api.dinar.getMarket.path, type],
    queryFn: async () => {
      const url = `${api.dinar.getMarket.path}?type=${type}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch market data");
      
      const json = await res.json();
      return api.dinar.getMarket.responses[200].parse(json);
    },
    // Refresh every 30 seconds for market, 30 minutes for official
    refetchInterval: type === 'official' ? 30 * 60 * 1000 : 30000, 
  });
}

// Hook for manual refresh logic if needed elsewhere
export function useRefreshMarketData() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: [api.dinar.getMarket.path] });
}
