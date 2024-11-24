export interface APiConfig {
  base_url: string;
}
const DEFAULT_API_CONFIG: APiConfig = {
  base_url: 'https://jsonplaceholder.typicode.com/todos',
};
export {DEFAULT_API_CONFIG};
