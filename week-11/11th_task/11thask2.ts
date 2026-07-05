interface SuccessResponse {
  status: 'success';
  data: any;
}

interface ErrorResponse {
  status: 'error';
  error: string;
}

type ProcessReturnType = ReturnType<typeof processData>;

function processData(input: string): SuccessResponse | ErrorResponse {
    return {} as any;
}

function isProcessSuccess(arg: any): arg is SuccessResponse {
    return typeof arg === 'object' && arg !== null && 'status' in arg && arg.status === 'success';
}