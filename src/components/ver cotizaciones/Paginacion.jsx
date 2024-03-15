import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeft,faRight } from "@fortawesome/free-solid-svg-icons";
 
const Paginacion = ()=> {
  const [active, setActive] = React.useState(1);
  
  const next = () => {
    if (active === 5) return;
 
    setActive(active + 1);
  };
 
  const prev = () => {
    if (active === 1) return;
 
    setActive(active - 1);
  };
 
  return (
    <div className="flex items-center gap-4">
      <button
        variant="text"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={active === 1}
      >
        <FontAwesomeIcon icon={faLeft} /> Previous
      </button>
      <div className="flex items-center gap-2">
        <button >1</button>
        <button >2</button>
        <button >3</button>
        <button >4</button>
        <button >5</button>
      </div>
      <button
        variant="text"
        className="flex items-center gap-2"
        onClick={next}
        disabled={active === 5}
      >
        Next
        <FontAwesomeIcon icon={faRight} />
      </button>
    </div>
  );
}


export default Paginacion;