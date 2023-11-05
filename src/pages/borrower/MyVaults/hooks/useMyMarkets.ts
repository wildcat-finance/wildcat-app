import { useGetController } from "../../hooks/useGetController"

export const useMyMarkets = () => {
  const { data } = useGetController()

  return {
    data: data?.markets || [],
  }
}
