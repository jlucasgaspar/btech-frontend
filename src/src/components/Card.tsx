import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import styled from 'styled-components';

type Props = {
  title: string;
  footerCreatedDateText: string;
  footerTasksDoneText: string;
  onUpdate: () => void;
  onDelete: () => void;
  onPressCard: () => void;
}

export const Card = ({
  title, footerCreatedDateText, footerTasksDoneText, onUpdate, onDelete, onPressCard
}: Props) => {
  return (
    <Container>
      <header>
        <main onClick={onPressCard}>
          <strong>{title}</strong>
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

      <section onClick={onPressCard}>
        <p>{footerCreatedDateText}</p>
        <p>{footerTasksDoneText}</p>
      </section>
    </Container>
  );
}

const Container = styled.div`
  border: #DDD 1px solid;
  border-radius: 10px;
  padding: 10px;
  margin: 5px;
  width: 400px;

  :hover {
    border: 3px solid #76b6f6;
    padding: 8px;
    transition: all ease 0.2s;
  }

  > header {
    display: flex;
    justify-content: space-between;
    align-items: space-between;
    padding: 0;

    main {
      padding: 0px;
      font-size: 20px;
      :hover {
        cursor: pointer;
        color: #014b95;
        transition: all ease 0.2s;
      }
    }
  }

  > section {
    display: flex;
    justify-content: space-between;
    align-items: space-between;
    color: #777;

    :hover {
      cursor: pointer;
      color: #014b95;
      transition: all ease 0.2s;
    }
  }
`;