import {
  Static,
  Record,
  Literal,
  Unknown,
  Number,
  String,
  Union,
  Undefined,
  Optional,
} from "runtypes";

export const rpcResultSchema = Record({
  error: Optional(Literal(undefined)),
  jsonrpc: Literal("2.0"),
  result: Unknown,
  id: Literal(-1),
});

export const rpcErrorSchema = Record({
  jsonrpc: Literal("2.0"),
  error: Record({
    code: Number,
    message: String,
    data: Unknown,
  }),
  id: Literal(-1),
});

export const rpcResponseSchema = Union(rpcResultSchema, rpcErrorSchema);

export const rpcRequestSchema = Record({
  jsonrpc: Literal("2.0"),
  method: String,
  params: Optional(Unknown),
  id: Literal(-1),
});

export type RpcResult = Static<typeof rpcResultSchema>;
export type RpcError = Static<typeof rpcErrorSchema>;
export type RpcResponse = Static<typeof rpcResponseSchema>;
export type RpcRequest = Static<typeof rpcRequestSchema>;

export let createError = (
  code: number,
  message: string,
  data: any = undefined
): RpcError => {
  console.log({
    code: code,
    message: message,
    data: data,
  });

  return {
    jsonrpc: "2.0",
    error: {
      code: code,
      message: message,
      data: data,
    },
    id: -1,
  };
};

export let serverError = (message: string, data = undefined) => {
  return createError(-32000, message, data);
};

export let createResult = (result: any): RpcResult => {
  return {
    error: undefined,
    jsonrpc: "2.0",
    result: result,
    id: -1,
  };
};

export let apiRepsonse = (rpcResponse: RpcResponse) => {
  return {
    statusCode: 200,
    body: JSON.stringify(rpcResponse),
  };
};
