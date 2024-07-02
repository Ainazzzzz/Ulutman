import Modal from './components/UI/Modal';

function App() {
   const open = true;
   return (
      <div>
         Ulutman
         <Modal variant="info" open={open}>
            bermet
         </Modal>
      </div>
   );
}

export default App;
