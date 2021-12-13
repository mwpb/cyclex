import { RpcResponse, rpcResponseSchema } from "../../data/RpcData";

export let rpc = async (
  method: string,
  params: any = undefined
): Promise<RpcResponse> => {
  let response = await fetch("/api", {
    method: "POST",
    body: JSON.stringify({
      id: -1,
      jsonrpc: "2.0",
      method: method,
      params: params,
    }),
  });

  let res = rpcResponseSchema.check(response);
  return res;
};
