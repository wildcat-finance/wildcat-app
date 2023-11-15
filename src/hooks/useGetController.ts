import { useQuery } from "@tanstack/react-query"
import { useAccount } from "wagmi"
import {
  getController,
  getControllerContract,
  Signer,
} from "@wildcatfi/wildcat-sdk"

import { useEthersSigner } from "../modules/hooks"
import { useCurrentNetwork } from "./useCurrentNetwork"

export const GET_CONTROLLER_KEY = "controller"
export const GET_CONTROLLER_CONTRACT_KEY = "controllerContract"
export const GET_CONTROLLER_UPDATED_KEY = "controllerUpdated"

export const useGetController = () => {
  const { address } = useAccount()
  const signer = useEthersSigner()
  const { isWrongNetwork } = useCurrentNetwork()

  async function getUserController() {
    const controller = await getController(signer as Signer, address as string)
    return controller
  }

  return useQuery({
    queryKey: [GET_CONTROLLER_KEY, address],
    queryFn: getUserController,
    enabled: !!address && !!signer && !isWrongNetwork,
    refetchOnMount: false,
  })
}

export const useGetControllerContract = () => {
  const { address } = useAccount()
  const signer = useEthersSigner()
  const { isWrongNetwork } = useCurrentNetwork()
  async function getUserController() {
    const controller = getControllerContract(
      signer as Signer,
      address as string,
    )
    return controller
  }

  return useQuery({
    queryKey: [GET_CONTROLLER_CONTRACT_KEY, address],
    queryFn: getUserController,
    enabled: !!address && !!signer && !isWrongNetwork,
    refetchOnMount: false,
  })
}

export const useGetUpdatedController = () => {
  const { address } = useAccount()
  const signer = useEthersSigner()
  const { isWrongNetwork } = useCurrentNetwork()

  async function getUserController() {
    const controller = await getController(signer as Signer, address as string)
    await controller.update()

    return controller
  }

  return useQuery({
    queryKey: [GET_CONTROLLER_UPDATED_KEY, address],
    queryFn: getUserController,
    enabled: !!address && !!signer && !isWrongNetwork,
    refetchOnMount: false,
  })
}
