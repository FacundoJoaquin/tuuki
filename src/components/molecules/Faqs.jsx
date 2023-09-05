import controlCanino from '/src/assets/controlCanino.png'
import controlAlcohol from '/src/assets/controlAlcohol.png'
import controlGendarmeria from '/src/assets/controlGendarmeria.png'
import controlPapeles from '/src/assets/controlPapeles.png'
import ControlType from '../atoms/ControlType'
import Arrow from './Arrow'
import HistorialContainer from './HistorialContainers'
import { useState } from 'react'
import ArrowSquare from '../atoms/ArrowSquare'

const controls = [
  { name: 'Canino', url: controlCanino },
  { name: 'Alcohol', url: controlAlcohol },
  { name: 'Gendarmeria', url: controlGendarmeria },
  { name: 'Papeles', url: controlPapeles }
]

const Faqs = ({ onToggleContent }) => {
  const [showContent, setShowContent] = useState(false);

  const handleShowContent = () => {
    setShowContent(!showContent);
    if (onToggleContent) {
      onToggleContent(!showContent);
    }
  };

  return (
    <div className='w-full flex justify-center'>
      <div className='glass-container absolute bottom-10 w-5/6 z-50 h-4/6'>
        <div className='absolute w-full -top-10 flex justify-center'>
            <Arrow onClick={handleShowContent} />
        </div>
        <h1 className='text-xl p-3 font-bold'>Tipo de controles</h1>
        <ControlType data={controls} />
        <HistorialContainer />
      </div>
    </div>
  );
};

export default Faqs;