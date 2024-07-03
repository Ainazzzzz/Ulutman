import Modal from './components/UI/Modal';

function App() {
   const open = true;
   return (
      <div>
         Ulutma n
         <Modal open={open}>
            bermet
            <button>lkasdf</button>
            <button>lkasdfkjfasd</button>
         </Modal>
      </div>
   );
}

export default App;
