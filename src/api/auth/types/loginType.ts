type User = { user: { id: string; name: string } };
export type LoginType = User & { token: string };
