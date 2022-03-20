import Box from '@mui/material/Box';
import MaterialModal from '@mui/material/Modal';
import { ReactNode } from 'react';

const makeStyle = (w?: number) => ({
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: w || 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
});

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  width?: number;
}

export const Modal = ({ isOpen, onClose, children, width }: Props) => {
  return (
    <MaterialModal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={makeStyle(width)}>
        {children}
      </Box>
    </MaterialModal>
  );
}