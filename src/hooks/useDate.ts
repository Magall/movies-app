export function useFormatDate(date?: Date): string | undefined {
  if (date) {
    return new Date(date).toLocaleDateString("en-gb");
  }
}

export function useGetYear(date?: Date): number | undefined {
  if (date) {
    return new Date(date).getFullYear();
  }
}
