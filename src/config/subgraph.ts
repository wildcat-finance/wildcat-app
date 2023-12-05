import { getSubgraphClient } from "@wildcatfi/wildcat-sdk"
import { TargetChainId } from "./networks"

export const SubgraphClient = getSubgraphClient(TargetChainId)
