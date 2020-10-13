export type ChangeTextEventFunc = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => void;

export type ChangeSelectEventFunc = (event: {
  target: { name?: string; value: unknown };
}) => void;
