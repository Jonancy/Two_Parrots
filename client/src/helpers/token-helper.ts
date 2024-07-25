let AccessToken: string;
export const getAccessToken = () => AccessToken;

export const setAccessToken = (token: string) => (AccessToken = token);
