import MaterialButton from '@mui/material/Button';

type Props = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isLoading: boolean;
  color?: 'primary' | 'inherit';
  text: string;
  type?: 'button' | 'submit';
}
export const Button = ({ color, isLoading, onClick, text, type }: Props) => (
  <MaterialButton onClick={onClick} disabled={isLoading} color={color} type={type}>
    {text}
  </MaterialButton>
);