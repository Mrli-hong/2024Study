// 通过两个token，一个长token(access token)一个短token(refresh token)，如果并发请求多个不同接口将会导致多次刷新token
async function refreshToken() {
    const res = await axiosInstance.get('/refresh', {
        params: {
            token: localStorage.getItem('refresh_token')
        }
    });
    localStorage.setItem('access_token', res.data.accessToken);
    localStorage.setItem('refresh_token', res.data.refreshToken);

    return res;
}


axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        let { data, config } = error.response;

        if (data.statusCode === 401 && !config.url.includes('/refresh')) {

            const res = await refreshToken();

            if (res.status === 200) {
                return axiosInstance(config);
            } else {
                alert(data || '登录过期，请重新登录');
            }
        } else {
            return error.response;
        }
    }
)