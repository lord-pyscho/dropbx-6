// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loginUser = async (data: any) => {
  return await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      contentType: "application/json",
    },
  });
};
