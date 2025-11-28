export const supabase = {
  from() {
    return {
      select() {
        return Promise.resolve({ data: [], error: null });
      },
    };
  },
};
