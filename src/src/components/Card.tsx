import { ReactNode } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import styled from 'styled-components';

type Props = {
  title: string;
  subtitle: string;
  onUpdate: () => void;
  onDelete: () => void;
  children: ReactNode;
}

export const Card = ({ title, subtitle, onUpdate, onDelete, children }: Props) => {
  return (
    <Container>
      <header>
        <main>
          <strong>{title}</strong>
          <p>{subtitle}</p>
        </main>

        <div>
          <IconButton onClick={onUpdate}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={onDelete} color="error">
            <DeleteIcon />
          </IconButton>
        </div>
      </header>

      {children}
    </Container>
  );
}

const Container = styled.div`
  border: #DDD 1px solid;
  border-radius: 10px;
  padding: 10px;
  margin: 5px;
  width: 400px;

  > header {
    display: flex;
    justify-content: space-between;
    align-items: space-between;
    padding: 0;

    main {
      padding: 0px;
    }
  }
`;