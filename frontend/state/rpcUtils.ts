import * as m from "mithril";
import { RpcResponse, rpcResponseSchema } from "../../data/RpcData";

export let rpc = async (
  method: string,
  params: any = undefined
): Promise<RpcResponse> => {
  let response = await m.request("/api", {
    method: "POST",
    body: { id: -1, jsonrpc: "2.0", method: method, params: params },
  });

  return rpcResponseSchema.check(response);
};
