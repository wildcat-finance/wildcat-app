import { useQuery } from "@tanstack/react-query"
import { logger } from "@wildcatfi/wildcat-sdk/dist/utils/logger"
import { useGetControllerContract } from "../../../../hooks/useGetController"

export const GET_MARKETS_BY_CONTROLLER_KEY = "get-markets-by-controller"

export const useGetMarketsForController = (controllerAddress: string) => {
  const { data: controller } = useGetControllerContract(controllerAddress)
  const getMarketsByController = async () => {
    if (!controller) throw Error()

    logger.debug(`Getting controller markets...`)

    const markets = await controller["getControlledMarkets()"]()

    logger.debug(`Got controller markets : ${markets.length}`)

    return markets
  }

  return useQuery({
    queryKey: [GET_MARKETS_BY_CONTROLLER_KEY, controllerAddress],
    queryFn: getMarketsByController,
    enabled: !!controllerAddress,
    refetchOnMount: false,
  })
}
