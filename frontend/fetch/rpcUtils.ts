import { RpcResponse, rpcResponseSchema } from "../../data/RpcData";

export let rpc = async (
  method: string,
  params: any = undefined
): Promise<RpcResponse> => {
  let response = await fetch("/.netlify/functions/api", {
    method: "POST",
    body: JSON.stringify({
      id: -1,
      jsonrpc: "2.0",
      method: method,
      params: params,
    }),
  });

  let json = await response.json();

  console.log(json);
  
  let res = rpcResponseSchema.check(json);
  return res;
};
