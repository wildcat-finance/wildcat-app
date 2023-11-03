import { useGetController } from "../../hooks/useGetController"

export const GET_MARKETS_KEY = "markets"

export const useMarkets = () => {
  const { data } = useGetController()

  return {
    data: data?.markets || [],
  }
}
