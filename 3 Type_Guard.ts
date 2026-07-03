import { User } from './1 Utility_Types'

interface SuccessResponse {
  data: User;
  status: 'ok';
}

interface ErrorResponse {
  error: string;
  status: 'error';
}

type ApiResponse = SuccessResponse | ErrorResponse;
// Предположим, есть декларация функции, которая возвращает Promise<ApiResponse>
declare function fetchData(): Promise<ApiResponse>;

// Type Guard, проверяющий, что ответ успешный
function isSuccessResponse(response: ApiResponse): response is SuccessResponse {
  return response.status === 'ok';
}

// Использование
const result: ApiResponse = await fetchData();
if (isSuccessResponse(result)) {
  // Здесь TypeScript точно знает, что result имеет тип SuccessResponse
  console.log(result.data.name);
}