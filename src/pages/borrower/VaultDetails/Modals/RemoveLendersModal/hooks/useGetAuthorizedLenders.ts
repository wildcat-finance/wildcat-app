import { useQuery } from "@tanstack/react-query"
import { useGetUpdatedController } from "../../../../../../hooks/useGetController"

export const GET_AUTHORISED_LENDERS_KEY = "controllerForBorrower"

export const useGetAuthorizedLenders = () => {
  const { data: controller } = useGetUpdatedController()
  async function getAuthorizedLenders() {
    if (controller) {
      const lenders = await controller.authorizedLenders
      return lenders
    }
    return []
  }

  return useQuery({
    queryKey: [GET_AUTHORISED_LENDERS_KEY],
    queryFn: getAuthorizedLenders,
    refetchOnMount: false,
  })
}
