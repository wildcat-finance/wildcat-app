import { useGetController } from "../../hooks/useGetController"

export const GET_MARKETS_KEY = "my_markets_list"

export const useMarkets = () => {
  const { data } = useGetController()

  return {
    data: data?.markets || [],
  }
}
