import { Env } from "../app/types";

const hostIp = "http://localhost";

export const environment: Env = {
    production: false,
    authApi: `${hostIp}:8082/api/v1/auth`,
    productApi: `${hostIp}:8084/api/v1/product`,
    cartApi: `${hostIp}:8085/api/v1/cart`,
    orderApi: `${hostIp}:8083/api/v1/order`,
    userApi: `${hostIp}:8082/api/v1/user`,
    categoryApi: `${hostIp}:8086/api/v1/category`,
};
